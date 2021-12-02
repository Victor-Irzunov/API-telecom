import React, {memo, useState} from 'react';
import "./Search.css";

const Search = memo(({sendServerSearch}) => {
    const [changeInputVal, setChangeInputVal] = useState('');


    return (
        <div>
            <input
                type="search"
                name="search"
                onChange={event => setChangeInputVal(event.target.value)}
                value={changeInputVal}
                placeholder="поиск по заголовку"
                className="search__input"
            />
            <button
                className="search__btn"
                type="submit"
                onClick={() => {
                    sendServerSearch(changeInputVal)
                    setChangeInputVal('')
                }}
            ><i className="fa fa-search" aria-hidden="true"/></button>
        </div>
    );
});

export default Search;