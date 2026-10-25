import * as THREE from "./three.module.min.js";

/*====================================
    PHASE 1 — PREMIUM 3D HERO
=====================================*/

(() => {

    const hero = document.querySelector(".hero");
    const mount = document.querySelector(".hero-right");

    if (!hero || !mount) return;

    const reducedMotion =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isMobile =
        window.matchMedia("(max-width: 768px)").matches;


    /*====================================
        CANVAS
    =====================================*/

    const canvas = document.createElement("canvas");

    canvas.className = "hero-3d-canvas";
    canvas.setAttribute("aria-hidden", "true");

    mount.appendChild(canvas);


    /*====================================
        RENDERER
    =====================================*/

    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(
        Math.min(window.devicePixelRatio || 1, isMobile ? 1.2 : 1.75)
    );

    renderer.setClearColor(0x000000, 0);


    /*====================================
        SCENE
    =====================================*/

    const scene = new THREE.Scene();


    /*====================================
        CAMERA
    =====================================*/

    const camera = new THREE.PerspectiveCamera(
        32,
        1,
        0.1,
        100
    );

    camera.position.set(0, 0.2, 8.4);


    /*====================================
        MAIN ROOT
    =====================================*/

    const root = new THREE.Group();

    scene.add(root);


    /*====================================
        HERO LIGHTING
    =====================================*/

    const ambient =
        new THREE.HemisphereLight(
            0xbfdcff,
            0x03050b,
            1.5
        );

    scene.add(ambient);


    const purpleLight =
        new THREE.PointLight(
            0x7b61ff,
            48,
            18,
            2
        );

    purpleLight.position.set(
        3.5,
        2.4,
        4.5
    );

    scene.add(purpleLight);


    const cyanLight =
        new THREE.PointLight(
            0x00d4ff,
            34,
            17,
            2
        );

    cyanLight.position.set(
        -3.8,
        -1.5,
        3.8
    );

    scene.add(cyanLight);


    const rimLight =
        new THREE.PointLight(
            0xa47cff,
            20,
            13,
            2
        );

    rimLight.position.set(
        0,
        3.5,
        -2
    );

    scene.add(rimLight);


    /*====================================
        PLATFORM
    =====================================*/

    const platformGeometry =
        new THREE.CylinderGeometry(
            2.6,
            3.25,
            0.14,
            64
        );

    const platformMaterial =
        new THREE.MeshPhysicalMaterial({
            color: 0x0c1327,
            metalness: 0.72,
            roughness: 0.22,
            transparent: true,
            opacity: 0.8,
            emissive: 0x11183c,
            emissiveIntensity: 0.7
        });

    const platform =
        new THREE.Mesh(
            platformGeometry,
            platformMaterial
        );

    platform.position.y = -1.7;

    root.add(platform);


    /*====================================
        PLATFORM GLOW
    =====================================*/

    const glowGeometry =
        new THREE.CircleGeometry(2.85, 64);

    const glowMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x6c5cff,
            transparent: true,
            opacity: 0.07,
            side: THREE.DoubleSide
        });

    const platformGlow =
        new THREE.Mesh(
            glowGeometry,
            glowMaterial
        );

    platformGlow.rotation.x =
        -Math.PI / 2;

    platformGlow.position.y =
        -1.61;

    root.add(platformGlow);


    /*====================================
        OUTER RING
    =====================================*/

    const outerRing =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                2.22,
                0.02,
                12,
                128
            ),
            new THREE.MeshBasicMaterial({
                color: 0x00d4ff,
                transparent: true,
                opacity: 0.82
            })
        );

    outerRing.rotation.x =
        Math.PI / 2;

    outerRing.position.y =
        -1.55;

    root.add(outerRing);


    /*====================================
        SECOND RING
    =====================================*/

    const middleRing =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                1.72,
                0.014,
                12,
                128
            ),
            new THREE.MeshBasicMaterial({
                color: 0x7b61ff,
                transparent: true,
                opacity: 0.8
            })
        );

    middleRing.rotation.x =
        Math.PI / 2;

    middleRing.position.y =
        -1.57;

    root.add(middleRing);


    /*====================================
        THIRD RING
    =====================================*/

    const innerRing =
        new THREE.Mesh(
            new THREE.TorusGeometry(
                1.28,
                0.009,
                12,
                128
            ),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.28
            })
        );

    innerRing.rotation.x =
        Math.PI / 2;

    innerRing.position.y =
        -1.58;

    root.add(innerRing);


    /*====================================
        LAPTOP
    =====================================*/

    const laptopImage =
        mount.querySelector("img");

    const laptopGroup =
        new THREE.Group();

    root.add(laptopGroup);


    let laptopTexture = null;

    if (laptopImage) {

        laptopTexture =
            new THREE.TextureLoader().load(
                laptopImage.src
            );

    }


    const laptopMaterial =
        laptopTexture

            ? new THREE.MeshPhysicalMaterial({
                map: laptopTexture,
                transparent: true,
                roughness: 0.2,
                metalness: 0.2,
                clearcoat: 1,
                clearcoatRoughness: 0.12,
                side: THREE.DoubleSide
            })

            : new THREE.MeshPhysicalMaterial({
                color: 0x17203b,
                metalness: 0.7,
                roughness: 0.22
            });


    const laptop =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                4.82,
                3.02
            ),
            laptopMaterial
        );

    laptopGroup.add(laptop);


    /*====================================
        LAPTOP BODY
    =====================================*/

    const laptopBody =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                4.85,
                3.05,
                0.075
            ),
            new THREE.MeshPhysicalMaterial({
                color: 0x0c1328,
                metalness: 0.86,
                roughness: 0.18,
                emissive: 0x101938,
                emissiveIntensity: 0.38
            })
        );

    laptopBody.position.z =
        -0.055;

    laptopGroup.add(laptopBody);


    /*====================================
        LAPTOP GLOW LAYER
    =====================================*/

    const laptopGlow =
        new THREE.Mesh(
            new THREE.PlaneGeometry(
                5.45,
                3.65
            ),
            new THREE.MeshBasicMaterial({
                color: 0x725bff,
                transparent: true,
                opacity: 0.065,
                side: THREE.DoubleSide
            })
        );

    laptopGlow.position.z =
        -0.19;

    laptopGroup.add(laptopGlow);

    /*====================================
  REAL 3D LAPTOP (replaces the flat picture)
  The old flat meshes are only hidden, not deleted.
=====================================*/
laptop.visible = false;
laptopBody.visible = false;
laptopGlow.visible = false;

