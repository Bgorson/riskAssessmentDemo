import React,{Component} from 'react';
import  { BrowserRouter as Router, Route, Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import TodosList from "./components/todos-list"
import EditTodo from "./components/edit-todos"
import CreatTodo from "./components/create-todo"

class App extends Component {



  render() { 
    return (  
      <Router>
      <div className= "container">
      <h1>Welcome to home page</h1>
        </div>
        <Route path = "/" exact component = {TodosList} />
        <Route path = "/edit/:id" component = {EditTodo} />
        <Route path = "/create" component = {CreatTodo}/>
        </Router>
    )
  }

}


export default App;
