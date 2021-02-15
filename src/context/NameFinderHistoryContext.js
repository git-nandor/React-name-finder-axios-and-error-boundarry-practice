import React, { useState, createContext } from "react";

export const NameFinderHistoryContext = createContext();

const NameFinderHistoryContextProvider = (props)=> {
    const [historyItems, setHistoryItems] = useState([]);

    const addHistoryItem = (newItem, oldIndex = -1)=> {
        if (oldIndex === -1) {
            setHistoryItems([newItem, ...historyItems]);
        } else {
            let items = [...historyItems];
            const itemFromOldIndex = items.splice(oldIndex,1); 
            items.unshift(itemFromOldIndex[0]); 
            setHistoryItems(items);
        }
    } 

    return (
        <NameFinderHistoryContext.Provider value={{historyItems, addHistoryItem}}>
            {props.children}
        </NameFinderHistoryContext.Provider>
    )
}
export default NameFinderHistoryContextProvider;