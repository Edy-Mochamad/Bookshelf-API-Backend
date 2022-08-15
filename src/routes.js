// memuat kode konfigurasi : method, path dan handler.
const {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deletedBookByIdHandler,
} = require('./handler');

const routes = [
    {
        method : 'POST',
        path : '/books',
        handler : addBookHandler,
    },
    {
        method : 'GET',
        path : '/books',
        handler : getAllBooksHandler,
    },
    {
        method : 'GET',
        path : '/books/{bookId}',
        handler : getBookByIdHandler,
    },
    {
        method : 'PUT',
        path : '/books/{bookId}',
        handler : editBookByIdHandler,
    },
    {
        method : 'DELETE',
        path : '/books/{bookId}',
        handler : deletedBookByIdHandler,
    },
];


module.exports = routes;