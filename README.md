## #Telephone directory MERN project

This project was created to demonstrate my skill in web development

---

### Stacks

The application server uses Node.js in combination with the Express framework. The server supports two types of connections: http and web socket. Web sockets are supported by the socket.io library. The database used is mongodb with the mongoose library. Also, the project has the ability to change the QUERY_PARAMETERS variable to change the data storage location from the database to the file system. Jwt tokens are used to authorize users. The client uses React to interact with the server. The entire project is placed in Docker containers.

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

```JS
npm install
```

Start to the client:

```JS
npm start
```

Start the server:

```JS
node server.js
```

Start for the Docker container:

```JS
docker-compose build
```

```JS
docker-compose up
```
