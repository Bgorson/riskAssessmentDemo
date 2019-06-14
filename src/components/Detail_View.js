import React,{Component} from 'react';
import axios from 'axios'
class Detail_View extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:null,
            arrival:null,
            treatment_date:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit(event){
        let update = {
                documents: {
                    treatmentPlan:this.state.treatment_date,
                }
        }
        console.log(update)
        event.preventDefault()
        axios.post("/todos/update/"+this.props.match.params.id, update ).then(res=>{
            console.log(res);
            console.log(res.data)
        })
        
    }

    componentDidMount(){
        const id  = this.props.match.params
        console.log(id)
        axios.get("/todos/detail/"+id.id).then(res => {
            console.log(res)
            console.log(res.data.documents.consents)
            this.setState({
                name:res.data.resident_name,
                arrival: res.data.resident_arrival,
                consent: JSON.stringify(res.data.documents.consents),
                treatmentPlan: JSON.stringify(res.data.documents.treatmentPlan),
                admission: JSON.stringify(res.data.documents.admissionNote)
            })
        })
    }
    render() { 
        return ( 
            <div>
        <h1>You're looking at a detailed view</h1> 
            <li>Name: {this.state.name}</li>
            <li>Date Arrived: {this.state.arrival}</li>
            <li>Consent on file: {this.state.consent}</li>
            <li>Treatment Plan on file: {this.state.treatmentPlan}</li>

            <form onSubmit = {this.handleSubmit}>
                <label> Treatment Date 
                <input onChange = {this.handleChange} name= "treatment_date" type= "text" value = {this.state.treatment_date}></input>
            <input type= "submit"/>
            </label>
            </form>
           
            <li>Admission Note on file: {this.state.admission}</li>
            </div>
        );
    }
}
 
export default Detail_View;