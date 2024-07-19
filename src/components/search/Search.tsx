import React, { ChangeEvent, FormEvent } from "react";
import useLocalStorage from "../../models/useLocalStorage";
import { Person } from "../../models/Person";
import "./Search.css"
import { useGetDataByNameQuery } from "../../redux/starWarsAPI";

interface Props {
    onSearchResult: (result: Person[]) => void;
    setLoading: (loading: boolean) => void;
}

const Search: React.FC <Props> = ({onSearchResult, setLoading}) => {

    const [query, setQuery] = useLocalStorage('searchQuery', '');
    const { data, error, isLoading } = useGetDataByNameQuery(query);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        if(data) {
            onSearchResult(data.results);
        }
        else if(error) {
            throw error;
        }
        setLoading(isLoading);
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
