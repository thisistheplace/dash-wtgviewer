import React from 'react';
import * as THREE from 'three';
import {Cylinder, MakeCylinder} from './../model/cylinder.js';
import {Cuboid} from './../model/cuboid.js';
import {Blades} from './../model/blades.js';

// function to build model
function ModelBuilder(parent, tubulars, boxes, rotor_diameter, num_blades){
  const components = []
  // loop through tubular components
  for (var i=0; i < tubulars.length; i++){
    var mem = tubulars[i]
    // extract data
    const pnt1 = new THREE.Vector3(mem.node1[0], mem.node1[1], mem.node1[2])
    const pnt2 = new THREE.Vector3(mem.node2[0], mem.node2[1], mem.node2[2])
    // Calculate geometry
    const cdata = MakeCylinder(pnt1, pnt2)
    // Generate DOM
    var thiscmpt = <Cylinder len={cdata[0]} pos={cdata[1]} orient={cdata[2]} radius1={mem.radius1} radius2={mem.radius2} cmpt_id={mem.number} cmpt_str={mem.cmpt_str} parent={parent}/>
    components.push(thiscmpt)
  }
  // loop through nacelle components
  for (var i=0; i < boxes.length; i++){
    var mem = boxes[i]
    var thiscmpt = <Cuboid width={mem.width} height={mem.height} length={mem.length} node={mem.node} cmpt_id={mem.number} cmpt_str={mem.cmpt_str} parent={parent}/>
    components.push(thiscmpt)
  }
  // create blade vectors
  const blade_data = []
  const blade_length = rotor_diameter / 2
  for (var i=0; i < num_blades; i++){
    // create start and endpoints of blade
    const pnt1 = new THREE.Vector3(0., 0., 0.)
    const pnt2 = new THREE.Vector3(blade_length * Math.sin(i * 2 * Math.PI / num_blades), 0., blade_length * Math.cos(i * 2 * Math.PI / num_blades))
    // make blades
    const cdata = MakeCylinder(pnt1, pnt2)
    blade_data.push(cdata)
  }

  // Make blade group (get blade position from box node)
  const rotor_pos = []
  rotor_pos[0] = boxes[0].node[0]
  rotor_pos[1] = - 2 + boxes[0].length / 2
  rotor_pos[2] = boxes[0].node[2]
  var blade_group = <Blades data={blade_data} pos={rotor_pos} radius1={0.05} radius2={1.0} num_blades={num_blades} parent={parent}/>
  components.push(blade_group)

  return components

};

export default ModelBuilder;