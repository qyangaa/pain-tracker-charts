import { gql } from "graphql-request";

export const getPainDayData = gql`
  query getPainDayData($numMonths: String!) {
    getPainDayData(numMonths: $numMonths) {
      title
      seriesData {
        xlabel
        ylabel
        xmin
        xmax
        ymin
        ymax
        data {
          x
          y
        }
      }
    }
  }
`;

export const getDailyTotal = gql`
  query getDailyTotal(
    $categoryId: String!
    $categoryName: String!
    $numMonths: String!
    $type: String!
  ) {
    getDailyTotal(
      categoryId: $categoryId
      categoryName: $categoryName
      numMonths: $numMonths
      type: $type
    ) {
      title
      seriesData {
        xlabel
        ylabel
        xmin
        xmax
        ymin
        ymax
        data {
          x
          y
        }
      }
    }
  }
`;

export const getContribution = gql`
  query getContribution(
    $categoryId: String!
    $categoryName: String!
    $optionId: String!
    $optionName: String!
    $numMonths: String!
    $extension: String!
  ) {
    getContribution(
      categoryId: $categoryId
      categoryName: $categoryName
      optionId: $optionId
      optionName: $optionName
      numMonths: $numMonths
      extension: $extension
    ) {
      title
      seriesData {
        xlabel
        ylabel
        data {
          x
          y
        }
      }
    }
  }
`;
