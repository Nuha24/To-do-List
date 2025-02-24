import { useState } from "react";
import TodoTypes from "../todo";
import TodoService from "../TodoService";
import { FaEdit, FaCheck } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todos, setTodos] = useState<TodoTypes[]>(TodoService.getTodos());
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoText, setEditedTodoText] = useState<string>("");

  // Toggle completion state
  const handleToggleComplete = (id: number) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    TodoService.updateTodo({ ...todos.find((t) => t.id === id)!, completed: !todos.find((t) => t.id === id)!.completed });
  };

  // Start editing a todo
  const handleEditStart = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  // Save edited todo
  const handleEditSave = (id: number) => {
    if (editedTodoText.trim() !== "") {
      const updatedTodo = TodoService.updateTodo({
        id,
        text: editedTodoText,
        completed: false,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo))
      );

      setEditingTodoId(null);
      setEditedTodoText("");
    }
  };

  // Delete a todo
  const handleDeleteTodo = (id: number) => {
    TodoService.deleteTodo(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="bg-black screen p-4 sm:p-6 md:p-10 lg:p-16 xl:p-20 text-white-300">
      <TodoForm setTodos={setTodos} />
      <div className="mt-4 space-y-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between bg-gray-900 p-3 rounded-lg hover:bg-gray-800 transition duration-200"
          >
            {editingTodoId === todo.id ? 
            (
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  className="border p-2 rounded-md focus:ring-2 focus:ring-gray-300 outline-none bg-gray-800 text-white"
                  value={editedTodoText}
                  onChange={(e) => setEditedTodoText(e.target.value)}
                  autoFocus
                />
                <button
                  onClick={() => handleEditSave(todo.id)}
                  className="text-green-400 hover:text-green-300 transition"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={handleEditCancel}
                  className="text-red-500 hover:text-red-400 transition"
                >
                  <GiCancel />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                {/* Task Text with Cut-through Effect */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleComplete(todo.id)}
                    className="text-gray-500 hover:text-gray-400 transition"
                  >
                    {todo.completed ? (
                      <BsCheckCircleFill className="text-green-400" size={20} />
                    ) : (
                      <BsCircle className="text-gray-500" size={20} />
                    )}
                  </button>
                  <span
                    className={`text-lg ${
                      todo.completed ? "line-through text-gray-500" : "text-gray-300"
                    }`}
                  >
                    {todo.text}
                  </span>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEditStart(todo.id, todo.text)}
                    className="text-blue-400 hover:text-blue-300 transition"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="text-red-400 hover:text-red-300 transition"
                  >
                    <RiDeleteBin5Fill />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
);

};

export default TodoList;
