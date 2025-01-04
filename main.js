import * as THREE from 'three';
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,
  window.innerWidth / window.innerHeight,
  0.1,
  100);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add resize event listener
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Icosahedron geometry
const geometry = new THREE.IcosahedronGeometry(2, 50,50);

const material = new THREE.ShaderMaterial({
  
vertexShader,
fragmentShader,
  wireframe: true, // Uncomment to show wireframe representation of the icosahedron
  uniforms: {
    uTime: {  value: 0 },
  },
});

// Create mesh
const icosahedron = new THREE.Mesh(geometry, material);
icosahedron.position.y =-2.5;
scene.add(icosahedron);

// Camera position
camera.position.z = 3;

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
// controls.dampingFactor = 0.25;
// controls.screenSpacePanning = false;
// controls.maxPolarAngle = Math.PI / 2;

const clock = new THREE.Clock();

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  // controls.update(); // only if controls.enableDamping = true
  // icosahedron.rotation.x += 0.01;
  material.uniforms.uTime.value= clock.getElapsedTime();
  renderer.render(scene, camera);
}


animate();
