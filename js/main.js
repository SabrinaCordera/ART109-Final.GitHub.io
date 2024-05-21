
// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene



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
let plantimg;
let bearimg;
let posterimg;
let room;
let plant;
let ramen;
let dumplings;
let riceballs;
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

const audioloop = [
    'assets/sounds/breathe.mp3',
    'assets/sounds/forget-muffled.mp3',
    'assets/sounds/forget.mp3',
    'assets/sounds/relaxmuscles.mp3',
    'assets/sounds/repeat-muffled.mp3',
    'assets/sounds/repeat.mp3'
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
        longcat.scale.set(5, 5, 5); 
        longcat.rotation.x = 3.2;
        longcat.rotation.y = 2;
        longcat.position.set(1.5, 0.7, 1);
        toggleVisibilityRandomly(longcat); // Call function to toggle visibility
    });

    //load moogle
    gltfLoader.load('assets/moogle.glb', function (gltf) {
        moogle = gltf.scene;
        scene.add(moogle);
        moogle.scale.set(0.1, 0.1, 0.1); 
        moogle.position.set(-0.8, 1, 3.5);
        moogle.rotation.y = 3;
        toggleVisibilityRandomly(moogle); // Call function to toggle visibility
    });

    //load potted plant
    gltfLoader.load('assets/Potted-plant.glb', function (gltf) {
        plant = gltf.scene;
        scene.add(plant);
        plant.scale.set(0.1, 0.1, 0.1); 
        plant.position.set(3.3, 3.3, 3.5);
        toggleVisibilityRandomly(plant); // Call function to toggle visibility
    });

    //load teddy bear
    gltfLoader.load('assets/teddybear.glb', function (gltf) {
        teddybear = gltf.scene;
        scene.add(teddybear);
        teddybear.scale.set(0.7, 0.7, 0.7); 
        teddybear.position.set(-3, 1.1, 2);
        teddybear.rotation.y = 2;
        toggleVisibilityRandomly(teddybear); // Call function to toggle visibility
    });

    //load book pile
    gltfLoader.load('assets/cups-and-books.glb', function (gltf) {
        bookpile = gltf.scene;
        scene.add(bookpile);
        bookpile.scale.set(0.05, 0.05, 0.05); 
        bookpile.position.set(-2.9, 1.42, -2.4);
        toggleVisibilityRandomly(bookpile); // Call function to toggle visibility
    });

    //load riceballs
    gltfLoader.load('assets/riceballs.glb', function (gltf) {
        riceballs = gltf.scene;
        scene.add(riceballs);
        // riceballs.scale.set(0.05, 0.05, 0.05); 
        riceballs.position.set(2, 0.7, -0.2);
        riceballs.rotation.y = 1.5;
        toggleVisibilityRandomly(riceballs); // Call function to toggle visibility
    });

     //load dumplings
     gltfLoader.load('assets/dumplings.glb', function (gltf) {
        dumplings = gltf.scene;
        scene.add(dumplings);
        // dumplings.scale.set(0.05, 0.05, 0.05); 
        dumplings.position.set(1.3, 0.7, 0.5);
        toggleVisibilityRandomly(dumplings); // Call function to toggle visibility
    });

    //load ramen bowl
    gltfLoader.load('assets/ramen-bowl.glb', function (gltf) {
        ramen = gltf.scene;
        scene.add(ramen);
        // ramen.scale.set(0.05, 0.05, 0.05); 
        ramen.position.set(-0.4, 0.7, -1.5);
        toggleVisibilityRandomly(ramen); // Call function to toggle visibility
    });


    // Load the bedroom
    gltfLoader.load('assets/bedroom3.glb', function (gltf) {
        room = gltf.scene;
        scene.add(room);
        centerCameraInRoom();
    });

     // Call functions to create the planes with images
     createPlant();
     createBear();
     createPoster();

      // Add event listener to play sound on button click
    const soundButton = document.getElementById('play-sound-btn');
    soundButton.addEventListener('click', playSound);
}

// Function to toggle visibility randomly
function toggleVisibilityRandomly(object) {
    setInterval(() => {
        object.visible = !object.visible;
    }, Math.random() * 60000 + 3000); // Random interval between 3 seconds and 1 minute
}

