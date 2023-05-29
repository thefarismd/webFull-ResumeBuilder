# FRS ResumeBuilder

A brief description or tagline for your project.

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

## Installation

Provide instructions on how to install and set up the project. Include any dependencies or requirements that need to be fulfilled.

## Usage

Explain how to use your project. Provide examples, code snippets, or screenshots to demonstrate its usage. Describe any configuration options or important considerations.

## Environment Variables

This project uses environment variables for configuration. Before running the project, make sure to set up the `.env` file with the required variables.

1. Create a new file named `.env` in the root directory of the project.
2. Open the `.env` file and add the following variables:

The following environment variables are required in the `.env` file:

- `MONGODB_URI`: The URI for connecting to the project's MongoDB database. This variable should contain the MongoDB connection string, including necessary credentials and other connection details.
- `SECRET_KEY`: The secret key used for JWT token generation and verification. This key is important for securing your JWT tokens and should be kept confidential.
- `PORT`: The port number on which the project will run.

Make sure to replace these variable names with the actual environment variables used in your project.

## License

State the license under which your project is released. Choose an appropriate open-source license and include the license file in your repository.

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
5. If you face any "use of deprecated webpack DevServer onBeforeSetupMiddleware and onAfterSetupMiddleware options" you can refer to this [GitHub Pull Request](https://github.com/facebook/create-react-app/pull/11862/files/2dff88610f9ad215349424d1769b88e0a0d2fa1d) for a potential fix.

### Backend Dependencies

- express
- mongoose
- nodemon
- concurrently
- dotenv
- bcrypt

## Contributing

Specify guidelines and instructions for others who may want to contribute to your project. Explain how to submit issues, suggestions, or pull requests.

## Contact

Email: thefarismd@icloud.com
Contact: +65 93374545
