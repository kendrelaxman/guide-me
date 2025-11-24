# GuideMe Library

A lightweight, framework-agnostic JavaScript library for creating feature tours and hints for your web applications.

## Features
- **Feature Tours**: Step-by-step guide with Next/Prev navigation.
- **Hints**: Pulsing beacons to provide on-demand tooltips.
- **Framework Agnostic**: Works with React, Angular, Vue, or Vanilla JS.
- **Lightweight**: No heavy dependencies.

## Installation

Currently, you can include the files directly from the `packages/guideme` directory.

```bash
# Example structure
/packages/guideme
  - index.js
  - style.css
```

## Usage

### 1. Import the Library
Import the JS class and the CSS file.

```javascript
import { GuideMe } from './path/to/guideme/index.js';
import './path/to/guideme/style.css';
```

### 2. Define Steps
Create an array of steps for your tour.

```javascript
const steps = [
  {
    element: '#sidebar', // CSS Selector
    title: 'Navigation',
    description: 'Use the sidebar to navigate.',
    position: 'right' // top, bottom, left, right
  },
  {
    element: '#header',
    title: 'Header',
    description: 'Manage your profile here.',
    position: 'bottom'
  }
];
```

### 3. Initialize and Start
Initialize the class with options and call `start()` to begin the tour.

```javascript
const guide = new GuideMe(steps, {
  persistHints: false, // If false, hints disappear after clicking (default: true)
  runOnce: true,       // If true, tour runs only once per user (default: false)
  tourId: 'my-tour-v1' // Unique ID for tracking runOnce status
});

document.getElementById('start-btn').addEventListener('click', () => {
  guide.start();
});
```

### 4. Add Hints (Optional)
You can also add static hints to elements.

```javascript
guide.addHints([
  {
    element: '#new-feature',
    title: 'New Feature',
    description: 'Check out this new tool!',
    position: 'top'
  }
]);
```

## Styling
The library comes with a default `style.css`. You can override the classes to match your application's theme.

- `.guideme-popover`: The main tooltip container.
- `.guideme-highlight-helper`: The box highlighting the target element.
- `.guideme-hint-beacon`: The pulsing dot for hints.

## License
ISC
