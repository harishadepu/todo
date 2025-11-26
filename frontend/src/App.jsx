import React, { useEffect, useState } from 'react'

const App = () => {
  const [todos,setTodos] = useState([])
  const [text,setText] = useState("")
  useEffect(()=>{
      fetch("http://localhost:5000/todos/").then(res=>res.json())
    .then(data=>setTodos(data))
    .catch(err=>console.log(err))
  })
  const onAddTodo =()=>{
    const payload = {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({title:text})
    }
    fetch("http://localhost:5000/todos/add",payload).then(res=>res.json())
    .then(data=>setTodos([...todos,data]))
    .catch(err=>console.log(err))
    setText("")

  }
  const onDelete =(id)=>{
    const payload = {
      method:"DELETE",
    }
    fetch(`http://localhost:5000/todos/delete/${id}`,payload).then(res => {
    if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
    return res.json();
  })

    .then(()=>setTodos(prev=>prev.filter(todo=>todo.id !== id)))
    .catch(err=>console.log(err))
  }
  return (
    <div className="bg-violet-500 min-h-screen flex flex-col items-center gap-6 py-10 px-4">
  <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">todo-list</h1>

  <div className="flex flex-col sm:flex-row w-full max-w-md gap-2">
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      type="text"
      placeholder="type here!"
      className="flex-1 text-white border p-3 rounded-lg outline-none bg-transparent"
    />
    <button
      className="bg-white text-violet-500 font-bold p-3 rounded-lg"
      onClick={onAddTodo}
    >
      Add
    </button>
  </div>

  {todos.length === 0 ? (
    <h1 className="text-white text-center mt-6">No todos found!</h1>
  ) : (
    <div className="bg-white w-full max-w-md min-h-[24rem] rounded-lg p-4 mt-6">
      {todos.map((todo, index) => (
        <div
          key={todo.id || index}
          className="flex justify-between items-center border-b py-2"
        >
          <h1 className="text-violet-500 break-words">{todo.title}</h1>
          <button
            className="bg-violet-500 text-white px-3 py-1 rounded-lg text-sm sm:text-base"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  )}
</div>
  )
}


export default App