import React, { useState, useContext } from "react";
import { NameFinderHistoryContext } from "../context/NameFinderHistoryContext";
import NameFinderHistoryList from "./NameFinderHistoryList";
import { handleRequestForNameFinder } from "./AxiosGetHandler";
import LoadingIndicator from "./LoadingIndicator";
import ErrorBoundary, { ErrorFallback } from "../ErrorBoundary/ErrorBoundary";

const NameFinder = () => {
  const [loading, setLoading] = useState(false);
  const [nameForSearch, setNameForSearch] = useState("");
  const [usersData, setUsersData] = useState("");
  const {addHistoryItem, historyItems} = useContext(NameFinderHistoryContext);
  const [hasError, setHasError] = useState(false);
  const random = Math.round(Math.random() * (1500 - 700)) + 700; //For random loading time on getData

  const getData = () => {
    setLoading(true);
    if (nameForSearch.length && nameForSearch !== "FAIL") {
      setTimeout(async () => {
        try {
          const responseResult = await handleRequestForNameFinder(
            nameForSearch
          );
          setUsersData(responseResult);
          if (responseResult.users.length) {
            const historyUserIds = historyItems.map(item => item.id);

            responseResult.users.every(user => {
              if (!historyUserIds.includes(user.id)) {
                addHistoryItem(user);
                return false
              } else return true
            })
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      }, random);
    } else {
      setLoading(false);
      setHasError(true);
    }
  };
  
  const getHistoryData = (searchedId) => {
    setLoading(true);
      setTimeout( () => {
        const index = historyItems.findIndex(historyItem => [parseInt(searchedId,10)].includes(historyItem.id) );
          setUsersData({users: [historyItems[index]]});
          addHistoryItem(historyItems[index], index);
          setLoading(false);
      }, random);
}

  const ThrowError = () => {
    if (hasError) {
      throw new Error("ERROR Throwed in NameFinder");
    }
    return <></>;
  };

  return (
    <div className="name-finder-container">
      <div className="search-form">
        <input
          defaultValue={nameForSearch}
          onChange={(e) => {
            setHasError(false);
            setNameForSearch(e.target.value);
          }}
          type="text"
          id="name-search-input"
          placeholder="Név..."
        />
        <button type="button" onClick={getData}>
          Keres
        </button>
      </div>
      {loading && <LoadingIndicator />}

      <ErrorBoundary FallbackComponent={ErrorFallback} key={nameForSearch}>
        <ThrowError />
        {!loading && usersData && usersData.users.length ? (
          <div className="user-details">
            <div className="user-main-info">
              <div className="user-name">{usersData.users[0].name}</div>
              <div className="user-id">ID: {usersData.users[0].id}</div>
            </div>
            <div className="user-email">{usersData.users[0].email}</div>
            <div className="user-pre-info">
              <div>{usersData.users[0].status}</div>
              <div>{usersData.users[0].gender}</div>
              <div>Added: {usersData.users[0].created_at.slice(0, 10)}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </ErrorBoundary>
      {!loading && usersData && !usersData.users.length ? (
        <div className="error">Sorry but nothing found</div>
      ) : (
        ""
      )}

      {!loading ? (
        <div className="name-finder-history-container">
          <NameFinderHistoryList
            newHistoryItem={usersData.length ? usersData.users[0] : null}
            loadHistoryItem={getHistoryData}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default NameFinder;
