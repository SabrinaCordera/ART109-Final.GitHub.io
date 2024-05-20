
// Basic Three.JS scene from documentation, importing Three.JS through a CDN 
// https://threejs.org/docs/#manual/en/introduction/Creating-a-scene

// let beat = new Audio('assets/Forest-Sounds.mp3');
// window.addEventListener('keypress',function(){
//   // Play the beat
// beat.play();
// beat.loop(true);
// });

//~~~~~~~Import Three.js (also linked to as import map in HTML)~~~~~~
// import * as THREE from 'three';

// // Import add-ons
// import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js'; // to load 3d models

// const app = document.getElementById('app');
// let scene;
// let renderer;
// let camera;
// let windowWidth = window.innerWidth;
// let windowHeight = window.innerHeight;
// let fov = 75;
// let lon = 0;
// let lat = 0;
// let phi = 0;
// let theta = 0;
// const nearPlane = 1;
// const farPlane = 1000;
// let aspect = windowWidth / windowHeight;
// const dpr = window.devicePixelRatio;
// let isManual = false;
// let lastMouseX = 0;
// let lastMouseY = 0;
// let lastLon = 0;
// let lastLat = 0;

// let plane;
// let room;

// // ~~~~~~~~~~~~~~~~Create scene here~~~~~~~~~~~~~~~~

// function init() {
//     scene = new THREE.Scene();
//     camera = new THREE.PerspectiveCamera(75, aspect, nearPlane, farPlane);
//     camera.target = new THREE.Vector3(0, 0, 0);

//     renderer = new THREE.WebGLRenderer({antialias: true});
//     renderer.setSize(windowWidth, windowHeight);
//     renderer.setPixelRatio(dpr);
//     app.appendChild(renderer.domElement);

   
//     const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
//     scene.add( light );

//     // controls = new OrbitControls(camera, renderer.domElement);

//     const loader = new GLTFLoader(); //loads 3d models

//     camera.position.y = 2; // Adjust the z-position of the camera here
//     // camera.position.z = 10;
//     // camera.position.x = 100;

//     // instantiate a loader
//     const img = new THREE.ImageLoader();

//     // load a image resource
//     const textureLoader = new THREE.TextureLoader(); // Loads textures

//     // Load an image resource
//     textureLoader.load(
//         'assets/outside-window-view.jpeg',
//         function (texture) {
//             const geometry = new THREE.PlaneGeometry(10, 10);
//             const material = new THREE.MeshBasicMaterial({ map: texture });
//             plane = new THREE.Mesh(geometry, material);
//             scene.add(plane);
//             // Position the plane in the scene center
//             if (room) {
//                 centerPlaneInRoom();
//             }
//         },
//         undefined,
//         function () {
//             console.error('An error happened while loading the texture.');
//         }
//     );

//     //loads the bedroom
//     loader.load ('assets/bedroom3.glb', function (gltf) { 
//         const room = gltf.scene;
//         scene.add( room );
// // Position the plane in the scene center
// if (plane) {
//     centerPlaneInRoom();
// }

    
        
// })


// }

// function initEventListeners() {
//     document.addEventListener('mousedown', handleDocumentMouseDown, false);
//     document.addEventListener('mousemove', handleDocumentMouseMove, false);
//     document.addEventListener('mouseup', handleDocumentMouseUp, false);
//     document.addEventListener('touchstart', handleDocumentMouseDown, false);
//     document.addEventListener('touchmove', handleDocumentMouseMove, false);
//     document.addEventListener('touchend', handleDocumentMouseUp, false);
  
  
//     window.addEventListener('resize', resizeWindow);
//   }
  
//   function animate() {
//     requestAnimationFrame(animate);
//     if(!isManual){
//       lat += 0.1;
//     }
//     phi = (90 - lat) * Math.PI / 180;
//     theta = lon * Math.PI / 180;
//     // Transform from Spherical to Cartesian coordinates
//     camera.target.x = 500 * Math.sin(phi) * Math.cos(theta);
//     camera.target.y = 500 * Math.sin(phi) * Math.sin(theta);
//     camera.target.z = 500 * Math.cos(phi);
  
//     camera.lookAt(camera.target);
//     render();
//   }


