import {Model} from './model'
import { Results, Limits } from './results'

export type LatLng = {
  id: string,
  lat: number,
  lng: number
}

export type Turbine = {
  position: LatLng,
  callbacks: {
    [key: string]: Function 
  }
}

export type Boundary = {
  positions: LatLng[]
}

export type Turbines = {
  positions: Turbine[],
  callbacks: {
    [key: string]: Function 
  }
}

export type Map = {
  center: LatLng,
  boundary: Boundary,
  turbines: Turbines,
  style: object,
  callbacks: {
    [key: string]: Function 
  }
}

export type Farm = {
  // Converted from /assets/schema.json using https://transform.tools/json-to-proptypes
  id: string,
  model: Model,
  results: Results,
  tooltip: boolean,
  environment: boolean,
  colorscale: {
    visible: boolean,
    limits: Limits,
  },
  colorscale_clicked: boolean,
  map: Map,
  show_map: boolean,
  stats: false
}