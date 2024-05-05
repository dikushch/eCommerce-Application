# eCommerce-Application

Welcome to our eCommerce application repository! This project replicates real-world shopping experiences in a digital environment, offering an interactive and seamless shopping portal to users. Below, you'll find comprehensive information on the project's purpose, technology stack, available scripts, and setup instructions.

## Purpose

The purpose of our eCommerce application is to provide users with an engaging online shopping experience. Whether users are browsing for products, adding items to their cart, or completing transactions, our platform aims to streamline the entire process, making it intuitive and enjoyable.

## Technology Stack

Our eCommerce application is built using the following technology stack:
- TypeScript
- SCSS
- HTML

## Available Scripts

We have several scripts available to facilitate development, testing, and deployment:
- `build`: Runs webpack to build the project for production.
- `dev`: Runs webpack-dev-server to start a development server.
- `lint`: Runs ESLint to lint TypeScript files.
- `lint:fix`: Runs ESLint with the --fix option to automatically fix linting issues.
- `format`: Runs Prettier to format TypeScript files.
- `ci:format`: Checks TypeScript files for formatting issues using Prettier and ESLint.
- `pre-commit`: Checks TypeScript files for formatting and linting issues before committing changes.
- `prepare`: Sets up Husky, a Git hooks manager, for pre-commit checks.
- `test`: Runs Jest to execute unit tests.

## Usage Instructions

Here are step-by-step instructions for setting up and running the project locally:
1. **Clone the repository to your local machine**: 
git clone https://github.com/your-username/eCommerceApp.git

2. **Navigate to the project directory**: 
cd eCommerceApp

3. **Install dependencies**: 
npm install

4. **To build the project for production**: 
npm run build

5. **To start a development server**: 
npm run dev

### Additional Notes:

- Make sure you have Node.js and npm installed on your machine before running the above commands.
