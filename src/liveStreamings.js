import React, { useEffect } from 'react';
import LiveStreaming from './liveStreaming'
import { useQuery, gql } from '@apollo/client';

const LIVE_STREAMINGS = gql`
query{
  liveStreamings {
    id
    url
  }
}
`
const NEW_LIVE_STREAMINGS = gql`
subscription{
  newStreamingLink {
    liveStreaming {
      id
      url
    }
  }
}
`

const LiveStreamings=(props) => {
  const { loading, error, data, subscribeToMore } = useQuery(LIVE_STREAMINGS);

  subscribeToMore({
    document: NEW_LIVE_STREAMINGS,
    updateQuery(prev, { subscriptionData }) {
      console.log("ss =>", subscriptionData)
       if (!subscriptionData.data) return prev
       console.log("ss =>", subscriptionData.data)

       return {
         liveStreamings: [...prev.liveStreamings, subscriptionData.data.newStreamingLink]
       }
    }
  });

  const getLiveStreamings=() => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const linksToRender = data.liveStreamings
    return (
      <div>
        <h3>LiveStreamings</h3>
        <div>
          {linksToRender.map(link => <LiveStreaming key={link.id} link={link} />)}
        </div>
      </div>
    );
  }
  return (
    <>{getLiveStreamings()}</>
  );
}

export default LiveStreamings
