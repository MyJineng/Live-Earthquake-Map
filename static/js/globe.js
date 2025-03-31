// globe.js
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
// Function to convert latitude and longitude to Cartesian coordinates
export function latLngToCartesian(lat, lng, radius) {
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lng + 180);
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
}

// Function to initialize the globe setup
export function initializeGlobe() {
    const Globe = new ThreeGlobe()
        .globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg')
        .bumpImageUrl('//cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png');

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('globeViz').appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xcccccc, Math.PI));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.6 * Math.PI));

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(-215, -165, 100);
    camera.lookAt(-215, -165, 100);

    const controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 101;
    controls.rotateSpeed = 5;
    controls.zoomSpeed = 0.8;

    // Start animation loop
    (function animate() {
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    })();

    return { Globe, scene, camera, renderer, controls };
}

// Function to recenter the camera to a specific position
export function recenterCamera(camera) {
    const recenterButton = document.getElementById('recenter_click');
    recenterButton.addEventListener('click', function () {
        const targetLatitude = -215;
        const targetLongitude = -165;
        const cameraDistance = 200;
        const targetPosition = latLngToCartesian(targetLatitude, targetLongitude, cameraDistance);
        camera.position.copy(targetPosition);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
    });
}

// Function to handle tectonic plates checkbox
export function handleTectonicPlatesCheckbox(Globe) {
    const tectonicPlatesCheckbox = document.getElementById('setting4');
    tectonicPlatesCheckbox.addEventListener('change', function () {
        if (tectonicPlatesCheckbox.checked) {
            Globe.globeImageUrl('static/tectonic_plates.png');
        } else {
            Globe.globeImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-dark.jpg');
        }
    });
}