# Task Management Application (Back-end)

## Run
To run back-end server:
```
npm run dev
```

## Setup
If cloning, be sure to add the URI to your MongoDB server. 
See the section on .env variables below.

## IMPORTANT - Use of .env variables in this project

### NODE_ENV
Manage environment using the NODE_ENV variable.
Choose between 'development', 'test', and 'production'.
Example:
```
NODE_ENV = "development"
```

### API_VERSION
Set backend API version using the API_VERSION variable.
Example:
```
API_VERSION = "v1"
API_VERSION = "v2"
```

### MONGODB_URI
Add the URI for the MongoDB server to connect to the database.
Example:
```
MONGODB_URI = "mongodb+srv://<your_mongodb_uri_here>"
```

## View docs using jsdoc
For certain files in the back-end, you can view documention using jsdoc: 
https://github.com/jsdoc/jsdoc

I generate docs by using:


## Changelog
- v1.0.3: Added support for UPDATE and DELETE requests
- v1.0.2: Added support for GET and POST requests
- v1.0.1: Added basic database view page

## Features to be added
- Allow user to update tasks on criteria besides the name