import React, { useEffect, useState } from "react";
import LiveStreaming from "./liveStreaming";
import { useQuery, gql, useSubscription } from "@apollo/client";

const LIVE_STREAMINGS = gql`
  query {
    liveStreamings {
      id
      url
    }
  }
`;
const NEW_LIVE_STREAMINGS = gql`
  subscription {
    newStreamingLink {
      newLiveStreaming {
        id
        url
      }
    }
  }
`;

const SUBSCRIBE_TO_INTERACTION = gql`
  subscription($liveStreamingUuid: ID!) {
    newLiveInteractionPosted(liveStreamingUuid: $liveStreamingUuid) {
      newLiveInteraction {
        interactionType
        liveStreaming {
          paid
        }
        seconds
        text
        user {
          fullName
            appRole
            banned
            bio
            eventUrl
            firstName
            lastName
            merchandiseUrl
            largeAvatarUrl
        }
      }
    }
  }
`;

const GET_LIVE_STREAM = gql`
  query($uuid: ID!) {
    liveStreaming(uuid: $uuid) {
      liveInteractions {
        nodes {
          interactionType
          text
        }
        pageInfo {
          hasNextPage
        }
      }
    }
  }
`;

const LiveStreamings = (props) => {
  const [linksToRender, setLinksToRender] = useState([]);
  // const { loading, error, data, subscribeToMore } = useQuery(GET_LIVE_STREAM, {
  //   variables: {uuid: '1dc29b3b-f89c-4cc2-a31a-0041019816e9'},
  // });


  const { data, error, loading } = useSubscription(SUBSCRIBE_TO_INTERACTION, {
    variables: {
      liveStreamingUuid: "1dc29b3b-f89c-4cc2-a31a-0041019816e9",
    },
    // shouldResubscribe: true,
    // skip: !recording,
  });

  useEffect(() => {
    console.log(data);
    // if (data) {
    //   setLinksToRender(data.liveStreamings);
    // }
  }, [data]);

  // subscribeToMore({
  //   document: SUBSCRIBE_TO_INTERACTION,
  //   updateQuery(prev, { subscriptionData }) {
  //     console.log("ss =>", subscriptionData);
  //     if (!subscriptionData.data) return prev;
  //     console.log("ss =>", subscriptionData.data);

  //     return {
  //       liveStreamings: [
  //         ...prev.liveStreamings,
  //         subscriptionData.data.newStreamingLink,
  //       ],
  //     };
  //   },
  // });

  const getLiveStreamings = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
      <div>
        <h3>LiveStreamings</h3>
        <div>
          {linksToRender.map((link) => (
            <LiveStreaming key={link.id} link={link} {...props} />
          ))}
        </div>
      </div>
    );
  };
  return <>{getLiveStreamings()}</>;
};

export default LiveStreamings;
