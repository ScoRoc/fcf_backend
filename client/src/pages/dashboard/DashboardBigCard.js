// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Widgets
import { Card, CardBody, CardColumn, CardHeader, Separator, Text } from 'widgets';

// DashboardBigCard

// TODO fix bodyText, footerText, title components and types

const DashboardBigCard = ({ children, icon, showHeader, text, title, ...props }) => (
  <Card className='DashboardBigCard' {...props}>
    {showHeader && (
      <CardHeader>
        <Text>{title}</Text>
      </CardHeader>
    )}
    <CardBody justifyContent='space-around'>
      <CardColumn>
        <Text>{icon}</Text>
        <Text>{text}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{icon}</Text>
        <Text>{text}</Text>
      </CardColumn>
      <Separator />
      <CardColumn>
        <Text>{icon}</Text>
        <Text>{text}</Text>
      </CardColumn>
    </CardBody>
  </Card>
);

DashboardBigCard.propTypes = {
  icon: PropTypes.string,
  showHeader: PropTypes.bool,
  text: PropTypes.string,
  title: PropTypes.string,
};

DashboardBigCard.defaultProps = {
  icon: '',
  showHeader: true,
  text: '',
  title: '',
};

export default DashboardBigCard;