// function resizeWindow() {
//     const width = window.innerWidth;
//     const height = window.innerHeight;
//     camera.aspect = width / height;
//     camera.updateProjectionMatrix();
//     const canvasPixelWidth = canvas.width / dpr;
//     const canvasPixelHeight = canvas.height / dpr;
  
//     if (canvasPixelWidth !== width || canvasPixelHeight !== height) {
//       renderer.setSize(width, height, false);
//     }
//   }
  
//   function render() {
//     renderer.render(scene, camera);
//   }
  
  
//   function handleKeyUp(event) {
//     if (event.code === 'Space') {
//       panoramaNumber = (panoramaNumber + 1) % panoramasArray.length;
//       gltf.scene = new THREE.TextureLoader().load(panoramasArray[panoramaNumber]);
//     }
//   }
  
//   // when the mouse is pressed, we switch to manual control and save current coordinates
//   function handleDocumentMouseDown(event){
//     event.preventDefault();
//     isManual = true;
  
//     const clientX = event.clientX || event.touches[ 0 ].clientX;
//       const clientY = event.clientY || event.touches[ 0 ].clientY;
  
//     lastMouseX = clientX;
//       lastMouseY = clientY;
  
//       lastLon = lon;
//       lastLat = lat;
//   }
  
//   // when the mouse moves, if in manual control we adjust coordinates
//   function handleDocumentMouseMove(event) {
  
//     if (isManual) {
//       const clientX = event.clientX || event.touches[0].clientX;
//       const clientY = event.clientY || event.touches[0].clientY;
  
//       lat = (clientX - lastMouseX) * 0.1 + lastLat;
//           lon = (clientY - lastMouseY) * 0.1 + lastLon;
//     }
//   }
  
//   // when the mouse is released, we turn manual control off
//   function handleDocumentMouseUp(){
//     isManual = false;
  
//     lastMouseX = 0;
//       lastMouseY = 0;
  
//       lastLon = 0;
//       lastLat = 0;
//   }
  
  
// //   function handleDragOver(event) {
// //     event.preventDefault();
// //     event.stopPropagation();
// //     event.dataTransfer.dropEffect = 'copy';
// //   }
  
// //   function handleDragEnter(event) {
// //     event.preventDefault();
// //     event.stopPropagation();
// //     app.style.opacity = 0.5;
// //   }
  
// //   function handleDragLeave(event) {
// //     event.preventDefault();
// //     event.stopPropagation();
// //     app.style.opacity = 1;
// //   }
  
  
// //   function handleDrop(event) {
// //     event.preventDefault();
// //     event.stopPropagation();
  
// //     const reader = new FileReader();
// //     reader.addEventListener('load', function(event) {
  
// //         gltf.scene = event.target.result;
// //         gltf.scene.needsUpdate = true;
  
// //     }, false );
// //     reader.readAsDataURL(event.dataTransfer.files[0]);
  
// //     app.style.opacity = 1;
// //   }
  
  
//   function cleanup() {
//     document.removeEventListener('mousedown', handleDocumentMouseDown, false);
//     document.removeEventListener('mousemove', handleDocumentMouseMove, false);
//     document.removeEventListener('mouseup', handleDocumentMouseUp, false);
//     document.removeEventListener('touchstart', handleDocumentMouseDown, false);
//       document.removeEventListener('touchmove', handleDocumentMouseMove, false);
//     document.removeEventListener('touchend', handleDocumentMouseUp, false);
  
//     document.removeEventListener('keyup', handleKeyUp);
  
//     // document.removeEventListener('dragover', handleDragOver, false);
//     // document.removeEventListener('dragenter', handleDragEnter, false);
//     // document.removeEventListener('dragleave', handleDragLeave, false);
//     // document.removeEventListener('drop', handleDrop, false);
  
//     window.removeEventListener('resize', resizeWindow);
//   }
  
//   window.onload = init;
  
//   window.onload = cleanup;


// init();
// initEventListeners();
// animate();




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

    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light);

    const gltfLoader = new GLTFLoader(); // Loads 3D models
    const textureLoader = new THREE.TextureLoader(); // Loads textures

    // Load an image resource
    textureLoader.load(
        'assets/outside-window-view.jpeg',
        function (texture) {
            const geometry = new THREE.PlaneGeometry(10, 10);
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
    plane.position.set(0,1,4);
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







