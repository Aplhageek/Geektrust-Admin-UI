import { useState } from "react";
import styles from './Search.module.css';

function Search({  performSearch }) {
    
const [timerId, setTimerId] = useState();

    const debounceSearch = (event, timerId) => {
        if (timerId) clearTimeout(timerId);
        const newTimerId = setTimeout(() => performSearch(event.target.value), 500);
        setTimerId(newTimerId);
    }   

    return (
        <>
            <input  placeholder="Search for Name, Email or Role" className={styles.search_bar} type="text" name="query"  onChange={(event) => debounceSearch(event, timerId)} />
        </>
    )
}

export default Search;