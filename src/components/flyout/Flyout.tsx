import React from "react"
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { unselectAll } from "../../redux/cardsSlice";
import "./Flyout.css"

const Flyout: React.FC = () => {
    const selectedCards = useSelector((state: RootState) => state.cards.selectedCards);
    const dispatch = useDispatch();

    const handleUnselectAll = () => {
        dispatch(unselectAll());
    }
    
    return (
        selectedCards.length > 0 ?
        <div className="flyout">
            <button className="download-btn">{`Download ${selectedCards.length} items`}</button>
            <button className="unselect-all-btn" onClick={handleUnselectAll}>Unselect all</button>
        </div>
        :
        <></>
    )
}

export default Flyout;