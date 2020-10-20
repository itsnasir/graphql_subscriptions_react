import React, { useState } from 'react';

export const Comments = props => {
  const [id, setId] = useState(props.history.location.state.id);
  return <p>comment id : {id}</p>;
};
