
// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

// let beat = new Audio('assets/Forest-Sounds.mp3');
// window.addEventListener('keypress',function(){
//   // Play the beat
// beat.play();
// beat.loop(true);
// });



import * as THREE from 'three';

// Import add-ons
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

const app = document.getElementById('app');
let scene;
let renderer;
let camera;
let controls;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let aspect = windowWidth / windowHeight;
const nearPlane = 1;
const farPlane = 1000;
const dpr = window.devicePixelRatio;
let plane;
let room;

// ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~

function init() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, aspect, nearPlane, farPlane);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(windowWidth, windowHeight);
    renderer.setPixelRatio(dpr);
    app.appendChild(renderer.domElement);

    const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(hemisphereLight);

    // Add a directional light pointing upwards
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, -1, 0); // Set light's position to be below the scene
    scene.add(directionalLight);


    const gltfLoader = new GLTFLoader(); // Loads 3D models
    const textureLoader = new THREE.TextureLoader(); // Loads textures

    // Load an image resource
    textureLoader.load(
        'assets/outside-window-view.jpeg',
        function (texture) {
            const geometry = new THREE.PlaneGeometry(5, 5);
            const material = new THREE.MeshBasicMaterial({ map: texture });
            plane = new THREE.Mesh(geometry, material);
            scene.add(plane);
        },
        undefined,
        function () {
            console.error('An error happened while loading the texture.');
        }
    );

    // Load the bedroom model
    gltfLoader.load('assets/bedroom3.glb', function (gltf) {
        room = gltf.scene;
        scene.add(room);
        centerCameraInRoom();
    });
}


function centerCameraInRoom() {
    const box = new THREE.Box3().setFromObject(room);
    const center = new THREE.Vector3();
    box.getCenter(center);
    camera.position.copy(center);
    camera.position.z += 10; // Move the camera back to view the room
    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.copy(center);
    controls.update();
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    if (plane) {
        plane.position.set(0, 3, 5); // Set the plane position
        plane.rotation.y = 9.5; // Rotate the plane around the y-axis
    }
    render();
}

function resizeWindow() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
}

function render() {
    renderer.render(scene, camera);
}

function cleanup() {
    if (controls) controls.dispose();
    window.removeEventListener('resize', resizeWindow);
}

window.onload = function () {
    init();
    window.addEventListener('resize', resizeWindow);
    animate();
};

window.onunload = cleanup;







