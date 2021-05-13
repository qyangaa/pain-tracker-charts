import * as queries from "./queries";
import { client } from "./graphqlConfig";
import _ from "lodash";

export const setToken = (token) =>
  client.setHeader("authorization", `Bearer ${token}`);

export const getLineChart = async ({ numMonths, type }) => {
  if (!numMonths || !type) return;
  const variables = {
    numMonths,
    type,
  };
  const data = await client.request(queries.getLineChart, variables);
  return data.getLineChart;
};

export const getLineChartSelections = async () => {
  const data = await client.request(queries.getLineChartSelections);
  return data.getLineChartSelections;
};

export const getPieChart = async (variables) => {
  if (
    !variables.categoryId ||
    !variables.categoryName ||
    !variables.optionId ||
    !variables.optionName ||
    !variables.numMonths ||
    !variables.extension
  )
    return;
  const data = await client.request(queries.getPieChart, variables);
  return data.getPieChart;
};

export const getPieChartSelections = async () => {
  const data = await client.request(queries.getPieChartSelections);
  return data.getPieChartSelections;
};
