import TodoList from "./TaskManager/TodoList";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-black shadow-lg rounded-lg p-6 w-full max-w-lg">
        <div className="bg-green-500 text-center text-l py-3 text-white rounded-t-lg font-custom">To Do List</div>
          <TodoList />
        </div>
      </div>
  );
}
export default App;
