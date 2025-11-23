# ShopNow E-Commerce Platform

## Project Overview
ShopNow is a comprehensive e-commerce application designed to demonstrate modern full-stack development practices. The platform features a responsive React frontend and a robust Node.js/Express backend, implementing key functionalities such as user authentication, product management, and dynamic routing. The architecture follows a modular design pattern, ensuring scalability and maintainability suitable for professional deployment.

## Key Features
The application integrates ten distinct user stories into a cohesive experience. The frontend utilizes React best practices, including functional components, hooks, and Formik for validation. It features a secure login system, a dynamic product catalog, and a user profile management interface. The backend is powered by Express.js, providing RESTful API endpoints secured with JWT authentication and validated using express-validator.

## Technical Implementation
- **Frontend:** Built with React and Vite, the client-side application employs a component-based architecture. Key components include a responsive navigation system, a real-time status bar, and a custom debug widget for UI testing.
- **Backend:** The server-side logic is organized into controllers, routes, and middleware. It handles data persistence through a mock database configuration and ensures security via environment-based secret management.
- **Security & Performance:** The platform implements essential security measures, including token-based authentication and input validation, while optimizing performance through efficient asynchronous data handling.

## Getting Started
To run the application locally, navigate to the `server` directory and execute `npm start` to launch the backend on port 4000. Simultaneously, in the `client` directory, run `npm run dev` to start the frontend interface on port 5173.
