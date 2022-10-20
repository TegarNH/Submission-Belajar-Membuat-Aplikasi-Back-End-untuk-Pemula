const { nanoid } = require('nanoid');
const books = require('./books');

/*
  ADD BOOK
*/
const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Mengecek jika client tidak melampirkan properti name.
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  // Mengecek jika client melampirkan nilai properti readPage
  // lebih besar dari nilai properti pageCount.
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const id = nanoid(16); // Membuat id random sebanyak 16 digit
  const finished = (pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  // Jika buku berhasil dimasukkan.
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  // Jika server gagal memasukkan buku karena alasan umum.
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

/*
  GET ALL BOOK FROM SERVER
*/
const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query; // menambahkan query parameter.

  // Mendapatkan books dengan parameter name.
  if (name !== undefined) {
    const filteredBooks = books.filter(
      (bookItem) => bookItem.name.toLowerCase().includes(name.toLowerCase()),
    );

    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooks.map((bookItem) => ({
          id: bookItem.id,
          name: bookItem.name,
          publisher: bookItem.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  // Mendapatkan books dengan parameter reading.
  if (reading !== undefined) {
    const filteredBooks = books.filter(
      (bookItem) => Number(bookItem.reading) === Number(reading),
    );

    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooks.map((bookItem) => ({
          id: bookItem.id,
          name: bookItem.name,
          publisher: bookItem.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  // Mendapatkan books dengan parameter finished.
  if (finished !== undefined) {
    const filteredBooks = books.filter(
      (bookItem) => Number(bookItem.finished) === Number(finished),
    );

    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooks.map((bookItem) => ({
          id: bookItem.id,
          name: bookItem.name,
          publisher: bookItem.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  // Mendapatkan books tanpa parameter.
  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  });

  response.code(200);
  return response;
};

/*
  GET DETAIL BOOK BY ID
*/
const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((bookItem) => bookItem.id === id)[0];

  // Jika id buku ditemukan.
  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  // Jika id buku tidak ditemukan.
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

/*
  EDIT BOOK
*/
const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    // Mengecek jika client tidak melampirkan properti name.
    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    }

    // Mengecek jika client melampirkan nilai properti readPage
    // lebih besar dari nilai properti pageCount.
    if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }

    const finished = (pageCount === readPage);

    // Menyimpan data buku sesuai indexnya.
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  // Jika ID buku tidak ditemukan.
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

/*
  DELETE BOOK BY ID
*/
const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  // Jika ID ditemukan, server akan menghapus bukunya.
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  // Jika ID tidak ditemukan.
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
