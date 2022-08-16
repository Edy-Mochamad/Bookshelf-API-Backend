/* eslint-disable no-unreachable */
const {nanoid} = require('nanoid');
const books = require('./books');

// KRITERIA 1 MENAMBAHKAN BUKU.
const addBookHandler = (request, h) => {
    const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

// -----------------------------BATAS ATAS.
    if (readPage > pageCount) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    };
// -----------------------------BATAS BAWAH.

// -----------------------------BATAS ATAS.
    if (!name || name === '' || name === null) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    };
// -----------------------------BATAS BAWAH.

// -----------------------------BATAS ATAS.
const isFinished = (pageCount, readPage) => {
    if (pageCount === readPage) {
        return true;
    } else {
        return false;
    };
};

const finished = isFinished(pageCount, readPage);
// -----------------------------BATAS BAWAH.

// NEWBOOK
const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
};

books.push(newBook);

// -----------------------------BATAS ATAS.
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil ditambahkan',
            data : {
                bookId : id,
            },
        });
        response.code(201);
        return response;
    };

    const response = h.response({
        status : 'error',
        message : 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
// -----------------------------BATAS BAWAH.

};

// KRITERIA 2 MENAMPILKAN SELURUH BUKU YANG DITAMBAHKAN.
const getAllBooksHandler = (request, h) => {
//     const response = h.response({
//         status: 'success',
//         data: {
//                 books: books.map((m) => ({
//                 id: m.id,
//                 name: m.name,
//                 publisher: m.publisher,
//             })),
//         },
//     });
//     response.code(200);
//     return response;
// };

    const { name, reading, finished } = request.query;
    const includeName = books;

    if (name) {
        const lowName = name.toLowerCase();
        // const bookNameOptional = (book) => book.name.toLowerCase().includes(name.toLowerCase()); // masih salah
        // includeName = bookNameOptional.filter(bookNameOptional); // masih salah
        const response = h.response({
            status : 'success',
            data : {
                books : books
                .filter((contains) => contains.name === lowName) // salahnya disini bagian 'a',  https://www.w3schools.com/jsref/jsref_includes.asp
                .map((books) => ({
                    id : books.id,
                    name : books.name,
                    publisher : books.publisher,
                })),
        },
    });
    response.code(200);
    return response;
    };

    if (reading === '1') {
        const response = h.response({
            status : 'success',
            data : {
            books : books
            .filter((b) => b.reading === true)
            .map((books) => ({
                id : books.id,
                name : books.name,
                publisher : books.publisher,
            })),
        },
    });
    response.code(200);
    return response;
    };

    if (reading === '0') {
        const response = h.response({
            status : 'success',
            data : {
            books : books
            .filter((c) => c.reading === false)
            .map((books) => ({
                id : books.id,
                name : books.name,
                publisher : books.publisher,
            })),
        },
    });
    response.code(200);
    return response;
    };

    if (finished === '1') {
        const response = h.response({
            status : 'success',
            data : {
            books : books
            .filter((d) => d.finished === true)
            .map((books) => ({
                id : books.id,
                name : books.name,
                publisher : books.publisher,
            })),
        },
    });
    response.code(200);
    return response;
    };

    if (finished === '0') {
        const response = h.response({
            status : 'success',
            data : {
            books : books
            .filter((e) => e.finished === false)
            .map((books) => ({
                id : books.id,
                name : books.name,
                publisher : books.publisher,
            })),
        },
    });
    response.code(200);
    return response;
    };

    const response = h.response({
        status : 'success',
        data : {
            books : books.map((f) => ({
                id : f.id,
                name : f.name,
                publisher : f.publisher,
            })),
        },
    });
    response.code(200);
    return response;
};

// KRITERIA 3 MENAMPILKAN DETAIL BUKU
const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((b) => b.id === bookId)[0];
    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: {
                book,
            },
        });
        response.code(200);
        return response;
    };

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};


// KRITERIA 4 MENGEDIT BUKU
const editBookByIdHandler = (request, h) => {
    const {bookId} = request.params;

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

    if (!name || name === '' || name === null) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    };

    if (readPage > pageCount) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    };

    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            reading,
            updatedAt,
        };
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    };

    const response = h.response({
        status : 'fail',
        message : 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

// KRITERIA 5 MENGHAPUS BUKU
const deletedBookByIdHandler = (request, h) => {
    const {bookId} = request.params;

    const index = books.findIndex((i) => i.id === bookId);

    if (index !== -1) { // kesalahan sebelumnya pada -1, menggunakan undefined
        books.splice(index, 1);
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil dihapus',
            data : {
                bookId,
            },
        });
        response.code(200);
        return response;
    };

    const response = h.response({
        status : 'fail',
        message : 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};




module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deletedBookByIdHandler,
};