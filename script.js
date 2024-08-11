import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui'; // Исправленный импорт
import { Loader } from 'three/src/loaders/Loader.js';

// Debug
const gui = new dat.GUI(); // Создание экземпляра


// Loaders
const loader = new THREE.TextureLoader()

// Textures
const texture = loader.load("static/texture.jpg")
const height = loader.load("texture.jpg")
const alpha = loader.load("texture.jpg")

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();


// Objects
const geometry = new THREE.PlaneGeometry(3, 3, 16, 16);
const material = new THREE.MeshBasicMaterial({
  color: 'gray',
  map: texture,
  side: THREE.DoubleSide, // Устанавливаем рендеринг с обеих сторон
});

const plane = new THREE.Mesh(geometry, material);
scene.add(plane);
plane.rotation.x = 181; // Исправлено на Math.PI для более корректного поворота

// Lights
const pointLight = new THREE.PointLight(0xffffff, 2);
pointLight.position.set(2, 3, 4);
scene.add(pointLight);

// Edit Color
const col = { color: '#D9D9D9' };

// UI
// Plane rotation
gui.add(plane.rotation, 'x').min(0).max(10);

// Light position
gui.add(pointLight.position, 'x').name('Light X').min(-10).max(10).step(0.1);
gui.add(pointLight.position, 'y').name('Light Y').min(-10).max(10).step(0.1);
gui.add(pointLight.position, 'z').name('Light Z').min(-10).max(10).step(0.1);

// Color changer
gui.addColor(col, 'color').name('Light Color').onChange(() => {
  pointLight.color.set(col.color);
});

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 0, 3);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  // sphere.rotation.y = .5 * elapsedTime; // Не используете сферу

  // Update Orbital Controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
