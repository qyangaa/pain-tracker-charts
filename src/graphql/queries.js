import { gql } from "graphql-request";

export const getLineChart = gql`
  query getLineChart($numMonths: Float!, $type: String!) {
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

export const getPieChart = gql`
  query getPieChart(
    $categoryId: Int!
    $categoryName: String!
    $optionId: Int!
    $optionName: String!
    $numMonths: Float!
    $extension: Float!
  ) {
    getPieChart(
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
