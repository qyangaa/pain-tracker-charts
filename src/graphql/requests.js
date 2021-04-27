import { request } from "graphql-request";
import * as queries from "./queries";
import { client } from "./graphqlConfig";
import _ from "lodash";

export const setToken = (token) =>
  client.setHeader("authorization", `Bearer ${token}`);

export const getPainDayData = async ({ numMonths }) => {
  if (!numMonths) return;
  const variables = {
    numMonths,
  };
  const data = await client.request(queries.getPainDayData, variables);
  return data.getPainDayData;
};

export const getDailyTotal = async (variables) => {
  // console.log({ variables });
  if (
    !variables.categoryId ||
    !variables.categoryName ||
    !variables.numMonths ||
    !variables.type
  )
    return;
  const data = await client.request(queries.getDailyTotal, variables);
  return data.getDailyTotal;
};

export const getContribution = async (variables) => {
  if (
    !variables.categoryId ||
    !variables.categoryName ||
    !variables.optionId ||
    !variables.optionName ||
    !variables.numMonths ||
    !variables.extension
  )
    return;
  const data = await client.request(queries.getContribution, variables);
  return data.getContribution;
};
