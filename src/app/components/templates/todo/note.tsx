import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

type NoteProps = {
  color: string;
  onTaskUpdate: (tasks: string[]) => void;
};

const Note = ({ color, onTaskUpdate }: NoteProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    onTaskUpdate(todos.map((todo) => todo.task));
  }, [todos, onTaskUpdate]);

  const addTodo = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), task, completed: false }]);
      setTask("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const removeNote = () => {
    setVisible(false);
  };

  const downloadTasks = () => {
    const tasksText = todos
      .map((todo) => `Task: ${todo.task}, Completed: ${todo.completed}`)
      .join("\n");
    const blob = new Blob([tasksText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "tasks.txt";
    link.click();
  };

  return visible ? (
    <div
      className={`w-[500px] h-[300px] ${color} rounded-md m-auto p-4 overflow-y-auto mb-[10px]`}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          className="w-[50px] h-[50px] bg-white text-black rounded-3xl"
          onClick={removeNote}
        >
          X
        </button>
        <button
          className="w-[150px] h-[50px] bg-emerald-600 text-white rounded-2xl"
          onClick={downloadTasks}
        >
          Download Tasks
        </button>
      </div>

      <div className="flex items-center bg-white rounded-md p-2">
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

      <Reorder.Group
        axis="y"
        values={todos}
        onReorder={setTodos}
        className="mt-4"
      >
        {todos.map((todo) => (
          <Reorder.Item key={todo.id} value={todo}>
            <div
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
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  ) : null;
};

export default Note;
