# Input sorter and displayer for Mapsted

### Usage
On terminal 1, start backend server
```
cd server
npm start
```
On terminal 2, start frontend webpage
```
cd mapsted
npm start
```

### Run through of important files to look at

##### In Front-end (./mapsted)

- ./mapsted/src/components/input-dropdown.js
- ./mapsted/src/components/main-container.js
- ./mapsted/src/components/result-display.js

##### In Back-end (./server)

- ./server/algorithms/quicksort.js
- ./server/controllers/sorting-controller.js
- ./server/db/
- ./server/routes/sorting-route.js
- ./server/db.js

### Note of developing the project

This small project was done in a rush due to time constraints so some short-cuts were taken:

1. Used create-react-app to quickly generate a functional front-end boilerplate
2. Used express-generator to quickly generate a functional back-end boilerplate
3. Used react-dropdown for a simple dropdown menu component
4. Due to lack of proper knowledge and experience with React, the front-end's visuals are not great
5. Due to personal preference, the front and back-end are started up separately using npm start. This can be changed by modifying the package.json files and merging the folders.