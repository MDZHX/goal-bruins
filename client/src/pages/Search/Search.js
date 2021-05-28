import React from 'react';

import Goal from '../../components/Goal/Goal';
import Nav from '../../components/Nav/Nav';

function Search({ fetchSearchResults, searchResults }) {
  const resultList = searchResults.map((goal) => {
    return (
      <Goal
        key={goal._id}
        id={goal._id}
        name={goal.name}
        desc={goal.description}
        likes={goal.likes}
        liked={goal.liked}
        followed={goal.followed}
      />
    );
  });

  return (
    <>
      <Nav fetchSearchResults={fetchSearchResults} />
      <div>
        {resultList}
      </div>
    </>
  );
}

export default Search;
