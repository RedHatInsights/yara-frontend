import { gql, makeVar } from '@apollo/client';

export const test = makeVar(false);

const Signatures = {
    RuleDetails: gql` fragment RuleDetails on Rule {
      hasMatch
      id
      lastMatchDate
      name
      rawRule
      metadata
      isDisabled
      systemCount
    }`,
    ExtraRuleDetails: gql` fragment ExtraRuleDetails on Rule {
      affectedSystems {
          totalCount
        }
}` };

export const GET_SIGNATURE_PAGE = gql`query QuerySigPage {
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
}`;

export const GET_SIGNATURE_TABLE = gql`query QuerySigPage($offset: Int = 0, $limit: Int = 10, $orderBy: [RulesOrderBy!], $ruleName: String)  {
  rulesList(offset: $offset, first: $limit, orderBy: $orderBy, ruleName: $ruleName)  {
      ...RuleDetails
  }
  rules {
    totalCount
  }
}${Signatures.RuleDetails}`;

export const GET_SIGNATURE_DETAILS_PAGE = gql`query QuerySigDetailsPage($ruleName: String)  {
  rules(ruleName: $ruleName)  {
    edges {
      node {
      ...RuleDetails
      ...ExtraRuleDetails
    }
  }  
  }
  hosts {
    totalCount
  }
}${Signatures.RuleDetails}${Signatures.ExtraRuleDetails}`;
