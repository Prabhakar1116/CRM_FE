CRM (Customer Relationship Management) System

1. Introduction
This CRM system is designed for a textile shop to manage customer relationships, track communications, and analyze sales data. It provides features for customer management, feedback collection, and reporting.

2. Base URL
The base URL for all API endpoints is: http://localhost:5000/api

3. Admin Registration Code
The admin registration code is: 123456

4. Authentication
The system uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header for protected routes:


5. API Endpoints

5.1. Auth
- POST /auth/register - Register a new user
- POST /auth/login - Login and receive a token

5.2. Customers
- GET /customers - Get all customers
- GET /customers/:id - Get a specific customer
- POST /customers - Create a new customer
- PUT /customers/:id - Update a customer
- DELETE /customers/:id - Delete a customer

5.3. Contacts
- GET /contacts - Get all contacts
- POST /contacts - Create a new contact
- PUT /contacts/:id - Update a contact
- DELETE /contacts/:id - Delete a contact

5.4. Communications
- GET /communications - Get all communications
- POST /communications - Create a new communication
- PUT /communications/:id - Update a communication
- DELETE /communications/:id - Delete a communication

5.5. Feedback
- GET /feedback - Get all feedback
- POST /feedback - Submit new feedback

5.6. Reports
- GET /reports/textile-specific - Get textile-specific reports

6. Data Models

6.1. User
- name: string
- email: string
- password: string
- role: enum['user', 'admin']

6.2. Customer
- name: string
- email: string
- phone: string
- address: string
- preferences: {
    fabricTypes: string[]
    colors: string[]
    designs: string[]
    patterns: string[]
    seasons: string[]
    occasions: string[]
  }

6.3. Contact
- name: string
- email: string
- phone: string
- customerId: ref to Customer

6.4. Communication
- customerId: ref to Customer
- type: string
- date: Date
- summary: string

6.5. Feedback
- customerId: ref to Customer
- rating: number
- comment: string

7. Frontend Routes
- / - Dashboard
- /login - Login page
- /register - Registration page
- /customers - Customer list
- /customers/:id - Customer details
- /customers/new - Add new customer
- /customers/:id/edit - Edit customer
- /contacts - Contact list
- /communications - Communication list
- /feedback - Feedback list
- /feedback/new - Submit new feedback
- /reports - Reports page
- /admin/users - Manage users (admin only)
- /admin/reports - Admin reports (admin only)

After starting the development server, navigate to `http://localhost:3000` in your web browser to access the CRM system.

2. Technologies Used

- Frontend: React, Redux, React Router, Formik, Yup, React-Bootstrap
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT
- Additional libraries: Recharts for data visualization, React-Toastify for notifications

For more details on dependencies, refer to the package.json file:
