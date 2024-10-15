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

## Home page
<img width="1276" alt="Screenshot 2024-10-15 at 16 52 40" src="https://github.com/user-attachments/assets/4b4e056a-4363-454b-aaa3-22c598391043">

## Post detail
![screencapture-localhost-4200-post-guest-blogging-2024-10-15-16_45_28 (1)](https://github.com/user-attachments/assets/2d906a8c-950e-4186-95c5-5d6366030ace)

## Filter by category
<img width="1278" alt="Screenshot 2024-10-15 at 16 53 05" src="https://github.com/user-attachments/assets/cf862a08-fe3e-4035-ae0d-4f4f47c0c300">

## Filter by tag
<img width="1278" alt="Screenshot 2024-10-15 at 16 53 49" src="https://github.com/user-attachments/assets/839b76b7-3b9f-44da-a710-8a13793678e6">

## Posts on the admin panel
<img width="1278" alt="Screenshot 2024-10-15 at 16 54 19" src="https://github.com/user-attachments/assets/d44d7021-a587-449f-b9cf-8195ff19fffd">

## Edit post page
![screencapture-localhost-4200-admin-posts-edit-guest-blogging-2024-10-15-16_54_48](https://github.com/user-attachments/assets/d5878a2c-b688-4f48-b833-f445b6a398c7)

## Categories on the admin panel
<img width="1277" alt="Screenshot 2024-10-15 at 16 56 03" src="https://github.com/user-attachments/assets/64a6d5b2-900d-4a46-aef3-8db6d591e3f5">

## Edit category Page
<img width="1280" alt="Screenshot 2024-10-15 at 16 56 17" src="https://github.com/user-attachments/assets/a0a2525d-9fb9-4395-b705-3f3964631618">

## Tags on the admin panel
<img width="1277" alt="Screenshot 2024-10-15 at 16 57 34" src="https://github.com/user-attachments/assets/fe924054-24a5-4ec8-ad09-ef5bb5017bb5">

## Edit tag page
<img width="1278" alt="Screenshot 2024-10-15 at 16 57 21" src="https://github.com/user-attachments/assets/adfcd2d1-4237-424e-86be-12a4332b8348">

## Register page
<img width="1279" alt="Screenshot 2024-10-15 at 16 33 49" src="https://github.com/user-attachments/assets/53a615cd-b673-4b3f-a9b4-16d3a45c33c0">

## Login page
<img width="1279" alt="Screenshot 2024-10-15 at 16 33 34" src="https://github.com/user-attachments/assets/6fa31ba9-e21c-4e6e-b9ce-bda383461d43">

## Reset password pages

<img width="1279" alt="Screenshot 2024-10-15 at 16 34 18" src="https://github.com/user-attachments/assets/2c765dd5-19b5-4444-be09-d8b4d7e13ce3">
<img width="1277" alt="Screenshot 2024-10-15 at 16 34 56" src="https://github.com/user-attachments/assets/95a682bb-74df-452e-a669-d365e37b5129">






