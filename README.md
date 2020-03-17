<h1 align="center">ExpressJS - Simple Library RESTfull API</h1>

Express.js is a web application framework for Node.js. [More about Express](https://en.wikipedia.org/wiki/Express.js)
## Built With
[![Express.js](https://img.shields.io/badge/Express.js-4.17.1-orange.svg?style=rounded-square)](https://expressjs.com/en/starter/installing.html)
[![Node.js](https://img.shields.io/badge/Node.js-v.v12.10.0-green.svg?style=rounded-square)](https://nodejs.org/)

## Requirements
1. <a href="https://nodejs.org/en/download/">Node Js</a>
2. Node_modules
3. <a href="https://www.getpostman.com/">Postman</a>
4. Web Server (ex. localhost)

## How to run the app ?
1. Open app's directory in CMD or Terminal
2. Type `npm install`
3. Make new file a called **.env**, set up first [here](#set-up-env-file)
4. Turn on Web Server and MySQL can using Third-party tool like xampp, etc.
5. Create a database with the name erasoft-perpus, and Import file [note.sql](note.sql) to **phpmyadmin**
6. Open Postman desktop application or Chrome web app extension that has installed before
7. Choose HTTP Method and enter request url.(ex. localhost:3004/book)
8. You can see all the end point [here](#end-point)

## Set up .env file
Open .env file on your favorite code editor, and copy paste this code below :
```
APP_PORT=3004
APP_URI=http://localhost:3004/
DB_SERVER=localhost//default
DB_USER=root//default
DB_PASSWORD=
DB_DATABASE=erasoft-perpus
```

## End Point
**1. GET**<br>
*a. book*
* `http://localhost:3004/book
* `http://localhost:3004/book/12

*b. member*
* `http://localhost:3004/member
* `http://localhost:3004/member/19

*b. borrowed*
* `http://localhost:3004/borrowed
* `http://localhost:3004/borrowed/1

**2. POST**
* `http://localhost:3004/book/insert
* `http://localhost:3004/member/insert
* `http://localhost:3004/borrowed/insert

**3. PUT**
* `http://localhost:3004/book/51/update
* `http://localhost:3004/member/19/update
* `http://localhost:3004/borrowed/21/update

**3. DELETE**
* `http://localhost:3004/book/51/delete
* `http://localhost:3004/member/19/delete
* `http://localhost:3004/borrowed/21/delete



