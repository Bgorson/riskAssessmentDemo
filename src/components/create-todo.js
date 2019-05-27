import React, {Component} from 'react';
import axios from 'axios'

export default class CreateTodo extends Component {
    constructor(){
        super()
        this.state= {
            todo_description:'',
            todo_responsible:'',
            todo_priority:'',
            todo_completed:false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit(event){
        let task = {
                todo_description:this.state.todo_description,
                todo_responsible:this.state.todo_responsible,
                todo_priority:this.state.todo_priority,
                todo_completed:this.state.todo_completed
        }
        console.log(task)
        event.preventDefault()
        axios.post("/todos/add", task ).then(res=>{
            console.log(res);
            console.log(res.data)
        })

    }
    render(){
        return (
            <div>
                <p>Welcome to Creat to Do List Component</p>
                <form onSubmit={this.handleSubmit}>
                    <label> Description
                <input onChange= {this.handleChange} name="todo_description"  type = "text" value = {this.state.todo_description} ></input>
                </label>
                <label>Person Responsible
                <input onChange= {this.handleChange} name="todo_responsible"  type = "text" value = {this.state.todo_responsible} ></input>
                </label>
                <label>Priority
                <input onChange= {this.handleChange}  name="todo_priority" type = "text" value = {this.state.todo_priority}></input>
                </label>
                <input type="submit"  />
                </form>
             
            </div>
        )
    }
}