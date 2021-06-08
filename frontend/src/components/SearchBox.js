import React, { useState } from 'react'

const SearchBox = (props) => {
  const [name, setName] = useState('');
  const submitHandler = (event) => {
    event.preventDefault();
    props.history.push(`/search/name/${name}`);
  };
    return (
        <>
            <form onSubmit={submitHandler}>
            <div className="wrapper-search">
              <input
                type="text"
                name='q'
                id='q'
                className="searchbox"
                placeholder="Search"
                onChange={(e) => setName(e.target.value)}
              />
              <button type='submit' className="btn-search">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </form>
        </>
    )
}

export default SearchBox
