import ContentLoader from 'react-content-loader';
import React from 'react';

export default (function (props) {
  if (props.slidesAmount === 1) {
    return React.createElement(
      'div',
      { className: 'w-100 aspect-ratio aspect-ratio--1x1' },
      React.createElement(
        ContentLoader,
        {
          style: {
            position: 'absolute',
            width: '100%',
            height: '100%'
          },
          height: '100%',
          width: '100%' },
        React.createElement('rect', { width: '100%', height: '100%' })
      )
    );
  }

  return React.createElement(
    'div',
    { className: 'w-100 aspect-ratio aspect-ratio--1x1' },
    React.createElement(
      ContentLoader,
      {
        style: {
          position: 'absolute',
          width: '100%',
          height: '100%'
        },
        height: '100%',
        width: '100%' },
      React.createElement('rect', { className: 'dn db-ns', width: '18%', height: '18%' }),
      React.createElement('rect', { className: 'dn db-ns', width: '18%', height: '18%', y: '20%' }),
      React.createElement('rect', { className: 'dn db-ns', width: '18%', height: '18%', y: '40%' }),
      React.createElement('rect', { className: 'dn db-ns', width: '18%', height: '18%', y: '60%' }),
      React.createElement('rect', { className: 'dn db-ns', width: '89%', height: '89%', x: '20%' }),
      React.createElement('rect', { className: 'db dn-ns', width: '100%', height: '100%' })
    )
  );
});