import { ApolloClient, HttpLink } from '@apollo/client';
import React, { useEffect, useRef } from 'react';
import { sid as setSID, selectedTags as setSelectedTags, workloads as setWorkloads } from './store/cache';

/* eslint-disable no-console */
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { IntlProvider } from '@redhat-cloud-services/frontend-components-translations';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { cache } from './store/cache';
import { createUploadLink } from 'apollo-upload-client';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers/helpers';
import { init } from './store';
import logger from 'redux-logger';
import messages from '../locales/data.json';

const AppEntry = ({ useLogger, connectToDevTools }) => {
    console.error(setSelectedTags());
    const tags = useRef();
    // let uri = `/api/malware-detection/v1/graphql`;
    // let client = props => new ApolloClient({ cache, uri, headers: { tags: calculateTags() }, ...props });
    const uriBuilder = (uri) => { console.error(`tags=${tags.current}`); return `${uri}${tags.current ? `tags=${tags.current}` : ''}`;};

    const client = new ApolloClient({
        link: new HttpLink({
            uri: uriBuilder('/api/malware-detection/v1/graphql')
        }),
        cache,
        connectToDevTools
    }, `${tags.current}`);

    useEffect(() => {
        insights.chrome.init();
        insights.chrome.identifyApp('malware');
        if (insights.chrome?.globalFilterScope) {
            insights.chrome.on('GLOBAL_FILTER_UPDATE', ({ data }) => {
                const [workloads, SID, selectedTags] =
                insights.chrome?.mapGlobalFilter?.(data, false, true) || [];
                // console.error(workloads, SID, selectedTags);

                setSID(SID);
                setSelectedTags(selectedTags);
                setWorkloads(workloads);
                tags.current = selectedTags?.join(',') || '';
                // selectedTags?.length ? uri = `/api/malware-detection/v1/graphql?tags=${selectedTags?.join(',')}` :
                //     `/api/malware-detection/v1/graphql`;
                // console.error(tags.current || 'none');

                // client = props => new ApolloClient({ cache, uri, ...props });

            });
        }
    }, []);

    // useEffect(() => {
    //     insights.chrome.on('GLOBAL_FILTER_UPDATE', () => {
    //         console.error(setSelectedTags(), setWorkloads(), setSID());

    //     });

    // }, []);

    return <IntlProvider locale={navigator.language.slice(0, 2)} messages={messages} onError={console.log}>
        <ApolloProvider client={client}>
            <Provider store={(useLogger ? init(logger) : init()).getStore()}>
                <Router basename={getBaseName(window.location.pathname)}>
                    <App />
                </Router>
            </Provider>
        </ApolloProvider>
    </IntlProvider>;
};

AppEntry.propTypes = {
    useLogger: PropTypes.bool,
    connectToDevTools: PropTypes.bool

};

AppEntry.defaultProps = {
    useLogger: false,
    connectToDevTools: false
};

export default AppEntry;
