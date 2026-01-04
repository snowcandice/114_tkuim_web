# API Specification

Base URL: `http://localhost:5000/api`

## Todos

### Get All Todos
- **URL**: `/todos`
- **Method**: `GET`
- **Success Response**:
  - Code: 200
  - Content: `{ success: true, count: 5, data: [...] }`

### Create Todo
- **URL**: `/todos`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "Task Title",
    "description": "Optional description",
    "priority": "medium"
  }
  ```
- **Success Response**:
  - Code: 201

### Update Todo
- **URL**: `/todos/:id`
- **Method**: `PUT`
- **Body**: Fields to update (e.g., `status: 'completed'`)
- **Success Response**:
  - Code: 200

### Delete Todo
- **URL**: `/todos/:id`
- **Method**: `DELETE`
- **Success Response**:
  - Code: 200
