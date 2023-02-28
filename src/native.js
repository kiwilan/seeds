import { Dotenv, FileUtils, FileUtilsPromises, PathUtils } from '@kiwilan/fastify-utils'
import { build } from 'esbuild'
import glob from 'tiny-glob'

const nativeNodeModulesPlugin = {
  name: 'native-node-modules',
  setup(build) {
    // If a ".node" file is imported within a module in the "file" namespace, resolve
    // it to an absolute path and put it into the "node-file" virtual namespace.
    build.onResolve({ filter: /\.node$/, namespace: 'file' }, args => ({
      path: require.resolve(args.path, { paths: [args.resolveDir] }),
      namespace: 'node-file',
    }))

    // Files in the "node-file" virtual namespace call "require()" on the
    // path from esbuild of the ".node" file in the output directory.
    build.onLoad({ filter: /.*/, namespace: 'node-file' }, args => ({
      contents: `
        import path from ${JSON.stringify(args.path)}
        try { module.exports = require(path) }
        catch {}
      `,
    }))

    // If a ".node" file is imported within a module in the "node-file" namespace, put
    // it in the "file" namespace where esbuild's default loading behavior will handle
    // it. It is already an absolute path since we resolved it to one above.
    build.onResolve({ filter: /\.node$/, namespace: 'node-file' }, args => ({
      path: args.path,
      namespace: 'file',
    }))

    // Tell esbuild's default loading behavior to use the "file" loader for
    // these ".node" files.
    const opts = build.initialOptions
    opts.loader = opts.loader || {}
    opts.loader['.node'] = 'file'
  },
}

export class Compiler {
  constructor(
    definitions,
    routes,
    config,
    metadata,
  ) {}

  static async make() {
    const build = new Compiler()
    await build.createTsConfig()

    build.definitions = await build.setDotenv()
    build.routes = await build.setRoutes()
    await build.replaceEnums()
    build.metadata = await build.setMetadata()

    const dotenv = Dotenv.make()
    if (!dotenv.system.IS_DEV)
      build.config = await build.setEsbuild()
  }

  async setDotenv() {
    const path = PathUtils.getFromRoot('config.fastify.json')
    const isExists = await FileUtilsPromises.checkIfFileExists(path)
    const configStart = {
      $schema: './node_modules/fastify-utils/lib/schema.json',
      dotenv: {},
    }

    if (!isExists) {
      console.warn('`config.fastify.json` not found')
      await FileUtilsPromises.createFile(path, JSON.stringify(configStart, null, 2))
    }

    const dotenvFile = await FileUtilsPromises.readFile(path)
    const json = JSON.parse(dotenvFile.toString())

    const list = []

    let k
    for (k in json.dotenv) {
      // const v = json.dotenv[k]
      list.push(k)
    }

    return list
  }

  async setRoutes() {
    const routesRaw = PathUtils.getFromRoot('src/routes')
    const isExists = await FileUtilsPromises.checkIfDirExists(routesRaw)

    if (!isExists) {
      console.warn('`src/routes` not found')
      return []
    }

    const routesList = []
    const files = await FileUtilsPromises.readDirRecursively(routesRaw, ['.ts'])

    files.forEach((element) => {
      element = element.replace('.ts', '')
      const splitted = element.split('routes/')
      let routeRaw = splitted[1]

      routeRaw = routeRaw.replace('index', '/')
      routeRaw = routeRaw.replace('//', '/')

      if (routeRaw.length !== 1) {
        routeRaw = routeRaw.endsWith('/')
          ? routeRaw.slice(0, -1)
          : routeRaw
      }

      if (!routeRaw.startsWith('/'))
        routeRaw = `/${routeRaw}`

      routeRaw = routeRaw.replace('[', ':')
      routeRaw = routeRaw.replace(']', '')

      const name = routeRaw
      const path = routeRaw

      const route = {
        name,
        route: path,
      }

      routesList.push(route)
    })

    return routesList.map(el => el.route)
  }

