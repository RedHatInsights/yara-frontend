import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts/Grid/index';
import { Main, PageHeader } from '@redhat-cloud-services/frontend-components';
import React, { Suspense, lazy, useEffect } from 'react';
import { Title, TitleSizes } from '@patternfly/react-core/dist/esm/components/Title';

import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import { GET_SIGNATURE_DETAILS_PAGE } from '../../operations/queries';
import Loading from '../../Components/Loading/Loading';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

const CodeEditor = lazy(() => import(/* webpackChunkName: 'CodeEditor' */ '../../Components/CodeEditor/CodeEditor'));

const Details = () => {
    const intl = useIntl();
    const { id: sigId } = useParams();
    const breadcrumbs = [{ name: intl.formatMessage(messages.malwareDetection), to: '/insights/malware' }, { name: sigId, to: '#' }];
    const { data, loading, error } = useQuery(GET_SIGNATURE_DETAILS_PAGE, {
        variables: { ruleName: sigId }
    });
    const sigDetailsData = data?.rules?.edges[0]?.node;

    useEffect(() => {
        console.error(loading, error, data?.rules?.edges[0]?.node);
    });

    return <React.Fragment>
        <PageHeader>
            <Breadcrumb items={breadcrumbs} />
            <Title headingLevel='h1' size={TitleSizes['3xl']}>{sigId}</Title>
            <Grid hasGutter>
                <GridItem md={7} sm={12}>
                    <Suspense fallback={<Loading />}><CodeEditor code={sigDetailsData?.rawRule} /></Suspense>
                </GridItem>
                <GridItem md={5} sm={12}>
                    details
                </GridItem>
            </Grid>
        </PageHeader>
        <Main>
            <Title headingLevel='h1' size={TitleSizes['3xl']}>
                {intl.formatMessage(messages.affectedSystems)}
            </Title>

        </Main>
    </React.Fragment>;
};

export default Details;
