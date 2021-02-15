import React, { useState, useEffect } from "react";
import { handleRequestForAllUserData } from "./AxiosGetHandler";
import LoadingIndicator from './LoadingIndicator';

const NameFinder = (params) => {
    const [loading, setLoading] = useState(false);
    const [nameForSearch, setNameForSearch] = useState('');
    let page = 1;
    let find = null;
    let fail = false;
    let usersData = null;
    
    const getName = ()=> {
        console.log('Clicked for search');///////////////////
        const name = document.getElementById('name-search-input').value;
        find = null;
        page = 1;
        setNameForSearch(name);
        setLoading(true);
        console.log('looking for', name);///////////////////
    }

    const getData = async () => {
        console.log('Lets get data with nameForSearch:', nameForSearch);///////////////////
        if ( nameForSearch.length && nameForSearch !== 'FAIL' ) {  
            try {
                usersData = await handleRequestForAllUserData(page);
                console.log('Got data and start searching...');///////////////////
                searchName();
            } catch (error) {
                setLoading(false);
            }
        } else {
            console.log('FAIL or empty search');///////////////////
            setLoading(false);
        }    
    }

    const searchName = ()=> {
        console.log('Start search in userData: ', usersData );///////////////////
        if (usersData) {
            console.log('MAX PAGE NUMBER:', page,  page >= usersData.maxPageNumber,  usersData.maxPageNumber);///////////////////

            usersData.users.forEach( user => {
                console.log('check: ', user.name);///////////////////
                if ( user.name === nameForSearch ) { 
                    find = user;
                    setLoading(false);
                    console.log('YESSS FOUND: ', user.name);///////////////////
                } 
            });

            if (page === usersData.maxPageNumber) {
                fail = true;
                setLoading(false);
                console.log('SORRY NOTHING FOUND, reach max page limit: ', page);///////////////////
            }else if ( find === null && fail === false ) {
                console.log('NOT find and NOT fail so increase page num!:', find, fail, 'new page:', (page+1));///////////////////
                page++;
                getData();
            }else {
                console.log('End of search with find:', find, 'or fail:', fail);///////////////////
            }
        }
    }

    useEffect(() => {
        if ( nameForSearch.length && nameForSearch !== 'FAIL' && loading ) {
            console.log('loading:', loading);///////////////////
            console.log('Hey its useEffect lets start get Data and write out Loading or something', loading);///////////////////
            getData();
        } else {
            setLoading(false)
        }
      }, [loading]);
    
  
    return (
      <div className="name-finder-container">
          <div>
              <input type='text' id="name-search-input" placeholder='Név...'/>
              <button type="button" onClick={getName}>Keres</button> 
          </div>
        {loading && <LoadingIndicator />}
        {!loading && find && (
          <div > Found: {find.name} </div>
        )}
        {!loading && fail && (
          <div > Sorry nothing Found :( </div>
        )}
      </div>
    );
  };
  
  export default NameFinder;