// Function to play sounds
function playSound() {
    // Background sound
    const backgroundAudio = new Audio('assets/sounds/Background-sound.mp3');
    backgroundAudio.loop = true;
    backgroundAudio.play();

       // Shuffle the audioloop array
       const shuffledAudioloop = shuffleArray([...audioloop]);

       // Play each sound with a random delay
       shuffledAudioloop.forEach((soundPath, index) => {
           setTimeout(() => {
               const audio = new Audio(soundPath);
               audio.loop = true; // Set the audio to loop
               audio.play();
           }, Math.random() * 60000); // Random delay every 1 minute
       });
   }
   
   // Function to shuffle an array
   function shuffleArray(array) {
       for (let i = array.length - 1; i > 0; i--) {
           const j = Math.floor(Math.random() * (i + 1));
           [array[i], array[j]] = [array[j], array[i]];
       }
       return array;
   }

//images outside the window and the timer to change images
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

//computer images and the timer they change with 
function createPlane2() {
    const geometry2 = new THREE.PlaneGeometry(1.1, 0.65);
    const material2 = new THREE.MeshBasicMaterial({ map: textures2[0] });
    plane2 = new THREE.Mesh(geometry2, material2);
    scene.add(plane2);
    setInterval(changeTexture2, 60000); // Change texture every 1 minute
}

function changeTexture2() {
    if (plane2) {
        const randomIndex = Math.floor(Math.random() * textures2.length);
        plane2.material.map = textures2[randomIndex];
        plane2.material.needsUpdate = true;
    }
}

// Function to create a plane with a potted plant image
function createPlant() {
    const geometry3 = new THREE.PlaneGeometry(1, 1);  // Adjust size as needed
    const textureLoader3 = new THREE.TextureLoader();
    const texture3 = textureLoader3.load('assets/pottedplant.png');  // Load your image texture

    const material3 = new THREE.MeshBasicMaterial({ map: texture3 });  // Create material with texture
    plantimg = new THREE.Mesh(geometry3, material3);  // Assign to correct variable
    scene.add(plantimg);
    
    // Adjust position and rotation as needed
    plantimg.position.set(2, 3.8, 3.6);
    plantimg.rotation.y = 3.3;  // Rotate the plane to be perpendicular to the floor

    toggleVisibilityRandomly(plantimg); // Call function to toggle visibility
}

// Function to create a plane with a teddy bear image
function createBear() {
    const geometry4 = new THREE.PlaneGeometry(1, 1);  // Adjust size as needed
    const textureLoader4 = new THREE.TextureLoader();
    const texture4 = textureLoader4.load('assets/teddybear.png');  // Load your image texture

    const material4 = new THREE.MeshBasicMaterial({ map: texture4 });  // Create material with texture
    bearimg = new THREE.Mesh(geometry4, material4);  // Assign to correct variable
    scene.add(bearimg);
    
    // Adjust position and rotation as needed
    bearimg.position.set(-3, 1.5, 1.3);
    bearimg.rotation.y = 1.5;  // Rotate the plane to be perpendicular to the floor

    toggleVisibilityRandomly(bearimg); // Call function to toggle visibility
}

// Function to create a plane with a poster image
function createPoster() {
    const geometry5 = new THREE.PlaneGeometry(1, 1);  // Adjust size as needed
    const textureLoader5 = new THREE.TextureLoader();
    const texture5 = textureLoader5.load('assets/positiveposter.jpeg');  // Load your image texture

    const material5 = new THREE.MeshBasicMaterial({ map: texture5 });  // Create material with texture
    posterimg = new THREE.Mesh(geometry5, material5);  // Assign to correct variable
    scene.add(posterimg);
    
    // Adjust position and rotation as needed
    posterimg.position.set(1, 3, -3);
    posterimg.rotation.y = 6.3;  // Rotate the plane to be perpendicular to the floor

    toggleVisibilityRandomly(posterimg); // Call function to toggle visibility
}

// Function to center the camera in the room
function centerCameraInRoom() {
    const box = new THREE.Box3().setFromObject(room);
    const center = new THREE.Vector3();
    box.getCenter(center);
    camera.position.copy(center);
    camera.position.z += 1; // Move the camera back to view the room
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







