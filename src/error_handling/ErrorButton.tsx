import React from "react";

const ErrorButton: React.FC = () => {
    const [hasError, setHasError] = React.useState(false);

    if (hasError) {
        throw new Error("This is a test error");
    }

    return (
        <button onClick={() => setHasError(true)}>
            Trigger Error
        </button>
    );
};

export default ErrorButton;