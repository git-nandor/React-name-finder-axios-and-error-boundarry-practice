import React, { useContext } from "react";
import { NameFinderHistoryContext } from '../context/NameFinderHistoryContext';




const NameFinderHistoryList = (props)=> {
    const { historyItems } = useContext(NameFinderHistoryContext);
    const historyList = historyItems.map( item => {
        console.log('render hist element with key:', item.id);
        return (
        <div className='history-item' key={item.id} id={item.id} onClick={(e) => props.loadHistoryItem(e.target.id) }>{item.name}</div>
        );
    });

    return (
        <div className="history">
            <h3>History</h3>
            <p className="guide">Get data without send axios request:</p>
            <div className='history-items-container'>
                {historyList}     
            </div>
        </div>
    )
}
export default NameFinderHistoryList;