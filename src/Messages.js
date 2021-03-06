/* eslint-disable max-len */
import { defineMessages } from 'react-intl';

export default defineMessages({
    malwareDetection: {
        id: 'malwareDetection',
        description: 'Title',
        defaultMessage: 'Malware detection'
    },
    sigName: {
        id: 'sigNameId',
        description: 'Sig table column title',
        defaultMessage: 'Signature name'
    },
    sig: {
        id: 'sig',
        description: 'Signature',
        defaultMessage: 'Signature'
    },
    systems: {
        id: 'systems',
        description: 'Sig table column title',
        defaultMessage: 'Systems'
    },
    added: {
        id: 'added',
        description: 'Sig table column title',
        defaultMessage: 'Added'
    },
    matched: {
        id: 'matched',
        description: 'Sig table column title',
        defaultMessage: 'Matched'
    },
    matchedSignatures: {
        id: 'matchedSignatures',
        description: 'Sig status card heading',
        defaultMessage: 'Matched Signatures'
    },
    enabledSignatures: {
        id: 'enabledSignatures',
        description: 'Sig status card heading',
        defaultMessage: 'Enabled Signatures'
    },
    disabledSignatures: {
        id: 'disabledSignatures',
        description: 'Sig status card heading',
        defaultMessage: 'Disabled Signatures'
    },
    analysisRunAcross: {
        id: 'analysisRunAcross',
        description: 'Chart card heading',
        defaultMessage: 'analysis run across {hosts, plural, one {# system} other {# systems}} with {matches, plural, one {# match} other {# matches}}'
    },
    noFound: {
        id: 'noFound',
        description: 'Sig status card heading',
        defaultMessage: 'No active malware matches found'
    },
    noAnalysisRun: {
        id: 'noFnoAnalysisRunound',
        description: 'No host analysis run',
        defaultMessage: 'No system analysis run'
    },
    hostsProtected: {
        id: 'hostsProtected',
        description: 'Sig status card sub heading',
        defaultMessage: 'Your systems are protected.'
    },
    activeFound: {
        id: 'activeFound',
        description: 'Sig status card heading',
        defaultMessage: 'Active malware matches found!'
    },
    hostsVulnerable: {
        id: 'hostsVulnerable',
        description: 'Sig status card sub heading',
        defaultMessage: 'Your systems may be at risk.'
    },
    lastCheck: {
        id: 'lastCheck',
        description: 'Sig status card',
        defaultMessage: 'Last check:'
    },
    lastSeen: {
        id: 'lastSeen',
        description: 'Last seen',
        defaultMessage: 'Last seen'
    },
    uuid: {
        id: 'uuid',
        description: 'UUID',
        defaultMessage: 'UUID'
    },
    description: {
        id: 'description',
        description: 'description',
        defaultMessage: 'Description'
    },
    never: {
        id: 'never',
        description: 'never',
        defaultMessage: 'Never'
    },
    malwareDetectionSigs: {
        id: 'malwareDetectionSigs',
        description: 'Maleware detection signatures',
        defaultMessage: 'Maleware detection signatures'
    },
    affectedHosts: {
        id: 'affectedHosts',
        description: 'Affected hosts',
        defaultMessage: 'Affected systems'
    },
    lastmatch: {
        id: 'lastmatch',
        description: 'Last match',
        defaultMessage: 'Last match'
    },
    hostmatch: {
        id: 'hostmatch',
        description: 'Host match',
        defaultMessage: 'System match'
    },
    status: {
        id: 'status',
        description: 'Status',
        defaultMessage: 'Status'
    },
    author: {
        id: 'author',
        description: 'Author',
        defaultMessage: 'Author'
    },
    enabled: {
        id: 'enabled',
        description: 'Enabled',
        defaultMessage: 'Enabled'
    },
    enablement: {
        id: 'enablement',
        description: 'Enablement',
        defaultMessage: 'Enablement'
    },
    disabled: {
        id: 'disabled',
        description: 'Disabled',
        defaultMessage: 'Disabled'
    },
    noHostHas: {
        id: 'noHostHas',
        description: 'No host has been affectyed by this signature.',
        defaultMessage: 'No system has been affectyed by this signature.'
    },
    signature: {
        id: 'signature',
        description: 'Signature',
        defaultMessage: 'Signature'
    },
    filterBy: {
        id: 'filterBy',
        description: 'Filter by {what?}',
        defaultMessage: 'Filter by {field}'
    },
    weDetected: {
        id: 'weDetected',
        description: 'Malware detected on your system. Contact your corporate information security team for more information.',
        defaultMessage: 'Malware detected on your system. Contact your corporate information security team for more information.'
    },
    name: {
        id: 'name',
        description: 'Name',
        defaultMessage: 'Name'
    },
    noMatches: {
        id: 'noMatches',
        description: 'No matches found',
        defaultMessage: 'No matches found'
    },
    hostsNotAffected: {
        id: 'hostsNotAffected',
        description: 'Hosts are not affected by any signatures. Your hosts are protected!',
        defaultMessage: 'Systems are not affected by any signatures. Your systems are protected!'
    },
    noResults: {
        id: 'noResults',
        description: 'No results found',
        defaultMessage: 'No results found'
    },
    noResultsMatch: {
        id: 'noResultsMatch',
        description: 'No results match this filter criteria. Remove all filters or clear all filters to show results.',
        defaultMessage: 'No results match this filter criteria. Remove all filters or clear all filters to show results.'
    },
    all: {
        id: 'all',
        description: 'all',
        defaultMessage: 'All'
    },
    notMatched: {
        id: 'notMatched',
        description: 'not matched',
        defaultMessage: 'Not matched'
    },
    sigCompiled: {
        id: 'sigCompiled',
        description: 'Signature is compiled',
        defaultMessage: 'Signature is compiled'
    },
    sigCompiledBody: {
        id: 'sigCompiledBody',
        description: 'We couldnt display',
        defaultMessage: 'We couldn\'t display this signature because it\'s compiled.'
    },
    totalMatches: {
        id: 'totalMatches',
        description: 'Total matches',
        defaultMessage: 'Total matches'
    },
    noAffectedHosts: {
        id: 'noAffectedHosts',
        description: 'No affected hosts',
        defaultMessage: 'No affected systems'
    },
    noAffectedHostsBody: {
        id: 'noAffectedHostsBody',
        description: 'This signature doesn\'t affect any hosts. Your hosts are protected!',
        defaultMessage: 'This signature doesn\'t affect any systems. Your systems are protected!'
    },
    resetFilters: {
        id: 'resetFilters',
        description: 'Reset filters',
        defaultMessage: 'Reset filters'
    }
});