const lap3d = new THREE.Group();
lap3d.scale.setScalar(isMobile ? 0.78 : 0.72);
lap3d.position.y = -0.05;
laptopGroup.add(lap3d);

/* rounded slab helper */
function slab(w, h, d, r, b) {
  const s = new THREE.Shape(), x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  const g = new THREE.ExtrudeGeometry(s, { depth: d, bevelEnabled: true, bevelSize: b, bevelThickness: b, bevelSegments: 3 });
  g.translate(0, 0, -d / 2);
  return g;
}

const BY = -1.5;
const alu = new THREE.MeshPhysicalMaterial({ color: 0x4a5688, metalness: 0.55, roughness: 0.34, clearcoat: 0.5, emissive: 0x0b1230, emissiveIntensity: 0.7 });
const dark = new THREE.MeshStandardMaterial({ color: 0x070b18, roughness: 0.5, metalness: 0.3 });

/* base, keyboard well, trackpad, hinge */
const base = new THREE.Mesh(slab(4.3, 2.9, 0.12, 0.2, 0.03).rotateX(-Math.PI / 2), alu);
base.position.y = BY;
lap3d.add(base);
const well = new THREE.Mesh(new THREE.BoxGeometry(3.95, 0.02, 1.75), dark);
well.position.set(0, BY + 0.095, -0.2);
lap3d.add(well);
const pad = new THREE.Mesh(slab(1.25, 0.78, 0.01, 0.08, 0.004).rotateX(-Math.PI / 2), new THREE.MeshStandardMaterial({ color: 0x5a67a0, roughness: 0.3, metalness: 0.4 }));
pad.position.set(0, BY + 0.1, 1.02);
lap3d.add(pad);
const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 3.6, 20).rotateZ(Math.PI / 2), dark);
hinge.position.set(0, BY + 0.12, -1.42);
lap3d.add(hinge);

/* keys: dark caps + glowing tops that ripple in colour */
const COLS = 14, ROWS = 5, KEYS = COLS * ROWS, dummy = new THREE.Object3D();
const caps = new THREE.InstancedMesh(new THREE.BoxGeometry(0.23, 0.05, 0.23), new THREE.MeshStandardMaterial({ color: 0x10162e, roughness: 0.45, metalness: 0.2 }), KEYS);
const tops = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.16, 0.16).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0xffffff }), KEYS);
for (let i = 0; i < KEYS; i++) {
  const c = i % COLS, r = Math.floor(i / COLS);
  dummy.position.set((c - (COLS - 1) / 2) * 0.27, BY + 0.12, -0.78 + r * 0.27);
  dummy.updateMatrix();
  caps.setMatrixAt(i, dummy.matrix);
  dummy.position.y = BY + 0.148;
  dummy.updateMatrix();
  tops.setMatrixAt(i, dummy.matrix);
  tops.setColorAt(i, new THREE.Color(0x00d4ff));
}
lap3d.add(caps, tops);

