Online Marketplace Inventory Management
=======================================

This repository contains the source code for a simple online marketplace inventory management system implemented using TypeScript, Node.js, Amazon SQS, SNS, Lambda, Docker, and a chosen ORM (e.g., Prisma, TypeORM, Sequelize). The system allows users to manage products, receive notifications when product quantities are low, and integrates with AWS services for messaging and event processing.

Table of Contents
-----------------

-   [Objective]
-   [Requirements]
-   [Project Structure]
-   [Installation]
-   [Configuration]
-   [Usage]
-   [Testing]
-   [Deployment]
-   [API Endpoints]
-   [Documentation]
-   [Features]
-   [What's Left Out]
-   [Contributing]
-   [License]

Objective
---------

The objective of this take-home assignment is to create a simple online marketplace inventory management system. The system should allow users to perform CRUD operations on products, send messages to an SQS queue when a product is created, consume messages from the queue using a Lambda function, and send SNS notifications when the quantity of a product falls below a certain threshold.

Requirements
------------

To run the application, you need to have the following installed on your system:

-   Node.js (v14 or later)
-   Docker

Project Structure
-----------------

The project has the following structure:

- src/

  - controllers/

    - auth.controller.ts
    - users.controller
    - product.controller.ts


  - services/
    
    - auth.service.ts
    - users.service.ts
    - product.service.ts

  - routes/
    
    - auth.routes.ts
    - users.routes.ts
    - product.routes.ts

  - utils/

    - aws/
        - lambda.ts
        - sns.ts
        - sqs.ts

  - app.ts
  - client.ts
  - index.ts


- package.json

- tsconfig.json

- Dockerfile
-   `src/`: Contains the source code for the application.
    -   `controllers/`: Contains the controllers responsible for handling HTTP requests and responses.
    -   `services/`: Contains the business logic and services.
    -   `routes/`: Contains the route handlers for different endpoints.
    -   `utils/`: Contains utility functions for working with AWS SQS and SNS.
    -   `index.ts`: The entry point of the application.
-   `package.json`: Contains the project dependencies and scripts.
-   `tsconfig.json`: The TypeScript configuration file.
-   `Dockerfile`: The Docker configuration file for containerizing the application.
Installation
------------

1.  Clone the repository:
git clone <https://github.com/Smeks-ops/stream-ft-assessment>

2.  Install the dependencies:
    cd stream-ft-assessment

    npm install

Configuration
-------------

Before running the application, you need to configure the following environment variables:

-   `DATABASE_URL`: The URL of your PostgreSQL database.
-   `AWS_REGION`: The AWS region where your SQS and SNS resources are located.
-   `AWS_ACCESS_KEY_ID`: The AWS access key ID with the necessary permissions.
-   `AWS_SECRET_ACCESS_KEY`: The AWS secret access key corresponding to the access key ID.

You can set these environment variables in a `.env` file located in the root directory of the project.

Usage
-----

To start the application, run the following command:

```bash
npm dev
```

This will start the application and make it accessible at `http://localhost:3000`.

Testing
-------

To run the tests, use the following command:
npm test
This will execute the test suites and provide feedback on the test results.

Deployment
----------

To deploy the application, you can use Docker. The repository includes a `Dockerfile` that builds a Docker image for the application. You can build the Docker image using the following command:
```
docker build -t online-marketplace .
```
Once the image is built, you can run the container using the following command:
```
docker run -p 3000:3000 online-marketplace
```
The application will be accessible at `http://localhost:3000`.

API Endpoints
------------------
List of available routes:

**Auth routes**:\
`POST /v1/auth/register` - register\
`POST /v1/auth/login` - login\
`POST /v1/auth/refresh-tokens` - refresh auth tokens\
`POST /v1/auth/forgot-password` - send reset password email\
`POST /v1/auth/reset-password` - reset password\
`POST /v1/auth/send-verification-email` - send verification email\
`POST /v1/auth/verify-email` - verify email

**User routes**:\
`POST /v1/users` - create a user\
`GET /v1/users` - get all users\
`GET /v1/users/:userId` - get user\
`PATCH /v1/users/:userId` - update user\
`DELETE /v1/users/:userId` - delete user

**Product routes**:\
`POST /v1/products` - create a product\
`GET /v1/products` - get all products\
`GET /v1/products/:productId` - get product\
`PUT /v1/products/:productId` - update product\
`DELETE /v1/products/:productId` - delete product

Documentation
------------------

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/16662064-bae992f3-32c1-4dfb-908b-418977d733a1?action=collection%2Ffork&collection-url=entityId%3D16662064-bae992f3-32c1-4dfb-908b-418977d733a1%26entityType%3Dcollection%26workspaceId%3D5edad285-5775-4d3e-ad3f-d1675fa2e5e1)


Features
-------------------

The following features were implemented on the inventory management system:

-   The creation of CRUD endpoints for the products.
-   An authentication system for users using JWT.
-   CRUD endpoints for users.
-   Implemented pagination and sorting for the `GET /products` endpoint to retrieve products in a controlled manner.
-   AWS lambda, sqs and sns implementations

What's Left Out
-------------------
The following features are yet to be done:

-   Implementing a search feature to filter products based on criteria such as name, price range, or category.
-   Adding an additional table for categories and allow products to be assigned to categories.
-   Endpoints to generate reports for inventory status, sales, or other relevant information.


Contributing
------------

Contributions are welcome! If you have any ideas, suggestions, or improvements, please submit a pull request.

License
-------

[MIT License]