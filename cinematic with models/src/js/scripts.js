import * as THREE from 'three';
import gsap from 'gsap';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor(0xa3a3a3);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
//const orbit = new OrbitControls(camera, renderer.domElement);
camera.position.set(10, 0, 20);


const ambientLight = new THREE.AmbientLight(0xededed, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x0000,1);
scene.add(directionalLight);
directionalLight.position.set(0,20,-20);

const gridHelper = new THREE.GridHelper(5, 5);
scene.add(gridHelper);

const assetLoader = new GLTFLoader();

let mixer;
let mixer2;
let mixer3;

assetLoader.load('./assets/scene.gltf',function(gltf) {
    const model = gltf.scene;
    model.scale.set(0.01, 0.01, 0.01);
    const model2 = SkeletonUtils.clone(model);
    const model3 = SkeletonUtils.clone(model);

    scene.add(model);
    scene.add(model2);
    scene.add(model3);

    model2.position.set(7 ,-4, 6);
    model3.position.set(-7 ,-4, -2);

    mixer = new THREE.AnimationMixer(model);
    mixer2 = new THREE.AnimationMixer(model2);
    mixer3 = new THREE.AnimationMixer(model3);
    
    const clips = gltf.animations;
    const clip = THREE.AnimationClip.findByName(clips, 'Take 001');

    const action = mixer.clipAction(clip);
    const action2 = mixer2.clipAction(clip);
    const action3 = mixer3.clipAction(clip);

    action.play();
    action.timeScale = 0.5;
    action2.play();
    action2.startAt(0.2);
    action2.timeScale = 0.5;
    action3.play();
    action3.startAt(0.35);
    action3.timeScale = 0.5;

    window.addEventListener('mousedown', cameraAnimation);
});

const t1 = gsap.timeline();
const duration = 8;
const ease = 'none';
let animationIsFinished = false;

function cameraAnimation() {
    if(!animationIsFinished) {
        animationIsFinished = true;

        t1.to(camera.position, {
            x: 0,
            duration,
            ease
        })

        .to(camera.position, {
            y: 40,
            z: 30,
            duration,
            ease,
            onUpdate: function() {
                camera.lookAt(0, 0, 0);
            }
        }, 8)

        .to(camera.position, {
            x: -10,
            y: 15,
            z: 10,
            duration,
            ease,
            onUpdate: function() {
                camera.lookAt(0, 0, 0);
            }
        }, 8)

        .to(camera.position, {
            x: -30,
            y: 30,
            z: 20,
            duration,
            ease,
            onUpdate: function() {
                camera.lookAt(0, 0, 0);
            }
        }, 8)

        .to(camera.position, {
            x: -40,
            y: 30,
            z: -20,
            duration,
            ease,
            onUpdate: function() {
                camera.lookAt(0, 0, 0);
            }
        }, 14)

        .to(camera.position, {
            x: 5,
            y: 5,
            z: -10,
            duration,
            ease,
            onUpdate: function() {
                camera.lookAt(0, 0, 0);
            }
        })

        .to(camera.position, {
            x: 5,
            y: 20,
            z: 30,
            duration,
            ease,
            onUpdate: function() {
                camera.lookAt(0, 0, 0);
            }
        }, '-0.2')

        .to(camera.position, {
            x: -20,
            duration: 12,
            ease,
            delay: 2
        })
    }
}


const clock = new THREE.Clock();
function animate() {
    const delta = clock.getDelta();
    if(mixer && mixer2 && mixer3) {
        mixer.update(delta);
        mixer2.update(delta);
        mixer3.update(delta);
    }
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});