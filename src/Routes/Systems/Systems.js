import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts/Grid/index';
import React, { Suspense, lazy } from 'react';
import { Title, TitleSizes } from '@patternfly/react-core/dist/esm/components/Title';

import { GET_SIGNATURE_PAGE } from '../../operations/queries';
import Loading from '../../Components/Loading/Loading';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/client';
import { withRouter } from 'react-router-dom';

const SysTable = lazy(() => import(/* webpackChunkName: 'SigTable' */ '../../Components/SysTable/SysTable'));
const StatusCard = lazy(() => import(/* webpackChunkName: 'StatusCard' */ '../../Components/StatusCard/StatusCard'));
const ChartCard = lazy(() => import(/* webpackChunkName: 'ChartCard' */ '../../Components/ChartCard/ChartCard'));

const Systems = () => {
    const intl = useIntl();
    const sigPageData = useQuery(GET_SIGNATURE_PAGE);

    return <React.Fragment>
        <PageHeader>
            <Title headingLevel='h1' size={TitleSizes['3xl']}>
                {intl.formatMessage(messages.systems)}
            </Title>
        </PageHeader>
        <Main>
            <Grid hasGutter>
                <GridItem md={3} sm={12}>
                    <Suspense fallback={<Loading />}><StatusCard {...{ noSigData: true, ...sigPageData }} noSigData/></Suspense>
                </GridItem>
                <GridItem md={9} sm={12}>
                    <Suspense fallback={<Loading />}><ChartCard {...sigPageData} /></Suspense>
                </GridItem>
                <GridItem span={12}>
                    <Suspense fallback={<Loading />}><SysTable /></Suspense>
                </GridItem>
            </Grid>
        </Main>
    </React.Fragment>;
};

export default withRouter(Systems);
