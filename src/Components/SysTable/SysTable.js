/* eslint-disable no-unused-vars */
import './SysTable.scss';

import { Pagination, PaginationVariant } from '@patternfly/react-core/dist/esm/components/Pagination/index';
import React, { useEffect, useReducer } from 'react';
import {
    SortByDirection,
    Table,
    TableBody,
    TableHeader,
    cellWidth,
    sortable
} from '@patternfly/react-table/dist/esm/components/Table/index';

import { DateFormat } from '@redhat-cloud-services/frontend-components/DateFormat';
import { GET_SYSTEM_TABLE } from '../../operations/queries';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import MessageState from '../MessageState/MessageState';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/PrimaryToolbar';
import { SearchIcon } from '@patternfly/react-icons/dist/esm/icons/search-icon';
import StatusLabel from '../StatusLabel/StatusLabel';
import { Tooltip } from '@patternfly/react-core/dist/esm/components/Tooltip/Tooltip';
import { gqlProps } from '../Common';
import messages from '../../Messages';
import { sysTableFilters } from '../../store/cache';
import { useIntl } from 'react-intl';
import { useQuery } from '@apollo/client';
import { useReactiveVar } from '@apollo/client';

const initialState = {
    tableVars: {
        limit: 10,
        offset: 0,
        orderBy: 'UPDATED_DESC',
        name: ''
    },
    sortBy: {
        index: 4,
        direction: SortByDirection.desc
    },
    rows: []
};
const sortIndices = { 0: 'DISPLAY_NAME', 1: 'HAS_MATCH', 2: 'LAST_MATCH_DATE', 3: 'TOTAL_MATCHES', 4: 'UPDATED' };
const orderBy = ({ index, direction }) => `${sortIndices[index]}_${direction === SortByDirection.asc ? 'ASC' : 'DESC'}`;

const tableReducer = (state, action) => {
    switch (action.type) {
        case 'setTableVars':
            return { ...state, tableVars: { ...state.tableVars, ...action.payload } };
        case 'setSortBy':
            return { ...state, sortBy: action.payload, tableVars: { ...state.tableVars, ...action.tableVars } };
        case 'setRows':
            return { ...state, rows: action.payload };
    }

    return state;
};

