# Template for NodeJS-Angular projects

## TL;DR:

1. Clone this git repo ```git clone https://github.com/tretyakovalex/nodejs-angular-form-template.git```
2. Navigate to ```backend``` folder
3. Run ```npm install```
4. Run ```node app.js```
5. This project will be running on ```localhost:4000``` (by default)
6. Navigate to ```frontend``` folder
7. Run ```npm install```
8. Run ```ng serve```

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

 - The ```app.use('/auth', login)``` middleware connect the login route to the main server files via the ```'/auth'``` url. The ```login``` itself is imported from the ```routes/login.js``` using:
   ```Javascript
   const login = require('./routes/login');
   ```
 - The ```routes/login.js``` file contains the router.post function that will accept the post request from the Angular frontend when the form is submitted.
   Inside this function, we get the data via ```req.body``` and store it in ```const user```.
   Additionally, if you want to connect a database and send the form to that database, you can do so inside this function.
   Here are the links to templates that cover how to do this using MySQL and MongoDB:
     - [MySQL](https://github.com/tretyakovalex/NodeJS-MySQL-Template)
     - [MongoDB](https://github.com/tretyakovalex/NodeJS-MongoDB-Template)

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
    - NgForm
    - and SCSS

### Setup:
#### The Angular form works in the following manner:
 - The ```home.component.html``` file contains the form template.
   Inside the ```<form>``` tag, ```#loginForm="ngForm"``` is used to reference form inside the Angular code.
   The ```(ngSubmit)="Login()"``` is an Angular event binding that binds the form's submission event to the Login() function.
   The ```name``` attribute of the ```<input>``` tag would be used by Angular to access the data of this input tag and the ```ngModel``` allows for the two-way data binding.
   Finally, the ```<button type="submit">Send</button>``` triggers the form submission event.

 - The ```home.component.ts``` file handles the login form submission, getting the data from the form and sending it to the backend via a post request.
   ```@ViewChild('loginForm') loginForm!: NgForm;``` ```loginForm``` inside ```@ViewChild``` specifies the template reference variable that is used in our ```<form #loginForm="ngForm">``` tag.
   We specify the url that will be used when sending the form to the backend: ```LOGIN_URL = 'http://localhost:4000/auth/login';```
   The ```Login(){}``` function is used to get the form data and send it to the backend.
   We access and store the inputs of our form using:
     ```Typescript
     const username = this.loginForm.value.username;
     const password = this.loginForm.value.password;
     ```
   We specify that our data will be of type JSON using HTTPHeaders: ```const headers = new HttpHeaders({'Content-type': 'application/json'});```
   Then we create an object that will contain the form data:
   ```Typescript
     const reqObject = {
      username: username,
      password: password
     }
   ```
   Then we send the post request using ```this.http.post()``` function where we provide the 'Login url', 'the object', and 'the headers'.

  #### Configuring NgForm Library and HTTPClient:
  - To use the NgForm library and HTTPClient we need to import them inside ```app.module.ts``` file:
  ```Typescript
    import { FormsModule } from '@angular/forms';
    import { HttpClientModule } from '@angular/common/http';
    @NgModule({
      ...,
      imports: [
        FormsModule,
        HttpClientModule
      ],
      ...
    })
  ```

 - The Angular frontend builds to the folder ```public``` inside of the ```backend``` folder.
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
