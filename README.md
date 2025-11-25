# Coming Soon Page

An interactive, immersive coming soon page featuring a 3D animated logo with particle effects.

## Features

- **3D Logo Interaction**: Logo tilts and rotates based on mouse position
- **Glitch Effect**: RGB glitch animation on hover
- **Click Ripples**: Expanding wave effect on click
- **Magnetic Pull**: Logo follows cursor when hovering
- **Cursor Trail**: Fading dot trail follows your mouse
- **Three.js Background**: Animated wireframe geometry and floating particles
- **Orbital Rings**: Rotating rings with orbiting dots
- **Scanner Line**: Horizontal light sweep effect
- **Easter Egg**: Press ↑/↓ arrow keys to adjust intensity

## Project Structure

```
coming-soon-app/
├── index.html      # Main HTML file
├── styles.css      # All CSS styles and animations
├── script.js       # JavaScript interactions and Three.js
├── assets/
│   └── logo.png    # Your logo file
└── README.md       # This file
```

---


---

## Customization

### Change the Logo
Replace `assets/logo.png` with your own logo file (keep the same filename, or update references in `index.html`)

### Modify Colors
Edit `styles.css` - search for `rgba(255,255,255` to find white color values

### Adjust Animation Speed
In `styles.css`, modify `animation-duration` values
In `script.js`, modify timing values in animation functions

### Change Intensity Defaults
In `script.js`, modify the `intensity` variable (default: 1, range: 0.5-3)

---

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (touch support included)

---

## Performance Notes

- Animations pause when tab is hidden
- Reduced motion support for accessibility
- Mobile-optimized (some effects disabled on small screens)

---

## License

Feel free to use and modify for your own projects.
