/* eslint no-magic-numbers: 0 */
import React, {Component} from 'react'
import $ from 'jquery'

import { DashWtgviewer } from '../lib'

const getModelData=(setProps, data)=>{
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

const getMapBounds=(setProps)=>{
    fetch('/assets/ea1_boundary.json'
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
        const data = {}
        const mapData = {
            "boundary": {
                "positions": myJson
            },
            "center":{
                id: "center",
                lat: myJson[0].lat,
                lng: myJson[0].lng
            }
        }
        data.map = mapData
        setProps(data)
      });
  }

  const getMapTurbines=(setProps)=>{
    fetch('/assets/ea1_turbines.json'
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
        const data = {}
        data.map = {}
        data.map.turbines = {
            "positions": myJson
        }
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
        const data = $.extend(true, this.state, newProps)
        this.setState(data);
    }

    componentDidMount() {
        getModelData(
            this.setProps,
            {
                id: this.state.id,
                tooltip: true,
                show_map: false,
                environment: true,
                stats: true
            },
        )

        getMapBounds(
            this.setProps
        )

        getMapTurbines(
            this.setProps
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
