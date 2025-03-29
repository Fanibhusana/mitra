# Mitra - Charity Donation Web App 🌍 ❤️  

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white)
[![Build Status](https://img.shields.io/github/actions/workflow/status/your-username/your-repo-name/ci.yml)](https://github.com/your-username/your-repo-name/actions)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-brightgreen.svg)](https://github.com/your-username/your-repo-name/releases)

## Overview

Mitra is a full-stack charity donation platform that allows users to donate seamlessly to various charities. Built with **React.js, Vite, Spring Boot, and MySQL**, the platform ensures a **secure, efficient, and user-friendly** experience. It allows users and charity organizations to manage their profiles, upload images, and handle transactions securely.

## Features

### User Panel
- Secure **JWT Authentication** (Register/Login)
- Browse & donate to **verified charities**
- View **past donations** & track contribution history
- Upload & manage **profile pictures** (Cloudinary)

### Charity Panel
- Manage **charity profiles & images**
- View **received donations**

### Admin Panel
- Manage **users, charities, and donations**
- View **total donations per charity & user**
- Secure **role-based access control (RBAC)**

### Additional Features
- **Cloudinary Integration** for image storage
- **Payment Gateway** for test transactions
- **Modern UI** with smooth animations (Framer Motion)
- **Responsive Design** (Tailwind CSS)

## Technologies Used

### Frontend
- React.js (Vite) ⚡
- Tailwind CSS 🎨
- Framer Motion (Animations) 🎥

### Backend
- Java: Programming language.
- Spring Boot: Framework for building the application.
- Maven: Dependency management.
- Cloudinary: Cloud-based image and video management service.
- JWT: JSON Web Tokens for secure authentication.

### Database & Storage
- MySQL (Relational Database)
- Cloudinary (Image Hosting)

## Getting Started

### Prerequisites
- Node.js
- Java 17 or higher
- Maven 3.6.0 or higher
- Cloudinary account
- MySQL

### Installation & Setup

#### Clone the Repository
```sh
git clone https://github.com/Fanibhusana/mitra.git
cd mitra-charity-donation
```

#### Frontend Setup
```sh
cd client
npm install
npm run dev
```
Runs the app on `http://localhost:5173`

#### Backend Setup

1. Configure MySQL Database
   - Create a MySQL database and update the `application.properties`:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/mitra_db
     spring.datasource.username=root
     spring.datasource.password=yourpassword
     cloudinary.cloud_name=your_cloud_name
     cloudinary.api_key=your_api_key
     cloudinary.api_secret=your_api_secret
     ```

2. Build and Run the Backend Server
   ```sh
   cd server
   mvn clean install
   mvn spring-boot:run
   ```
   Runs the backend on `http://localhost:8080`

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Register User
- **POST** `/api/auth/login`: Login User

### User
- **GET** `/api/users/me`: Get User Profile
- **GET** `/api/users/donations`: View Donations
- **POST** `/api/users/register`: Register a new user.
- **GET** `/api/users/{id}`: Get user by ID.
- **GET** `/api/users/email/{email}`: Get user by email.
- **DELETE** `/api/users/{id}`: Delete user by ID.
- **PUT** `/api/users/{id}`: Update user by ID.

### Admin
- **GET** `/api/admin/users`: Get All Users
- **DELETE** `/api/admin/users/{id}`: Delete User
- **GET** `/api/admin/charities`: Get all charities.
- **DELETE** `/api/admin/charities/{id}`: Delete charity by ID.
- **GET** `/api/admin/transactions`: Get all transactions.

### Charity
- **GET** `/api/charities`: Get All Charities
- **POST** `/api/charities/register`: Register Charity
- **GET** `/api/charities/{id}`: Get charity by ID.
- **GET** `/api/charities/email/{email}`: Get charity by email.
- **DELETE** `/api/charities/{id}`: Delete charity by ID.
- **PUT** `/api/charities/update/{id}`: Update charity by ID.

### Image Upload
- **POST** `/api/upload/image`: Upload an image.
- **POST** `/api/upload/user/{userId}`: Upload user image.
- **POST** `/api/upload/charity/{charityId}`: Upload charity image.
- **PUT** `/api/upload/user/{userId}/update-image`: Update user image.
- **PUT** `/api/upload/charity/{charityId}/update-image`: Update charity image.
- **DELETE** `/api/upload/user/{userId}`: Delete user image.
- **DELETE** `/api/upload/charity/{charityId}`: Delete charity image.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

- **Author**: Fanibhusana
---
