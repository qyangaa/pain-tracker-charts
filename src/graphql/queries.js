import { gql } from "graphql-request";

export const getLineChart = gql`
  query getLineChart($numMonths: Int!, $type: String!) {
    getLineChart(numMonths: $numMonths, type: $type) {
      title
      seriesData {
        xlabel
        ylabel
        xunit
        yunit
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
      _id
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
    $numMonths: Int!
    $extension: Int!
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
        _id
        name
      }
      options {
        _id
        name
      }
    }
  }
`;
