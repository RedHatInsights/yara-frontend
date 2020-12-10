import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts/Grid/index';
import { Main, PageHeader } from '@redhat-cloud-services/frontend-components';
import React, { Suspense, lazy, useEffect } from 'react';
import { Title, TitleSizes } from '@patternfly/react-core/dist/esm/components/Title';

import Loading from '../../Components/Loading/Loading';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

const CodeEditor = lazy(() => import(/* webpackChunkName: 'CodeEditor' */ '../../Components/CodeEditor/CodeEditor'));

const Details = () => {
    const intl = useIntl();

    useEffect(() => {
    }, []);

    return <React.Fragment>
        <PageHeader>
            <Title headingLevel='h1' size={TitleSizes['3xl']}>
                {intl.formatMessage(messages.malwareDetection)}
            </Title>

            <Grid hasGutter>
                <GridItem md={6} sm={12}>
                    <Suspense fallback={<Loading />}><CodeEditor /></Suspense>
                </GridItem>
                <GridItem md={6} sm={12}>
                    details
                </GridItem>
            </Grid>
        </PageHeader>
        <Main>
        </Main>
    </React.Fragment>;
};

export default withRouter(Details);
