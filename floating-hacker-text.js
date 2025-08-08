(() => {
  const container = document.querySelector('.threejs-container');
  if (!container) return;

  // 🔧 Read custom attributes from the container (Webflow-safe)
  const textColor = container.getAttribute('data-color') || '#ffffff'; // default white
  const textSize = parseFloat(container.getAttribute('data-size')) || 2; // default size 2
  const bgColor = container.getAttribute('data-bg'); // can be empty

  // 🖼️ Set scene background color if provided
  const scene = new THREE.Scene();
  scene.background = bgColor ? new THREE.Color(bgColor) : null;

  // 📷 Set up camera
  const camera = new THREE.PerspectiveCamera(
    55,
    container.clientWidth / container.clientHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 130);

  // 🖥️ Initialize renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  // 📏 Handle resizing
  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // 💻 List of floating hacker-style text
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

  // 🔤 Load font and create floating words
  const loader = new THREE.FontLoader();
  let animateWords = [];

  loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const wordGroup = new THREE.Group();
    scene.add(wordGroup);

    const wordCount = 50; // ✂️ Less clutter
    for (let i = 0; i < wordCount; i++) {
      const text = hackerWords[Math.floor(Math.random() * hackerWords.length)];

      const textGeo = new THREE.TextGeometry(text, {
        font,
        size: textSize,
        height: 0.1,
        curveSegments: 4
      });

      const textMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(textColor),
        transparent: true,
        opacity: 0.3
      });

      const mesh = new THREE.Mesh(textGeo, textMat);

      // 📐 Place without rotation so text is always upright and readable
      mesh.rotation.set(0, 0, 0);

      // 🎯 Spread out the layout
      mesh.position.set(
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 600,
        -300 - Math.random() * 400
      );

      mesh.userData.speed = 5 + Math.random() * 10;
      wordGroup.add(mesh);
    }

    animateWords.push(wordGroup);
  });

  // 💡 Lighting
  scene.add(new THREE.AmbientLight(0xffffff, 0.5));
  const light = new THREE.DirectionalLight(0xffffff, 1.2);
  light.position.set(0, 150, 100);
  scene.add(light);

  // 🎞️ Animate floating text
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    animateWords.forEach((group) => {
      group.children.forEach((text) => {
        text.position.z += text.userData.speed * delta;
        if (text.position.z > 100) text.position.z = -500;
      });
    });

    renderer.render(scene, camera);
  }

  animate();
})();