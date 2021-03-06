import { Label } from '@patternfly/react-core';
import PropTypes from 'prop-types';
import React from 'react';
import messages from '../../Messages';
import { useIntl } from 'react-intl';

const StatusLabel = ({ isDisabled, hasMatch, displayMatch = false }) => {
    const intl = useIntl();
    return displayMatch ? <React.Fragment>
        {hasMatch && <Label color='red'>{intl.formatMessage(messages.matched)}</Label>}
        {!hasMatch && <Label color='blue'>{intl.formatMessage(messages.notMatched)}</Label>}
    </React.Fragment> : <React.Fragment>
        {isDisabled && <Label>{intl.formatMessage(messages.disabled)}</Label>}
        {!isDisabled && <Label color='blue'>{intl.formatMessage(messages.enabled)}</Label>}
    </React.Fragment>;
};

StatusLabel.propTypes = {
    isDisabled: PropTypes.bool,
    hasMatch: PropTypes.bool,
    displayMatch: PropTypes.bool
};
export default StatusLabel;
