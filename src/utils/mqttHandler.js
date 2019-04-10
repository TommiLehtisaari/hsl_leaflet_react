import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

// Client connections
const apollo_client = new ApolloClient({
  uri: "https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql"
});

export function subscribeTransport(mqtt_client, line) {
  routeQuery(line).then(res => {
    let { gtfsId } = res.data.routes[0];
    gtfsId = gtfsId.replace("HSL:", "");
    let topic = lineTopic(gtfsId);
    mqtt_client.subscribe(topic);
  });
}

export function unsubscribeTransport(mqtt_client, line) {
  routeQuery(line).then(res => {
    let { gtfsId } = res.data.routes[0];
    gtfsId = gtfsId.replace("HSL:", "");
    let topic = lineTopic(gtfsId);
    mqtt_client.unsubscribe(topic);
  });
}

export function unsubscribeAll(mqtt_client) {
  const topics = [];
  for (let key in mqtt_client.messageIdToTopic) {
    topics.push(mqtt_client.messageIdToTopic[key][0]);
  }
  if (topics.length > 0) {
    mqtt_client.unsubscribe(topics);
  }
}

function lineTopic(gtfsId) {
  return `/hfp/v1/journey/ongoing/+/+/+/${gtfsId}/+/+/+/+/+/#`;
}

function routeQuery(nro) {
  return apollo_client.query({
    query: gql`
      {
        routes(name: "${nro}") {
          gtfsId
          longName
          shortName
          mode
        }
      }
    `
  });
}
