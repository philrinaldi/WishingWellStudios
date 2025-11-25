// ============================================
// Global Variables
// ============================================

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;
let cursorX = 0;
let cursorY = 0;
let intensity = 1;
let isHovering = false;

// DOM Elements
const logo3d = document.getElementById('logo-3d');
const logoWrapper = document.getElementById('logo-wrapper');
const spotlight = document.getElementById('spotlight');
const particlesContainer = document.getElementById('particles');
const trailContainer = document.getElementById('cursor-trail');

// ============================================
// Spotlight Effect
// ============================================

document.addEventListener('mousemove', (e) => {
    spotlight.style.left = e.clientX + 'px';
    spotlight.style.top = e.clientY + 'px';
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    mouseX = (e.clientX - centerX) / centerX;
    mouseY = (e.clientY - centerY) / centerY;
    
    cursorX = e.clientX;
    cursorY = e.clientY;
});

// ============================================
// Interactive 3D Logo Effect
// ============================================

function animate3D() {
    // Ultra-smooth interpolation
    currentX += (mouseX - currentX) * 0.06;
    currentY += (mouseY - currentY) * 0.06;
    
    const rotateX = currentY * 30;
    const rotateY = currentX * -30;
    const translateZ = Math.abs(currentX * currentY) * 80;
    const scale = 1 + Math.abs(currentX * currentY) * 0.1;
    
    logo3d.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateZ(${translateZ}px)
        scale(${scale})
    `;
    
    requestAnimationFrame(animate3D);
}

animate3D();

// ============================================
// Cursor Trail Effect
// ============================================

const trailDots = [];
const trailLength = 20;

function initCursorTrail() {
    for (let i = 0; i < trailLength; i++) {
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        dot.style.transition = `opacity ${0.1 + i * 0.02}s`;
        trailContainer.appendChild(dot);
        trailDots.push({
            element: dot,
            x: 0,
            y: 0
        });
    }
}

function animateTrail() {
    let prevX = cursorX;
    let prevY = cursorY;
    
    trailDots.forEach((dot, index) => {
        const speed = 0.3 - (index * 0.01);
        
        dot.x += (prevX - dot.x) * speed;
        dot.y += (prevY - dot.y) * speed;
        
        dot.element.style.left = dot.x + 'px';
        dot.element.style.top = dot.y + 'px';
        dot.element.style.opacity = 1 - (index / trailLength);
        dot.element.style.transform = `translate(-50%, -50%) scale(${1 - (index / trailLength) * 0.5})`;
        
        prevX = dot.x;
        prevY = dot.y;
    });
    
    requestAnimationFrame(animateTrail);
}

initCursorTrail();
animateTrail();

// ============================================
// Floating Particles
// ============================================

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const x = Math.random() * window.innerWidth;
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;
    
    particle.style.left = `${x}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.opacity = Math.random() * 0.4 + 0.1;
    
    particlesContainer.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, (duration + delay) * 1000);
}

// Create initial particles
for (let i = 0; i < 40; i++) {
    setTimeout(createParticle, i * 150);
}

// Continuously create particles
setInterval(createParticle, 400);

// ============================================
// Three.js Background
// ============================================

