import Conf from 'conf'
import chalk from 'chalk'

const config = new Conf()

const add = (task) => {
  // get the current todo-list
  let todosList = config.get('todo-list')

  if (!todosList) {
    // default value for todos-list
    todosList = []
  }

  // push the new task to the todos-list
  todosList.push({
    text: task,
    done: false,
  })

  // set todos-list in conf
  config.set('todo-list', todosList)

  // display message to user
  console.log(
    chalk.green.bold('Task has been added successfully!'),
  )
}

export default add
