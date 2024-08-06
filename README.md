# Integrating Advanced Technologies into Hospital Information Systems to Manage Healthcare Data

## Table of Contents

- [Integrating Advanced Technologies into Hospital Information Systems to Manage Healthcare Data](#integrating-advanced-technologies-into-hospital-information-systems-to-manage-healthcare-data)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [System Overview](#system-overview)
  - [Workflow Overview](#workflow-overview)
  - [Portals](#portals)
  - [User Stories](#user-stories)
  - [Top Features](#top-features)
    - [Comprehensive Patient Registration Handling](#comprehensive-patient-registration-handling)
    - [Advanced Data Entry Solutions](#advanced-data-entry-solutions)
    - [Document Processing Efficiency](#document-processing-efficiency)
    - [Enhanced Electronic Medical Records (EMR)](#enhanced-electronic-medical-records-emr)
    - [Simple DICOM Viewer](#simple-dicom-viewer)
    - [Customization and Adaptability](#customization-and-adaptability)
    - [Improved Communication and Interoperability](#improved-communication-and-interoperability)
  - [How to Run the Project](#how-to-run-the-project)
  - [Swagger API Documentation](#swagger-api-documentation)
  - [Methodology](#methodology)
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
  - [Special Thanks](#special-thanks)
  - [Acknowledgments](#acknowledgments)

## Introduction

Egyptian public hospitals, particularly emergency departments, face significant challenges in managing healthcare data. These departments, which operate 24/7, provide immediate care for acute illnesses or injuries and encounter high patient volumes, coordination issues, and gaps in data management.

## System Overview

The system is designed to address these challenges through digitalization, streamlining data management, enhancing communication, and utilizing advanced technologies. It is tailored to meet the needs of emergency departments and integrates various hospital workflows.

<https://github.com/user-attachments/assets/77ede865-d77a-4695-8704-58fe5b5aa0fc>

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

- **As a Registrar:** I want to quickly register patients, handle various patient scenarios, and use auto-completion to reduce waiting times and entry errors.

- **As a Doctor:** I need immediate access to comprehensive patient data, including detailed EMR and radiology images, to provide timely and accurate treatment.

- **As an Admin:** I want to manage system settings, customize workflows, and control user roles efficiently to ensure flexibility, security, and smooth operations.

- **As a Doctor:** I want real-time data transfer and consultation requests to enhance communication and improve patient care.

## Top Features

### Comprehensive Patient Registration Handling

- **Diverse Patient Cases:** Efficiently manage a range of patient scenarios including conscious patients, unconscious patients with or without companions, and groups of patients.
- **Visit Code System:** Utilize a structured visit code format for tracking patient registration with details such as date and serial number.

### Advanced Data Entry Solutions

- **Auto-Completion:** Automatically fetch previous visit data using SSN to streamline data entry.
- **Searchable Select Fields:** Improve data accuracy and efficiency with searchable fields for selecting relevant information.

### Document Processing Efficiency

- **Streamlined Data Entry:** Use document processing to minimize manual entry errors with automated steps including scanning, preprocessing, and OCR.
- **OCR Technology:** High-performance OCR with preprocessing (Gray Scale, Median Filter, Thresholding) and a CNN model, achieving 99.7% accuracy and 21 ms processing time.
- **Increased Throughput:** Enhance registration speed, doubling the number of people processed within 10 minutes.

### Enhanced Electronic Medical Records (EMR)

- **Comprehensive EMR:** Maintain detailed patient records including personal information, triage assessments, examinations, medications, and lab results.
- **Exam Page Tabs:** Organize patient data with tabs for history, labs, radiology, and consultations.
- **Standardized Lookups:** Ensure consistent data entry with standardized lookups for lab tests, radiology tests, allergies, and medications.

### Simple DICOM Viewer

- **Image Viewing Tools:** Basic DICOM viewer includes contrast adjustment, zoom level indication, and image resolution display for easy access to radiology images.

### Customization and Adaptability

- **Flexible Workflow Management:** Easily adapt workflows to meet evolving hospital needs. For instance, adjust workflows when departments are reorganized or when new processes are introduced.
  - **Example:** Transitioning a heart subdepartment from an independent unit to the TriageA subdepartment, ensuring the system supports both the old and new workflow models seamlessly.
- **Customizable Role-Based Authorization:** Tailor access controls with role-based permissions to match specific operational requirements and enhance security.

  - **Multi-Subdepartment Roles:** Assign roles that span multiple subdepartments, ensuring users have appropriate access based on their responsibilities.
  - **Example:** Consultants have access to consultation requests and patient records, while interns have limited access, reflecting their roles in the hospital.

- **Adaptive Features:** Adjust system features and workflows to align with different hospital environments and procedures.

  - **Example:** At Qasr Hospital, patients are directed during triage assessment, whereas at Baheya Hospital, patients are directed during registration. The system accommodates these differences through customizable workflows.

- **Seamless Hospital Transitions:** Facilitate smooth transitions between different hospital setups by adapting the system to new operational models and requirements.
  - **Example:** When moving from one hospital to another, the system can be customized to fit the new hospital's registration and patient management processes without disrupting ongoing operations.

### Improved Communication and Interoperability

- **Real-Time Data Transfer:** Enable immediate data availability and seamless flow from triage to examination, with real-time consultation requests.
- **Interoperability Standards:** Integrate hospital and departmental systems using Fast Healthcare Interoperability Resources (FHIR) for scalable, compliant solutions.

## How to Run the Project

To run the project using Docker, follow these steps:

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/Zeyad-Amr/Qasr-HIS.git
   cd Qasr-HIS
   ```

2. **Create Environment File**:
   Create a `.env` file with the necessary environment variables at the project's root. For example:

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

## Methodology

The project employs an iterative methodology, which emphasizes continuous improvement through repeated cycles. This approach includes the following phases:

1. **Planning:** Define goals, allocate resources, and set timelines.
2. **Analysis:** Gather requirements, assess feasibility, and document findings.
3. **Design:** Develop system architecture, UI/UX designs, and prototypes.
4. **Development:** Implement features incrementally, integrate code, and gather feedback.
5. **Evaluation:** Assess performance, resolve issues, and implement improvements.
6. **Upgrade:** Enhance features, optimize performance, and manage new versions.

This methodology ensures adaptability, ongoing stakeholder engagement, and continuous refinement throughout the project.

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

## Special Thanks

- **Qasr Al-Ainy Hospital:** For providing valuable feedback and insights that guided the development of features tailored to emergency hospital workflows.

- **Baheya Hospital:** For validating the system's functionality and ensuring its adaptability to different hospital processes.

- **OpenFDA APIs:** For providing drug data that was integrated into the system's medication management features.

- **Open Source Communities:** For the tools and libraries that supported the development of document processing, OCR, and interoperability standards.

## Acknowledgments

- **Healthcare Professionals:** For their ongoing support and feedback, which were crucial in refining the system and ensuring its effectiveness in real-world scenarios.

- **Stakeholders:** For their contributions through surveys and interviews, which helped shape the features and functionality of the system.

All rights reserved © 2024
