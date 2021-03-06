import React, { useEffect } from 'react';

import { Main } from '@redhat-cloud-services/frontend-components/Main';
import { NotAuthorized } from '@redhat-cloud-services/frontend-components/NotAuthorized';
import messages from '../../Messages';
import { useIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';

const NoPermissionsPage = () => {
    const intl = useIntl();
    useEffect(() => {
        insights?.chrome?.appAction?.('no-permissions');
    }, []);

    return <Main>
        <NotAuthorized serviceName={intl.formatMessage(messages.malwareDetection)} />
    </Main>;
};

export default withRouter(NoPermissionsPage);
