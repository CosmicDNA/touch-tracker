# Touch Tracker

[![Netlify Status](https://api.netlify.com/api/v1/badges/451cd02f-c290-4ce7-83aa-d77a1110448f/deploy-status)](https://app.netlify.com/projects/touchtracker/deploys)
![GitHub License](https://img.shields.io/github/license/CosmicDNA/touch-tracker)
[![DeepScan grade](https://deepscan.io/api/teams/23301/projects/30555/branches/982345/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=23301&pid=30555&bid=982345)

A simple, performant web application for visualizing multi-touch events on a full-screen canvas. This tool is designed to help developers and designers inspect the properties of touch interactions in real-time, including position, size, and rotation.

## Features

*   **Real-time Visualization**: See touch points appear on the screen as you interact with your device.
*   **Multi-Touch Support**: Tracks and displays multiple simultaneous touch points.
*   **Detailed Touch Properties**: Visualizes and displays coordinates (`clientX`, `clientY`), ellipse radius (`radiusX`, `radiusY`), and `rotationAngle`.
*   **Performant Rendering**: Uses the HTML `<canvas>` API and `requestAnimationFrame` for smooth, jank-free animations that don't trigger unnecessary React re-renders.
*   **Modern Tech Stack**: Built with React and Vite for a fast and efficient development experience.

## Tech Stack

*   **Framework**: React
*   **Build Tool**: Vite
*   **Linting**: ESLint with the neostandard configuration

## Getting Started

To run this project locally, follow these steps.

### Prerequisites

Make sure you have Node.js installed (v18 or higher is recommended).

### Installation

1.  Clone the repository to your local machine:
    ```sh
    git clone https://github.com/CosmicDNA/touch-tracker
    cd touch-tracker
    ```

2.  Install the dependencies:
    ```sh
    npm install
    ```

3.  Start the development server:
    ```sh
    npm run dev
    ```

Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`). To see the touch visualizations, open the site on a touch-enabled device or use your browser's developer tools to simulate touch events.

## Acknowledgements
Based on Patrick Lauke's https://github.com/patrickhlauke/touch

## Powered by

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)](https://www.netlify.com/)