  async replaceEnums() {
    const typesCache = PathUtils.getFromPackage('index.d.ts.cache')
    const jsCache = PathUtils.getFromPackage('index.js.cache')

    const haveTypesCache = await FileUtilsPromises.checkIfFileExists(typesCache)
    const haveJsCache = await FileUtilsPromises.checkIfFileExists(jsCache)
    if (!haveTypesCache) {
      const types = await FileUtilsPromises.readFile(PathUtils.getFromPackage('index.d.ts'))
      FileUtils.createFile(typesCache, types)
    }
    if (!haveJsCache) {
      const js = await FileUtilsPromises.readFile(PathUtils.getFromPackage('index.js'))
      FileUtils.createFile(jsCache, js)
    }

    const replaceTypes = [
      {
        from: 'SAMPLE_DOTENV = 0\n',
        to: this.definitions.map(el => `${el} = 0,`).join('\n'),
      },
      {
        from: 'SAMPLE_ENDPOINT = 0\n',
        to: this.routes.map(el => `'${el}' = 0,`).join('\n'),
      },
    ]
    FileUtils.replaceInFileBulk(typesCache, PathUtils.getFromPackage('index.d.ts'), replaceTypes)

    const replaceJs = [
      {
        from: 'var DotEnvEnum = /* @__PURE__ */ ((DotEnvEnum2) => {\n',
        to: `var DotEnvEnum = ((DotEnvEnum2) => {\n${this.definitions.map(el => `DotEnvEnum2[DotEnvEnum2["${el}"] = 0] = "${el}";`).join('\n')}`,
      },
      {
        from: 'var EndpointEnum = /* @__PURE__ */ ((EndpointEnum2) => {\n',
        to: `var EndpointEnum = ((EndpointEnum2) => {\n${this.routes.map(el => `EndpointEnum2[EndpointEnum2["${el}"] = 0] = "${el}";`).join('\n')}`,
      },
      {
        from: 'DotEnvEnum2[DotEnvEnum2["SAMPLE_DOTENV"] = 0] = "SAMPLE_DOTENV";',
        to: '',
      },
      {
        from: 'EndpointEnum2[EndpointEnum2["SAMPLE_ENDPOINT"] = 0] = "SAMPLE_ENDPOINT";',
        to: '',
      },
    ]
    FileUtils.replaceInFileBulk(jsCache, PathUtils.getFromPackage('index.js'), replaceJs)
  }

  async setMetadata() {
    const path = PathUtils.getFromRoot('package.json')
    const content = await FileUtilsPromises.readFile(path)

    const contentJson = JSON.parse(content)
    const json = {
      name: contentJson.name,
      version: contentJson.version,
      description: contentJson.description,
      author: contentJson.author,
      license: contentJson.license,
      type: contentJson.type,
      homepage: contentJson.homepage,
    }

    await FileUtilsPromises.createFile(PathUtils.getFromRoot('build/metadata.json'), JSON.stringify(json, null, 2))
    await FileUtilsPromises.createFile(PathUtils.getFromRoot('src/metadata.json'), JSON.stringify(json, null, 2))

    await FileUtilsPromises.addToGitIgnore('src/metadata.json')

    return json
  }

  async setEsbuild() {
    const config = async () => {
      const entryPoints = await glob('src/**/*.ts')

      return build({
        entryPoints,
        logLevel: 'info',
        outdir: 'build',
        bundle: true,
        minify: true,
        splitting: true,
        platform: 'node',
        target: 'esnext',
        format: 'esm',
        define: {
          'process.env.NODE_ENV': '"production"',
          'process.env.NODE_ENV_LOG': '"production"',
        },
        outExtension: { '.js': '.mjs' },
        sourcemap: false,
        banner: {
          js: `
    import { createRequire } from 'module';
    import path from 'path';
    import { fileURLToPath } from 'url';
    const require = createRequire(import.meta.url);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    `,
        },
        plugins: [nativeNodeModulesPlugin],
        external: ['sharp'],
      })
    }

    return await config()
  }

  async createTsConfig(path = '.fastify/tsconfig.json') {
    const config = {
      compilerOptions: {
        target: 'ESNext',
        module: 'ESNext', // "CommonJS" or "ESNext"
        moduleResolution: 'Node',
        lib: ['DOM', 'DOM.Iterable', 'ESNext'],
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
        skipLibCheck: true,
        strict: true,
        resolveJsonModule: true,
        strictNullChecks: true,
        noImplicitReturns: true,
        noImplicitAny: true,
        allowJs: true,
        experimentalDecorators: true,
        useDefineForClassFields: true,
        outDir: './dist',
        paths: {
          '~/*': ['./src/*'],
          '@/*': ['./*'],
        },
      },
      include: [
        'src/**/*.ts',
      ],
    }

    const rootConfig = {
      extends: './.fastify/tsconfig.json',
      compilerOptions: {
        paths: {
          '~/*': [
            './src/*',
          ],
          '@/*': [
            './*',
          ],
        },
      },
      include: ['src/**/*.ts'],
    }

    const directory = path.split('/').slice(0, -1).join('/')
    FileUtils.createDirIfNotExists(directory)
    FileUtils.createFile(path, JSON.stringify(config, null, 2))
    if (!FileUtils.checkIfExists('tsconfig.json'))
      FileUtils.createFile('tsconfig.json', JSON.stringify(rootConfig, null, 2))
    FileUtils.addToGitIgnore(directory)
  }
}

Compiler.make()
