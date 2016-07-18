var AudioAnalyzer = require('./audioAnalyzer.js');
var ThreeScene = ThreeScene || {}
var speed = 50;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var mouseX = 0;
var mouseXOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var delta = 1;
var clock = new THREE.Clock();
var camera, scene, Pool, emitterPos, particles,pointLight,
    particleCloud, hue, ringShape, attributes, group,
    values_size, values_color, composer, renderer;
var _rotation = 0;
var timeOnShapePath = 0;
var audioAnalyser;

ThreeScene.init = function(player) {
    audioAnalyser = Object.create(AudioAnalyzer);
    audioAnalyser.init(player)
    console.log(audioAnalyser)

    var container = document.createElement('div');
    $('#three').append(container);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.set(0, 150, 400);

    scene = new THREE.Scene();

    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, -1, 1);
    directionalLight.position.normalize();
    scene.add(directionalLight);

    pointLight = new THREE.PointLight(0xffffff, 2, 300);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    var material = new THREE.MeshFaceMaterial([
        new THREE.MeshLambertMaterial({ color: 0xffffff, shading: THREE.FlatShading, opacity: 0.95 }),
        new THREE.MeshLambertMaterial({ color: 0xffffff })
    ]);

    group = new THREE.Group();
    scene.add(group);

    var particlesLength = 70000;
    particles = new THREE.Geometry();

    Pool = {
        __pools: [],
        get: function() {
            if (this.__pools.length > 0) {
                return this.__pools.pop();
            }
            return null;
        },
        add: function(v) {
            this.__pools.push(v);
        }
    };

    for (i = 0; i < particlesLength; i++) {
        particles.vertices.push(newpos(Math.random() * 200 - 100, Math.random() * 100 + 150, Math.random() * 50));
        Pool.add(i);
    }

    // Create pools of vectors
    attributes = {
        size: { type: 'f', value: [] },
        pcolor: { type: 'c', value: [] }
    };

    var sprite = generateSprite();

    texture = new THREE.Texture(sprite);
    texture.needsUpdate = true;

    var uniforms = {
        texture: { type: "t", value: texture }
    };

    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        attributes: attributes,
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        transparent: true
    });

    particleCloud = new THREE.PointCloud(particles, shaderMaterial);
    particleCloud.sortParticles = true;

    var vertices = particleCloud.geometry.vertices;
    values_size = attributes.size.value;
    values_color = attributes.pcolor.value;

    for (var v = 0; v < vertices.length; v++) {
        values_size[v] = 50;
        values_color[v] = new THREE.Color(0x000000);
        particles.vertices[v].set(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    }

    group.add(particleCloud);
    particleCloud.y = 800;

    ringShape = new THREE.Shape();
    ringShape.moveTo(0, 25);
    ringShape.arc(15, 25, 35, 0, Math.PI * 2, false);
    curve = ringShape.curves[0];

    hue = 0;

    sparksEmitter = new SPARKS.Emitter(new SPARKS.SteadyCounter(500));

    emitterpos = new THREE.Vector3(0, 0, 0);

    sparksEmitter.addInitializer(new SPARKS.Position(new SPARKS.PointZone(emitterpos)));
    sparksEmitter.addInitializer(new SPARKS.Lifetime(1, 8));
    sparksEmitter.addInitializer(new SPARKS.Target(null, setTargetParticle));
    sparksEmitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0, -5, 1))));

    sparksEmitter.addAction(new SPARKS.Age());
    sparksEmitter.addAction(new SPARKS.Accelerate(0, 0, -50));
    sparksEmitter.addAction(new SPARKS.Move());
    sparksEmitter.addAction(new SPARKS.RandomDrift(100, 50, 1500));

    sparksEmitter.addCallback("created", onParticleCreated);
    sparksEmitter.addCallback("dead", onParticleDead);
    sparksEmitter.start();
    // End Particles

    renderer = new THREE.WebGLRenderer({ clearColor: 0xff0000, clearAlpha: 1 });
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    // POST PROCESSING
    var effectFocus = new THREE.ShaderPass(THREE.FocusShader);
    var effectCopy = new THREE.ShaderPass(THREE.CopyShader);

    effectFocus.uniforms['sampleDistance'].value = 0.99; //0.94
    effectFocus.uniforms['waveFactor'].value = 0.003; //0.00125

    var renderScene = new THREE.RenderPass(scene, camera);

    composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(effectCopy);
    composer.addPass(effectFocus);

    effectFocus.renderToScreen = true;

    window.addEventListener('resize', onWindowResize, false);
}


function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.reset();
}

//Rotation on mouse movement disabled
// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
function onDocumentMouseMove(event) {
    mouseX = event.clientX - windowHalfX;
    targetRotation = targetRotationOnMouseDown + (mouseX - mouseXOnMouseDown) * 0.001;
}

function generateSprite() {

    var canvas = document.createElement('canvas');
    canvas.width = 180;
    canvas.height = 180;

    var context = canvas.getContext('2d');
    context.beginPath();
    context.arc(64, 64, 60, 0, Math.PI * 2, false);
    context.lineWidth = 0.5;
    context.stroke();
    context.restore();

    var gradient = context.createRadialGradient(canvas.width / 3, canvas.height / 3, 0, canvas.width / 3, canvas.height / 3, canvas.width / 3);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.4, 'rgba(200,200,200,1)');
    gradient.addColorStop(1, 'rgba(0,0,0,1)');

    context.fillStyle = gradient;
    context.fill();

    return canvas;
}

function newpos(x, y, z) {
    return new THREE.Vector3(x, y, z);
}

function onParticleCreated (p) {
    var position = p.position;
    p.target.position = position;

    var target = p.target;

    if (target) {

        hue += 0.0003 * delta;
        if (hue > 1) hue -= 1;

        timeOnShapePath += 0.00035 * delta;
        if (timeOnShapePath > 1) timeOnShapePath -= 1;

        var pointOnShape = ringShape.getPointAt(timeOnShapePath);

        emitterpos.x = pointOnShape.x * 5 - 100;
        emitterpos.y = -pointOnShape.y * 5 + 400;

        pointLight.position.x = emitterpos.x;
        pointLight.position.y = emitterpos.y;
        pointLight.position.z = 100;

        particles.vertices[target] = p.position;

        values_color[target].setHSL(hue, 0.6, 0.1);

        pointLight.color.setHSL(hue, 0.8, 0.5);
    };
};

function onParticleDead(particle) {

    var target = particle.target;
    if (target) {
        // Hide the particle
        values_color[target].setRGB(0, 0, 0);
        particles.vertices[target].set(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        // Mark particle system as available by returning to pool
        Pool.add(particle.target);
    }
};

function setTargetParticle() {
    var target = Pool.get();
    values_size[target] = Math.random() * 200 + 100;
    return target;
};

ThreeScene.animate = function() {
    freqData = audioAnalyser.getFrequencyData();
    camera.setLens(1, 2);
    requestAnimationFrame(ThreeScene.animate);
    if(freqData === 'undefined') return;

    if (freqData < 1) {
        curve.xRadius = 35;
        curve.yRadius = 35;
    } else {
        curve.xRadius = freqData;
        curve.yRadius = freqData;
    }

    ThreeScene.render();
}

ThreeScene.render = function() {
    delta = speed * clock.getDelta();
    particleCloud.geometry.verticesNeedUpdate = true;
    attributes.size.needsUpdate = true;
    attributes.pcolor.needsUpdate = true;
    group.rotation.y += (targetRotation - group.rotation.y) * 0.05;
    composer.render(0.1);
    renderer.render(scene, camera);
};

module.exports = ThreeScene;