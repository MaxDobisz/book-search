import { Banner } from './components/Banner';
import { SearchForm } from './components/SearchForm';
import { Books } from './components/Books';
import { Error } from './components/Error';
import { useEffect, useState } from 'react';
import { Spinner } from './components/Spinner';
import axios from 'axios';

export const App = () => {
    const [query, setQuery] = useState();
    const [books, setBooks] = useState();
    const [error, setError] = useState();
    const [spinner, setSpinner] = useState();

    useEffect(() => {
        const fetchData = async () => {
            setSpinner(true);

            try {
                const { data: { items } } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}`);

                if (!items) {
                    setError(`Sorry, we couldn't find any books matching your search criteria. Please try again with different keywords.`);
                } else {
                    setBooks(items);
                }

            } catch (error) {
                setError('An error has occurred. Please try again.');
            }

            setSpinner(false);
        }

        if (query) {
            fetchData();
        }
    }, [query]);

    return (
        <div className="app">
            <Banner />
            <SearchForm setQuery={setQuery} setError={setError} setBooks={setBooks} />
            {books && <Books books={books} />}
            {error && <Error error={error} />}
            {spinner && <Spinner />}
        </div>
    );
}