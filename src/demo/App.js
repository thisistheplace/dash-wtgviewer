/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react';

import { DashWtgviewer } from '../lib';

const getData=(setProps, data)=>{
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
        data.model = myJson
        setProps(data)
      });
  }

class App extends Component {

    constructor() {
        super();
        this.state = {
            id: 'test',
            model: {}
        };
        this.setProps = this.setProps.bind(this);
    }

    setProps(newProps) {
        this.setState(newProps);
    }

    componentDidMount() {
        getData(
            this.setProps,
            {
                id: this.state.id,
            }
        )
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
