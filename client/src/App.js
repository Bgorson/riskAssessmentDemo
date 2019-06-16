import React,{Component} from 'react';
import  { BrowserRouter as Router, Route, Link} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import TodosList from "./components/todos-list"
import EditTodo from "./components/edit-todos"
import CreateTodo from "./components/create-todo"
import Detail_View from './components/Detail_View';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        currentTime:'',
    }
}

componentDidMount(){
  let currentTime= new Date ();
  console.log(currentTime)
}
  render() { 
    return (  
      <Router>
      <div className= "container">
      <h1>Welcome to home page</h1>
      <a href= "/">Click here to see your residents</a>
      <a href= "/create">Click here to add a resident</a>
        </div>
        <Route path = "/" exact component = {TodosList} />
        <Route path = "/edit/:id" component = {EditTodo} />
        <Route 
            path = "/create" 
            render = {()=> (<CreateTodo date= {this.state.currentTime}/>)} />
        <Route path = "/detail/:id" component = {Detail_View}/>
        </Router>
    )
  }

}


export default App;
