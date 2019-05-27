import React,{Component} from 'react';
import  { BrowserRouter as Router, Route, Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import TodosList from "./components/todos-list"
import EditTodo from "./components/edit-todos"
import CreateTodo from "./components/create-todo"

class App extends Component {



  render() { 
    return (  
      <Router>
      <div className= "container">
      <h1>Welcome to home page</h1>
      <a href= "/">Click here to see your todo list</a>
      <a href= "/create">Click here to create a todo item</a>
        </div>
        <Route path = "/" exact component = {TodosList} />
        <Route path = "/edit/:id" component = {EditTodo} />
        <Route path = "/create" component = {CreateTodo}/>
        </Router>
    )
  }

}


export default App;
