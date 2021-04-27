import { GraphQLClient } from "graphql-request";
import { IP_ADDRESS, PORT } from "../hidden/server";
//  Must use local IP address for
console.log(`http://${IP_ADDRESS}:${PORT}/graphql`);
export const client = new GraphQLClient(`http://${IP_ADDRESS}:${PORT}/graphql`);
