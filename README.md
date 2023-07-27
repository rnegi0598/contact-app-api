# Contact Manager App

## Rest API Convention

### CRUD Actions | HTTP methods | Endpoints  
Get all contacts | GET | /api/contacts  
Get contact  | GET | /api/contacts/:id  
Create contact | POST | /api/contacts  
Update contact | PUT | /api/contacts/:id  
Delete contact  | DELETE | /api/contacts/:id  
  
Register a user | POST | /register  
Login a user | POST | /login  
Current info of user | GET | /current  

npm i express  
npm i dotenv  
npm i body-parser  

## Error Handling
If name or email or phone field are empty then throw error that all fields are mandatory. As it will be an html page and not in json format we will add a middleware to handle that.
The middleware errorHandler will be placed as last middleware.
Inside the errorHandler middleware we will use the err object to get the necessary properties and send them using json.
status codes =>
Client error response  
- VALIDATION_ERROR: 400 (Bad request)
- UNAUTHORIZED: 401 
- FORBIDDEN: 403
- NOT_FOUND: 404
Server error response  
- SERVER_ERROR: 500

## Async Handler
To manage try catch block inside the async functions.  
npm i express-async-handler


## mongodb setup
(mongoose cheat sheet)[https://weblab.mit.edu/public/databases-cheatsheet.pdf]
sign in mongo db
mongodb atlas => create cluster

databases contain one or more collections of documents.
collection in mongodb: table in rdbms
documents in mongodb: row (single entry) in rdbms

set connection string in .env file


npm i mongoose
create dbConnection.js in config/ and set mongoose db in it . 

