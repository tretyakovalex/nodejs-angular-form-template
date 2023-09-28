# Template for NodeJS-Angular projects

## TL;DR:

1. Clone this git repo ```git clone https://github.com/tretyakovalex/NodeJS-Angular-Template.git```
2. Navigate to ```backend``` folder
3. Run ```npm install```
4. Run ```node app.js```
5. This project will be running on ```localhost:4000``` (by default)

## NodeJS (backend):

### Specification:

 **App.js file**
  - This tells the NodeJS server to render the Angular frontend that is located inside  the ```/backend/public/``` folder. All paths that are specified in Angular work out of the box, so no other configurations are necessary on the backend side :)
  ``` JavaScript
    app.use(express.static(path.join(__dirname, 'public')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'))
    });
  ```

  - The bodyParser part of the middleware is reponsible for handling JSON requests that are sent to the server via a url, and CORS middleware suppresses the same-origin policy allows the frontend (and its urls) to be send and receive requests from the server.
  ``` Javascript
    // Middleware setup
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(cors());
  ```

### Setup:

 1. Run ```npm install```
 2. For local build, run ```npm start``` 

 Additional:

 - To specify a different port for the server change the ```PORT``` variable in ```.env``` file in your backend folder. (If not specified, the default port ```4000``` will be used).

## Angular (frontend):

### Build the Angular Frontend:
1. ```cd frontend```
2. **If building for the first time, first run (else skip step 2)** ```npm install``` 
2. ```ng build```

### Specification:
 - Angular Version 14.0
    - includes Angular routing
    - and SCSS

### Setup:
 - The angular frontend builds to the folder ```public``` inside of the ```backend``` folder.
    - To modify the path to build the angular frontend, change the ```outputPath``` in the ```build``` object of the ```angular.json``` file.
    - Ex.   
    ```JSON
    "build": {
        "builder": "@angular-devkit/build-angular:browser",
        "options": {
        "outputPath": "../backend/public",
        ...
        }
        ...
    }
    ```
   
 - From inside the frontend folder, run the command: ```ng build``` to build the angular frontend.

### Misc:
 **How to setup routing:**
  - Specify the url paths for files in the file ```/frontend/scr/app/app-routing.module.ts``` inside the routes array by creating an object with a ```path``` and ```component``` attributes. 
    - The ```path``` will include the sub-domain path of the url.
        - Ex. For the home path we leave the path empty
        - Ex. For an about component path we would be ```{path: "about", component: AboutComponent}```
    - The ```component``` attribute connects the Angular component to the path:
        - Ex. For the HomeComponent we would have the following route: ```{path: "", component: HomeComponent}```
  - The Angular component is specified in the ```/frontend/scr/app/app.module.ts``` file
    - If you create an Angular component using the Angular CLI (Ex. ```ng g c pages/home```) the HomeComponent will be automatically added to this ```app.module.ts``` file.
