import React, { ChangeEvent, FormEvent } from "react";
import { Person } from "../../models/Person";
import "./Search.css"

interface Props {
    onSearchResult: (result: Person[]) => void;
    setLoading: (loading: boolean) => void;
}

const Search: React.FC <Props> = ({onSearchResult, setLoading}) => {

    const [query, setQuery] = React.useState<string>(localStorage.getItem('searchQuery') || "");

    React.useEffect(() => {
        const storedQuery = localStorage.getItem('searchQuery');
        storedQuery ? setQuery(storedQuery) : setQuery('');
    }, [])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const updatedQuery = event.target.value;
        setQuery(updatedQuery);
        localStorage.setItem('searchQuery', updatedQuery);
    }

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        setLoading(true);

        fetch(`https://swapi.dev/api/people/?search=${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Nothing was found");
                }
                return response.json();
            })
            .then(data => {
                setTimeout(() => {
                    onSearchResult(data.results);
                    setLoading(false);
                }, 1000)
            })
            .catch(error => {
                console.error("Error during search: ", error);
                setLoading(false);
            });
    }

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    placeholder="Enter your query"
                    onChange={handleInputChange}
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
    
}

export default Search;
