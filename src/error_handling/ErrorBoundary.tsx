import React from "react";
import errorIcon from "../assets/error.png";
import "./ErrorBoundary.css"

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error('Error boundary: ', error, errorInfo);
        this.setState({ hasError: true, });
    }

    render() {
        if(this.state.hasError) {
            return (
                <div className="errorMessage">
                    <h1>Something went wrong</h1>
                    <img src={errorIcon}></img>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;