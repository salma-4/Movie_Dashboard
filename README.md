# Movie Dashboard (Angular 17) 
[Backend-API](https://github.com/salma-4/Movie_API)

This project is a **Movie Dashboard** built with **Angular 17**. It includes two dashboards:
1. **Integrate With OMDb API**: for browsing different movies
2. **Admin Dashboard**: For managing movies (add, delete, view all movies).
2. **User Dashboard**: For browsing and searching movies using the OMDB API.

The application is integrated with the **OMDB API** to fetch movie details.

## Prerequisites

Before running the project, ensure you have the following installed:

1. **Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/).
2. **Angular CLI** (v17+): Install globally via:
  ```bash
  npm install -g @angular/cli
  ```
3. **OMDB API Key**: Get a free API key from [OMDb API](https://www.omdbapi.com/apikey.aspx)
4.  **Clone the repository**: 
```bash
git clone https://github.com/salma-4/Movie_Dashboard
 ```
5. **Install dependencies and run **: 
``` bash 
npm install
ng serve
```


## Features

### **Admin Dashboard**
- **View All Movies**: Display a list of all movies (added in database or from OMDb).
- **Search For movie**: using omdb .
- **Add New Movies**: Add new movies to the database.
- **Delete Movies**: Remove movies from the database.
- **Pagination**: Navigate through the list of movies using pagination.
- **View Movie Details**: Display detailed information about a movie (title, year, genre, poster, etc.).

### **User Dashboard**
- **Search Movies**: Search for movies using the OMDB API.
- **View Movie Details**: Display detailed information about a movie (title, year, genre, poster, etc.).
- **Pagination**: Navigate through the list of movies using pagination.

### **Authentication**
- **Role-Based Access**:
  - Admins can access the **Admin Dashboard**.
  - Users can access the **User Dashboard**.
- **Login/Registration**: Users can register and log in to access their respective dashboards.

---