function initThreeJS() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Create multiple wireframe geometries
    const geometries = [
        new THREE.IcosahedronGeometry(2, 1),
        new THREE.OctahedronGeometry(1.5, 0),
        new THREE.TetrahedronGeometry(1, 0)
    ];
    
    const wireframes = geometries.map((geo, i) => {
        const material = new THREE.MeshBasicMaterial({ 
            color: 0xffffff, 
            wireframe: true,
            transparent: true,
            opacity: 0.03 + (i * 0.01)
        });
        const mesh = new THREE.Mesh(geo, material);
        mesh.position.set(
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3
        );
        scene.add(mesh);
        return mesh;
    });
    
    // Create floating points
    const pointsGeometry = new THREE.BufferGeometry();
    const pointsCount = 800;
    const positions = new Float32Array(pointsCount * 3);
    
    for (let i = 0; i < pointsCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 25;
        positions[i + 1] = (Math.random() - 0.5) * 25;
        positions[i + 2] = (Math.random() - 0.5) * 25;
    }
    
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const pointsMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.015,
        transparent: true,
        opacity: 0.4
    });
    
    const points = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(points);
    
    // Create connecting lines
    const linesGeometry = new THREE.BufferGeometry();
    const linesPositions = [];
    
    for (let i = 0; i < 80; i++) {
        const x1 = (Math.random() - 0.5) * 20;
        const y1 = (Math.random() - 0.5) * 20;
        const z1 = (Math.random() - 0.5) * 20;
        
        const x2 = x1 + (Math.random() - 0.5) * 4;
        const y2 = y1 + (Math.random() - 0.5) * 4;
        const z2 = z1 + (Math.random() - 0.5) * 4;
        
        linesPositions.push(x1, y1, z1, x2, y2, z2);
    }
    
    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linesPositions, 3));
    
    const linesMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.04
    });
    
    const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
    scene.add(lines);
    
    camera.position.z = 6;
    
    // Animation
    let time = 0;
    
    function animate() {
        requestAnimationFrame(animate);
        
        time += 0.0008;
        
        wireframes.forEach((mesh, i) => {
            mesh.rotation.x = time * (0.3 + i * 0.1) + mouseY * 0.3;
            mesh.rotation.y = time * (0.2 + i * 0.1) + mouseX * 0.3;
            mesh.rotation.z = time * (0.1 + i * 0.05);
        });
        
        points.rotation.x = time * 0.15;
        points.rotation.y = time * 0.08;
        
        lines.rotation.x = -time * 0.08;
        lines.rotation.y = -time * 0.1;
        
        // Subtle camera movement
        camera.position.x = Math.sin(time * 2) * 0.3;
        camera.position.y = Math.cos(time * 2) * 0.3;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
    
    // Store references for intensity updates
    window.threeJSElements = { pointsMaterial, linesMaterial };
}

initThreeJS();

// ============================================
// Click Ripple Effect
// ============================================

logoWrapper.addEventListener('click', (e) => {
    const rect = logoWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Create multiple ripples
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 0;
                height: 0;
                border: ${2 - i * 0.5}px solid rgba(255,255,255,${0.8 - i * 0.2});
                border-radius: 50%;
                transform: translate(-50%, -50%);
                animation: ripple ${1 + i * 0.3}s ease-out forwards;
                pointer-events: none;
            `;
            
            logoWrapper.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 1500);
        }, i * 100);
    }
    
    // Pulse effect on click
    logo3d.style.transition = 'transform 0.1s ease-out';
    logo3d.style.transform += ' scale(1.1)';
    setTimeout(() => {
        logo3d.style.transition = 'transform 0.05s ease-out';
    }, 100);
});

// ============================================
// Magnetic Hover Effect
// ============================================

logoWrapper.addEventListener('mouseenter', () => {
    isHovering = true;
});

logoWrapper.addEventListener('mousemove', (e) => {
    if (!isHovering) return;
    
    const rect = logoWrapper.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    logoWrapper.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
});

logoWrapper.addEventListener('mouseleave', () => {
    isHovering = false;
    logoWrapper.style.transform = 'translate(0, 0)';
});

// ============================================
// Keyboard Easter Egg - Intensity Control
// ============================================

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        intensity = Math.min(intensity + 0.2, 3);
        updateIntensity();
    } else if (e.key === 'ArrowDown') {
        intensity = Math.max(intensity - 0.2, 0.5);
        updateIntensity();
    }
});

function updateIntensity() {
    document.querySelectorAll('.orbit-ring').forEach(ring => {
        ring.style.borderWidth = `${intensity}px`;
        ring.style.opacity = 0.1 * intensity;
    });
    
    if (window.threeJSElements) {
        window.threeJSElements.pointsMaterial.opacity = 0.4 * intensity;
        window.threeJSElements.linesMaterial.opacity = 0.04 * intensity;
    }
}

// ============================================
// Touch Support for Mobile
// ============================================

document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    
    spotlight.style.left = touch.clientX + 'px';
    spotlight.style.top = touch.clientY + 'px';
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    mouseX = (touch.clientX - centerX) / centerX;
    mouseY = (touch.clientY - centerY) / centerY;
});

// ============================================
// Performance Optimization
// ============================================

// Pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Could pause intensive animations here
    } else {
        // Resume animations
    }
});

// Log ready state
console.log('🚀 Coming Soon page loaded successfully');
console.log('💡 Tip: Use ↑/↓ arrow keys to adjust visual intensity');
