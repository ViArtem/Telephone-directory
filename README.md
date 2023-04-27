## #Telephone directory MERN project

This project was created to demonstrate my skill in web development

---

### Stacks

The application server uses Node.js in combination with the Express framework. The server supports two types of connections: http and WebSocket. WebSockets are supported by the socket.io library. The databases used is mongodb with the mongoose and MySQL. Also, the project has the ability to change the QUERY_PARAMETERS variable to change the data storage location from the database to the file system. Jwt tokens are used to authorize users. The client uses React to interact with the server. The entire project is placed in Docker containers.

---

### Functionality

When trying to run the program, an unauthorized user will be prompted to log in with a login and password. If they do not have a valid account, they will need to register. When registering, you need to specify your email, first and last name, password, and add an avatar.
Upon successful authorization, you will be granted access to the application's functionality.
The program is divided into roles, admin and user. The user role is set by default.

An authorized user can:

1. Search for contacts in the database.
2. Add your own contacts.
3. All contacts that the user has added to the database can be edited and deleted, all others can only be viewed.
4. View the history of your requests

Additional features of the administrator:

1. Edit and delete all contacts
2. View the history of requests for all time
3. View information about a contact when you click on it

---

### Quick start

####Start the server:

After cloning the project to your computer, add the `.env ` file to the root of the `server` folder and add the following parameters to it:

- URL - the string to connect to MongoDB. Type: string

- ACCESS_KEY - the key for your access token. Type: string

- REFRESH_KEY - the key for your refresh token. Type: string

- QUERY_PARAMETERS - a parameter that indicates how to save data:

  - mongo - the project connects to mongoDB and interacts only with it. Type: string
  - mySQL - the project connects to mySQL and interacts only with it. Type: string
  - Any other specified parameter will indicate interaction with the file system.

- FRONTEND_URL - the address where your client is running. Type: string

- MYSQL_ROOT_PASSWORD - password from MySQL. Type: string

- MYSQL_DATABASE - the table you use in MySQL. Type: string

Next, be sure to add the `images` folder to the root of the `server` folder

Open the server folder in the terminal and enter the following command:

```JS
npm install
```

```JS
node server.js
```

####Start the client:

To run the client, first add the `.env` file and add the following parameter

- REACT_APP_SERVER_URL - the address of the server to which you are sending the request.

Next, open the client folder in the terminal and enter the following commands:

```JS
npm install
```

```JS
npm start
```

####Start for the Docker container:
Start the docker, then open the main project folder in the terminal and enter the following commands:

```JS
docker-compose build
```

```JS
docker-compose up
```
