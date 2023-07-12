import { Tooltip } from '@material-ui/core';
import { any, element, oneOfType } from 'prop-types';
import React, { forwardRef } from 'react';
import { withStyles } from '@material-ui/core/styles';

const UnstyledTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#ffff',
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
  arrow: {
    color: '#fff',
    height: '30px',
  },
}))(Tooltip);
const StyledTooptip = forwardRef(({ title, children, className }, ref) => (
  <UnstyledTooltip
    ref={ref}
    disableFocusListener
    arrow
    title={title}
    placement="right"
    className={className}
  >
    {children}
  </UnstyledTooltip>
));
StyledTooptip.propTypes = {
  title: oneOfType([element, any]),
};
export default StyledTooptip;
