import { createSlice } from "@reduxjs/toolkit"

type Todo = {
  id: number | string
  text: string
  completed: boolean
}

type StateType = Todo[]

type stateType = {
  id: number | string
  text: string
  completed: boolean
}[]

type payloadType = {
  payload: {
    id: number | string
    text: string
    completed: boolean
  }
}

type payloadForCheckboxType = {
  payload: {
    id: number | string
    value: boolean
  }
}

const todoSlice = createSlice({
  name: "todos",
  initialState: [] as StateType,
  reducers: {
    addTodo: (state: stateType, { payload }: payloadType) => {
      state.push(payload)
    },
    removeTodo: (
      state: stateType,
      { payload }: { payload: { id: number | string } },
    ) => {
      return state.filter((todo) => {
        return todo.id !== payload.id
      })
    },
    updateTodo: (state: stateType, { payload }: payloadType) => {
      const index: number = state.findIndex((todo) => todo.id == payload.id)
      if (index !== -1) {
        return state.map((todo, i) =>
          i === index ? { ...todo, text: payload.text } : todo,
        )
      }
      return state
    },
    toggleCompleted: (
      state: stateType,
      { payload }: payloadForCheckboxType,
    ) => {
      const index: number = state.findIndex((todo) => todo.id == payload.id)
      if (index !== -1) {
        return state.map((todo, i) =>
          i === index ? { ...todo, completed: payload.value } : todo,
        )
      }
      return state
    },
  },
})

export const { addTodo, removeTodo, updateTodo, toggleCompleted } =
  todoSlice.actions

export default todoSlice.reducer
