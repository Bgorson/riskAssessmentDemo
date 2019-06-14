import React, {Component} from 'react';
import axios from 'axios'

export default class TodosList extends Component {
    constructor(){
        super()
        this.state= {
            residents:[]
        }

    }
    componentDidMount(){
    axios.get('/todos').then(res =>{
        const residents =res.data;
        console.log(residents)
        this.setState({residents})
    })
    }
    render(){
        return (
            <div>
                <p>Welcome to your Residents</p>
                { this.state.residents.map(resident=> 
                <ul>
                <a href= {'detail/' + resident._id}> Click for details</a>
                <li id = {resident._id}>Name: {resident.resident_name}</li>
                <li>Date of Arrival: {resident.resident_arrival}</li>
                </ul>
                )}
               
            </div>
        )
    }
}