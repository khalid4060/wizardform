import React from 'react';

import PropTypes from 'prop-types';

export default function WidgetBoiler({ active }) {
  return <div>widget here</div>;
}

WidgetBoiler.propTypes = {
  active: PropTypes.bool.isRequired,
};
