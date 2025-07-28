# Full-Stack Web Application Template

This project serves as a boilerplate for generative AI coded applications. It aims to provide a structured starting point for developers to build upon, ensuring that essential components and best practices are included from the outset.

## Purpose
The purpose of this project is to serve as a template/boilerplate application, allowing developers to start with an already working barebones app instead of creating a new project from scratch each time.

## Tech Stack
- **Frontend**: React
- **Backend**: FastAPI
- **Database**: SQLite (if applicable)

## Prerequisites

- Node.js (v14+)
- Python (v3.8+)

## Installation

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:

   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run the backend server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

3. Run the frontend development server:
   ```bash
   npm start
   ```

## Running the Application

- The backend will be running on `http://localhost:8000`
- The frontend will be running on `http://localhost:3000`

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint returning status and timestamp
- `GET /api/items` - Retrieve all items
- `GET /api/items/{id}` - Retrieve specific item
- `POST /api/items` - Create new item
- `PUT /api/items/{id}` - Update existing item
- `DELETE /api/items/{id}` - Delete item

## Future Enhancements

- Integrate a database for persistent storage
- Add user authentication and authorization
- Implement additional features and endpoints

## License

This project is licensed under the MIT License.
