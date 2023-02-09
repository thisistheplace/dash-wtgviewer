import {Model} from './model'
import { Results, Limits } from './results'

export type LatLng = {
  id: string,
  lat: number,
  lng: number
}

export type Turbine = {
  position: LatLng,
  callbacks?: {
    [key: string]: Function 
  }
}

export type Boundary = {
  positions: LatLng[]
}

export type Turbines = {
  positions: Turbine[],
  callbacks?: {
    [key: string]: Function 
  }
}

export type Map = {
  center: LatLng,
  boundary: Boundary,
  turbines?: Turbines,
  style?: object,
  callbacks?: {
    [key: string]: Function 
  }
}

export type Farm = {
  /**
   * JSON definition of model. See pydantic model in dash_wtgviewer.Model.
   */
  model?: Model,
  /**
   * JSON definition of results. See pydantic model in dash_wtgviewer.Results.
   */
  results?: Results,
  /**
   * Tooltip visible on mouseover if set to True.
   */
  tooltip?: boolean,
  /**
   * Turbine array, sea and sky visible if set to True.
   */
  environment?: boolean,
  /**
   * Makes colorscale visible and manually sets the results colorscale limits if provided.
   */
  colorscale?: {
    visible: boolean,
    limits: Limits,
  },
  /**
   * Count of number of clicks on colorscale.
   */
  colorscale_clicked?: number,
  /**
   * JSON definition of map data. See pydantic model in dash_wtgviewer.Map.
   */
  map?: Map,
  /**
   * Interactive map overlay visible if set to True.
   */
  show_map?: boolean,
  /**
   * Threejs FPS stats visible if set to True.
   */
  stats?: boolean
}