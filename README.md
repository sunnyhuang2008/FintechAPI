# FintechAPI
RESTful fintechapi that provides essential portfolio information and market data.

# Setup 
Note: The node_module.zar should have the below modules installed except node and npm themselves. However, you can reinstall them by following the steps below to make sure. 

1) Install [npm and node][1] if you haven't already. 
  - check installation by running ``` node -v ``` and ``` npm -v ``` respectively on the command line terminal.
2) Create a folder for this project and navigate to that folder.
3) Clone this repo and either decompress node_module.zar or delete node_module.zar and perform the below commands.
3) Install mongoose by running ``` npm install mongoose --save ```. This will allow us to interact with the MongoDB. 
4) Install request by running ``` npm install request ```.
5) Install express by running ``` npm install express --save ```.
6) Install body-parser by running ``` npm install body-parser --save ```. This dependency will allow us to parse http requests. 

# Structure

## server.js
This is the main file that defines and runs the server. We register the routes, data models and declare use of body-parser in this file. 

## fintechRoutes.js
This file defines the HTTP routing and the corresponding functions to call in the controller. 

## fintechController.js
This file deflines the functionalites that this API will perform. We will add functionalites on this file. 

## fintechModel.js
This file defines the data models we will use to store instances of mongoose data items in MongoDB. We are still working out the details of the data models to store essential portfolio data efficently. 



[1]:https://nodejs.org/en/download/
