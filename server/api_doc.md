
# QuickRecipePro REST API Documentation

## Link Deployment
- tolong isi

## **Endpoints**

### List of available endpoints:

**User:**
- [POST /register](#1-post-register)
- [POST /login](#2-post-login)
- [POST /google-login](#3-post-google-login)
- [POST /donation](#4-post-donation)

**Recipe:**
- [GET /recipes](#5-get-recipes)
- [GET /recipes/popular](#6-get-recipespopular)
- [GET /recipes/my-recipe](#7-get-recipesmy-recipe)
- [GET /recipes/:id](#8-get-recipesid)
- [POST /recipes](#9-post-recipes)
- [POST /recipes/ai-search](#10-post-recipesai-search)
- [PUT /recipes/:id](#11-put-recipesid)
- [DELETE /recipes/:id](#12-delete-recipesid)

**Review:**
- [POST /recipes/:id/reviews](#13-post-recipesidreviews)

---

&nbsp;

### 1. POST /register

**Deskripsi:**
- Mendaftarkan pengguna baru.

**Request:**

- Body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**_Response (201 - Created)_**

```json
{
  "id": 1,
  "username": "zaharaa",
  "email": "zaharaaa@mail.com"
}
```

**_Response (400 - Bad Request)_**

```json
{
  "message": "username is required"
}
OR
{
  "message": "email is required"
}
OR
{
  "message": "email already registered"
}
OR
{
  "message": "email is not valid"
}
OR
{
  "message": "password is required"
}
```

---

### 2. POST /login

**Deskripsi:**

- Login

**Request:**

- Body:

```json
{
  "email": "string",
  "password": "string"
}
```

**_Response (200 - OK)_**

```json
{
  "token": "string"
}
```

**_Response (400 - Bad Request)_**

```json
{
  "message": "email is required"
}
OR
{
  "message": "password is required"
}
```

**_Response (401 - Unauthorized)_**

```json
{
  "message": "error invalid email or password"
}
```
---

### 3. POST /google-login

**Deskripsi:**

- Login menggunakan Google OAuth.

**Request:**

- Body:

```json
{
  "googleToken": "string"
}
```

**_Response (200 - OK)_**

```json
{
  "token": "string",
  "email": "string"
}
```

**_Response (401 - Unauthorized)_**

```json
{
  "message": "Login failed"
}
```
---

### 4. POST /donation

**Deskripsi:**

- Memberi donasi untuk pembuat resep.

**Request:**

- Body:

```json
{
  "amount": 50000
}
```

**_Response (200 - Ok)_**

```json
{
  "transactionToken": "string"
}
```

**_Response (400 - Bad Request)_**

```json
{
  "message": "amount is required"
}
```
---

### 5. GET /recipes

**Deskripsi:**

- Mendapatkan daftar semua resep.

**Query Parameters:**

- `search`: Kolom yang ingin dijadikan dasar pencarian (`title` dan `ingredients`).
- `keyword`: Kata kunci yang ingin dicari pada kolom yang ditentukan di parameter `search`.
- `sort`: Urutan pengambilan data berdasarkan `id`, jika ingin descending masukkan `-id`, dan jika ascending cukup masukkan `id`.
- `page[number]`: Halaman yang ingin ditampilkan.

**_Response (200 - OK)_**

```json
{
    "page": 1,
    "data": [
      {
          "id": 10,
          "UserId": 1,
          "title": "Beef Stroganoff",
          "description": "Mix flour and sugar in a bowl",
          "ingredients": "vanilla extract",
          "steps": "Whisk eggs and milk together",
          "cookTime": 14185,
          "viewsCount": 9189,
          "imageUrl": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          "createdAt": "2024-08-07T16:06:37.476Z",
          "updatedAt": "2024-08-07T16:06:37.476Z",
          "User": {
              "id": 1,
              "username": "admin",
              "email": "admin@mail.com",
              "role": "Admin",
              "createdAt": "2024-08-07T16:06:37.470Z",
              "updatedAt": "2024-08-07T16:06:37.470Z"
          },
          "Reviews": []
      }
    ],
    "totalData": 13,
    "totalPage": 2,
    "dataPerPage": 10
}
```
---

### 6. GET /recipes/popular

**Deskripsi:**

- Mendapatkan 3 resep paling populer.

**_Response (200 - OK)_**

```json
[
  {
    "id": 6,
    "UserId": 1,
    "title": "Beef Stroganoff",
    "description": "Bake at 350°F for 30 minutes",
    "ingredients": "chocolate chips",
    "steps": "Whisk eggs and milk together",
    "cookTime": 16944,
    "viewsCount": 9831,
    "imageUrl": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    "createdAt": "2024-08-07T16:06:37.476Z",
    "updatedAt": "2024-08-07T16:06:37.476Z",
    "User": {
      "id": 1,
      "username": "admin",
      "email": "admin@mail.com",
      "role": "Admin",
      "createdAt": "2024-08-07T16:06:37.470Z",
      "updatedAt": "2024-08-07T16:06:37.470Z"
    },
    "Reviews": []
  },
  ...
]
```
---

### 7. GET /recipes/my-recipe

**Deskripsi:**

- Mendapatkan semua resep berdasarkan user yang sedang login.

**Headers:**
```json
{ "Authorization": "Bearer <your_access_token>" }
```

**_Response (200 - OK)_**

```json
[
  {
    "id": 11,
    "UserId": 1,
    "title": "Vegetarian Chili",
    "description": "Bake at 350°F for 30 minutes",
    "ingredients": "butter",
    "steps": "Chop onions",
    "cookTime": 3503,
    "viewsCount": 0,
    "imageUrl": "https://res.cloudinary.com/dy414ljl7/image/upload/v1723047467/thk4yikgacissgey2eho.jpg",
    "createdAt": "2024-08-07T16:17:47.463Z",
    "updatedAt": "2024-08-07T16:17:47.463Z",
    "Reviews": []
  },
  ...
]
```

---

### 8. GET /recipes/:id

**Deskripsi:**

- Mendapatkan detail resep berdasarkan ID.

**_Response (200 - OK)_**

```json
{
  "id": 1,
  "UserId": 1,
  "title": "Beef Stroganoff",
  "description": "Bake at 350°F for 30 minutes",
  "ingredients": "flour",
  "steps": "Chop onions",
  "cookTime": 20923,
  "viewsCount": 3896,
  "imageUrl": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  "createdAt": "2024-08-07T16:06:37.476Z",
  "updatedAt": "2024-08-07T16:06:37.476Z",
  "User": {
    "id": 1,
    "username": "admin",
    "email": "admin@mail.com",
    "role": "Admin",
    "createdAt": "2024-08-07T16:06:37.470Z",
    "updatedAt": "2024-08-07T16:06:37.470Z"
  }
}
```

**_Response (404 - Not Found)_**

```json
{
  "message": "error not found"
}
```
---

### 9. POST /recipes

**Deskripsi:**

- Membuat resep baru.

**Headers:**
```json
{ "Authorization": "Bearer <your_access_token>" }
```

**Request:**

- Body:

```json
{
  "title": "Spaghetti Bolognese",
  "description": "enak banget pokok nya mah",
  "ingredients": ["spaghetti", "ground beef", "tomato sauce"],
  "steps": "Cook spaghetti and mix with sauce.",
  "cookTime": 130,
  "img": "file"
}
```

**_Response (201 - Created)_**

```json
{
  "id": 13,
  "title": "Mie ayam chili oil",
  "description": "enak banget pokok nya mah",
  "ingredients": "mie, ayam, chili oil, garem, micin",
  "steps": "rebus mie, kasih micin, sama garem",
  "cookTime": 3503,
  "UserId": 1,
  "imageUrl": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  "updatedAt": "2024-08-07T16:19:31.032Z",
  "createdAt": "2024-08-07T16:19:31.032Z",
  "viewsCount": 0
}
```

**_Response (400 - Bad Request)_**

```json
{
  "message": "title is required"
}
OR
{
  "message": "description is required"
}
OR
{
  "message": "ingredients is required"
}
OR
{
  "message": "steps is required"
}
OR
{
  "message": "cookTime is required"
}
```

**_Response (401 - Unauthorized)_**

```json
{
  "message": "Unauthenticated"
}
```
---

### 10. POST /recipes/ai-search

**Deskripsi:**

- Mencari resep berdasarkan bahan makanan yang dimiliki pengguna menggunakan AI.

**Headers:**
```json
{ "Authorization": "Bearer <your_access_token>" }
```

**Request:**

- Body:

```json
{
  "ingredients": "chicken, garlic, tomatoes"
}
```

**_Response (200 - OK)_**

```json
{
  "title": "Kari Kambing Sederhana",
  "description": "Resep kari kambing yang mudah dan cepat untuk dibuat di rumah.",
  "ingredients": "500 gram daging kambing, potong dadu, 1 buah bawang bombay, cincang, 2 siung bawang putih, cincang, 1 ruas jahe, parut, 1 ruas kunyit, parut, 1 sendok makan bubuk kari, 1 sendok teh ketumbar bubuk, 1/2 sendok teh jinten bubuk, 1/4 sendok teh merica bubuk, 1/2 cangkir santan, garam secukupnya, minyak sayur",
  "steps": "1. Tumis bawang bombay, bawang putih, jahe, dan kunyit hingga harum. 2. Masukkan daging kambing dan tumis hingga berubah warna. 3. Tambahkan bubuk kari, ketumbar, jinten, dan merica. Aduk hingga tercampur rata. 4. Tuangkan santan dan tambahkan garam. 5. Didihkan dan kecilkan api. Masak hingga daging empuk dan kuah mengental. 6. Sajikan kari kambing dengan nasi hangat.",
  "cookTime": 3600
}
---
```
**_Response (400 - Bad Request)_**

```json
{
  "message": "ingredients is required"
}
```
---

### 11. PUT /recipes/:id

**Deskripsi:**
- Mengupdate resep.

**Headers:**
```json
{ "Authorization": "Bearer <your_access_token>" }
```

**Request:**

- Params:

```json
{
  "id": "integer (required)"
}
```

- Body:

```json
{
  "title": "Spaghetti Bolognese",
  "description": "enak banget pokok nya mah",
  "ingredients": ["spaghetti", "ground beef", "tomato sauce"],
  "steps": "Cook spaghetti and mix with sauce.",
  "cookTime": 130,
  "img": "file"
}
```

**_Response (200 - OK)_**

```json
{
  "id": 1,
  "UserId": 1,
  "title": "Mie ayam chili oil",
  "description": "enak banget pokok nya mah",
  "ingredients": "mie, ayam, chili oil, garem, micin",
  "steps": "rebus mie, kasih micin, sama garem",
  "cookTime": "3503",
  "viewsCount": 3896,
  "imageUrl": "https://res.cloudinary.com/dy414ljl7/image/upload/v1723051665/dario6uhnirnnwxt6nx8.png",
  "createdAt": "2024-08-07T16:06:37.476Z",
  "updatedAt": "2024-08-07T17:27:46.635Z"
}
```

**_Response (404 - Not Found)_**

```json
{
  "message": "error not found"
}
```

**_Response (403 - Forbidden)_**

```json
{
  "message": "Unauthorized"
}
```
---

### 12. DELETE /recipes/:id

**Deskripsi:**
- Menghapus resep berdasarkan ID.

**Headers:**
```json
{ "Authorization": "Bearer <your_access_token>" }
```
**Request:**

- Params:

```json
{
  "id": "integer (required)"
}
```

**_Response (200 - OK)_**

```json
{
  "message": "Recipe has been deleted"
}
```

**_Response (404 - Not Found)_**

```json
{
  "message": "error not found"
}
```

**_Response (403 - Forbidden)_**

```json
{
  "message": "Unauthorized"
}
```
---

### 13. POST /recipes/:id/reviews

**Deskripsi:**
- Menambahkan ulasan dan penilaian pada resep.

**Headers:**
```json
{ "Authorization": "Bearer <your_access_token>" }
```

**Request:**

- Params:

```json
{
  "id": "integer (required)"
}
```

- Body:

```json
{
  "rating": 5,
  "comment": "Great recipe!"
}
```

**_Response (201 - Created)_**

```json
{
  "message": "Review has been added"
}
```

**_Response (404 - Not Found)_**

```json
{
  "message": "error not found"
}
```
---
## Global Error
_Response (401 - Unauthorized)_

```json
{
  "message": "Unauthenticated"
}
```
_Response (500 - Internal Server Error)_

```json
{
  "message": "Server error"
}
```