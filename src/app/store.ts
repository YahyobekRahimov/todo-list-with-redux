import { configureStore } from "@reduxjs/toolkit"
import counterSlice from "../Slices/counterSlice"
import todoSlice from "../Slices/todoSlice"

const store = configureStore({
  reducer: {
    count: counterSlice,
    todo: todoSlice,
  },
})

const unsubscribe = store.subscribe(() => {
  const currentState = store.getState()
  console.log("State changed:", currentState)
})

export default store
