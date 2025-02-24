import React, { Dispatch, SetStateAction, useState } from "react";
import TodoService from "../TodoService";
import TodoTypes from "../todo";

interface PropTypes {
  setTodos: Dispatch<SetStateAction<TodoTypes[]>>;
}
const TodoForm: React.FC<PropTypes> = ({ setTodos }) => {
    const [newTodoText, setNewTodoText] = useState<string>("");

    const [error, setError] = useState<string>(""); 
  
    const handleAddTodo = () => {
      if (newTodoText.trim() === "") {
        setError("Task cannot be empty! Please enter a valid task!");
        return;
      }
  
      const newTodo = TodoService.addTodos(newTodoText);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodoText("");
      setError(""); 
    };
  
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => {
            setNewTodoText(e.target.value);
            setError(""); 
          }}
          placeholder="Add a Task"
          className="w-full max-w-lg px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {error && <p className="text-white text-sm">{error}</p>} {/*For the errors */}
        <button
          onClick={handleAddTodo}
          className="bg-green-500 text-white px-32 py-3 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Add Task
        </button>
      </div>
    );
  };
  
  export default TodoForm;
  