import PropTypes from 'prop-types'

export const Result = PropTypes.shape({
  value: PropTypes.number,
  color: PropTypes.string
})

export const ElementResults = PropTypes.shape({
  id: PropTypes.string,
  target: PropTypes.string,
  results: PropTypes.arrayOf(
    Result
  )
})

export const Results = PropTypes.shape({
  id: PropTypes.string,
  element_results: PropTypes.arrayOf(
    ElementResults
  )
})