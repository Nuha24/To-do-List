import TodoTypes from "./todo";

//var to store into the local storage

const LOCAL_STORAGE_KEY = 'todos';

//module file for CRUD Operation

const TodoService = {
 //Get Todos 
 getTodos:() :TodoTypes[] => {
    const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY) 
    return todoStr ? JSON.parse(todoStr) : []; 
 },

//adding Todos
addTodos: (text: string) : TodoTypes => {
   const todos =TodoService.getTodos();  
   const newTodo: TodoTypes = {id: Date.now(), 
   text,
   completed: false,}; 
   const updateTodos = [...todos, newTodo]; //spread
   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
   return newTodo;
 },

//Update Todos using PUT
 updateTodo: (todo: TodoTypes) : TodoTypes => {
    const todos =TodoService.getTodos();  
    const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t)) //mapping 
    //again update 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    return todo;
 },

 //Delete Todos
deleteTodo: (id: number): void =>{
    const todos =TodoService.getTodos();  

    const updateTodos = todos.filter((todo) => todo.id !== id);
    //again update 
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
}
};
export default TodoService;