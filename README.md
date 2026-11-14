# Asteroid Dodge

<img width="531" height="555" alt="game" src="https://github.com/user-attachments/assets/f21e4dae-70ca-4683-9664-d5b27f83ec80" />

A 2D arcade-style space survival game built with vanilla JavaScript, HTML5 `<canvas>`, and CSS3. Created as an extra credit project for **GIT 418: Multimedia Authoring, Scripting and Production**.

## Overview
Players pilot a rocket ship through deep space while dodging incoming waves of asteroids. The goal is to survive as long as possible to achieve the highest frame-based score before colliding with an obstacle.

## Features & Technical Highlights
* **HTML5 Canvas Rendering:** Dynamically generates and manages a 500×300 game viewport using JavaScript DOM manipulation (`document.createElement("canvas")`) and the 2D rendering context.
* **Custom Game Loop (`setInterval`):** Runs a 50 FPS animation loop (updating every 20ms) that clears the canvas, updates object coordinates, and redraws sprites on every frame.
* **Seamless Scrolling Background:** Loops a starry space backdrop (`space.jpg`) continuously across the screen to simulate forward flight.
* **Procedural Obstacle Spawning:** Uses frame-interval math (`everyinterval(100)`) and `Math.random()` to generate asteroids at randomized vertical positions along the right edge of the viewport.
* **Bounding-Box Collision Detection:** Implements custom hitbox math (`crashWith()`) to detect overlaps between the player's ship and active obstacles, halting the game loop upon impact.
* **Dynamic Sprite States & D-Pad UI:** Features an on-screen directional control pad (`UP`, `DOWN`, `LEFT`, `RIGHT`) wired to mouse/touch events that swap the rocket artwork between an active thruster animation (`space-ship.gif`) and an idle state (`no-fuel.gif`).

## How to Play
1. **Launch:** Open `index.html` in any modern web browser.
2. **Controls:** Press and hold the on-screen **UP**, **DOWN**, **LEFT**, or **RIGHT** buttons on the control pad below the viewport to maneuver the rocket ship. Releasing a button stops movement and cuts the thrusters.
3. **Objective:** Dodge incoming asteroids. Your score (`SCORE`) tracks in the top-right corner and increases continuously for every frame you survive.
4. **Game Over:** Colliding with an asteroid immediately stops the game. Refresh the page to start a new run.

## Technologies Used
* **HTML5** (`<canvas>` element and semantic structure)
* **CSS3** (custom viewport framing and D-pad button layout)
* **JavaScript** (DOM manipulation, object constructors, arrays, event handlers, and animation intervals)

## Project Structure
* `index.html` – Main entry point, CSS styling, and on-screen D-pad controls
* `script.js` – Core game engine, collision logic, and canvas rendering *(remove this line if your JS is inside `index.html`)*
* `space.jpg` – Scrolling background texture
* `space-ship.gif` / `no-fuel.gif` – Player rocket sprite animations
* `asteroid.gif` – Obstacle sprite
