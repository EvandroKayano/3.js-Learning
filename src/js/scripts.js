import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const monkeyUrl = new URL('../assets/doggo2.glb', import.meta.url);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

renderer.setClearColor(0xA3A3A3);

const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(10, 10, 10);
orbit.update();

const grid = new THREE.GridHelper(30, 30);
scene.add(grid);

const assetLoader = new GLTFLoader();

// to play the animation
let mixer;
assetLoader.load(monkeyUrl.href, function(gltf) {
    const model = gltf.scene;
    scene.add(model);

    // mixer is the animation player
    mixer = new THREE.AnimationMixer(model);
    // holds the animations from glb file
    const clips = gltf.animations;

    /* 
    1 animation at a time
    const clip = THREE.AnimationClip.findByName(clips, 'HeadAction');
    const action = mixer.clipAction(clip);
    action.play(); 
    */

    // all actions at the same time
    clips.forEach(function(clip){
        const action = mixer.clipAction(clip);
        action.play();
    });


}, undefined, function(error) {
    console.error(error);
});

const clock = new THREE.Clock();
function animate() {
    // to keep playing the animation, update asks for time
    if(mixer)
        mixer.update(clock.getDelta());
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});