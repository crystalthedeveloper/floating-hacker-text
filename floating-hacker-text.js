(() => {
  const container = document.querySelector('.threejs-container');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(55, container.clientWidth / container.clientHeight, 1, 1000);
  camera.position.set(0, 0, 130);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  const hackerWords = [
    'console.log("Crystal The Developer Inc")',
    'fetch("/api")',
    'let x = 3_000_000;',
    'const developer = true;',
    'function init() {}',
    '<div class="developer-mode">',
    'body { background: black; }',
    'const love = Danielle',
    'export default Code;'
  ];

  const loader = new THREE.FontLoader();
  let animateWords = [];

  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', font => {
    const wordGroup = new THREE.Group();
    scene.add(wordGroup);

    for (let i = 0; i < 80; i++) {
      const text = hackerWords[Math.floor(Math.random() * hackerWords.length)];
      const textGeo = new THREE.TextBufferGeometry(text, {
        font,
        size: 2,
        height: 0.1,
        curveSegments: 4
      });

      const textMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.25 });
      const mesh = new THREE.Mesh(textGeo, textMat);
      mesh.position.set(
        (Math.random() - 0.5) * 400,
        (Math.random() - 0.5) * 400,
        -300 - Math.random() * 400
      );
      mesh.userData.speed = 5 + Math.random() * 10;
      wordGroup.add(mesh);
    }

    animateWords.push(wordGroup);
  });

  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const light = new THREE.DirectionalLight(0xffffff, 1.2);
  light.position.set(0, 150, 100);
  scene.add(light);

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    animateWords.forEach(group => {
      group.children.forEach(text => {
        text.position.z += text.userData.speed * delta;
        if (text.position.z > 100) text.position.z = -500;
      });
    });
    renderer.render(scene, camera);
  }

  animate();
})();