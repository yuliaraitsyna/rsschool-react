import React, { ChangeEvent, FormEvent } from "react";
import { Person } from "../models/Person";

interface Props {
    onSearchResult: (result: Person[]) => void;
}

interface State {
    query: string,
}

class Search extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            query: localStorage.getItem('searchQuery') || "",
        };
    }

    componentDidMount() {
        const query = localStorage.getItem('searchQuery');
        if(query) {
            this.setState({ query: query});
        }
    }

    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        this.setState({
            query: query
        });
        localStorage.setItem('searchQuery', query);
    };

    handleSearch = (event: FormEvent) => {
        event.preventDefault();
        const {query} = this.state;

        fetch(`https://swapi.dev/api/people/?search=${query}`)
            .then(response => {
                if(!response.ok) {
                    throw new Error("Nothing was found");
                }
                return response.json();
            })
            .then(data => {
                this.props.onSearchResult(data.results);
            })
            .catch(error => {
                throw new Error(error.message);
            });
    };

    render() {
        const { query } = this.state;
        
        return (
            <div className="search-bar">
                <form onSubmit={this.handleSearch}>
                <input type="text" value={query} placeholder="Enter your query" onChange={this.handleInputChange}></input>
                <button type="submit">Search</button>
                </form>
            </div>
        )
    }

}

export default Search;