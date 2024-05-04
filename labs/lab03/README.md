# Film Library

The `Film Library` is the server-side app companion for HeapOverrun. It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs

Hereafter, we report the designed HTTP APIs, also implemented in the project.

### List all Films

URL: `/api/films`

HTTP method: GET

Description: get the list of all films

Response:

- `200 OK` success
- `500` Internal Server Error

Response body:

```json
[
  {
    "idFilm": 1,
    "idPerson": 1,
    "title": "topolino",
    "isFavorite": true,
    "watchDate": "2024-03-01",
    "rate": 4
  }
]
```

### List all Films by filter

URL:`/api/films/filter/:filter`

HTTP method: GET

Description: filters by:

- `isFavorite`
- `best` for the films with rate = 5
- `lastMonth` for the films whatched in the last month
- `unseen`

Response:

- `200 OK`: success
- `400 Bad Request`: applied filter is wrong
- `500 Internal Server Error`

Response body:

```json
[
  {
    "idFilm": 1,
    "idPerson": 1,
    "title": "topolino",
    "isFavorite": true,
    "watchDate": "2024-03-01",
    "rate": 4
  }
]
```

### A specific film

URL:`/api/films/:id`

HTTP method: GET

Description: get a film with a specific id

Response:

- `200 OK`: success
- `404 Not Found`: wrong id
- `500 Internal Server Error`

Response body:

```json
{
  "idFilm": 1,
  "idPerson": 1,
  "title": "topolino",
  "isFavorite": true,
  "watchDate": "2024-03-01",
  "rate": 4
}
```

### Create a new film

URL: `/api/films`

HTTP method: POST

Description: create a new film

Request body:

```json
{
  "idPerson": 1,
  "title": "topolino",
  "isFavorite": true,
  "watchDate": "2024-03-01",
  "rate": 4
}
```

Response:

- `201 Created`: success
- `422 Unprocessable Content`: the params are wrong
- `500 Internal Server Error`

### Update a film

URL:`/api/films/:idFilm`

HTTP method: PUT

Description: Update an existing film

Request body:

```json
{
  "idPerson": 1,
  "title": "topolino",
  "isFavorite": true,
  "watchDate": "2024-03-01",
  "rate": 4
}
```

Response:

- `200 OK`: success
- `422 Unprocessable Content`: the params are wrong
- `404 Not Found`: wrong id
- `500 Internal Server Error`

### Update rate of a film

URL:`/api/films/:idFilm/rate`

HTTP method: PUT

Description: update the rate of an existing film

Request body:

```json
{
  "rate": 4
}
```

Response:

- `200 OK`: success
- `422 Unprocessable Content`: the params are wrong
- `404 Not Found`:wrong id
- `500 Internal Server Error`

### Mark an existing film as favorite/unfavorite

URL:`/api/films/:idFilm/favorite`

HTTP method: PUT

Description: Mark an existing film as favorite/unfavorite

Request body:

```json
{
  "isFavorite": true
}
```

Response:

- `200 OK`: success
- `422 Unprocessable Content`: the params are wrong
- `404 Not Found`:wrong id
- `500 Internal Server Error`

### Delete a film

URL:`/api/films/:idFilm`

HTTP method: DELETE

Description: Deletes a film with id `idFilm`

Response:

- `200 OK`: success
- `404 Not Found`:wrong id
- `500 Internal Server Error`
