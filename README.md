# Notepad Web Application

A modern, full-stack note-taking application built with a robust tech stack for seamless note management and
organization.

![App Screenshot](frontend/src/assets/images/Notepad%20draft.png)

## 🚀 Features

- **Intuitive Note Management**: Create, edit, delete, and organize your notes with ease
- **Search Functionality**: Quickly find specific notes with integrated search
- **Responsive Design**: Optimized for desktop and mobile devices
- **Editor Tools**: Rich text editing capabilities for enhanced note formatting
- **Note Organization**: Sidebar navigation for easy access to all your notes
- **Real-time Updates**: Instant synchronization of changes
- **Persistent Storage**: Secure data storage with MySQL database

## 🛠️ Tech Stack

### Backend

- **Java**: Core programming language
- **Spring Boot**: Framework for building production-ready applications
- **Maven**: Dependency management and build automation
- **MySQL**: Relational database for data persistence

### Frontend

- **React**: Modern JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- Java 11 or higher *Ideally Java 17+
- Node.js (14+ recommended)
- MySQL Server
- Maven

## 🔧 Installation & Setup

### Backend Setup

1. **Clone and import the repository**

   Store the project somewhere for you to access through eclipse/vscode later. Since the goal of this is to eventually
   separate the front end and backend, you want to close the entire repo for now.

   **Within eclipse**, import the backend folder for now (6/4/2025) as an "existing maven project". the pom.xml file
   within it should be able to identify it. Note, we might eventually just import the entire repo to include the front
   end files, but I'm still figuring out if that's necessary within eclipse.

   **Within VSCode**, you can open up the entire repo (frontend and backend folders included). Although, I think we will
   mainly be working with the front end files here until I have it more properly setup. I'm not sure if this setup is
   ideal yet.


2. **Configure MySQL Database**
   ```sql
   CREATE DATABASE react_notepad_db;

   CREATE TABLE `note` (`id` int(11) NOT NULL, `title` varchar(45) DEFAULT NULL, `content` varchar(45) DEFAULT NULL, `createdAt` datetime NOT NULL, `updatedAt` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
   ```
   ** If unsure how to setup a local db, you can look into XAMPP.

3. **Update application.properties**.
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/react_notepad_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.hibernate.ddl-auto=update
   ```
   **You probably don't need to update this**, except for the username and password if you choose to use something else
   besides the default for the local db connection. I currently have it as 'root' username and a blank password as
   reference.


4. **Build and run the Spring Boot application**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
   You can also setup your own maven configuration in eclipse (so you just hit on run instead of writing it in the
   terminal/bash), just dm me for more info about it. Besides that, it should be using what you already have installed
   from the eclipse marketspace.

### Frontend Setup -- CURRENTLY NOT IN

1. **Navigate to frontend directory**
   ```bash
   cd frontendaa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
To view the list of packages, go to the end of this README to read the full list.


3. **Start the development server**
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000` (frontend) and `http://localhost:8080` (backend API).

## 🏗️ Project Structure

```
notepad-app/
├── backend/
│   ├── src/main/java/          # Spring Boot backend
│   │   ├── config/             # Web configurations for React
│   │   ├── controller/         # REST API controllers
│   │   ├── converter/          # Converter model to/from presenter
│   │   ├── model/              # DAO/object entity classes
│   │   ├── presenter/          # DTOs/object entity for front end
│   │   ├── repository/         # Data access layer
│   │   └── service/            # Business logic
│   └── pom.xml --> MAIN; currently here until proper folder structure
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Application pages
│   │   └── services/           # API service calls
│   └── public/                 # Static assets
└── ~~pom.xml~~                 # Maven configuration 
```

## 🔗 API Endpoints

- `GET /api/notes` - Retrieve all notes
- `POST /api/notes` - Create a new note
- `PUT /api/notes/{id}` - Update an existing note
- `DELETE /api/notes/{id}` - Delete a note
- `GET /api/notes/search?query={term}` - Search notes

## 🎨 UI Features

- Clean, minimalist design with gray-scale color scheme
- Sidebar navigation for note browsing
- Integrated search bar
- Editor toolbar with formatting options
- Responsive layout adapting to different screen sizes

## 🚦 Development

### Running Tests

**Backend:**

```bash
mvn test
```

**Frontend:** - NOT YET

```bash
npm test
```

### Building for Production

**Backend:**

```bash
mvn clean package
```

**Frontend:** - NOT YET

```bash
npm run build
```

## 📝 Reminder:

1. Each developer runs mvn clean install locally.

2. Each developer runs npm install in the frontend directory.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Spring Boot framework
- Frontend powered by React and styled with Tailwind CSS
- Database management with MySQL

----

## NPM Packages (6/9/2025):
- @eslint/js@9.28.0
- @fortawesome/fontawesome-svg-core@6.7.2
- @fortawesome/free-regular-svg-icons@6.7.2
- @fortawesome/free-solid-svg-icons@6.7.2
- @fortawesome/react-fontawesome@0.2.2
- @material-tailwind/react@2.1.10
- @types/react-dom@19.1.6
- @types/react@19.1.6
- @types/react@19.1.6
- @vitejs/plugin-react@4.5.1
- autoprefixer@10.4.21
- axios@1.9.0
- clsx@2.1.1
- eslint-plugin-react-hooks@5.2.0
- eslint-plugin-react-refresh@0.4.20
- eslint@9.28.0
- globals@16.2.0
- postcss@8.5.4
- react-dom@19.1.0
- react-router-dom@7.6.2
- react@19.1.0
- tailwindcss@3.4.17
- vite@6.3.5
