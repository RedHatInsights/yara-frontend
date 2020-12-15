import './SigTable.scss';

import { Grid, GridItem } from '@patternfly/react-core/dist/esm/layouts/Grid/index';
import { Pagination, PaginationVariant } from '@patternfly/react-core/dist/esm/components/Pagination/index';
import React, { useCallback, useEffect, useState } from 'react';
import { Table, TableBody, TableHeader, expandable, sortable } from '@patternfly/react-table/dist/esm/components/Table/index';
import { Text, TextVariants } from '@patternfly/react-core';

import CodeEditor from '../CodeEditor/CodeEditor';
import { DateFormat } from '@redhat-cloud-services/frontend-components/components/DateFormat';
import { Link } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
import MessageState from '../MessageState/MessageState';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/components/PrimaryToolbar';
import StatusLabel from '../StatusLabel/StatusLabel';
import { Tooltip } from '@patternfly/react-core/dist/esm/components/Tooltip/Tooltip';
import { gqlProps } from '../Common';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

const SigTable = ({ data: sigTableData, loading: sigTableLoading, error: sigTableError, fetchMore: sigTableFetchMore }) => {
    const intl = useIntl();
    const columns = [
        { title: intl.formatMessage(messages.sigNameId), cellFormatters: [expandable] },
        { title: intl.formatMessage(messages.status), transforms: [sortable] },
        { title: intl.formatMessage(messages.systems), transforms: [sortable] },
        { title: intl.formatMessage(messages.added), transforms: [sortable] },
        { title: intl.formatMessage(messages.matched), transforms: [sortable] }
    ];
    const [rows, setRows] = useState([]);
    const rowBuilder = useCallback(data => data?.rulesList?.flatMap((data, key) => {
        const sig = data;
        return [{
            rowId: key,
            isOpen: false,
            cells: [
                { title: <Link to={`/${sig.name}`}>{sig.name}</Link> },
                { title: <span><StatusLabel {...sig} /></span> },
                { title: <span>{sig.systemCount}</span> },
                { title: <span>{sig.metadata.date}</span> },
                {
                    title: sig.lastMatchDate ?
                        <DateFormat date={new Date(sig.lastMatchDate)} type="onlyDate" />
                        : <Tooltip content={intl.formatMessage(messages.noSystemHas)}>
                            <span>{intl.formatMessage(messages.never)}</span>
                        </Tooltip>

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
        ];
    }), [intl]);
    const onCollapse = (e, rowKey, isOpen) => {
        const collapseRows = [...rows];
        collapseRows[rowKey] = { ...collapseRows[rowKey], isOpen };
        setRows(collapseRows);
    };

    const sortIndices = { 2: 'IS_DISABLED', 3: 'SYSTEM_COUNT', 4: 'CREATED_AT', 5: 'HAS_MATCH' };
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [sortBy, setSortBy] = useState({ index: 4, direction: 'asc' });
    const orderBy = ({ index, direction }) => `${sortIndices[index]}_${direction === 'asc' ? 'ASC' : 'DESC'}`;
    const [filterText, setFilterText] = useState('');
    const filterConfigItems = [{
        label: intl.formatMessage(messages.signature).toLowerCase(),
        filterValues: {
            key: 'text-filter',
            onChange: (e, value) => { setFilterText(value); sigTableFetchMore({ variables: { ruleName: value } }); },
            value: filterText,
            placeholder: intl.formatMessage(messages.filterBy, { field: intl.formatMessage(messages.signature).toLowerCase() })
        }
    }];

    const onSetPage = (e, page) => {
        console.error(sigTableData?.rulesList);
        setPage(page);
        sigTableFetchMore({
            variables: {
                notifyOnNetworkStatusChange: true,
                limit: perPage,
                offset: page * perPage,
                ...(sortBy ? { orderBy: orderBy(sortBy) } : null)
            }
        });
    };

    const onPerPageSelect = (e, perPage) => {
        setPerPage(perPage);
        sigTableFetchMore({ variables: { limit: perPage } });
    };

    const onSort = (e, index, direction) => {
        setSortBy({ index, direction });
        sigTableFetchMore({ variables: { orderBy: orderBy({ index, direction }) } });
    };

    useEffect(() => {
        console.error('useEffect result', sigTableData);

        setRows(rowBuilder(sigTableData));
    }, [rowBuilder, sigTableData]);

    return <React.Fragment>
        <PrimaryToolbar
            pagination={{
                itemCount: sigTableData?.rules?.totalCount || 0,
                page,
                perPage,
                onSetPage(e, page) { onSetPage(e, page); },
                onPerPageSelect(e, perPage) { onPerPageSelect(e, perPage); },
                isCompact: true
            }}
            filterConfig={{ items: filterConfigItems }}
        />
        <Table className='sigTable' aria-label="Signagure table"
            onCollapse={onCollapse}
            rows={rows} cells={columns}
            onSort={onSort} sortBy={sortBy}>
            <TableHeader />
            <TableBody />
        </Table>
        {sigTableLoading && <Loading />}
        {!sigTableLoading && !sigTableError && sigTableData?.rules?.length === 0 &&
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

