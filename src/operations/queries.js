import { gql, makeVar } from '@apollo/client';

export const test = makeVar(false);

export const GET_TEST = gql`query getTest{test @client}`;

const Signatures = {
    RuleDetails: gql` fragment RuleDetails on Rule {
      hasMatch
      id
      lastMatchDate
      name
      rawRule
      systemCount
      metadata
}` };

export const GET_SIGNATURE_PAGE = gql`query QuerySigPage($offset: Int = 0, $limit: Int = 10)  {
  rules(offset: $offset, first: $limit)  {
    nodes {
      ...RuleDetails
    }
    totalCount
  }
  ruleStats {
    matchedCount
    enabledCount
    disabledCount
  }
  hostScans(first: 1, orderBy: CREATED_AT_ASC) {
    nodes {
      createdAt
    }
    totalCount
  }
  hosts {
    totalCount
  }
  ruleStats {
    matchedCount
  }
}${Signatures.RuleDetails}`;

export const GET_SIGNATURE_DETAILS_PAGE = gql`query QuerySigDetailsPage($ruleName: String)  {
  rules(ruleName: $ruleName)  {
    edges {
      node {
      ...RuleDetails
    }
  }  
  }
}${Signatures.RuleDetails}`;
