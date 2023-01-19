import PropTypes from 'prop-types'
import {Model} from './model'

export const LatLng = PropTypes.shape({
  id: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
})

export const Turbine = PropTypes.shape({
  position: LatLng,
  callbacks: PropTypes.object
})

export const Boundary = PropTypes.shape({
  positions: PropTypes.arrayOf(LatLng)
})

export const Turbines = PropTypes.shape({
  positions: PropTypes.arrayOf(Turbine)
})

export const Map = PropTypes.shape({
  center: LatLng.isRequired,
  boundary: Boundary,
  turbines: Turbines
})

export const Farm = PropTypes.shape({
  // Converted from /assets/schema.json using https://transform.tools/json-to-proptypes
  id: PropTypes.string.isRequired,
  model: Model.isRequired,
  tooltip: PropTypes.bool,
  sea: PropTypes.bool,
  map: Map,
  show_map: PropTypes.bool.isRequired
})