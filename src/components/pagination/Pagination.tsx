import React from "react";


interface Props {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const Panigation: React.FC<Props> = ({currentPage, totalPages, onPageChange}) => {

    const handlePreviousPage = () => {
        if (currentPage > 1) {
          onPageChange(currentPage - 1);
        }
    };
    
    const handleNextPage = () => {
        if (currentPage < totalPages) {
          onPageChange(currentPage + 1);
        }
    };

    return (
        <div className="panigation">
            <button className="previous" onClick={handlePreviousPage} disabled={currentPage === 1}>{`<`}</button>
            <span>{currentPage} / {totalPages}</span>
            <button className="next" onClick={handleNextPage} disabled={currentPage === totalPages}>{`>`}</button>
        </div>
    )
}

export default Panigation