# `qa-server`

The `qa-server` is the server-side app companion for HeapOverrun. It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs

Hereafter, we report the designed HTTP APIs, also implemented in the project.

### **List all questions**

URL: `/api/questions`

HTTP Method: GET.

Description: Retrieve all questions.

Response: `200 OK` (success) or `500 Internal Server Error` (generic error).

Response body:

```
[
    {
        "id": 1,
        "text": "Is JavaScript better than Phyton?",
        "email": "luigi.derussis@polito.it",
        "date": "204-02-07",
    },
    ...
]
```

### **Get a single question**

URL: `/api/questions/<id>`

HTTP Method: GET.

Description: Retrieve the question represented by `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body:

```
  {
      "id": 1,
      "text": "Is JavaScript better than Phyton?",
      "email": "luigi.derussis@polito.it",
      "date": "2024-02-07",
  } ,
  ...
```

### **Get all the answers of a single question**

URL: `/api/questions/<id>/answers`

HTTP Method: GET.

Description: Get all the aswers of the question represented by `<id>`.

Response: `200 OK` (success), `404 Not Found` (wrong id), or `500 Internal Server Error` (generic error).

Response body:

```
[
    {
        "id": 1,
        "text": "Yes",
        "email": "luigi.derussis@polito.it",
        "score" : -10,
        "date": "2024-02-08",
    },
    ...
]
```

### **Create a new answer for a given question**

URL: `/api/questions/<id>/answers`

HTTP Method: POST.

Description: Create a new aswer to the question represented by `<id>`.

Request body:

```
 {
    "text": "Last year, it had about 200 first-timers.",
    "email": "luca.mannella@polito.it",
    "score" : -10,
    "date": "2024-03-26",
    },

```

Response: `201 Created` (success, with the created id), `404 Not Found` (wrong id), or `503 Service Unavaible` (generic error). If the request body is not valid, `422 Unprocessable Entity` (validation error).

Response body: **None**