/* lid: hinge pivot, metal shell, black bezel, live screen */
const lid = new THREE.Group();
lid.position.set(0, BY + 0.12, -1.42);
lid.rotation.x = 1.45;
lap3d.add(lid);
const shell = new THREE.Mesh(slab(4.3, 2.75, 0.07, 0.18, 0.025).translate(0, 1.375, 0), alu);
const bezel = new THREE.Mesh(slab(4.14, 2.59, 0.004, 0.12, 0.003).translate(0, 1.375, 0.064), new THREE.MeshStandardMaterial({ color: 0x04060d, roughness: 0.25, metalness: 0.3 }));
lid.add(shell, bezel);

const sc = document.createElement("canvas");
sc.width = isMobile ? 768 : 1024;
sc.height = isMobile ? 480 : 640;
const g2 = sc.getContext("2d");
const tex = new THREE.CanvasTexture(sc);
if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
tex.anisotropy = 4;
const screen = new THREE.Mesh(new THREE.PlaneGeometry(3.9, 2.3), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false }));
screen.position.set(0, 1.4, 0.08);
lid.add(screen);
const logo = new THREE.Mesh(new THREE.CircleGeometry(0.15, 32), new THREE.MeshBasicMaterial({ color: 0x00d4ff }));
logo.position.set(0, 1.375, -0.066);
logo.rotation.y = Math.PI;
lid.add(logo);
const screenLight = new THREE.PointLight(0x7aa2ff, 5, 7, 2);
screenLight.position.set(0, BY + 1.3, 1.2);
lap3d.add(screenLight);

/* code that scrolls on the screen */
const code = [
  '<section class="hero">', '  <h1>Shariq Ur Rafay</h1>', '  <h3>Front-End Developer</h3>',
  '  <a class="btn">View Projects</a>', '</section>', '',
  '.hero {', '  display: grid;', '  gap: 40px;', '}', '',
  'gsap.from(".hero h1", {', '  y: 60,', '  opacity: 0,', '  duration: 1.2', '});', '',
  '// 40 projects shipped', 'const clients = 25;', ''
];
const col = { tag: "#4dd8ff", attr: "#a47cff", str: "#ffc86b", txt: "#dfe6ff", dim: "#5b6690" };
function paint(line, x, y) {
  const re = /(<\/?[a-z0-9]+|\/?>|"[^"]*"|\/\/.*|\b(?:const|class|gsap|from)\b|\b\d+\b|[{}();:,])/g;
  let last = 0, m, cx = x;
  const put = (t, c) => { g2.fillStyle = c; g2.fillText(t, cx, y); cx += g2.measureText(t).width; };
  while ((m = re.exec(line))) {
    if (m.index > last) put(line.slice(last, m.index), col.txt);
    const t = m[0];
    put(t, t[0] === "<" || t[0] === ">" || t.startsWith("/>") ? col.tag : t[0] === '"' || /^\d/.test(t) ? col.str : t.startsWith("//") || /^[{}();:,]$/.test(t) ? col.dim : col.attr);
    last = m.index + t.length;
  }
  if (last < line.length) put(line.slice(last), col.txt);
}
let scroll = 0;
function drawScreen() {
  const W = sc.width, H = sc.height, s = W / 1024, bar = 54 * s, lh = 40 * s;
  const bg = g2.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#0a0f24"); bg.addColorStop(1, "#1a1040");
  g2.fillStyle = bg; g2.fillRect(0, 0, W, H);
  g2.fillStyle = "rgba(255,255,255,.07)"; g2.fillRect(0, 0, W, bar);
  ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => { g2.fillStyle = c; g2.beginPath(); g2.arc((36 + i * 34) * s, bar / 2, 9 * s, 0, 6.283); g2.fill(); });
  g2.font = (26 * s) + "px Consolas, Menlo, monospace";
  g2.textBaseline = "middle";
  const first = Math.floor(scroll), frac = scroll - first;
  for (let i = 0; i < Math.ceil((H - bar) / lh) + 1; i++) {
    const n = first + i, y = bar + (i + 0.5 - frac) * lh;
    g2.fillStyle = "#3a4472"; g2.fillText(String(n + 1).padStart(2, "0"), 24 * s, y);
    paint(code[n % code.length], 84 * s, y);
  }
  tex.needsUpdate = true;
}
drawScreen();

