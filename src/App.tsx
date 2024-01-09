import "./App.css"
import { useDispatch, useSelector } from "react-redux"
import {
  addTodo,
  removeTodo,
  updateTodo,
  toggleCompleted,
} from "./Slices/todoSlice"
import { useRef } from "react"
import { Button, TextField, Checkbox } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"

type stateType = {
  todo: {
    id: number | string
    text: string
    completed: boolean
  }[]
}

type payloadType = {
  id: number | string
  text: string
  completed: boolean
}

type todoRefType = {
  current: {
    value?: string
  }
}

function App() {
  const todos = useSelector((state: stateType) => state.todo)
  const dispatch = useDispatch()
  const todoRef: todoRefType = useRef()
  const checkboxRef = useRef()
  function handleCheckboxChange(id) {
    const value = checkboxRef.current.checked
    dispatch(toggleCompleted({ id, value }))
  }
  function handleDeleteClick(id) {
    console.log(id)
    dispatch(removeTodo({ id }))
  }
  return (
    <div className="container">
      <div className="todo-submit-wrapper">
        <TextField
          sx={{ paddingTop: "9px", paddingRight: "10px" }}
          variant="standard"
          inputRef={todoRef}
        />
        <Button
          variant="contained"
          onClick={() => {
            const newTodo: payloadType = {
              id: Math.round(Math.random() * 10000),
              text: todoRef.current.value || "",
              completed: false,
            }
            todoRef.current.value = ""
            dispatch(addTodo(newTodo))
          }}
        >
          Add to-do
        </Button>
      </div>
      <div className="todos-wrapper">
        {todos.map((todo) => (
          <div className="todo-card" key={todo.id}>
            <Checkbox
              onChange={() => handleCheckboxChange(todo.id)}
              inputRef={checkboxRef}
              className="checkbox"
              color={"success"}
            />
            <p className="todo-text">{todo.text}</p>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => handleDeleteClick(todo.id)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
