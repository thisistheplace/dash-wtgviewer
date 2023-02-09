# AUTO GENERATED FILE - DO NOT EDIT

export dashwtgviewer

"""
    dashwtgviewer(;kwargs...)

A DashWtgviewer component.

Keyword arguments:
- `id` (String; optional): Unique ID to identify this component in Dash callbacks.
- `colorscale` (optional): Makes colorscale visible and manually sets the results colorscale limits if provided.. colorscale has the following type: lists containing elements 'visible', 'limits'.
Those elements have the following types:
  - `visible` (Bool; required)
  - `limits` (required): . limits has the following type: lists containing elements 'min', 'max'.
Those elements have the following types:
  - `min` (Real; required)
  - `max` (Real; required)
- `colorscale_clicked` (Real; optional): Count of number of clicks on colorscale.
- `environment` (Bool; optional): Turbine array, sea and sky visible if set to True.
- `map` (optional): JSON definition of map data. See pydantic model in dash_wtgviewer.Map.. map has the following type: lists containing elements 'center', 'boundary', 'turbines', 'style', 'callbacks'.
Those elements have the following types:
  - `center` (required): . center has the following type: lists containing elements 'id', 'lat', 'lng'.
Those elements have the following types:
  - `id` (String; required)
  - `lat` (Real; required)
  - `lng` (Real; required)
  - `boundary` (required): . boundary has the following type: lists containing elements 'positions'.
Those elements have the following types:
  - `positions` (required): . positions has the following type: Array of lists containing elements 'id', 'lat', 'lng'.
Those elements have the following types:
  - `id` (String; required)
  - `lat` (Real; required)
  - `lng` (Real; required)s
  - `turbines` (optional): . turbines has the following type: lists containing elements 'positions', 'callbacks'.
Those elements have the following types:
  - `positions` (required): . positions has the following type: Array of lists containing elements 'position', 'callbacks'.
Those elements have the following types:
  - `position` (required): . position has the following type: lists containing elements 'id', 'lat', 'lng'.
Those elements have the following types:
  - `id` (String; required)
  - `lat` (Real; required)
  - `lng` (Real; required)
  - `callbacks` (optional): . callbacks has the following type: lists containing elements .
Those elements have the following types:
s
  - `callbacks` (optional): . callbacks has the following type: lists containing elements .
Those elements have the following types:

  - `style` (Dict; optional)
  - `callbacks` (optional): . callbacks has the following type: lists containing elements .
Those elements have the following types:

- `model` (optional): JSON definition of model. See pydantic model in dash_wtgviewer.Model.. model has the following type: lists containing elements 'name', 'id', 'foundation', 'tower', 'nacelle', 'rotor', 'callbacks', 'position', 'results'.
Those elements have the following types:
  - `name` (String; required)
  - `id` (String; required)
  - `foundation` (optional): . foundation has the following type: lists containing elements 'name', 'id', 'element_set'.
Those elements have the following types:
  - `name` (String; required)
  - `id` (String; required)
  - `element_set` (required): . element_set has the following type: lists containing elements 'name', 'id', 'elements'.
Those elements have the following types:
  - `name` (String; required)
  - `id` (String; required)
  - `elements` (Array of a list of or a singular dash component, string or numbers; required)
  - `tower` (optional): . tower has the following type: lists containing elements 'name', 'id', 'element_set'.
Those elements have the following types:
  - `name` (String; required)
  - `id` (String; required)
  - `element_set` (required): . element_set has the following type: lists containing elements 'name', 'id', 'elements'.
Those elements have the following types:
  - `name` (String; required)
  - `id` (String; required)
  - `elements` (Array of a list of or a singular dash component, string or numbers; required)
  - `nacelle` (optional): . nacelle has the following type: lists containing elements 'name', 'id', 'element'.
Those elements have the following types:
  - `name` (String; required)
  - `id` (String; required)
  - `element` (a list of or a singular dash component, string or number; required)
  - `rotor` (optional): . rotor has the following type: lists containing elements 'name', 'id', 'blades', 'hub', 'node'.
Those elements have the following types:
  - `name` (String; required)
  - `id` (String; required)
  - `blades` (required): . blades has the following type: Array of lists containing elements 'name', 'id', 'url', 'scale', 'axis', 'rotation'.
Those elements have the following types:
  - `name` (String; required)
  - `id` (String; required)
  - `url` (String; required)
  - `scale` (required): . scale has the following type: lists containing elements 'x', 'y', 'z'.
Those elements have the following types:
  - `x` (Real; required)
  - `y` (Real; required)
  - `z` (Real; required)
  - `axis` (required): . axis has the following type: lists containing elements 'x', 'y', 'z'.
Those elements have the following types:
  - `x` (Real; required)
  - `y` (Real; required)
  - `z` (Real; required)
  - `rotation` (Real; required)s
  - `hub` (required): . hub has the following type: lists containing elements 'name', 'id', 'cone'.
Those elements have the following types:
  - `name` (String; required)
  - `id` (String; required)
  - `cone` (required): . cone has the following type: lists containing elements 'id', 'eltype', 'nodes', 'diameter'.
Those elements have the following types:
  - `id` (Real; required)
  - `eltype` (String; required)
  - `nodes` (required): . nodes has the following type: Array of lists containing elements 'id', 'x', 'y', 'z'.
Those elements have the following types:
  - `id` (Real; required)
  - `x` (Real; required)
  - `y` (Real; required)
  - `z` (Real; required)s
  - `diameter` (Real; required)
  - `node` (required): . node has the following type: lists containing elements 'id', 'x', 'y', 'z'.
Those elements have the following types:
  - `id` (Real; required)
  - `x` (Real; required)
  - `y` (Real; required)
  - `z` (Real; required)
  - `callbacks` (optional): . callbacks has the following type: lists containing elements 'tooltipStyle', 'tooltipContents'.
Those elements have the following types:
  - `tooltipStyle` (required)
  - `tooltipContents` (required)
  - `position` (optional): . position has the following type: lists containing elements 'x', 'y', 'z', 'isVector3', 'set', 'setScalar', 'setX', 'setY', 'setZ', 'setComponent', 'getComponent', 'clone', 'copy', 'add', 'addScalar', 'addScaledVector', 'addVectors', 'sub', 'subScalar', 'subVectors', 'multiply', 'multiplyScalar', 'multiplyVectors', 'applyEuler', 'applyAxisAngle', 'applyMatrix3', 'applyNormalMatrix', 'applyMatrix4', 'applyQuaternion', 'project', 'unproject', 'transformDirection', 'divide', 'divideScalar', 'min', 'max', 'clamp', 'clampScalar', 'clampLength', 'floor', 'ceil', 'round', 'roundToZero', 'negate', 'dot', 'lengthSq', 'length', 'lengthManhattan', 'manhattanLength', 'manhattanDistanceTo', 'normalize', 'setLength', 'lerp', 'lerpVectors', 'cross', 'crossVectors', 'projectOnVector', 'projectOnPlane', 'reflect', 'angleTo', 'distanceTo', 'distanceToSquared', 'distanceToManhattan', 'setFromSpherical', 'setFromSphericalCoords', 'setFromCylindrical', 'setFromCylindricalCoords', 'setFromMatrixPosition', 'setFromMatrixScale', 'setFromMatrixColumn', 'setFromMatrix3Column', 'setFromEuler', 'equals', 'fromArray', 'toArray', 'fromBufferAttribute', 'random', 'randomDirection'.
Those elements have the following types:
  - `x` (Real; required)
  - `y` (Real; required)
  - `z` (Real; required)
  - `isVector3` (required): . isVector3 has the following type: lists containing elements 'valueOf'.
Those elements have the following types:
  - `valueOf` (optional): Returns the primitive value of the specified object.
  - `set` (required): Sets value of this vector.
  - `setScalar` (required): Sets all values of this vector.
  - `setX` (required): Sets x value of this vector.
  - `setY` (required): Sets y value of this vector.
  - `setZ` (required): Sets z value of this vector.
  - `setComponent` (required)
  - `getComponent` (required)
  - `clone` (required): Clones this vector.
  - `copy` (required): Copies value of v to this vector.
  - `add` (required): Adds v to this vector.
  - `addScalar` (required)
  - `addScaledVector` (required)
  - `addVectors` (required): Sets this vector to a + b.
  - `sub` (required): Subtracts v from this vector.
  - `subScalar` (required)
  - `subVectors` (required): Sets this vector to a - b.
  - `multiply` (required)
  - `multiplyScalar` (required): Multiplies this vector by scalar s.
  - `multiplyVectors` (required)
  - `applyEuler` (required)
  - `applyAxisAngle` (required)
  - `applyMatrix3` (required)
  - `applyNormalMatrix` (required)
  - `applyMatrix4` (required)
  - `applyQuaternion` (required)
  - `project` (required)
  - `unproject` (required)
  - `transformDirection` (required)
  - `divide` (required)
  - `divideScalar` (required): Divides this vector by scalar s.
Set vector to ( 0, 0, 0 ) if s == 0.
  - `min` (required)
  - `max` (required)
  - `clamp` (required)
  - `clampScalar` (required)
  - `clampLength` (required)
  - `floor` (required)
  - `ceil` (required)
  - `round` (required)
  - `roundToZero` (required)
  - `negate` (required): Inverts this vector.
  - `dot` (required): Computes dot product of this vector and v.
  - `lengthSq` (required): Computes squared length of this vector.
  - `length` (required): Computes length of this vector.
  - `lengthManhattan` (required): Computes Manhattan length of this vector.
http://en.wikipedia.org/wiki/Taxicab_geometry
@,deprecated,Use ,{@link ,Vector3#manhattanLength .manhattanLength(),}, instead.
  - `manhattanLength` (required): Computes the Manhattan length of this vector.

see 
{@link 
http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry
}
  - `manhattanDistanceTo` (required): Computes the Manhattan length (distance) from this vector to the given vector v

see 
{@link 
http://en.wikipedia.org/wiki/Taxicab_geometry|Wikipedia: Taxicab Geometry
}
  - `normalize` (required): Normalizes this vector.
  - `setLength` (required): Normalizes this vector and multiplies it by l.
  - `lerp` (required)
  - `lerpVectors` (required)
  - `cross` (required): Sets this vector to cross product of itself and v.
  - `crossVectors` (required): Sets this vector to cross product of a and b.
  - `projectOnVector` (required)
  - `projectOnPlane` (required)
  - `reflect` (required)
  - `angleTo` (required)
  - `distanceTo` (required): Computes distance of this vector to v.
  - `distanceToSquared` (required): Computes squared distance of this vector to v.
  - `distanceToManhattan` (required)
  - `setFromSpherical` (required)
  - `setFromSphericalCoords` (required)
  - `setFromCylindrical` (required)
  - `setFromCylindricalCoords` (required)
  - `setFromMatrixPosition` (required)
  - `setFromMatrixScale` (required)
  - `setFromMatrixColumn` (required)
  - `setFromMatrix3Column` (required)
  - `setFromEuler` (required): Sets this vector's 
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
Euler Euler Angle
}
.
  - `equals` (required): Checks for strict equality of this vector and v.
  - `fromArray` (required): Sets this vector's x, y and z value from the provided array or array-like.
@,param,array, ,the source array or array-like.
@,param,offset, ,(optional) offset into the array. Default is 0.
  - `toArray` (Array; required): Returns an array [x, y, z], or copies x, y and z into the provided array.


Copies x, y and z into the provided array-like.
@,param,array, ,(optional) array to store the vector to. If this is not provided, a new array will be created.
@,param,offset, ,(optional) optional offset into the array.
@,return,The created or provided array.
@,param,array, ,array-like to store the vector to.
@,param,offset, ,(optional) optional offset into the array-like.
@,return,The provided array-like.
  - `fromBufferAttribute` (required)
  - `random` (required): Sets this vector's x, y and z from Math.random
  - `randomDirection` (required)
  - `results` (optional): . results has the following type: lists containing elements 'id', 'element_results', 'limits'.
Those elements have the following types:
  - `id` (String; required)
  - `element_results` (required): . element_results has the following type: Array of lists containing elements 'id', 'target', 'results'.
Those elements have the following types:
  - `id` (String; required)
  - `target` (String; required)
  - `results` (required): . results has the following type: Array of lists containing elements 'value', 'color'.
Those elements have the following types:
  - `value` (Real; required)
  - `color` (String; required)ss
  - `limits` (optional): . limits has the following type: lists containing elements 'min', 'max'.
Those elements have the following types:
  - `min` (Real; required)
  - `max` (Real; required)
- `results` (optional): JSON definition of results. See pydantic model in dash_wtgviewer.Results.. results has the following type: lists containing elements 'id', 'element_results', 'limits'.
Those elements have the following types:
  - `id` (String; required)
  - `element_results` (required): . element_results has the following type: Array of lists containing elements 'id', 'target', 'results'.
Those elements have the following types:
  - `id` (String; required)
  - `target` (String; required)
  - `results` (required): . results has the following type: Array of lists containing elements 'value', 'color'.
Those elements have the following types:
  - `value` (Real; required)
  - `color` (String; required)ss
  - `limits` (optional): . limits has the following type: lists containing elements 'min', 'max'.
Those elements have the following types:
  - `min` (Real; required)
  - `max` (Real; required)
- `show_map` (Bool; optional): Interactive map overlay visible if set to True.
- `stats` (Bool; optional): Threejs FPS stats visible if set to True.
- `tooltip` (Bool; optional): Tooltip visible on mouseover if set to True.
"""
function dashwtgviewer(; kwargs...)
        available_props = Symbol[:id, :colorscale, :colorscale_clicked, :environment, :map, :model, :results, :show_map, :stats, :tooltip]
        wild_props = Symbol[]
        return Component("dashwtgviewer", "DashWtgviewer", "dash_wtgviewer", available_props, wild_props; kwargs...)
end

