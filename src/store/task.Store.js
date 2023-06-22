import { makeAutoObservable } from 'mobx'
class TaskStore {
  list = [
    {
      id: 1,
      name: 'water the plant',
      isDone: true
    },
    {
      id: 2,
      name: 'take out the trash',
      isDone: true
    },
    {
      id: 3,
      name: 'feed the fish',
      isDone: true
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }
  //computed
  get isFinished () {
    return this.list.filter(item => item.isDone).length
  }

  //radio button
  radioCheck (id, check) {
    const item = this.list.find(item => item.id == id)
    item.isDone = check
  }
  //select all
  allCheck (check) {
    this.list.forEach(item => {
      item.isDone = check
    })
  }
  //computed
  //when all are selected
  get isAllCheck () {
    return this.list.every(item => item.isDone)
  }
  //delete task
  delTask = (id) => {
    this.list = this.list.filter(item => item.id !== id)
  }
  //add task
  addTask = (task) => {
    this.list.push(task)
  }
}
export default TaskStore
