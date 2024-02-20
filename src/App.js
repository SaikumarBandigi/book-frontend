import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [sort, setSort] = useState('id,asc');
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchBooks();
    }, [page, size, sort]);

    const fetchBooks = async () => {
        const response = await fetch(
            `http://localhost:8080/api/books?page=${page}&size=${size}&sort=${sort}`
        );
        const data = await response.json();
        setBooks(data.content);
        setTotalPages(data.totalPages);
    };

    const handlePrevPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleNextPage = () => {
        setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    };

    return (
        <div className="App">
            <h1>Book List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button onClick={handlePrevPage} disabled={page === 0}>
                    Prev
                </button>
                <span> Page {page + 1} of {totalPages} </span>
                <button onClick={handleNextPage} disabled={page === totalPages - 1}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default App;
