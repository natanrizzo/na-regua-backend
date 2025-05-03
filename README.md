# 💈 Na Regua Backend

[![Node.js](https://img.shields.io/badge/Node.js-16.x-green)](https://nodejs.org/)  
[![npm](https://img.shields.io/badge/npm-8.x-blue)](https://www.npmjs.com/)  
[![NestJS](https://img.shields.io/badge/NestJS-✓-E0234E)](https://nestjs.com)  
[![Prisma](https://img.shields.io/badge/Prisma-✓-blue)](https://www.prisma.io)  
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-✓-blue)](https://www.postgresql.org)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 📝 Description

This repository contains the **NestJS** backend for **Na Regua**, a barbershop management system. It exposes RESTful endpoints for managing employees, clients, products, services, appointments, transactions, and generating financial reports.

---

## 🎯 Features

- **Employee Registration**: Register employees with roles _Administrator_ and _Barber_.  
- **Client Registration & Login**: Manage client signup and authentication via JWT.  
- **User Management**: Administrators can edit and delete employee and client records.  
- **Product & Service Management**: CRUD operations on products and services (name, price, profit, duration).  
- **Appointment Scheduling**:  
  - Administrators can create appointments (client, service, barber, datetime).  
  - Barbers can view their assigned appointments.  
  - Clients can schedule appointments by selecting service, barber, date, and time slot.  
- **Transactions**: Record product sales and service payments.  
- **Financial Reports**: Generate reports filtered by day, client, service, and product.

---

## 🛠️ Technology Stack

- **NestJS** – Framework for building efficient Node.js server-side applications  
- **TypeScript** – Typed superset of JavaScript  
- **Prisma ORM** – Database toolkit and query builder  
- **PostgreSQL** – Relational database  
- **JWT Authentication** – Secure API access  
- **class-validator** & **class-transformer** – Request validation and transformation  

---

## 🗂️ Project Structure

```
/NA-REGUA-BACKEND
├── .godo/                   # Godot Engine files (unused)
├── generated/               # Auto-generated artifacts
├── node_modules/            # Dependencies
├── prisma/                  # Prisma schema & migrations
├── src/
│   ├── appointment/         # Appointment module
│   ├── client/              # Client module
│   ├── employee/            # Employee module
│   ├── product/             # Product module
│   ├── service/             # Service module
│   ├── transaction/         # Transaction module
│   ├── report/              # Report module
│   ├── prisma/              # PrismaService and client import
│   ├── app.module.ts        # Root module
│   └── main.ts              # Application entrypoint
├── .env                     # Environment variables
├── .eslintrc.js             # ESLint configuration
├── .gitignore               # Git ignore rules
├── .prettierrc              # Prettier configuration
├── LICENSE                  # MIT license
├── nest-cli.json            # Nest CLI configuration
├── package.json             # Project metadata & scripts
├── tsconfig.json            # TypeScript configuration
├── tsconfig.build.json      # Build configuration
└── README.md                # This file
```

---

## 🚀 Getting Started

1. **Clone the repository**  
   ```bash
   git clone https://github.com/natanrizzo/na-regua-backend.git
   cd na-regua-backend
   ```

2. **Install dependencies**  
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment**  
   - Copy `.env.example` to `.env` and update the PostgreSQL connection string and JWT secrets.

4. **Setup the database**  
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run the development server**  
   ```bash
   npm run start:dev
   ```

---

## 📦 Contributing

1. Fork the repository  
2. Create a feature branch:  
   ```bash
   git checkout -b feature/your-feature
   ```  
3. Commit your changes:  
   ```bash
   git commit -m "Add your feature"
   ```  
4. Push to your branch:  
   ```bash
   git push origin feature/your-feature
   ```  
5. Open a Pull Request.

---

## 🛡️ License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
