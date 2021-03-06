import './StatusCard.scss';

import { Card, CardBody } from '@patternfly/react-core/dist/esm/components/Card/index';
import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts/Grid/index';
import { hasMalware, sigTableFilters } from '../../store/cache';

import { Button } from '@patternfly/react-core/dist/esm/components/Button/Button';
import CheckCircleIcon from '@patternfly/react-icons/dist/esm/icons/check-circle-icon';
import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon';
import Loading from '../../Components/Loading/Loading';
import MessageState from '../MessageState/MessageState';
import React from 'react';
import { gqlProps } from '../Common';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

const StatusCard = ({ data: sigStatsData, loading: sigStatsLoading, noSigData }) => {
    const intl = useIntl();

    return <Card className='ins-l-card'>
        <CardBody>
            <Grid>
                {sigStatsLoading ? <Loading /> : <GridItem span={!noSigData ? 7 : 12}><MessageState className='' variant='large'
                    icon={hasMalware() ? ExclamationCircleIcon : CheckCircleIcon}
                    iconClass={hasMalware() ? 'ins-l-danger-color' : 'ins-l-success-color'}
                    title={hasMalware() ?
                        intl.formatMessage(messages.activeFound) : intl.formatMessage(messages.noFound)}
                    text={hasMalware() ?
                        intl.formatMessage(messages.hostsVulnerable) : intl.formatMessage(messages.hostsProtected)} >
                    <span>{intl.formatMessage(messages.lastCheck)} </span>
                    {sigStatsData?.hostScans?.nodes[0] ? <DateFormat date={new Date(sigStatsData?.hostScans?.nodes[0].createdAt)} type='onlyDate' /> :
                        intl.formatMessage(messages.noAnalysisRun)}
                </MessageState></GridItem>
                }
                {!noSigData && <React.Fragment>
                    <GridItem span={1}
                        className='pf-c-divider pf-m-vertical pf-m-inset-md pf-m-inset-none-on-md pf-m-inset-sm-on-lg pf-m-inset-xs-on-xl' />
                    {sigStatsLoading ? <Loading />
                        : <GridItem className='ins-l-sigStatCard' span={3}>
                            <GridItem className='ins-l-sigStat' span={12}>
                                <React.Fragment>
                                    <strong>{sigStatsData?.ruleStats?.matchedCount?.toLocaleString() || 0}</strong>
                                    <br />
                                    <Button className='ins-l-sigStatNum' variant='link'
                                        onClick={() => sigTableFilters({ ...sigTableFilters(), condition: { hasMatch: true } })}>
                                        {intl.formatMessage(messages.matchedSignatures)}
                                    </Button>
                                </React.Fragment>
                            </GridItem>
                            <GridItem className='ins-l-sigStat' span={12}>
                                <strong>{sigStatsData?.ruleStats?.enabledCount?.toLocaleString() || 0}</strong>
                                <p>{intl.formatMessage(messages.enabledSignatures)}</p></GridItem>
                            <GridItem className='ins-l-sigStat' span={12}>
                                <strong>{sigStatsData?.ruleStats?.disabledCount?.toLocaleString() || 0}</strong>
                                <p>{intl.formatMessage(messages.disabledSignatures)}</p></GridItem>
                        </GridItem>
                    }
                </React.Fragment>}
            </Grid>
        </CardBody>
    </Card >;
};

StatusCard.propTypes = gqlProps;

export default StatusCard;
