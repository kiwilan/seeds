# Docker usage

```bash
docker run -it ubuntu:latest bash
```

```bash
docker stop b3bd1b08a84d
```

```bash
docker rm b3bd1b08a84d
```

```bash
docker-compose down --remove-orphans
```

```bash
docker build -t seeds:latest .
```

```bash
docker run --name seeds -d --expose=3000 seeds:latest
```

```bash
docker run -d -p 3000:3000 seeds:latest
```

```bash
docker run --network="host" seeds:latest
```
