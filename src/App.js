import React,{Component} from 'react';
import './App.css';
import { Route } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }


  render() { 
    return (  
      <div>
<h1>Welcome to home page</h1>
        <Route
          exact path="/assessment"
          render= { () =>
            <React.Fragment>
              <h1>Loadup assessment 1</h1>
            </React.Fragment>}
        />
        </div>
    )

  }

}

 
export default App;