const SysTable = () => {
    const intl = useIntl();
    const [{ tableVars, sortBy, rows }, stateSet] = useReducer(tableReducer, {
        ...initialState
    });
    const { data: sysTableData, loading: sysTableLoading, error: sysTableError } =
        useQuery(GET_SYSTEM_TABLE, { variables: { ...tableVars, ...useReactiveVar(sysTableFilters) } });
    const columns = [
        { title: intl.formatMessage(messages.name), transforms: [cellWidth(45), sortable] },
        { title: intl.formatMessage(messages.status), transforms: [sortable] },
        { title: intl.formatMessage(messages.matched), transforms: [sortable] },
        { title: intl.formatMessage(messages.totalMatches), transforms: [sortable] },
        { title: intl.formatMessage(messages.lastSeen), transforms: [sortable] }
    ];

    const page = tableVars.offset / tableVars.limit + 1;

    const filterConfigItems = [{
        label: intl.formatMessage(messages.name).toLowerCase(),
        filterValues: {
            key: 'text-filter',
            onChange: (e, value) => stateSet({ type: 'setTableVars', payload: { name: value } }),
            value: tableVars.name,
            placeholder: intl.formatMessage(messages.filterBy, { field: intl.formatMessage(messages.name).toLowerCase() })
        }
    }];

    const onSetPage = (e, page) => stateSet({ type: 'setTableVars', payload: { offset: page * tableVars.limit - tableVars.limit } });

    const onPerPageSelect = (e, perPage) => stateSet({ type: 'setTableVars', payload: { limit: perPage, offset: 0 } });

    const onSort = (e, index, direction) =>
        stateSet({ type: 'setSortBy', payload: { index, direction }, tableVars: { orderBy: orderBy({ index, direction }), offset: 0 } });

    const buildFilterChips = () => {
        const chips = [];
        const hasMatch = sysTableFilters().condition?.hasMatch !== undefined && (sysTableFilters().condition?.hasMatch ?
            intl.formatMessage(messages.matched) : intl.formatMessage(messages.notMatched));
        tableVars?.name &&
        chips.push({ category: intl.formatMessage(messages.name), value: 'name',
            chips: [{ name: tableVars?.name, value: tableVars?.name }] });
        hasMatch && chips.push({ category: intl.formatMessage(messages.status), value: 'matched', chips: [{ name: hasMatch, value: hasMatch }] });
        return chips;
    };

    const activeFiltersConfig = {
        deleteTitle: intl.formatMessage(messages.resetFilters),
        filters: buildFilterChips(),
        onDelete: (event, itemsToRemove, isAll) => {
            if (isAll) {
                sysTableFilters({});
                stateSet({ type: 'setTableVars', payload: { name: '' } });
            } else {
                itemsToRemove.map((item) => {
                    item.value === 'name' && stateSet({ type: 'setTableVars', payload: { name: '' } });
                    item.value === 'matched' && sysTableFilters({});
                });
            }
        }
    };

    useEffect(() => {
        const rowBuilder = data => data?.hostsList?.flatMap((data, key) => ({
            rowId: key,
            cells: [
                { title: <Link to={`/systems/${data.displayName}`}>{data.displayName}</Link> },
                { title: <StatusLabel isDisabled={data.isDisabled} hasMatch={data.hasMatch} displayMatch /> },
                {
                    title: data.lastMatchDate ?
                        <Tooltip content={<DateFormat date={new Date(data.lastMatchDate)} type='exact' />}>
                            <span><DateFormat date={new Date(data.lastMatchDate)} type='onlyDate' /></span>
                        </Tooltip>
                        : <Tooltip content={intl.formatMessage(messages.noHostHas)}>
                            <span>{intl.formatMessage(messages.never)}</span>
                        </Tooltip>
                },
                { title: <Link to={`/systems/${data.displayName}`}>{data.totalMatches?.toLocaleString()}</Link> },
                { title: <Tooltip content={<DateFormat date={new Date(data.updated)} type='exact' />}>
                    <span><DateFormat date={new Date(data.updated)} /></span>
                </Tooltip> }

            ]
        }));

        stateSet({ type: 'setRows', payload: rowBuilder(sysTableData) });
    }, [intl, sysTableData]);

    return <React.Fragment>
        <PrimaryToolbar
            pagination={{
                itemCount: sysTableData?.hosts?.totalCount || 0,
                page,
                perPage: tableVars.limit,
                onSetPage(e, page) { onSetPage(e, page); },
                onPerPageSelect(e, perPage) { onPerPageSelect(e, perPage); },
                isCompact: true
            }}
            filterConfig={{ items: filterConfigItems }}
            activeFiltersConfig={activeFiltersConfig}
        />
        <Table className='sysTable' aria-label='System table'
            rows={rows} cells={columns}
            onSort={onSort} sortBy={sortBy} isStickyHeader>
            <TableHeader />
            <TableBody />
        </Table>
        {sysTableLoading && <Loading type='table' />}
        {!sysTableLoading && !sysTableError && sysTableData?.hosts?.totalCount === 0 &&
            <MessageState className='pf-c-card' icon={SearchIcon} variant='large' title={intl.formatMessage(messages.noResults)}
                text={intl.formatMessage(messages.noResultsMatch)} />}
        {sysTableError && <MessageState className='pf-c-card' variant='large' title='Error' text='error' />}
        <Pagination
            itemCount={sysTableData?.hosts?.totalCount || 0}
            widgetId='pagination-options-menu-bottom'
            perPage={tableVars.limit}
            page={page}
            variant={PaginationVariant.bottom}
            onSetPage={onSetPage}
            onPerPageSelect={onPerPageSelect}
        />
    </React.Fragment>;
};

SysTable.propTypes = gqlProps;

export default SysTable;
