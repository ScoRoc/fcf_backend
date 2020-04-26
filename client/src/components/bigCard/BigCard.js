// Libraries
import React from 'react';
import PropTypes from 'prop-types';
// @jsx jsx
import { jsx } from '@emotion/core';
// Parts
import InnerSection from './InnerSection';
// Widgets
import { Card, CardBody, CardFooter, CardHeader, Separator, Text } from 'widgets';

// BigCard

// TODO fix bodyText, footerText, title components and types

const BigCard = ({ bodyText, footerText, icon, showFooter, showHeader, title, ...props }) => (
  <Card className='BigCard' {...props}>
    {showHeader && (
      <CardHeader>
        <Text>{title}</Text>
      </CardHeader>
    )}
    <CardBody justifyContent='space-around'>
      <InnerSection icon={icon} text={bodyText} />
      <Separator />
      <InnerSection icon={icon} text={bodyText} />
      <Separator />
      <InnerSection icon={icon} text={bodyText} />
    </CardBody>
    {showFooter && (
      <CardFooter>
        <Text>{footerText}</Text>
      </CardFooter>
    )}
  </Card>
);

BigCard.propTypes = {
  bodyText: PropTypes.string,
  footerText: PropTypes.string,
  showFooter: PropTypes.bool,
  showHeader: PropTypes.bool,
  title: PropTypes.string,
};

BigCard.defaultProps = {
  bodyText: null,
  footerText: null,
  showFooter: true,
  showHeader: true,
  title: null,
};

export default BigCard;
