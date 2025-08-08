# 💻 Floating Hacker Text (Webflow + Three.js)

A lightweight, Webflow-compatible 3D animation that floats code-like text in space. Fully customizable using HTML attributes.

## 🚀 Features

- ✅ Lazy-loads only when the container is present (PageSpeed optimized)
- 🎯 Floats 3D words in a hacker-style scene
- 🎨 Customize color, font size, and background using Webflow attributes
- ⚡ Lightweight — no need for Typed.js

## 📦 How to Use

### 1. Add this container to your Webflow page:

```html
<div
  class="threejs-container"
  data-color="#00ff00"
  data-size="3"
  data-bg=""
></div>
```

### 2. Paste this in Page Settings → Before </body>:

```html
<script>
  window.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('.threejs-container');
    if (!container) return;

    const loadScript = (src) => new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`Failed to load: ${src}`));
      document.body.appendChild(script);
    });

    loadScript("https://unpkg.com/three@0.140.0/build/three.min.js")
      .then(() => loadScript("https://unpkg.com/three@0.140.0/examples/js/loaders/FontLoader.js"))
      .then(() => loadScript("https://unpkg.com/three@0.140.0/examples/js/geometries/TextGeometry.js"))
      .then(() => loadScript("https://cdn.jsdelivr.net/gh/crystalthedeveloper/floating-hacker-text@v1.2.0/floating-hacker-text.js"))
      .catch((err) => console.error("Lazy 3D Scene Error:", err));
  });
</script>
```

### 3. Customize Appearance (Optional)

| Attribute     | Example       | What it does                          |
| ------------- | ------------- | ------------------------------------- |
| `data-color`  | `#00ff00`     | Sets the text color                   |
| `data-size`   | `3`           | Sets the font size (number)           |
| `data-bg`     | `#000000`     | Background color (empty = transparent)|

---

## 🙌 Credits

Developed by [Crystal The Developer Inc.](https://www.crystalthedeveloper.ca)

Uses [Three.js](https://threejs.org/) to create lightweight visual effects.
