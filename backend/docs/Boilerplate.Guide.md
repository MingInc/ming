Here are the detailed instructions for testing your Bun server's API with Postman, including creating, retrieving, updating, and deleting boilerplates, as well as deploying projects.

### 1. **Set Up the Environment**

Before making requests in Postman, you’ll want to set up some global variables for reusability:

- **Base URL**: `http://localhost:3000/api/v1`
- **Headers**: You’ll need to add `Content-Type: application/json` for POST and PUT requests.

### 2. **Creating a Boilerplate (POST)**

**Endpoint**: `/boilerplate`

1. Open Postman, create a new request.
2. Set the method to `POST`.
3. In the **URL** field, enter `{{base_url}}/boilerplate`.
4. Under the **Headers** tab, add the following:
   - Key: `Content-Type`
   - Value: `application/json`
5. Go to the **Body** tab, select `raw`, and add the following JSON in the body:
    ```json
    {
        "id": "1",
        "title": "Next.js Blog",
        "description": "A simple blog built with Next.js",
        "category": "Next.js",
        "githubUrl": "https://github.com/user/repo",
        "framework": "Next.js",
        "image": "https://example.com/image.png"
    }
    ```
6. Click **Send** to create the new boilerplate.
7. **Response**: You should receive a `200 OK` status with the created boilerplate details.

### 3. **Retrieving All Boilerplates (GET)**

**Endpoint**: `/boilerplates`

1. Create a new request.
2. Set the method to `GET`.
3. In the **URL** field, enter `{{base_url}}/boilerplates`.
4. No body or headers are needed.
5. Click **Send** to retrieve all boilerplates.
6. **Response**: You should get a list of all boilerplates in JSON format.

### 4. **Retrieving a Single Boilerplate by ID (GET)**

**Endpoint**: `/boilerplate/:id`

1. Create a new request.
2. Set the method to `GET`.
3. In the **URL** field, enter `{{base_url}}/boilerplate/1` (replace `1` with the actual `id`).
4. No body or headers are needed.
5. Click **Send** to retrieve the boilerplate with the specified ID.
6. **Response**: The boilerplate data matching the ID should be returned.

### 5. **Updating a Boilerplate (PUT)**

**Endpoint**: `/boilerplate/:id`

1. Create a new request.
2. Set the method to `PUT`.
3. In the **URL** field, enter `{{base_url}}/boilerplate/1` (replace `1` with the actual `id`).
4. Under the **Headers** tab, add:
   - Key: `Content-Type`
   - Value: `application/json`
5. Go to the **Body** tab, select `raw`, and add the updated data:
    ```json
    {
        "title": "Updated Next.js Blog",
        "description": "An updated description for the blog",
        "category": "Updated Category",
        "githubUrl": "https://github.com/user/repo-updated",
        "framework": "Updated Framework",
        "image": "https://example.com/updated-image.png"
    }
    ```
6. Click **Send** to update the boilerplate.
7. **Response**: You should receive a `200 OK` status with the updated boilerplate details.

### 6. **Deleting a Boilerplate (DELETE)**

**Endpoint**: `/boilerplate/:id`

1. Create a new request.
2. Set the method to `DELETE`.
3. In the **URL** field, enter `{{base_url}}/boilerplate/1` (replace `1` with the actual `id`).
4. No body or headers are needed.
5. Click **Send** to delete the boilerplate.
6. **Response**: You should receive a `200 OK` status confirming the deletion.

### 7. **Deploying a Project (POST)**

**Endpoint**: `/deploy-project`

1. Create a new request.
2. Set the method to `POST`.
3. In the **URL** field, enter `{{base_url}}/deploy-project`.
4. Under the **Headers** tab, add:
   - Key: `Content-Type`
   - Value: `application/json`
5. Go to the **Body** tab, select `raw`, and add the following:
    ```json
    {
        "projectName": "My New Project",
        "githubUrl": "https://github.com/user/project",
        "_id": "project-id-123"
    }
    ```
6. Click **Send** to deploy the project.
7. **Response**: You should receive deployment logs or a confirmation of the deployment status.

### 8. **Status Check (GET)**

**Endpoint**: `/status`

1. Create a new request.
2. Set the method to `GET`.
3. In the **URL** field, enter `{{base_url}}/status`.
4. Click **Send**.
5. **Response**: You should get a response with the message `I am alive!`.

---

### Summary of API Endpoints:

| Method | URL                              | Description                        |
|--------|----------------------------------|------------------------------------|
| POST   | `/boilerplate`                   | Create a new boilerplate           |
| GET    | `/boilerplates`                  | Get all boilerplates               |
| GET    | `/boilerplate/:id`               | Get a boilerplate by ID            |
| PUT    | `/boilerplate/:id`               | Update a boilerplate by ID         |
| DELETE | `/boilerplate/:id`               | Delete a boilerplate by ID         |
| POST   | `/deploy-project`                | Deploy a project                   |
| GET    | `/status`                        | Check server status                |

Now you're all set to test your Bun API using Postman! You can run all the CRUD operations on the boilerplates and deploy projects as per the routes configured.