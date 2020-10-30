import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "@apollo/client";
import ActionCable from "actioncable";
import ActionCableLink from "graphql-ruby-client/dist/subscriptions/ActionCableLink";
import { ApolloLink } from "apollo-link";
import { BrowserRouter } from "react-router-dom";

const httpLink = createHttpLink({
  uri: `https://holr-api.dev.geno.me/api/v1/graphql`,
});

// const httpLink = createHttpLink({
//   uri: `http://localhost:3000/api/v1/graphql`
// })

const cable = ActionCable.createConsumer('wss://holr-api.dev.geno.me/cable?uid=cesar@geno.me');
// const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

const hasSubscriptionOperation = ({ query: { definitions } }) => {
  return definitions.some(
    ({ kind, operation }) =>
      kind === "OperationDefinition" && operation === "subscription"
  );
};

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new ActionCableLink({ cable }),
  httpLink
);

const authLink = new ApolloLink((operation, forward) => {
  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      "access-token": "z3mNWceA5PWRqbcsnu0OxQ",
      uid: "cesar@geno.me",
      client: "l_OEFIEpxYfeDApIUQlKIQ",
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  link: ApolloLink.from([authLink, link]),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
