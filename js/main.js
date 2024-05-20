
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
let plane2;
let room;
let plant;
let teddybear;
let bookpile;
let moogle;
let longcat;
let textures = [];
let textures2 = [];
const texturePaths = [
    'assets/outside-window-view.jpeg',
    'assets/window-view-cartoon.jpeg',
    'assets/window-night-view.jpeg'
];

const texturePathsComp = [
    'assets/screensaver1.jpeg',
    'assets/screensaver2.jpeg',
    'assets/screensaver3.jpeg',
    'assets/screensaver4.jpeg'
];

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

    // Preload textures for window
    texturePaths.forEach(path => {
        textureLoader.load(path, texture => {
            textures.push(texture);
            if (textures.length === texturePaths.length) {
                createPlane();
            }
        });
    });

    // Preload textures for computer
    texturePathsComp.forEach(path => {
        textureLoader.load(path, texture => {
            textures2.push(texture);
            if (textures2.length === texturePathsComp.length) {
                createPlane2();
            }
        });
    });

    //load longcat
    gltfLoader.load('assets/longcat.glb', function (gltf) {
        longcat = gltf.scene;
        scene.add(longcat);
        longcat.scale.set(1, 1, 1); 
    
    });

    //load moogle
    gltfLoader.load('assets/moogle.glb', function (gltf) {
        moogle = gltf.scene;
        scene.add(moogle);
        moogle.scale.set(0.1, 0.1, 0.1); 
        moogle.position.set(-0.8, 1, 3.5);
        moogle.rotation.y = 3;
    });

    //load potted plant
    gltfLoader.load('assets/Potted-plant.glb', function (gltf) {
        plant = gltf.scene;
        scene.add(plant);
        plant.scale.set(0.1, 0.1, 0.1); 
        plant.position.set(3.3, 3.3, 3.5);
    });

    //load teddy bear
    gltfLoader.load('assets/teddybear.glb', function (gltf) {
        teddybear = gltf.scene;
        scene.add(teddybear);
        teddybear.scale.set(0.7, 0.7, 0.7); 
        teddybear.position.set(-3, 1.1, 2);
        teddybear.rotation.y = 2;
    });

    //load book pile
    gltfLoader.load('assets/cups-and-books.glb', function (gltf) {
        bookpile = gltf.scene;
        scene.add(bookpile);
        bookpile.scale.set(0.05, 0.05, 0.05); 
        bookpile.position.set(-2.9, 1.42, -2.4);
    });

    // Load the bedroom
    gltfLoader.load('assets/bedroom3.glb', function (gltf) {
        room = gltf.scene;
        scene.add(room);
        centerCameraInRoom();
    });
}

function createPlane() {
    const geometry = new THREE.PlaneGeometry(5, 5);
    const material = new THREE.MeshBasicMaterial({ map: textures[0] });
    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    setInterval(changeTexture, 60000); // Change texture every 1 minute
}

function changeTexture() {
    if (plane) {
        const randomIndex = Math.floor(Math.random() * textures.length);
        plane.material.map = textures[randomIndex];
        plane.material.needsUpdate = true;
    }
}

function createPlane2() {
    const geometry2 = new THREE.PlaneGeometry(1.1, 0.65);
    const material2 = new THREE.MeshBasicMaterial({ map: textures2[0] });
    plane2 = new THREE.Mesh(geometry2, material2);
    scene.add(plane2);
    setInterval(changeTexture2, 80000); // Change texture every 120 seconds
}

function changeTexture2() {
    if (plane2) {
        const randomIndex = Math.floor(Math.random() * textures2.length);
        plane2.material.map = textures2[randomIndex];
        plane2.material.needsUpdate = true;
    }
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
    // controls.update();
    if (plane) {
        plane.position.set(0, 3, 5); // Set the plane position (lr, ud, fb)
        plane.rotation.y = 9.5; // Rotate the plane around the y-axis
    }
    if (plane2) {
        plane2.position.set(-3.6, 2.02, -1.05); // Set the plane position
        plane2.rotation.y = 1.6; // Rotate the plane around the y-axis
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







