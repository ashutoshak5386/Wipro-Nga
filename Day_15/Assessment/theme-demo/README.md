Day 15 – React Hooks & State Management

This project implements all four challenges assigned for Day 15, using the structure built previously in Day 14 as the base boilerplate. All features have been integrated into a single cohesive React application.

Challenge 5: React Context API
User Story

Users should be able to switch between light and dark themes across the entire application, without passing theme props manually through component hierarchies.

Implementation

A ThemeContext was created using createContext().

The global theme state and a toggle function are provided from App.js using ThemeContext.Provider.

Components consume the theme using the useContext hook.

A fixed-position theme toggle button updates the theme globally.

The selected theme is stored in localStorage and automatically restored on refresh.

Result

A fully functional global light/dark mode system that persists across sessions and updates the UI consistently.

Challenge 6: Progressive Web App (PWA)
User Story

The application should be installable as a Progressive Web App and should continue to function even when offline.

Implementation

Added a manifest.json file to support app installation.

Implemented a custom service-worker inside the public directory to enable offline caching.

Registered the service worker inside index.js in production mode.

Introduced an offline detection banner that appears whenever network connectivity is lost.

Ensured all core assets are cached for offline use.

Result

The application is installable, continues to work offline, and meets PWA requirements when tested through Lighthouse.

Challenge 7: React Hooks – Workout Tracker
User Story

Users should be able to track workout sets and view a running timer that automatically increments every second, with proper cleanup and the ability to reuse timer logic.

Implementation

Built a dedicated WorkoutTracker component.

Implemented useState for set counts and display values.

Used useRef to maintain interval references and rest timing.

Added useEffect for setting up and cleaning intervals.

Created a reusable custom hook useTimer() that handles the timer logic (start, stop, reset).

Result

A fully functional workout tracking tool demonstrating practical use of React Hooks and custom hook abstraction.

Challenge 8: Redux Toolkit – Global State Management
User Story

An admin should be able to fetch, view, and update product data globally across the application.

Implementation

Configured the Redux store using configureStore().

Created a productsSlice using createSlice().

Added fetchProducts as an asynchronous thunk for simulating product retrieval.

Implemented the updateProduct reducer for modifying existing data.

Connected Redux to the UI using useSelector and useDispatch.

Result

A global state management layer that handles asynchronous fetching, live updates, and predictable state transitions.

Day 14 Usage as Boilerplate

The structural foundation of this project, including the layout, lazy-loaded components, portal modal, pure component examples, and error boundary, originates from Day 14 and serves as the boilerplate for the features added on Day 15. The Day 14 functionality remains intact and integrated within the final application.

Project Structure
src/
  App.js
  ThemeContext.js
  index.js
  index.css
  serviceWorkerRegistration.js
  hooks/
    useTimer.js
  redux/
    store.js
    productsSlice.js
  components/
    CourseDetails.jsx
    InstructorProfile.jsx
    StatsCard.jsx
    WorkoutTracker.jsx
    ErrorBoundary.jsx
    Modal.jsx
    Products.jsx
public/
  index.html
  manifest.json
  service-worker.js

How to Run

Install dependencies and start the development server:

npm install
npm start

Building and Testing the PWA

Create a production build:

npm run build


Serve the build locally:

npx serve -s build


Open the served site in a browser to test offline behavior, installation, and Lighthouse PWA compliance.