import PropTypes from 'prop-types'
import {Model} from './model'

export const LatLng = PropTypes.shape({
  id: PropTypes.string.isRequired,
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
})

export const Boundary = PropTypes.shape({
  positions: PropTypes.arrayOf(LatLng)
})

export const Turbines = PropTypes.arrayOf({
  positions: PropTypes.arrayOf(LatLng)
})

export const Map = PropTypes.shape({
  visible: PropTypes.bool.isRequired,
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
  map: Map
})