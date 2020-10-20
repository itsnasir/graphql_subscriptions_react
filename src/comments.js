import React, { useState } from 'react';

export const Comments = props => {
  const [id] = useState(props.history.location.state.id);
  return <p>comment id : {id}</p>;
};
