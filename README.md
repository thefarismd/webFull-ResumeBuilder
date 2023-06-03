# FRS ResumeBuilder

Resume builder web application.

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)
- [Dependencies](#dependencies)

## Project Description

Provide a detailed description of your project. Explain what it does, its purpose, and any relevant background information. Mention the technologies or frameworks used.

## Features

List the key features and functionalities of your project. Highlight the aspects that make your project unique or useful.

## Usage

Explain how to use your project. Provide examples, code snippets, or screenshots to demonstrate its usage. Describe any configuration options or important considerations.

## Installation

1. Clone the repository
2. `npm install` on frontend and backend folder
3. `npm run dev` on the root directory : This command will concurrently start both the frontend and backend servers

## Environment Variables

This project uses environment variables for configuration. Before running the project, make sure to set up the `.env` file with the required variables.

1. Create a new file named `.env` in the root directory of the project.
2. Open the `.env` file and add the following variables:

The following environment variables are required in the `.env` file:

- `MONGODB_URI`: The URI for connecting to the project's MongoDB database. This variable should contain the MongoDB connection string, including necessary credentials and other connection details.
- `SECRET_KEY`: The secret key used for JWT token generation and verification. This key is important for securing your JWT tokens and should be kept confidential.
- `PORT`: The port number on which the project will run.

Make sure to replace these variable names with the actual environment variables used in your project.

## Dependencies

### Frontend Dependencies

- react-bootstrap
- bootstrap
- axios
- react-router-dom
- @reduxjs/toolkit
- react-redux

### Frontend Dependencies Issues Fix

If you encounter any issues related to frontend dependencies, you can try the following steps to resolve them:

1. Delete the `node_modules` folder and `package-lock.json` file.
2. Run the command `npm cache clean --force`.
3. Install the `@svgr/webpack` package as a dev dependency by running the command `npm install @svgr/webpack --save-dev`.
4. Run the command `npm install`.
5. If you face any `use of deprecated webpack DevServer onBeforeSetupMiddleware and onAfterSetupMiddleware options` you can refer to this [GitHub Pull Request](https://github.com/facebook/create-react-app/pull/11862/files/2dff88610f9ad215349424d1769b88e0a0d2fa1d) for a potential fix.

### Backend Dependencies

- express
- mongoose
- nodemon
- concurrently
- dotenv
- bcrypt

## Contributing

If you'd like to contribute to the project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature/fix: git checkout -b feature/your-feature.
3. Commit your changes: git commit -m "Add your feature".
4. Push to the branch: git push origin feature/your-feature.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- Email: thefarismd@icloud.com
- Whatsapp: +65 93374545
