import { gql } from "graphql-request";

export const getLineChart = gql`
  query getLineChart($numMonths: String!, $type: String!) {
    getLineChart(numMonths: $numMonths, type: $type) {
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

export const getLineChartSelections = gql`
  query getLineChartSelections {
    getLineChartSelections {
      id
      name
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

export const getPieChartSelections = gql`
  query getPieChartSelections {
    getPieChartSelections {
      categories {
        id
        name
      }
      options {
        id
        name
      }
    }
  }
`;
