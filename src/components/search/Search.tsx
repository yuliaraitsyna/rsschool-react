import React, { ChangeEvent, FormEvent } from "react";
import useLocalStorage from "../../models/useLocalStorage";
import "./Search.css"
import { useGetDataByNameQuery } from "../../redux/starWarsAPI";
import { useDispatch } from "react-redux";
import { setCards } from "../../redux/cardsSlice";

const Search: React.FC = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useLocalStorage('searchQuery', '');
    const { data, error } = useGetDataByNameQuery(query);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }

    const handleSearch = (event: FormEvent) => {
        event.preventDefault();
        if(data) {
            dispatch(setCards(data.results))
        }
        else if(error) {
            throw error;
        }
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