/* motion: lid opens, gentle sway, key colour ripple, scrolling code */
const kc = new THREE.Color();
let n = 0;
const update = (t) => {
  lap3d.rotation.y = -0.1 + Math.sin(t * 0.55) * (isMobile ? 0.35 : 0.5);
  for (let i = 0; i < KEYS; i++) {
    const w = (Math.sin(t * 1.6 + i * 0.35) + 1) / 2;
    kc.setHSL(0.5 + 0.17 * w, 1, 0.2 + 0.2 * w);
    tops.setColorAt(i, kc);
  }
  tops.instanceColor.needsUpdate = true;
  if (++n % 3 === 0 && !document.hidden) { scroll += 0.07; drawScreen(); }
};
if (window.gsap && !reducedMotion) {
  gsap.to(lid.rotation, { x: -0.3, duration: 1.9, delay: 2.7, ease: "power3.out" });
  gsap.ticker.add(update);
} else {
  lid.rotation.x = -0.3;
  lap3d.rotation.y = -0.15;
}


    /*====================================
        TECH BADGE SYSTEM
    =====================================*/

    const badgeGroup =
        new THREE.Group();

    root.add(badgeGroup);


    function createBadge(
        text,
        color,
        size = 96
    ) {

        const badgeCanvas =
            document.createElement("canvas");

        badgeCanvas.width = size * 2;
        badgeCanvas.height = size;

        const ctx =
            badgeCanvas.getContext("2d");

        ctx.clearRect(
            0,
            0,
            badgeCanvas.width,
            badgeCanvas.height
        );


        /* Background */

        const radius = 22;

        ctx.beginPath();

        ctx.roundRect(
            4,
            4,
            badgeCanvas.width - 8,
            badgeCanvas.height - 8,
            radius
        );

        ctx.fillStyle =
            "rgba(10, 18, 38, 0.88)";

        ctx.fill();


        /* Border */

        ctx.strokeStyle = color;

        ctx.lineWidth = 4;

        ctx.stroke();


        /* Text */

        ctx.font =
            "bold 34px Arial";

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";

        ctx.fillStyle =
            "#ffffff";

        ctx.fillText(
            text,
            badgeCanvas.width / 2,
            badgeCanvas.height / 2
        );


        const texture =
            new THREE.CanvasTexture(
                badgeCanvas
            );

        texture.needsUpdate = true;


        const material =
            new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                depthTest: false
            });


        const sprite =
            new THREE.Sprite(material);


        sprite.scale.set(
            1.12,
            0.56,
            1
        );


        sprite.userData.baseScale =
            1.12;


        return sprite;

    }


    const badges = [

        {
            text: "HTML",
            color: "#ff7b35",
            position: [-2.75, 1.25, 0.35],
            speed: 0.85
        },

        {
            text: "CSS",
            color: "#4f9fff",
            position: [2.65, 1.05, 0.55],
            speed: 1.05
        },

        {
            text: "JS",
            color: "#f7d84b",
            position: [2.85, -0.55, 0.3],
            speed: 0.72
        },

        {
            text: "GSAP",
            color: "#6cf0a7",
            position: [-2.75, -0.65, 0.25],
            speed: 0.92
        },

        {
            text: "GIT",
            color: "#ff6f42",
            position: [0.35, 1.9, -0.4],
            speed: 0.7
        }

    ];


    badges.forEach(
        (item, index) => {

            const badge =
                createBadge(
                    item.text,
                    item.color
                );

            badge.position.set(
                item.position[0],
                item.position[1],
                item.position[2]
            );

            badge.userData = {

                baseX: item.position[0],

                baseY: item.position[1],

                baseZ: item.position[2],

                speed: item.speed,

                phase: index * 0.8

            };

            badgeGroup.add(badge);

        }
    );


    /*====================================
        PARTICLES
    =====================================*/

    const particleCount =
        isMobile ? 75 : 160;

    const positions =
        new Float32Array(
            particleCount * 3
        );


    for (
        let i = 0;
        i < particleCount;
        i++
    ) {

        const i3 = i * 3;

        positions[i3] =
            (Math.random() - 0.5) * 9;

        positions[i3 + 1] =
            (Math.random() - 0.5) * 6;

        positions[i3 + 2] =
            (Math.random() - 0.5) * 5;

    }


    const particlesGeometry =
        new THREE.BufferGeometry();

    particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );


    const particlesMaterial =
        new THREE.PointsMaterial({

            color: 0x7b61ff,

            size:
                isMobile
                    ? 0.028
                    : 0.037,

            transparent: true,

            opacity: 0.76,

            sizeAttenuation: true

        });


    const particles =
        new THREE.Points(
            particlesGeometry,
            particlesMaterial
        );

    root.add(particles);


    /*====================================
        CURSOR STATE
    =====================================*/

    const pointer = {
        x: 0,
        y: 0
    };


    const smoothPointer = {
        x: 0,
        y: 0
    };


    function updatePointer(event) {

        const rect =
            hero.getBoundingClientRect();

        const x =
            (event.clientX - rect.left)
            / rect.width;

        const y =
            (event.clientY - rect.top)
            / rect.height;

        pointer.x =
            THREE.MathUtils.clamp(
                (x - 0.5) * 2,
                -1,
                1
            );

        pointer.y =
            THREE.MathUtils.clamp(
                (y - 0.5) * 2,
                -1,
                1
            );

    }


    hero.addEventListener(
        "pointermove",
        updatePointer,
        { passive: true }
    );


    hero.addEventListener(
        "pointerleave",
        () => {

            pointer.x = 0;
            pointer.y = 0;

        },
        { passive: true }
    );


    /*====================================
        RESIZE
    =====================================*/

    function resize() {

        const width =
            Math.max(
                mount.clientWidth,
                320
            );

        const height =
            Math.max(
                mount.clientHeight,
                380
            );

        renderer.setSize(
            width,
            height,
            false
        );

        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();

    }


    window.addEventListener(
        "resize",
        resize,
        { passive: true }
    );


    /*====================================
        CLOCK
    =====================================*/

    const clock =
        new THREE.Clock();


    /*====================================
        VISIBILITY GATE
        Pauses the render loop once the
        hero is scrolled out of view, so
        this WebGL scene isn't rendering
        every frame forever in the
        background while reading the rest
        of the page.
    =====================================*/

    let isSceneVisible = true;
    let rafId = null;

    const visibilityObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                isSceneVisible = entry.isIntersecting;

                if (isSceneVisible && rafId === null) {

                    rafId = requestAnimationFrame(animate);

                }

            });

        },
        { rootMargin: "200px 0px 200px 0px" }
    );

    visibilityObserver.observe(hero);


    /*====================================
        ANIMATION
    =====================================*/

    function animate() {

        rafId = null;

        const elapsed =
            clock.getElapsedTime();


        /* Smooth mouse */

        smoothPointer.x +=
            (
                pointer.x
                - smoothPointer.x
            ) * 0.055;

        smoothPointer.y +=
            (
                pointer.y
                - smoothPointer.y
            ) * 0.055;


        if (!reducedMotion) {

            /* Laptop rotation */

            const targetY =
                smoothPointer.x *
                (isMobile ? 0.08 : 0.34);

            const targetX =
                -smoothPointer.y *
                (isMobile ? 0.06 : 0.2);


            laptopGroup.rotation.y +=
                (
                    targetY
                    - laptopGroup.rotation.y
                ) * 0.055;


            laptopGroup.rotation.x +=
                (
                    targetX
                    - laptopGroup.rotation.x
                ) * 0.055;


            /* Depth movement */

            laptopGroup.position.x +=
                (
                    smoothPointer.x * 0.11
                    - laptopGroup.position.x
                ) * 0.035;


            laptopGroup.position.z +=
                (
                    smoothPointer.x * 0.16
                    - laptopGroup.position.z
                ) * 0.035;


            /* Floating */

            laptopGroup.position.y =
                0.18 +
                Math.sin(
                    elapsed * 1.25
                ) * 0.12;


            /* Platform */

            platform.rotation.y =
                elapsed * 0.045;


            /* Rings */

            outerRing.rotation.z =
                elapsed * 0.18;

            middleRing.rotation.z =
                -elapsed * 0.30;

            innerRing.rotation.z =
                elapsed * 0.42;


            /* Particles */

            particles.rotation.y =
                elapsed * 0.018;

            particles.rotation.x =
                Math.sin(
                    elapsed * 0.17
                ) * 0.06;


            /* Platform glow */

            platformGlow.scale.setScalar(
                1 +
                Math.sin(elapsed * 1.4) * 0.035
            );


            /* Lights */

            purpleLight.position.x =
                3.5 +
                Math.sin(elapsed * 0.75) * 0.9;

            purpleLight.position.y =
                2.4 +
                Math.cos(elapsed * 0.5) * 0.45;


            cyanLight.position.x =
                -3.8 +
                Math.cos(elapsed * 0.65) * 0.9;

            cyanLight.position.y =
                -1.5 +
                Math.sin(elapsed * 0.6) * 0.45;


            rimLight.position.x =
                Math.sin(elapsed * 0.4) * 2;


            /* Floating tech badges */

            badgeGroup.children.forEach(
                (badge) => {

                    const data =
                        badge.userData;

                    badge.position.x =
                        data.baseX +
                        Math.sin(
                            elapsed *
                            data.speed +
                            data.phase
                        ) * 0.10;


                    badge.position.y =
                        data.baseY +
                        Math.cos(
                            elapsed *
                            data.speed +
                            data.phase
                        ) * 0.13;


                    badge.position.z =
                        data.baseZ +
                        Math.sin(
                            elapsed *
                            0.7 +
                            data.phase
                        ) * 0.08;


                    const pulse =
                        1 +
                        Math.sin(
                            elapsed * 1.4 +
                            data.phase
                        ) * 0.035;


                    badge.scale.set(
                        1.12 * pulse,
                        0.56 * pulse,
                        1
                    );

                }
            );

        }


        renderer.render(
            scene,
            camera
        );


        if (isSceneVisible) {

            rafId = requestAnimationFrame(
                animate
            );

        }

    }


    /*====================================
        INITIALIZE
    =====================================*/

    resize();
    animate();


    /*====================================
        GSAP ENTRANCE
    =====================================*/

    if (
        window.gsap &&
        !reducedMotion
    ) {

        gsap.fromTo(
            laptopGroup.scale,
            {
                x: 0.72,
                y: 0.72,
                z: 0.72
            },
            {
                x: 1,
                y: 1,
                z: 1,
                duration: 1.5,
                delay: 0.35,
                ease: "expo.out"
            }
        );


gsap.fromTo(
    laptopGroup.position,

    {
        x: 0,
        y: -0.8,
        z: -1.5
    },

    {
        x: 0,
        y: 0.15,
        z: 0,

        duration: 1.8,
        delay: 0.25,

        ease: "power4.out"
    }
);


gsap.fromTo(
    laptopGroup.rotation,

    {
        x: -0.28,
        y: -0.42,
        z: 0
    },

    {
        x: 0,
        y: 0,
        z: 0,

        duration: 1.8,
        delay: 0.25,

        ease: "power4.out"
    }
);

        gsap.fromTo(
            [outerRing.scale, middleRing.scale, innerRing.scale],
            {
                x: 0,
                y: 0,
                z: 0
            },
            {
                x: 1,
                y: 1,
                z: 1,
                duration: 1.25,
                delay: 0.85,
                stagger: 0.1,
                ease: "back.out(1.8)"
            }
        );


       /*====================================
    TECH BADGE ENTRANCE
=====================================*/

badgeGroup.children.forEach((badge, index) => {

    /* Start hidden */

    badge.scale.set(0, 0, 0);

    badge.material.opacity = 0;


    /* Animate scale */

    gsap.to(
        badge.scale,
        {
            x: 1.12,
            y: 0.56,
            z: 1,

            duration: 0.75,

            delay:
                1.15 + (index * 0.11),

            ease: "back.out(1.7)"
        }
    );


    /* Animate opacity */

    gsap.to(
        badge.material,
        {
            opacity: 1,

            duration: 0.55,

            delay:
                1.15 + (index * 0.11),

            ease: "power2.out"
        }
    );

});
    }
/*====================================
  MOBILE FIT: sharp, undistorted, nothing cut off
  (phones only - desktop is not touched)
=====================================*/
if (isMobile) {
  const fitMobile = () => {
    const w = Math.max(mount.clientWidth, 280);
    const h = Math.max(mount.clientHeight, 200);
    renderer.setPixelRatio(Math.min((window.devicePixelRatio || 1) * 1.5, 3));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = Math.max(8.4, 12 / camera.aspect);
    camera.updateProjectionMatrix();
  };
  fitMobile();
  window.addEventListener("resize", fitMobile, { passive: true });
  if (typeof lap3d !== "undefined") lap3d.scale.setScalar(0.9);
  badgeGroup.children.forEach((b) => {
    b.userData.baseX *= 0.85;
  });
}
})();
