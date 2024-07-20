import { RootState } from "../../redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, prevPage } from "../../redux/pageSlice";

const Panigation: React.FC = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state: RootState) => state.pages.currentPage);
    const totalPages = useSelector((state: RootState) => state.pages.totalPages);

    const handlePreviousPage = () => {
        dispatch(prevPage());
    };
    
    const handleNextPage = () => {
        dispatch(nextPage());
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