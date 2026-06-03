# Event-Driven Serverless Order Management System

![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonwebservices&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Python](https://img.shields.io/badge/Python-14354C?style=for-the-badge&logo=python&logoColor=white)
![Serverless](https://img.shields.io/badge/Serverless-FD5750?style=for-the-badge&logo=serverless&logoColor=white)

This project is a cloud-native, event-driven, and serverless Order Management System. It was developed as a Final Project for the Cloud Computing & Web Development course at Holon Institute of Technology (HIT) by Lior Mizrachi.

## System Overview

The architecture is designed to decouple the frontend from the backend, ensuring high scalability and maintenance efficiency. The system utilizes synchronous RESTful APIs for user interactions and asynchronous processing for background tasks.

## Architecture

![System Architecture](/images/SystemArchitecture.jpg)

## Project Structure

├── frontend/             # React application (UI) hosted on AWS Amplify
├── backend/              # AWS Lambda Python functions
│   ├── api/              # CRUD operations (Sync)
│   ├── background/       # Event-driven functions (Async via DynamoDB Streams)
│   └── cron/             # EventBridge scheduled tasks
├── docs/                 # Architecture diagrams and screenshots
└── README.md

## Technologies Used

* **AWS Amplify**: Provides a robust, globally scalable hosting environment for the React web application.
* **AWS API Gateway**: Acts as the front door for our application to communicate securely via REST APIs.
* **AWS Lambda**: Provides serverless compute to run core business logic and CRUD operations.
* **Amazon DynamoDB**: Selected as the primary database for its serverless nature and flexible NoSQL structure.
* **Amazon SNS**: Used for asynchronous event processing and sending immediate emails.
* **Amazon S3**: Securely backs up deleted orders and hosts generated PDF reports.
* **Amazon EventBridge**: Orchestrates scheduled automated tasks like daily business summaries.

## Core Features & Tested Flows

1.  **Order Management**: Full CRUD operations to create, read, update, and delete orders.
2.  **Automated Backups & Alerts**: Deleting an order triggers a background process to save a backup to S3 and send an SNS email alert.
3.  **PDF Reports**: Ability to generate a downloadable PDF report of orders.
4.  **Automated Event-Driven BI Reporting (Freestyle Enhancement)**: A serverless cron job scans the database daily, aggregates metrics, saves a report to S3, and sends a download link via SNS.

## Application Screenshots

### Creating a New Order
![Creating Order](/images/CreateNewOrder.jpg)

### Deleting an Order & Asynchronous Alert
![Deleting Order](/images/DeletingOrder.jpg)

### Daily Business Summary (BI Reporting)
![BI Report](/images/BIReport.jpg)

## API Reference

| API Name | HTTP Method | Endpoint | Sample Output |
| :--- | :--- | :--- | :--- |
| **Create Order** | POST | `/orders` | `{"message": "order created successfully"}` |
| **Get All Orders** | GET | `/orders` | `{"orders": [...]}` |
| **Update Order** | PUT | `/orders` | `{"message": "order updated successfully"}` |
| **Delete Order** | DELETE | `/orders` | `{"message": "order deleted and backup process initiated"}` |
| **Generate Report** | GET | `/orders/report` | `{"message": "Report generated", "download_uri": "..."}` |
| **Subscribe to Alerts** | POST | `/subscribe` | `{"message": "Subscription request sent. Please check your email."}` |

## Contact

* **Lior Mizrachi** - [LinkedIn](https://www.linkedin.com/in/your-profile-link) | [GitHub](https://github.com/Lior-Miz)

Project Link: [https://github.com/Lior-Miz/serverless-order-management](https://github.com/Lior-Miz/serverless-order-management)
