"use client";
import { useState, useEffect } from "react";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

//გავატანოთ ფერი პროპსად 
type NoteProps = {
  color: string; 
};

const Note = ({ color }: NoteProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");
  const [visible, setVisible] = useState(true); //ნოუთის გამოჩენა გაქრობა 

 
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ახალი თასქის დამატება
  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), task, completed: false }]);
      setTask(""); // გასუფთავება ინფუთ ველის როცა ერთ Task-ს დაამატებს
    }
  };

  // თასქის გაჩეკვა თუ შესრულებულია
  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // წაშლა თასქის
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  //ნოუთის მთლიანად წაშლა 
  const removeNote = () => {
    setVisible(false);
  };

  return visible ? ( 
    <div className={`w-[500px] h-[300px] ${color} rounded-md m-auto p-4 overflow-y-auto mb-[10px]`}>
      <div className="flex items-center justify-between mb-4">
        <button
          className="w-[50px] h-[50px] bg-white text-black rounded-3xl"
          onClick={removeNote} 
        >
          X
        </button>
        <button className="w-[150px] h-[50px] bg-emerald-600 text-white rounded-2xl">
          Download Tasks
        </button>
      </div>

      <div className="flex items-center bg-white rounded-md p-2 ">
        <input
          className="bg-gray-400 w-[250px] h-[40px] rounded-[7px] text-red-500 p-2"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add Your Task"
        />
        <button
          className="w-[70px] h-[45px] bg-emerald-700 rounded-md text-white ml-[120px]"
          onClick={addTodo}
        >
          Add
        </button>
      </div>

      <div className="mt-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-center justify-between p-2 mt-2 bg-white rounded-md ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            <span>{todo.task}</span>
            <div>
              <button
                className="w-[70px] h-[45px] bg-emerald-600 text-white rounded-md mr-2"
                onClick={() => toggleTodo(todo.id)}
              >
                {todo.completed ? "Undo" : "Check"}
              </button>
              <button
                className="w-[70px] h-[45px] bg-red-600 text-white rounded-md"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  ) : null; 
};

export default Note;
