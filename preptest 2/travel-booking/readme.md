Travel Booking Platform
Overview
A modern travel booking web application built with React. Users can explore featured destinations, browse travel packages, and make bookings through a validated form. This project demonstrates component-based architecture, routing, API integration, state management, and PWA support.

Features
Responsive homepage with featured destinations

Travel package listing, details, and booking form

Routing using React Router

Data fetching from a mock API (json-server)

Form validation using Formik and Yup

Global state management (Context or Redux)

Error boundaries for reliable UI

PWA setup for offline support

Folder Structure
text
/MockPracticeAssessment/
│-- userstory1/
│     ├── App.js
│     ├── DestinationCard.js
│     ├── Header.js
│     ├── Footer.js
│-- userstory2/
│     ├── views/
│         ├── Home.js
│         ├── Packages.js
│         ├── Contact.js
│     ├── routerConfig.js
│-- userstory3/
│     ├── BookingForm.js
│     ├── store/
│     │   ├── actions.js
│     │   ├── reducers.js
│     ├── context/
│     ├── hooks/
│-- db.json
│-- screenshots/
│     ├── homepage.png
│     ├── packages.png
│     ├── contacts.png
│-- public/
│     ├── manifest.json
Getting Started
Install dependencies
npm install

Start mock API
Make sure db.json is present in root.
npx json-server --watch db.json --port 5000

Run the React app
npm start

Access the app
Open http://localhost:3000 in your browser.

Tech Stack
React

React Router DOM

Axios

Formik + Yup

Context API / Redux

Bootstrap

json-server (mock REST API)

PWA (CRA template)

Screenshots
Add screenshots of homepage, packages list, and booking form in the /screenshots folder for quick reference.

Notes
Booking requires the mock API to be running on port 5000.

For offline use, the PWA service worker must be active.