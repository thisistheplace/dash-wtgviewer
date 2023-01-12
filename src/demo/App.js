/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { DashWtgviewer } from '../lib';

const getData=()=>{
    fetch('/assets/model.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
      .then(function(response){
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      });
  }

class App extends Component {

    constructor() {
        super();
        this.state = {
            id: 'test',
            model: getData()
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    render() {
        return (
            <div>
                <DashWtgviewer
                    setProps={this.setProps}
                    {...this.state}
                />
            </div>
        )
    }
}

export default App;
