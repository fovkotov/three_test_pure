import * as THREE from 'three'
import gsap from 'gsap'

// let counter = 0;
// let  increaser = () => {
//   counter = counter +1;
//   window.requestAnimationFrame(tick);
// }

// sizes 
const sizes = {
  width: 800,
  height: 600
};

//scene
const scene = new THREE.Scene();

//camera
const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 12;


//render
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//material and geo
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xFFFFFF } );

//mesh 1
const cube = new THREE.Mesh( geometry, material );
cube.position.x = 1 ;
cube.position.z = 2 ;
// cube.scale.set(.1,1,.2)
scene.add( cube );

//clock
const clock = new THREE.Clock()

//animation
const tick = () => 
{

    const elapsedTime = clock.getElapsedTime();

    camera.position.y = Math.sin(elapsedTime) * 4;
    camera.position.x = Math.cos(elapsedTime) * 4;

    camera.lookAt(cube.position)

    renderer.render( scene, camera );

}

window.requestAnimationFrame(tick);


//animation
function animate() {
  requestAnimationFrame ( animate)

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;


  renderer.render( scene, camera );

    // Look at
    camera.lookAt(cube3.position)

}
animate();