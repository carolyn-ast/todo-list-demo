// import module
import TaskStore from "./task.Store"
import React from "react"
class RootStore {

  constructor() {
    this.taskStore = new TaskStore()
  }
}
//instantiate rootStore
const StoresContext = React.createContext(new RootStore())
// export
export const useStore = () => React.useContext(StoresContext)
