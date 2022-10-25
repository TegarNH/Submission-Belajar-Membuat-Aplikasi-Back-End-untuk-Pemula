# Submission Kelas "Belajar Membuat Aplikasi Back End untuk Pemula" Dicoding
## Overview
Bookshelf API is an API that can store unread or read book data. This API can save, view book details, modify or delete books that have been saved.

## Endpoint URL (Live)
[http://3.0.97.188:5000](http://3.0.97.188:5000)

## How to use:
### 1. Save Book
- Method : POST
- URL :  **/books**
- Body Request :
```
{
    "name":  string,
    "year": number,
    "author":  string,
    "summary":  string,
    "publisher":  string,
    "pageCount": number,
    "readPage": number,
    "reading":  boolean
}
```
- Response :
```
{
    "status": "success",
    "message": "Buku berhasil ditambahkan",
    "data": {
        "bookId": "4-P4MyTqWy26Riej"
    }
}
```

### 2. Get All Books
- Method : GET
- URL :  **/books**
- Response :
```
{
    "status": "success",
    "data": {
        "books": [
            {
                "id": "4-P4MyTqWy26Riej",
                "name": "Habis Gelap Terbitlah Terang",
                "publisher": "Balai Pustaka"
            }
        ]
    }
}
```

### 3. Get Detail Book
- Method : GET
- URL :  **/books/{bookId}**
- Response :
```
{
    "status": "success",
    "data": {
        "book": {
            "id": "4-P4MyTqWy26Riej",
            "name": "Habis Gelap Terbitlah Terang",
            "year": 2005,
            "author": "Kartini",
            "summary": "Habis Gelap Terbitlah Terang adalah buku kumpulan surat yang ditulis oleh Kartini. Kumpulan surat tersebut dibukukan oleh J.H. Abendanon dengan judul Door Duisternis Tot Licht.",
            "publisher": "Balai Pustaka",
            "pageCount": 204,
            "readPage": 1,
            "finished": false,
            "reading": false,
            "insertedAt": "2022-10-25T15:47:38.445Z",
            "updatedAt": "2022-10-25T15:47:38.445Z"
        }
    }
}
```

### 4. Edit Book
- Method : PUT
- URL :  **/books/{bookId}**
- Body Request :
```
{
    "name":  string,
    "year": number,
    "author":  string,
    "summary":  string,
    "publisher":  string,
    "pageCount": number,
    "readPage": number,
    "reading":  boolean
}
```
- Response :
```
{
    "status": "success",
    "message": "Buku berhasil diperbarui"
}
```

### 5. Delete Book
- Method : DELETE
- URL :  **/books/{bookId}**
- Response :
```
{
    "status": "success",
    "message": "Buku berhasil dihapus"
}
```
