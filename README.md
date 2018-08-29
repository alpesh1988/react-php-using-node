This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Install modules](#install-modules)
- [Available Scripts](#available-scripts)
  - [npm run client](#npm-run-client)
  - [npm run server](#npm-run-server)
- [Update PHP Path](#update-php-path)
- [Database Setup](#database-setup)
- [REST API sample](#rest-api-sample)
- [Service Worker](#service-worker)
- [Screenshots](#screenshots)

## Install Modules

In the project directory, run: 

### `npm install`

It will install node modules mentioned in package.json file which are required to run the application.

## Available Scripts

In the project directory, you can run:

### `npm run client`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run server`

Launches the node server which is able to serve *.php files.<br>
Open [http://localhost:4000/fetchproducts](http://localhost:4000/fetchproducts) to view response in the browser.

## Update PHP path

Follow the instuctions provided in server.js file.

## Database Setup

I have used MySQL as database. Please find DB_DDL_DML.sql file at root folder. You can import this file in your MySQL admin.

## REST API Sample

  1. To fetch the product data:
     
     <b>URL:</b> localhost:4000/fetchproducts<br>
     <b>Method:</b> GET

  2. To add the product data:

     <b>URL:</b> localhost:4000/addproduct<br>
     <b>Method:</b> POST<br>
     <b>Data:</b> {"data":{"name":"laptop a3","description":"laptop a3","price":"38000"}}

  3. To edit the product data:

     <b>URL:</b> localhost:4000/editproduct<br>
     <b>Method:</b> POST<br>
     <b>Data:</b> {"data":{"id":"7","name":"laptop a3_edited","description":"laptop a3_edited","price":"38000"}}

  4. To delete the product data:

     <b>URL:</b> localhost:4000/deleteproduct?id=7<br>
     <b>Method:</b> DELETE

## Service worker

This repo uses service worker which you can see in developer tools. Each time I am updating the data cache when add, edit or delete functinality is performed. Once application is up, you can see DB data on localhost:3000. Now you can terminate client (stop npm run client command), You can still perform data manipulation activities with service workers. :)


## Screenshots

- ![Homepage](demo-images/homepage.png)


Don't forget to add star If you find this repository helpful.