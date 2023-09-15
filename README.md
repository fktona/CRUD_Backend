 
 
  # API Class Structure

This section provides a textual representation of the class structure and relationships in our API.

## Class Descriptions

### Express App

- **Description:** Our Node.js Express application that handles API requests and routes.
- **Attributes:**
  - `app`: The Express instance.
- **Endpoints:**
  - `POST /api`: Create a new person.
  - `GET /api/:userId`: Get details of a person by ID.
  - `PUT /api/:userId`: Update details of a person by ID.
  - `DELETE /api/:userId`: Delete a person by ID.
  - `POST /api/byname`: Create a new person by name.
  - `GET /api/byname/:userName`: Get people by name.
  - `GET /api/allusers`: Get all users.

### Firebase Admin

- **Description:** The Firebase Admin SDK configuration and connection.
- **Attributes:**
  - `admin`: The Firebase Admin instance.
  - `databaseURL`: The Firebase database URL.
  - `credential`: Authentication credentials.

### Firestore

- **Description:** Firebase Firestore, our NoSQL database.
- **Attributes:**
  - `collection('people')`: The 'people' collection where user data resides.

### Person

- **Description:** A model class representing an individual person.
- **Attributes:**
  - `name`: The person's name.
  - `age`: The person's age.
  - `email`: The person's email address.
- **Methods:**
  - `add()`: Add a new person.
  - `get()`: Get details of a person.
  - `update()`: Update a person's details.
  - `delete()`: Delete a person.
  - `getAll()`: Get details of all users.

## Relationships

- The **Express App** interacts with **Firebase Admin** and **Firestore** to perform CRUD operations on the **Person** model.
- The **Person** model interacts with **Firestore** to read, update, delete, and fetch all person records.

This textual representation provides an overview of the key components and their interactions in our API.

 
  ### UML DIAGRAM
```
+-------------------+       +-----------------------+
|     Express App  |       |    Firebase Admin    |
+-------------------+       +-----------------------+
| - app             |       | - admin               |
|                   |       | - databaseURL         |
| + POST /api       |       | - credential          |
| + GET /api/:userId|       |                       |
| + PUT /api/:userId|       |                       |
| + DELETE /api/:userId|    |                       |
| + POST /api/byname|       +-----------------------+
| + GET /api/byname/:userName|
| + GET /api/allusers|     
|                   |
+-------------------+
         |
         |
         |
+-------------------+
|      Firestore    |
+-------------------+
|                   |
| + collection('people')|
|                   |
+-------------------+
         |
         |
         |
+-------------------+
|      Person       |
+-------------------+
| - name            |
| - age             |
| - email           |
| + add()           |
| + get()           |
| + update()        |
| + delete()        |
| + getAll()        |
+-------------------+ 
```
