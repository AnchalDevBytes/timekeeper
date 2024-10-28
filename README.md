# TimeKeeper (Full-Stack Calendar Application)

This is a full-stack calendar application built with modern web technologies including Next.js, PostgreSQL, Prisma, NeonDB, TypeScript, and Tailwind CSS. The application allows users to create, update, delete, and view events on a calendar.

## Screeshot

![signin](./public/signin.png)
![calendar](./public/calendar.png)
![updateCalendar](./public/calendarMobileView.png)

## Features

- **Event Management**: Create, update, and delete events.
- **Calendar View**: Display events in a weekly calendar format.
- **User Authentication**: Secure authentication using JSON Web Tokens (JWT).
- **Responsive Design**: Optimized for both mobile and desktop views using Tailwind CSS.
- **Backend Integration**: Uses Prisma as an ORM with PostgreSQL for data storage.
- **Modern Development Practices**: Written in TypeScript for strong typing and better code quality.

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction), [Prisma](https://www.prisma.io/), [PostgreSQL](https://www.postgresql.org/), [NeonDB](https://neon.tech/)
- **Deployment**: Frontend deployed on Vercel.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/) (for local development)
- [NeonDB](https://neon.tech/) account for database hosting

## Getting Started

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/AnchalDevBytes/timekeeper.git
cd timekeeper
```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set Up the Database**
    - Create a PostgreSQL database locally or use NeonDB for cloud hosting.
    - Configure the database connection string in the .env file:

    ```bash
    DATABASE_URL="postgresql://username:password@hostname:port/database_name"
    ```

4. **Configure Environment Variables**
    ```bash
    DATABASE_URL="your-database-connection-string"
    API_BASE_URL="http://localhost:3000"
    TOKEN_SECRET="your-secret-key"
    ```

5. **Run Prisma Migrations**
    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

6. **Run the development server:**
    ```bash
   npm run dev
   ```
The app will be available at http://localhost:3000.
