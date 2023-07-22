# Ficticium | Electronic e-commerce
This is a basic e-commerce project used for the React course. The application allows you to view a list of supermarket products and make online purchases. The products and purchase orders are stored in Firebase.

## Technologies Used
- Vite
- React
- React Router
- Firebase

## Features
- View a list of available products
- Add products to the shopping cart
- View the shopping cart
- Place an order
- Dynamic categories
- Persistent cart

## Installation

### To install and run the application on your local machine, follow these steps:

1. Clone the repository to your local machine.
2. Open a terminal in the project directory.
3. Run the command `npm install` to install the dependencies.
4. Run the command `npm run dev` to start the application.
5. Open your browser and navigate to `http://localhost:5173` to see the application in action.

## Firebase Configuration

### To use Firebase in this application, follow these steps:

1. Create an account on Firebase and create a new project.
2. In the "Authentication" section of Firebase, enable the email and password authentication provider.
3. In the "Firestore" section of Firebase, create a new database and configure the security rules to allow read/write access only to authenticated users.
4. In the "Project settings" section of Firebase, click "Add app" and follow the instructions to add a new web application.
5. Copy the Firebase credentials and configure the environment variables in your project's .env file.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.
