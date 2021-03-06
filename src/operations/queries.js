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
      hostCount
    }`,
    ExtraRuleDetails: gql` fragment ExtraRuleDetails on Rule {
      affectedHosts {
          totalCount
        }
}` };

export const GET_SIGNATURE_PAGE = gql`query QuerySigPage {
  ruleStats {
    matchedCount
    enabledCount
    disabledCount
  }
  hostScans(first: 1, orderBy: CREATED_AT_DESC) {
    nodes {
      createdAt
    }
    totalCount
  }
  hosts {
    totalCount
  }
}`;

export const GET_SIGNATURE_TABLE = gql`query
QuerySigPage($offset: Int = 0, $limit: Int = 10, $orderBy: [RulesOrderBy!], $ruleName: String, $condition: RuleCondition = {})  {
  rulesList(offset: $offset, first: $limit, orderBy: $orderBy, ruleName: $ruleName, condition: $condition)  {
      ...RuleDetails
  }
  rules(offset: $offset, first: $limit, orderBy: $orderBy, ruleName: $ruleName, condition: $condition) {
    totalCount
  }
}${Signatures.RuleDetails}`;

export const GET_SIGNATURE_DETAILS_PAGE = gql`query QuerySigDetailsPage($ruleName: String)  {
  rulesList(ruleName: $ruleName)  {
      ...RuleDetails
      ...ExtraRuleDetails
  }
  hosts {
    totalCount
  }
}${Signatures.RuleDetails}${Signatures.ExtraRuleDetails}`;

export const GET_MALWARE_COUNT = gql`query QuerySigPage {
  ruleStats {
    matchedCount
  }
}`;

export const GET_SIGNATURE_DETAILS_TABLE = gql`query QuerySigPage($offset: Int = 0, $limit: Int = 10, $orderBy: [HostWithMatchesOrderBy!],
$ruleName: String, $displayName: String)  {
  rulesList(ruleName: $ruleName)  {
    affectedHostsList (offset: $offset, first: $limit, orderBy: $orderBy, displayName: $displayName) {
      displayName
        lastScanDate
        matchCount
        matches {
          stringOffset
          stringIdentifier
          stringData
          source
          scanDate
          ruleScanId
          ruleId
          hostId
          id
          metadata
      }
      }
      affectedHosts(offset: $offset, first: $limit, orderBy: $orderBy, displayName: $displayName) {
        totalCount
      }
    }
}`;

export const GET_SYSTEM_TABLE = gql`query
QuerySysPage($offset: Int = 0, $limit: Int = 10, $orderBy: [HostsOrderBy!], $name: String)  {
  hostsList(offset: $offset, first: $limit, orderBy: $orderBy, displayName: $name)  {
    displayName
    hasMatch
    lastScanDate
    lastMatchDate
    totalMatches
    hostScans {
      totalCount
    }
    updated
    }
    hosts(offset: $offset, first: $limit, orderBy: $orderBy, displayName: $name){
    totalCount
  }
}`;

export const GET_SYSTEMS_DETAILS_PAGE = gql`query QuerySysDetailsPage($name: String)  {
  hosts(condition: {displayName: $name})  {
    nodes {
      updated
      displayName
      id
      lastMatchDate
      totalMatches
  }
}
}`;

export const GET_SYSTEMS_DETAILS_TABLE_PAGE = gql`query QuerySysDetailsPage(
  $systemId: UUID!, $offset: Int = 0, $limit: Int = 10, $orderBy: [RuleWithMatchesOrderBy!], $ruleName: String) {
  host(id: $systemId) {
    id
    updated
    lastMatchDate
    affectedRules(
      first: $limit
      offset: $offset
      orderBy: $orderBy
      ruleName: $ruleName
    ) {
      totalCount
    }
    affectedRulesList(
      first: $limit
      offset: $offset
      orderBy: $orderBy
      ruleName: $ruleName
    ) {
      matchCount
      createdAt
      matches {
        stringOffset
        stringIdentifier
        stringData
        source
        scanDate
      }
      name
      metadata
      rawRule
    }
  }
}

`;
