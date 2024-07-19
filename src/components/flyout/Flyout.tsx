import React from "react"
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { unselectAll } from "../../redux/cardsSlice";
import "./Flyout.css"
import downloadCSV from "../../models/downloadCSV";

const Flyout: React.FC = () => {
    const selectedCards = useSelector((state: RootState) => state.cards.selectedCards);
    const dispatch = useDispatch();

    const handleUnselectAll = () => {
        dispatch(unselectAll());
    }

    const hadnleDownload = () => {
        console.log(selectedCards)
        downloadCSV(selectedCards);
    }
    
    return (
        selectedCards.length > 0 ?
        <div className="flyout">
            <button className="download-btn"  onClick={hadnleDownload}>{`Download ${selectedCards.length} items`}</button>
            <button className="unselect-all-btn" onClick={handleUnselectAll}>Unselect all</button>
        </div>
        :
        <></>
    )
}

export default Flyout;