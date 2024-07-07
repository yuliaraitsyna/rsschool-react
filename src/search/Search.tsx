import React, { ChangeEvent, FormEvent } from "react";
import { Person } from "../models/Person";
import "./Search.css"

interface Props {
    onSearchResult: (result: Person[]) => void;
    setLoading: (loading: boolean) => void;
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
        if (query) {
            this.setState({ query: query });
        }
    }

    handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            query: event.target.value
        });
        localStorage.setItem('searchQuery', event.target.value);
    };

    handleSearch = (event: FormEvent) => {
        event.preventDefault();
        const { query } = this.state;

        this.props.setLoading(true);

        fetch(`https://swapi.dev/api/people/?search=${query}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Nothing was found");
                }
                return response.json();
            })
            .then(data => {
                setTimeout(() => {
                    this.props.onSearchResult(data.results);
                    this.props.setLoading(false);
                }, 1000)
            })
            .catch(error => {
                console.error("Error during search: ", error);
                this.props.setLoading(false);
            });
    };

    render() {
        const { query } = this.state;

        return (
            <div className="search-bar">
                <form onSubmit={this.handleSearch}>
                    <input
                        type="text"
                        value={query}
                        placeholder="Enter your query"
                        onChange={this.handleInputChange}
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    }
}

export default Search;
