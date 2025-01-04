import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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
const geometry = new THREE.IcosahedronGeometry(2.5, 20, 20);

// Shader material
const vertexShader = `
    void main() {
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    void main() {
        gl_FragColor = vec4(1.0, 0.5, 0.0, 1.0); // Orange color
    }
`;

const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  wireframe: true, // Uncomment to show wireframe representation of the icosahedron
});

// Create mesh
const icosahedron = new THREE.Mesh(geometry, material);
icosahedron.position.y =-2.9;
scene.add(icosahedron);

// Camera position
camera.position.z =4.5;

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;


// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // only if controls.enableDamping = true
  // icosahedron.rotation.x += 0.01;
  renderer.render(scene, camera);
}


animate();
