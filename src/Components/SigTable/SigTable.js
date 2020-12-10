import './SigTable.scss';

import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts/Grid/index';
import { Pagination, PaginationVariant } from '@patternfly/react-core/dist/esm/components/Pagination/index';
import React, { useCallback, useEffect, useState } from 'react';
import { Table, TableBody, TableHeader, expandable } from '@patternfly/react-table/dist/esm/components/Table/index';
import { Text, TextVariants } from '@patternfly/react-core';

import CodeEditor from '../CodeEditor/CodeEditor';
import { DateFormat } from '@redhat-cloud-services/frontend-components/components/DateFormat';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import MessageState from '../MessageState/MessageState';
import { gqlProps } from '../Common';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

const SigTable = ({ data: sigTableData, loading: sigTableLoading, error: sigTableError }) => {
    const intl = useIntl();
    const columns = [
        { title: intl.formatMessage(messages.sigNameId), cellFormatters: [expandable] },
        { title: intl.formatMessage(messages.systems) },
        { title: intl.formatMessage(messages.added) },
        { title: intl.formatMessage(messages.matched) }
    ];
    const [rows, setRows] = useState([]);
    const rowBuilder = useCallback(data => data?.rules?.nodes?.flatMap((sig, key) => [{
        rowId: key,
        isOpen: false,
        cells: [
            { title: <Link to={`/${sig.name}`}>{sig.name}</Link> },
            { title: <span>{sig.systemCount}</span> },
            { title: <span>{sig.metadata.date}</span> },
            {
                title: <span>{sig.lastMatchDate ?
                    <DateFormat date={new Date(sig.lastMatchDate)} type="onlyDate" /> : intl.formatMessage(messages.never)}</span>
            }]
    }, {
        parent: key * 2,
        fullWidth: true,
        cells: [{
            title: <Grid hasGutter>
                <GridItem span={6}><CodeEditor code={sig.rawRule} codeType='XML' /></GridItem>
                <GridItem span={6}> <Text className='ins-l-sigtable--title' component={TextVariants.h6}>
                    {intl.formatMessage(messages.description)}
                </Text>
                {sig.metadata.description}
                </GridItem>
            </Grid>
        }]
    }
    ]), [intl]);
    const onCollapse = (e, rowKey, isOpen) => {
        const collapseRows = [...rows];
        collapseRows[rowKey] = { ...collapseRows[rowKey], isOpen };
        setRows(collapseRows);
    };

    const perPage = 10;
    const page = 0;

    const onSetPage = (e, numPage) => {
        console.error(numPage);
        // sigTableFetchMore({ variables: { offset: numPage } });
    };

    const onPerPageSelect = (e, perPage) => {
        console.error(perPage);
        // sigTableFetchMore({ variables: { first: perPage } });
    };

    useEffect(() => {
        // console.error(sigTableData, sigTableFetchMore);

        setRows(rowBuilder(sigTableData));
    }, [rowBuilder, sigTableData]);

    return <React.Fragment>
        <Table
            className='sigTable'
            aria-label="Signagure table"
            onCollapse={onCollapse}
            rows={rows}
            cells={columns}>
            <TableHeader />
            <TableBody />
        </Table>
        {sigTableLoading && <Loading />}
        {!sigTableLoading && !sigTableError && sigTableData?.rules?.length &&
            <MessageState className='pf-c-card' variant='large' title='no results womp womp' text='womp womp' />}
        {sigTableError && <MessageState className='pf-c-card' variant='large' title='poop' text='poop' />}
        <Pagination
            itemCount={sigTableData?.rules?.totalCount || 0}
            widgetId="pagination-options-menu-bottom"
            perPage={perPage}
            page={page}
            variant={PaginationVariant.bottom}
            onSetPage={onSetPage}
            onPerPageSelect={onPerPageSelect}
        />
    </React.Fragment>;
};

SigTable.propTypes = gqlProps;

export default SigTable;

