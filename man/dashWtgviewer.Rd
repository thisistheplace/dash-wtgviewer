% Auto-generated: do not edit by hand
\name{dashWtgviewer}

\alias{dashWtgviewer}

\title{DashWtgviewer component}

\description{

}

\usage{
dashWtgviewer(id=NULL, model=NULL)
}

\arguments{
\item{id}{Character. }

\item{model}{Lists containing elements 'name', 'id', 'foundation', 'tower', 'nacelle', 'hub', 'blades'.
those elements have the following types:
  - name (character; optional)
  - id (character; optional)
  - foundation (optional): . foundation has the following type: lists containing elements 'name', 'id', 'node_sets', 'element_sets'.
those elements have the following types:
  - name (character; optional)
  - id (character; optional)
  - node_sets (optional): . node_sets has the following type: list of lists containing elements 'name', 'id', 'nodes'.
those elements have the following types:
  - name (character; optional)
  - id (character; optional)
  - nodes (optional): . nodes has the following type: list of lists containing elements 'id', 'x', 'y', 'z'.
those elements have the following types:
  - id (numeric; optional)
  - x (numeric; optional)
  - y (numeric; optional)
  - z (numeric; optional)ss
  - element_sets (optional): . element_sets has the following type: list of lists containing elements 'name', 'id', 'elements'.
those elements have the following types:
  - name (character; optional)
  - id (character; optional)
  - elements (optional): . elements has the following type: list of lists containing elements 'id', 'eltype', 'nodes', 'diameter', 'thickness'.
those elements have the following types:
  - id (numeric; optional)
  - eltype (character; optional)
  - nodes (optional): . nodes has the following type: list of lists containing elements 'id', 'x', 'y', 'z'.
those elements have the following types:
  - id (numeric; optional)
  - x (numeric; optional)
  - y (numeric; optional)
  - z (numeric; optional)s
  - diameter (numeric; optional)
  - thickness (numeric; optional)ss
  - tower (optional): . tower has the following type: lists containing elements 'name', 'id', 'node_sets', 'element_sets'.
those elements have the following types:
  - name (character; optional)
  - id (character; optional)
  - node_sets (optional): . node_sets has the following type: list of lists containing elements 'name', 'id', 'nodes'.
those elements have the following types:
  - name (character; optional)
  - id (character; optional)
  - nodes (optional): . nodes has the following type: list of lists containing elements 'id', 'x', 'y', 'z'.
those elements have the following types:
  - id (numeric; optional)
  - x (numeric; optional)
  - y (numeric; optional)
  - z (numeric; optional)ss
  - element_sets (optional): . element_sets has the following type: list of lists containing elements 'name', 'id', 'elements'.
those elements have the following types:
  - name (character; optional)
  - id (character; optional)
  - elements (optional): . elements has the following type: list of lists containing elements 'id', 'eltype', 'nodes', 'diameters', 'thicknesses'.
those elements have the following types:
  - id (numeric; optional)
  - eltype (character; optional)
  - nodes (optional): . nodes has the following type: list of lists containing elements 'id', 'x', 'y', 'z'.
those elements have the following types:
  - id (numeric; optional)
  - x (numeric; optional)
  - y (numeric; optional)
  - z (numeric; optional)s
  - diameters (list of numerics; optional)
  - thicknesses (list of numerics; optional)ss
  - nacelle (optional): . nacelle has the following type: lists containing elements 'name', 'id', 'element_sets'.
those elements have the following types:
  - name (character; optional)
  - id (character; optional)
  - element_sets (optional): . element_sets has the following type: list of lists containing elements 'name', 'id', 'elements'.
those elements have the following types:
  - name (character; optional)
  - id (character; optional)
  - elements (optional): . elements has the following type: list of lists containing elements 'id', 'eltype', 'nodes', 'width', 'height'.
those elements have the following types:
  - id (numeric; optional)
  - eltype (character; optional)
  - nodes (optional): . nodes has the following type: list of lists containing elements 'id', 'x', 'y', 'z'.
those elements have the following types:
  - id (numeric; optional)
  - x (numeric; optional)
  - y (numeric; optional)
  - z (numeric; optional)s
  - width (numeric; optional)
  - height (numeric; optional)ss
  - hub (optional): . hub has the following type: lists containing elements 'name', 'id', 'cone'.
those elements have the following types:
  - name (character; optional)
  - id (character; optional)
  - cone (optional): . cone has the following type: lists containing elements 'id', 'eltype', 'nodes', 'diameter'.
those elements have the following types:
  - id (numeric; optional)
  - eltype (character; optional)
  - nodes (optional): . nodes has the following type: list of lists containing elements 'id', 'x', 'y', 'z'.
those elements have the following types:
  - id (numeric; optional)
  - x (numeric; optional)
  - y (numeric; optional)
  - z (numeric; optional)s
  - diameter (numeric; optional)
  - blades (optional): . blades has the following type: list of lists containing elements 'name', 'id', 'url', 'node'.
those elements have the following types:
  - name (character; optional)
  - id (character; optional)
  - url (character; optional)
  - node (optional): . node has the following type: lists containing elements 'id', 'x', 'y', 'z'.
those elements have the following types:
  - id (numeric; optional)
  - x (numeric; optional)
  - y (numeric; optional)
  - z (numeric; optional)s. }
}

\value{named list of JSON elements corresponding to React.js properties and their values}

