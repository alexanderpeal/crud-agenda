# Task Management Application Backend

## Run backend
```
npm run dev
```

## Run tests
```
npm run test
```

## Run mutation tests
```
npx stryker run
```

## Setup
Ensure .env is present and has the following variables:

### NODE_ENV
Manage environment using the NODE_ENV variable.
Choose between 'development', 'test', and 'production'.
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

## Troubleshooting
Ensure MongoDB recognizes IP address when testing using Stryker

## TODO: add apidoc
add apidoc/jsdoc full functionality
add logging
verify new schema works
make request robust for frontend
frontend should be able to manip db access read write deletes create


## Changelog
- v1.0.3: Added support for UPDATE and DELETE requests
- v1.0.2: Added support for GET and POST requests
- v1.0.1: Added basic database view page

## Features to be added
- Allow user to update tasks on criteria besides the name