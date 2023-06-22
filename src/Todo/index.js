import './index.css'
import { useStore } from '../store/index'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import uuid from 'react-uuid'

function Task () {
  const { taskStore } = useStore()
  //radio
  function onChange (id, e) {
    console.log(id, e)
    taskStore.radioCheck(id, e.target.checked)

  }
  //delete task
  function delTask (id) {
    console.log(id)
    taskStore.delTask(id)
  }
  //add task
  const [newTask, setNewTask] = useState('')
  function addNewTask (e) {
    console.log(e)
    if (e.keyCode === 13) {
      console.log(newTask)
      taskStore.addTask(
        {
          id: uuid(),
          name: newTask,
          isDone: false
        })
      // reset the input
      setNewTask('')
    }
  }
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyUp={addNewTask}
        />
      </header>
      <section className="main">
        {/* select all  */}
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          onChange={(e) => taskStore.allCheck(e.target.checked)}
          checked={taskStore.isAllCheck}

        />
        <label htmlFor="toggle-all"></label>
        {/* todo-list rendering */}
        <ul className="todo-list">
          {taskStore.list.map(item => (
            <li
              className={item.isDone ? "todo completed" : "todo"}
              key={item.id}
            >
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  onChange={(e) => onChange(item.id, e)}
                  checked={item.isDone}
                />
                <label >{item.name}</label>
                <button className="destroy" onClick={() => delTask(item.id)}></button>
              </div>
            </li>
          ))}

        </ul>
      </section>
      <footer className='footer'>
        <span className='todo-count'>
          All task:{taskStore.list.length}   Finished task:{taskStore.isFinished}
        </span>
      </footer>
    </section>
  )
}

export default observer(Task)