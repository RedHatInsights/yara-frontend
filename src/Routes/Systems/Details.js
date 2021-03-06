import './Details.scss';

import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts/Grid/index';
import { Title, TitleSizes } from '@patternfly/react-core/dist/esm/components/Title';

import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb';
import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';
import { GET_SYSTEMS_DETAILS_PAGE } from '../../operations/queries';
import Loading from '../../Components/Loading/Loading';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { PageHeader } from '@redhat-cloud-services/frontend-components/PageHeader';
import React from 'react';
import SysDetailsTable from '../../Components/SysDetailsTable/SysDetailsTable';
import { isBeta } from '../../Components/Common';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

const Details = () => {
    const intl = useIntl();
    const { id: sysId } = useParams();
    const breadcrumbs = [{ name: intl.formatMessage(messages.malwareDetectionSigs),
        to: `${isBeta()}/insights/malware/systems` }, { name: sysId, to: '#' }];
    const { data, loading } = useQuery(GET_SYSTEMS_DETAILS_PAGE, {
        variables: { name: sysId  }
    });
    const sysData = data?.hosts?.nodes[0];
    const detailBlock = (title, detail) => <React.Fragment>
        <p className='ins-l-detailBlockHeader'>{title}</p>
        <p>{detail}</p>
    </React.Fragment>;

    return <React.Fragment>
        <PageHeader>
            <Breadcrumb items={breadcrumbs} />
            <Title headingLevel='h1' size={TitleSizes['3xl']}>{sysId}</Title>
            <Grid hasGutter>
                {loading ? <Loading /> :
                    <GridItem md={5} sm={12}>
                        <Grid hasGutter>
                            <GridItem span={12}>
                                {<p className='ins-l-detailBlockHeader'>{`${intl.formatMessage(messages.uuid)}: ${sysData.id}`}</p>}
                            </GridItem>
                            <GridItem span={4}>
                                {detailBlock(intl.formatMessage(messages.lastmatch), sysData?.lastMatchDate ?
                                    <DateFormat date={new Date(sysData.lastMatchDate)} type="onlyDate" />
                                    : intl.formatMessage(messages.never))}
                            </GridItem>
                            <GridItem span={4}>
                                {detailBlock(intl.formatMessage(messages.lastSeen),
                                    <DateFormat date={new Date(sysData.updated)} type="exact" />)}
                            </GridItem>
                            <GridItem span={4}>
                                {detailBlock(intl.formatMessage(messages.totalMatches), sysData?.totalMatches)}
                            </GridItem>
                        </Grid>
                    </GridItem>}
                <GridItem md={7} sm={0}>
                </GridItem>
            </Grid>
        </PageHeader>
        <Main>
            <Title className='ins-l-tableBlockHeader' headingLevel='h1' size={TitleSizes['3xl']}>
                {intl.formatMessage(messages.matchedSignatures)}
            </Title>
            {loading ? <Loading /> : <SysDetailsTable systemId={sysData.id} />}
        </Main>
    </React.Fragment>;
};

export default Details;
