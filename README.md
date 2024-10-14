# Full-Stack Blog with Angular 18, Node.js, MySQL

This project is a Full-Stack Blog and Content Management System (CMS) built with Angular 18, Node.js, and MySQL. It features a modern and responsive user interface, dynamic content management capabilities, and secure user authentication. The backend is powered by Node.js and Express.js, with Sequelize ORM for database management. The project is styled with Tailwind CSS and includes Angular Material components for a polished and professional design.

## Functionality:
- **User Registration & Authentication:** Secure sign-up and login for users, with JWT-based session management.
- **Password Management:** Users can change their passwords securely.
- **Email Notifications:** Sends email notifications for account confirmation or password reset.
- **Create, Edit, Delete Posts:** Full blog management with the ability to create, modify, or delete posts.
- **Manage Categories:** Create, edit, or delete categories to classify posts.
- **Manage Comments:** Add and delete comments on posts.
- **Manage Tags:** Add, edit, or delete tags.

## Technologies Used:
- **Frontend:** Angular 18, RxJS, Angular Material, TypeScript
- **Styling:** Tailwind CSS, Angular Material
- **Backend:** Node.js, Express.js
- **Database:** MySQL, Sequelize ORM (sequelize-typescript)
- **Authentication:** JWT (JSON Web Token)
- **Email Notifications:** Resend
- **Validation:** Zod (Data validation)

## Installation

1. Clone the repository:
```sh
git clone https://github.com/matashaEs/blog-angular/
```

2. **Frontend:**
```sh
cd blog-angular/frontend
npm install
ng serve
```

3. **Backend:**
```sh
cd blog-angular/backend
npm install
```

4. Create a **.env** file in the **backend/src** folder:
- Add the following environment variables to the **.env** file:
```sh
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=3306
PORT=3000
JWT_SECRET=secretkey
FRONTEND_URL=http://localhost:4200
```

5. In the **backend/src/database/index.ts** file, change **force: false** to **force: true** for database initialization.

6. To set up Resend:
- Go to [Resend.com](https://resend.com/).
- Sign up and create a team.
- Obtain your API Key.
- Add to the **.env**:
```sh
RESEND_API_KEY=your_api_key
```
 7. Build the backend:
```sh
npm run build
```

8. Run the backend:
 ```sh
npm run dev
```

9. In the **backend/src/database/index.ts** file, change **force: true** to **force: false** to prevent the database from updating after each save. This change ensures that your database schema is not recreated on every server start.
