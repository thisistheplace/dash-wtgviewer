% Auto-generated: do not edit by hand
\name{dashWtgviewer}

\alias{dashWtgviewer}

\title{DashWtgviewer component}

\description{

}

\usage{
dashWtgviewer(id=NULL, colorscale=NULL, colorscale_clicked=NULL,
environment=NULL, map=NULL, model=NULL, results=NULL,
show_map=NULL, stats=NULL, tooltip=NULL)
}

\arguments{
\item{id}{Character. Unique ID to identify this component in Dash callbacks.}

\item{colorscale}{Lists containing elements 'visible', 'limits'.
those elements have the following types:
  - visible (logical; required)
  - limits (required): . limits has the following type: lists containing elements 'min', 'max'.
those elements have the following types:
  - min (numeric; required)
  - max (numeric; required). Makes colorscale visible and manually sets the results colorscale limits if provided.}

\item{colorscale_clicked}{Numeric. Count of number of clicks on colorscale.}

\item{environment}{Logical. Turbine array, sea and sky visible if set to True.}

\item{map}{Lists containing elements 'center', 'boundary', 'turbines', 'style', 'callbacks'.
those elements have the following types:
  - center (required): . center has the following type: lists containing elements 'id', 'lat', 'lng'.
those elements have the following types:
  - id (character; required)
  - lat (numeric; required)
  - lng (numeric; required)
  - boundary (required): . boundary has the following type: lists containing elements 'positions'.
those elements have the following types:
  - positions (required): . positions has the following type: list of lists containing elements 'id', 'lat', 'lng'.
those elements have the following types:
  - id (character; required)
  - lat (numeric; required)
  - lng (numeric; required)s
  - turbines (optional): . turbines has the following type: lists containing elements 'positions', 'callbacks'.
those elements have the following types:
  - positions (required): . positions has the following type: list of lists containing elements 'position', 'callbacks'.
those elements have the following types:
  - position (required): . position has the following type: lists containing elements 'id', 'lat', 'lng'.
those elements have the following types:
  - id (character; required)
  - lat (numeric; required)
  - lng (numeric; required)
  - callbacks (optional): . callbacks has the following type: lists containing elements .
those elements have the following types:
s
  - callbacks (optional): . callbacks has the following type: lists containing elements .
those elements have the following types:

  - style (named list; optional)
  - callbacks (optional): . callbacks has the following type: lists containing elements .
those elements have the following types:
. JSON definition of map data. See pydantic model in dash_wtgviewer.Map.}

\item{model}{Lists containing elements 'name', 'id', 'foundation', 'tower', 'nacelle', 'rotor', 'callbacks', 'position', 'results'.
those elements have the following types:
  - name (character; required)
  - id (character; required)
  - foundation (optional): . foundation has the following type: lists containing elements 'name', 'id', 'element_set'.
those elements have the following types:
  - name (character; required)
  - id (character; required)
  - element_set (required): . element_set has the following type: lists containing elements 'name', 'id', 'elements'.
those elements have the following types:
  - name (character; required)
  - id (character; required)
  - elements (list of a list of or a singular dash component, string or numbers; required)
  - tower (optional): . tower has the following type: lists containing elements 'name', 'id', 'element_set'.
those elements have the following types:
  - name (character; required)
  - id (character; required)
  - element_set (required): . element_set has the following type: lists containing elements 'name', 'id', 'elements'.
those elements have the following types:
  - name (character; required)
  - id (character; required)
  - elements (list of a list of or a singular dash component, string or numbers; required)
  - nacelle (optional): . nacelle has the following type: lists containing elements 'name', 'id', 'element'.
those elements have the following types:
  - name (character; required)
  - id (character; required)
  - element (a list of or a singular dash component, string or number; required)
  - rotor (optional): . rotor has the following type: lists containing elements 'name', 'id', 'blades', 'hub', 'node'.
those elements have the following types:
  - name (character; required)
  - id (character; required)
  - blades (required): . blades has the following type: list of lists containing elements 'name', 'id', 'url', 'scale', 'axis', 'rotation'.
those elements have the following types:
  - name (character; required)
  - id (character; required)
  - url (character; required)
  - scale (required): . scale has the following type: lists containing elements 'x', 'y', 'z'.
those elements have the following types:
  - x (numeric; required)
  - y (numeric; required)
  - z (numeric; required)
  - axis (required): . axis has the following type: lists containing elements 'x', 'y', 'z'.
those elements have the following types:
  - x (numeric; required)
  - y (numeric; required)
  - z (numeric; required)
  - rotation (numeric; required)s
  - hub (required): . hub has the following type: lists containing elements 'name', 'id', 'cone'.
those elements have the following types:
  - name (character; required)
  - id (character; required)
  - cone (required): . cone has the following type: lists containing elements 'id', 'eltype', 'nodes', 'diameter'.
those elements have the following types:
  - id (numeric; required)
  - eltype (character; required)
  - nodes (required): . nodes has the following type: list of lists containing elements 'id', 'x', 'y', 'z'.
those elements have the following types:
  - id (numeric; required)
  - x (numeric; required)
  - y (numeric; required)
  - z (numeric; required)s
  - diameter (numeric; required)
  - node (required): . node has the following type: lists containing elements 'id', 'x', 'y', 'z'.
those elements have the following types:
  - id (numeric; required)
  - x (numeric; required)
  - y (numeric; required)
  - z (numeric; required)
  - callbacks (optional): . callbacks has the following type: lists containing elements 'tooltipstyle', 'tooltipcontents'.
those elements have the following types:
  - tooltipstyle (required)
  - tooltipcontents (required)
  - position (optional): . position has the following type: lists containing elements 'x', 'y', 'z', 'isvector3', 'set', 'setscalar', 'setx', 'sety', 'setz', 'setcomponent', 'getcomponent', 'clone', 'copy', 'add', 'addscalar', 'addscaledvector', 'addvectors', 'sub', 'subscalar', 'subvectors', 'multiply', 'multiplyscalar', 'multiplyvectors', 'applyeuler', 'applyaxisangle', 'applymatrix3', 'applynormalmatrix', 'applymatrix4', 'applyquaternion', 'project', 'unproject', 'transformdirection', 'divide', 'dividescalar', 'min', 'max', 'clamp', 'clampscalar', 'clamplength', 'floor', 'ceil', 'round', 'roundtozero', 'negate', 'dot', 'lengthsq', 'length', 'lengthmanhattan', 'manhattanlength', 'manhattandistanceto', 'normalize', 'setlength', 'lerp', 'lerpvectors', 'cross', 'crossvectors', 'projectonvector', 'projectonplane', 'reflect', 'angleto', 'distanceto', 'distancetosquared', 'distancetomanhattan', 'setfromspherical', 'setfromsphericalcoords', 'setfromcylindrical', 'setfromcylindricalcoords', 'setfrommatrixposition', 'setfrommatrixscale', 'setfrommatrixcolumn', 'setfrommatrix3column', 'setfromeuler', 'equals', 'fromarray', 'toarray', 'frombufferattribute', 'random', 'randomdirection'.
those elements have the following types:
  - x (numeric; required)
  - y (numeric; required)
  - z (numeric; required)
  - isvector3 (required): . isvector3 has the following type: lists containing elements 'valueof'.
those elements have the following types:
  - valueof (optional): returns the primitive value of the specified object.
  - set (required): sets value of this vector.
  - setscalar (required): sets all values of this vector.
  - setx (required): sets x value of this vector.
  - sety (required): sets y value of this vector.
  - setz (required): sets z value of this vector.
  - setcomponent (required)
  - getcomponent (required)
  - clone (required): clones this vector.
  - copy (required): copies value of v to this vector.
  - add (required): adds v to this vector.
  - addscalar (required)
  - addscaledvector (required)
  - addvectors (required): sets this vector to a + b.
  - sub (required): subtracts v from this vector.
  - subscalar (required)
  - subvectors (required): sets this vector to a - b.
  - multiply (required)
  - multiplyscalar (required): multiplies this vector by scalar s.
  - multiplyvectors (required)
  - applyeuler (required)
  - applyaxisangle (required)
  - applymatrix3 (required)
  - applynormalmatrix (required)
  - applymatrix4 (required)
  - applyquaternion (required)
  - project (required)
  - unproject (required)
  - transformdirection (required)
  - divide (required)
  - dividescalar (required): divides this vector by scalar s.
set vector to ( 0, 0, 0 ) if s == 0.
  - min (required)
  - max (required)
  - clamp (required)
  - clampscalar (required)
  - clamplength (required)
  - floor (required)
  - ceil (required)
  - round (required)
  - roundtozero (required)
  - negate (required): inverts this vector.
  - dot (required): computes dot product of this vector and v.
  - lengthsq (required): computes squared length of this vector.
  - length (required): computes length of this vector.
  - lengthmanhattan (required): computes manhattan length of this vector.
http://en.wikipedia.org/wiki/taxicab_geometry
@,deprecated,use ,{@link ,vector3#manhattanlength .manhattanlength(),}, instead.
  - manhattanlength (required): computes the manhattan length of this vector.

see 
{@link 
http://en.wikipedia.org/wiki/taxicab_geometry|wikipedia: taxicab geometry
}
  - manhattandistanceto (required): computes the manhattan length (distance) from this vector to the given vector v

see 
{@link 
http://en.wikipedia.org/wiki/taxicab_geometry|wikipedia: taxicab geometry
}
  - normalize (required): normalizes this vector.
  - setlength (required): normalizes this vector and multiplies it by l.
  - lerp (required)
  - lerpvectors (required)
  - cross (required): sets this vector to cross product of itself and v.
  - crossvectors (required): sets this vector to cross product of a and b.
  - projectonvector (required)
  - projectonplane (required)
  - reflect (required)
  - angleto (required)
  - distanceto (required): computes distance of this vector to v.
  - distancetosquared (required): computes squared distance of this vector to v.
  - distancetomanhattan (required)
  - setfromspherical (required)
  - setfromsphericalcoords (required)
  - setfromcylindrical (required)
  - setfromcylindricalcoords (required)
  - setfrommatrixposition (required)
  - setfrommatrixscale (required)
  - setfrommatrixcolumn (required)
  - setfrommatrix3column (required)
  - setfromeuler (required): sets this vector's 
{@link 
x 
}
, 
{@link 
y 
}
 and 
{@link 
z 
}
 components from the x, y, and z components of the specified 
{@link 
euler euler angle
}
.
  - equals (required): checks for strict equality of this vector and v.
  - fromarray (required): sets this vector's x, y and z value from the provided array or array-like.
@,param,array, ,the source array or array-like.
@,param,offset, ,(optional) offset into the array. default is 0.
  - toarray (unnamed list; required): returns an array [x, y, z], or copies x, y and z into the provided array.


copies x, y and z into the provided array-like.
@,param,array, ,(optional) array to store the vector to. if this is not provided, a new array will be created.
@,param,offset, ,(optional) optional offset into the array.
@,return,the created or provided array.
@,param,array, ,array-like to store the vector to.
@,param,offset, ,(optional) optional offset into the array-like.
@,return,the provided array-like.
  - frombufferattribute (required)
  - random (required): sets this vector's x, y and z from math.random
  - randomdirection (required)
  - results (optional): . results has the following type: lists containing elements 'id', 'element_results', 'limits'.
those elements have the following types:
  - id (character; required)
  - element_results (required): . element_results has the following type: list of lists containing elements 'id', 'target', 'results'.
those elements have the following types:
  - id (character; required)
  - target (character; required)
  - results (required): . results has the following type: list of lists containing elements 'value', 'color'.
those elements have the following types:
  - value (numeric; required)
  - color (character; required)ss
  - limits (optional): . limits has the following type: lists containing elements 'min', 'max'.
those elements have the following types:
  - min (numeric; required)
  - max (numeric; required). JSON definition of model. See pydantic model in dash_wtgviewer.Model.}

\item{results}{Lists containing elements 'id', 'element_results', 'limits'.
those elements have the following types:
  - id (character; required)
  - element_results (required): . element_results has the following type: list of lists containing elements 'id', 'target', 'results'.
those elements have the following types:
  - id (character; required)
  - target (character; required)
  - results (required): . results has the following type: list of lists containing elements 'value', 'color'.
those elements have the following types:
  - value (numeric; required)
  - color (character; required)ss
  - limits (optional): . limits has the following type: lists containing elements 'min', 'max'.
those elements have the following types:
  - min (numeric; required)
  - max (numeric; required). JSON definition of results. See pydantic model in dash_wtgviewer.Results.}

\item{show_map}{Logical. Interactive map overlay visible if set to True.}

\item{stats}{Logical. Threejs FPS stats visible if set to True.}

\item{tooltip}{Logical. Tooltip visible on mouseover if set to True.}
}

\value{named list of JSON elements corresponding to React.js properties and their values}

