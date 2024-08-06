# Integrating Advanced Technologies into Hospital Information Systems to Manage Healthcare Data

## Table of Contents

- [Integrating Advanced Technologies into Hospital Information Systems to Manage Healthcare Data](#integrating-advanced-technologies-into-hospital-information-systems-to-manage-healthcare-data)
  - [Table of Contents](#table-of-contents)
  - [Abstract](#abstract)
  - [Introduction](#introduction)
  - [System Overview](#system-overview)
  - [Workflow Overview](#workflow-overview)
  - [Portals](#portals)
  - [User Stories](#user-stories)
  - [Top Features](#top-features)
  - [Demo and Screenshots](#demo-and-screenshots)
  - [How to Run the Project](#how-to-run-the-project)
  - [Swagger API Documentation](#swagger-api-documentation)
  - [System Architecture](#system-architecture)
  - [Technologies \& Tools](#technologies--tools)
  - [Future Work](#future-work)
  - [Code Naming Conventions](#code-naming-conventions)
    - [Variables and Functions](#variables-and-functions)
    - [Classes](#classes)
    - [Files](#files)
    - [Interfaces and Types](#interfaces-and-types)
    - [Folder Structure](#folder-structure)
    - [Constants](#constants)
  - [Contributors](#contributors)
  - [Supervisors](#supervisors)

## Abstract

## Introduction

Egyptian public hospitals, particularly emergency departments, face significant challenges in managing healthcare data. These departments, which operate 24/7, provide immediate care for acute illnesses or injuries and encounter high patient volumes, coordination issues, and gaps in data management.

## System Overview

The system is designed to address these challenges through digitalization, streamlining data management, enhancing communication, and utilizing advanced technologies. It is tailored to meet the needs of emergency departments and integrates various hospital workflows.

## Workflow Overview

The system supports the following hospital workflows:

- **Registration**: Collecting demographic data and recording accompanying persons.
- **Triage Assessment**: Determining patient conditions and directing them to appropriate departments.
- **Examination**: Performing exams, conducting tests, and making treatment decisions.
- **Inpatient**: Managing patient care and monitoring.
- **Discharge**: Handling patient discharge for improvement, referrals, or other reasons.

## Portals

The system includes the following portals:

- **Registration**: Handles patient and group visit registrations.
- **Triage Assessment**: Facilitates digital assessments.
- **Examinations**: Manages diagnostic and treatment processes.
- **Inpatient**: Oversees inpatient care.
- **Admin Panel**: Manages user roles and system configurations.

## User Stories

- **As a Registrar**: I want to quickly and accurately register patients to reduce waiting times.
- **As a Doctor**: I need immediate access to patient data to provide timely treatment.
- **As an Admin**: I want to manage system settings and user roles efficiently.

## Top Features

- **Single Patient Visit Registration**: Efficiently registers individual patients.
- **Group Patients Visits Registration**: Handles multiple patient registrations simultaneously.
- **Anonymous Registration**: Manages unidentified or unconscious patients securely.
- **Enhanced Data Entry**: Utilizes autocomplete and real-time database integration.
- **OCR Implementation**: Extracts and processes data from national ID cards.

## Demo and Screenshots

<iframe width="560" height="315" src="https://www.youtube.com/embed/CGJMwEnW_Fw?si=n6lL_meE7MZHxvoI" frameborder="0" allowfullscreen></iframe>

## How to Run the Project

To run the project using Docker, follow these steps:

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/Zeyad-Amr/Qasr-HIS.git
   cd Qasr-HIS
   ```

2. **Create Environment File**:
   Create a `.env` file in the project root with the necessary environment variables. For example:

   ```env
    DATABASE_URL=postgresql://postgres:password@postgres:5432/nestdb
    JWT_SECRET=your_jwt_secret
    BASE_URL=http://localhost:4000
   ```

3. **Build and Run Docker Containers**:

   ```sh
   docker-compose up --build
   ```

4. **Access the Application**:

   - The application will be available at `http://localhost:3000` for the frontend.
   - The backend API will be available at `http://localhost:4000`.
   - The OCR server will be available at `http://localhost:5000`.

5. **Stopping the Containers**:
   To stop the running containers, use:

   ```sh
   docker-compose down
   ```

By following these steps, you can easily set up and run the project locally using Docker.

## Swagger API Documentation

API documentation is available via [Swagger](https://qasr-server-lqj1.onrender.com/api/docs). It provides interactive endpoints and detailed descriptions for testing and understanding the API.

## System Architecture

The system architecture includes:

- **OCR Server**: Manages image processing and text extraction.
- **EMR Server**: Stores and manages Electronic Medical Records (EMR).
- **API Gateway**: Facilitates secure communication between components.
- **External System Connections**: Integrates with pharmacy, RIS, and LIS via FHIR.
-

## Technologies & Tools

- **Frontend**: TypeScript, Next.js, Material-UI, Axios, Redux-Toolkit, Formik, Yup, Cornerstone.js
- **Backend**: Nest.js, TypeScript, Swagger, JWT
- **Database**: PostgreSQL, Prisma ORM
- **OCR**: Python, OpenCV, Tesseract, Flask, TensorFlow
- **Containerization**: Docker
- **Architecture**: Clean Architecture
- **Wireframing**: Figma
- **Version Control**: GitHub

## Future Work

- **Biometrics**: Integration for enhanced patient identification.
- **Blood Bank**: Development of blood bank management features.
- **Pharmacy**: Integration of pharmacy management.
- **Mobile App**: Development of a mobile application for improved accessibility.

## Code Naming Conventions

### Variables and Functions

Use camelCase.

- **Example**: `const userName: string = "JohnDoe";`
- **Example**: `function calculateTotalPrice(price: number, quantity: number): number { return price * quantity; }`

### Classes

Use PascalCase.

- **Example**: `class UserService { // Class methods and properties }`

### Files

Use kebab-case.

- **Example**: `user-service.ts`
- **Example**: `user-controller.ts`

### Interfaces and Types

Use PascalCase.

- **Example**: `interface UserData { id: number; name: string; }`
- **Example**: `type UserStatus = "active" | "inactive";`

### Folder Structure

Use singular or plural nouns.

- **Example**: `src/components/user/UserList.tsx`
- **Example**: `src/controllers/UserController.ts`
- **Example**: `src/services/UserService.ts`

### Constants

Use uppercase with underscores.

- **Example**: `const MAX_RETRIES: number = 3;`
- **Example**: `const API_BASE_URL: string = "https://api.example.com";`

## Contributors

<table style="width:100%; table-layout: fixed;">
    <tbody>
        <tr>
            <td align="center" valign="top" style="width:20%; padding:10px;">
                <a href="https://github.com/Zeyad-Amr">
                    <img alt="Zeyad Amr" src="https://avatars.githubusercontent.com/Zeyad-Amr" style="width:100%; max-width:150px; height:auto; object-fit: cover;">
                    <br/>
                    <sub style="font-size:medium; padding-top:5px;"><b>Zeyad Amr</b></sub>
                </a>
                <br/>
                <span>Full Stack Software Engineer</span>
            </td>
            <td align="center" valign="top" style="width:20%; padding:10px;">
                <a href="https://github.com/AhmedRaouf481">
                    <img alt="Ahmed Abd ElRaouf" src="https://avatars.githubusercontent.com/AhmedRaouf481" style="width:100%; max-width:150px; height:auto; object-fit: cover;">
                    <br/>
                    <sub style="font-size:medium; padding-top:5px;"><b>Ahmed Abd ElRaouf</b></sub>
                </a>
                <br/>
                <span>Full Stack Software Engineer</span>
            </td>
            <td align="center" valign="top" style="width:20%; padding:10px;">
                <a href="https://github.com/Abdelrhman012">
                    <img alt="Abdelrahman Yasser" src="https://avatars.githubusercontent.com/Abdelrhman012" style="width:100%; max-width:150px; height:auto; object-fit: cover;">
                    <br/>
                    <sub style="font-size:medium; padding-top:5px;"><b>Abdelrahman Yasser</b></sub>
                </a>
                <br/>
                <span>Frontend Software Engineer</span>
            </td>
            <td align="center" valign="top" style="width:20%; padding:10px;">
                <a href="https://github.com/momen882001">
                    <img alt="Mo'men Mohamed" src="https://avatars.githubusercontent.com/momen882001" style="width:100%; max-width:150px; height:auto; object-fit: cover;">
                    <br/>
                    <sub style="font-size:medium; padding-top:5px;"><b>Mo'men Mohamed</b></sub>
                </a>
                <br/>
                <span>Frontend Software Engineer</span>
            </td>
            <td align="center" valign="top" style="width:20%; padding:10px;">
                <a href="https://github.com/diaabadr">
                    <img alt="Diaa Badr" src="https://avatars.githubusercontent.com/diaabadr" style="width:100%; max-width:150px; height:auto; object-fit: cover;">
                    <br/>
                    <sub style="font-size:medium; padding-top:5px;"><b>Diaa Badr</b></sub>
                </a>
                <br/>
                <span>Backend Software Engineer</span>
            </td>
        </tr>
    </tbody>
</table>

## Supervisors

- Professor Emeritus Ahmed Hisham Kandil
- Assistant Professor Eman Ayman

All rights reserved © 2024
