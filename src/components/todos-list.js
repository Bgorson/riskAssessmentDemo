import React, {Component} from 'react';
import axios from 'axios'

export default class TodosList extends Component {
    constructor(){
        super()
        this.state= {
            tasks:[]
        }

    }
    componentDidMount(){
    axios.get('/todos').then(res =>{
        const tasks =res.data;
        this.setState({tasks})
    })
    }
    render(){
        return (
            <div>
                <p>Welcome to Todos List Component</p>
                <ul>
                { this.state.tasks.map(task=> <li>{task.todo_description}</li>)}
                </ul>
            </div>
        )
    }
}