
# Blog Writer

## Introduction

The Blog Writer project is a web application built using React (with Vite), Appwrite for the backend, and several other libraries and tools. It provides users with the ability to write, edit, and delete blogs, as well as register, login, and logout. Users can also read blogs written by others. The application features a clean UI with a skeleton loading feature to enhance user experience.


## Technologies Used

- Frontend:
  - React (with Vite)
  - React Router DOM
  - Tailwind CSS
  - Redux Toolkit
  - TinyMCE (with tinymce-react)
  - html-react-parser
- Backend:
  - Appwrite
## Features

- User Authentication: Users can register, log in, and log out securely.
- Blog Management: Users can create, edit, and delete their own blogs.
- Read Other Blogs: Users can read blogs written by other users.
- Skeleton Loading: Enhances user experience by providing skeleton loading while content is loading.
- Clean UI: Features a clean and intuitive user interface for better usability.


## Setup

- Clone the repository to your local machine.
- Install dependencies using npm install.
- Configure Appwrite for the backend. You can follow the Appwrite documentation for setup instructions.
- Create a .env file in the root directory and add the following environment variables:

```
VITE_APPWRITE_URL = <your_appwrite_endpoint>
VITE_APPWRITE_PROJECT_ID =<your_appwrite_project_id>
VITE_APPWRITE_DATABASE_ID =<your_appwrite_database_id>
VITE_APPWRITE_COLLECTION_ID =<your_appwrite_collection_id>
VITE_APPWRITE_BUCKET_ID =<your_appwrite_bucket_id>

```
- Run the application using `npm run dev`.
- Access the application in your web browser at `http://localhost:5173`.
## Usage

- Register: Create a new account by providing a username, email, and password.
- Log In: Log in with your email and password.
- Write Blogs: Create new blogs and edit or delete existing ones.
- Read Blogs: Browse and read blogs written by other users.
- Log Out: Log out of your account.




## Acknowledgements

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

