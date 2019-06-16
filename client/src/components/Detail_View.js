import React,{Component} from 'react';
import axios from 'axios'
import "../index.css"
class Detail_View extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name:null,
            arrival:null,
            treatment_date:'',
            current:'',
            nextConsent:''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleConsentClick = this.handleConsentClick.bind(this)
    }
    handleChange(event){
        this.setState({[event.target.name]: event.target.value})
    }
    handleSubmit(event){
        let update = {
                documents: {
                    consents: this.state.consent,
                    treatmentPlan:this.state.treatment_date,
                    admissionNote:this.state.admission
                }
        }
        console.log(update)
        event.preventDefault()
        axios.post("/todos/update/"+this.props.match.params.id, update ).then(res=>{
            console.log(res);
            console.log(res.data)
        })
        
    }
    handleConsentClick(event){
        event.preventDefault()
        this.setState({
            consent:!this.state.consent
        })
        console.log("clicked")
        let currentConsent= !this.state.consent
        console.log(currentConsent)
        let update = {
            resident_name:this.state.resident_name,
            resident_arrival:this.state.resident_arrival,
            documents: {
                consents: currentConsent,
                treatmentPlan:this.state.treatment_date,
                admissionNote:this.state.admission
            }
        }
        console.log(update)
        console.log(this.props.match.params.id)
        axios.post("/todos/update/"+this.props.match.params.id, update).then(res=>{
            console.log(res)
        })
    }

    componentDidMount(){
        const id  = this.props.match.params
        let currentTime= new Date ();

        console.log(id)
        axios.get("/todos/detail/"+id.id).then(res => {
            console.log(res)
            console.log(res.data.documents.consents)
            this.setState({
                name:res.data.resident_name,
                arrival: res.data.resident_arrival,
                consent: (res.data.documents.consents),
                treatmentPlan: res.data.documents.treatment_date,
                admission: res.data.documents.admissionNote,
                current:JSON.stringify(currentTime),
                nextConsent : '20'+ (parseInt(res.data.resident_arrival.slice(2,4))+1)+ res.data.resident_arrival.slice(4,)
            })
        })
    }
    
    render() { 
        return ( 
            <div>
        <h1>You're looking at a detailed view</h1> 
        <h2>Today's date: {this.state.current}</h2>
            <li>Name: {this.state.name}</li>
            <li>Date Arrived: {this.state.arrival}</li>
            <br></br>
            <li className= {this.state.consent === true ? "true": "false" }>Consent on file: {this.state.consent}</li>
            <button onClick= {this.handleConsentClick}>Toggle consent</button>
            <li> Next Consent due: {this.state.nextConsent} </li>
            <br></br>
            <li >Treatment Plan on file: {this.state.treatmentPlan}</li>

            <form onSubmit = {this.handleSubmit}>
                <label> Treatment Date 
                <input onChange = {this.handleChange} name= "treatment_date" type= "date" value = {this.state.treatment_date}></input>
            <input type= "submit"/>
            <li>Next Treatment Plan due: </li>
            </label>
            </form>
            <br></br>
            <li>Admission Note on file? {this.state.admission}</li>
            <br></br>
            </div>
        );
    }
}
 
export default Detail_View;