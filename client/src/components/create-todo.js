import React, {Component} from 'react';
import axios from 'axios'

export default class CreateTodo extends Component {
    constructor(props){
        super(props)
        this.state= {
            resident_name:'',
            resident_arrival:'',
            currentDate:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit(event){
        let task = {
                resident_name:this.state.resident_name,
                resident_arrival:this.state.resident_arrival,
                documents: {
                    consents: false,
                    treatmentPlan:false,
                    admissionNote:true
                }
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
                <p>Welcome to Create Resident</p>
                <h2>The date is: {this.props.date}</h2>
                <form onSubmit={this.handleSubmit}>
                    <label> Resident Name
                <input onChange= {this.handleChange} name="resident_name"  type = "text" value = {this.state.resident_name} ></input>
                </label>
                <label>Date Arriving
                <input onChange= {this.handleChange} name="resident_arrival"  type = "date" value = {this.state.resident_arrival} ></input>
                </label>
                <input type="submit"  />
                </form>
             
            </div>
        )
    }
}