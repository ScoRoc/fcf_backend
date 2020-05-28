import {
  background,
  border,
  color,
  compose,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  system,
  typography,
  variant,
} from 'styled-system';

const _config = system({
  boxSizing: true,
  cursor: true,
  listStyles: true,
  listStylePosition: true,
  listStyleType: true,
  transition: true,
  userSelect: true,
});

const _variant = variant({
  variants: {
    // normal: {
    //   backgroundColor: 'black',
    //   color: 'white',
    // },
    wack: {
      background: 'teal',
      color: 'maroon',
      transform: 'translateZ(30deg)',
      border: '2px dashed plum',
    },
    button: {
      primary: { color: 'red' },
      secondary: { background: 'green', color: 'blue' },
    },
  },
});

export default compose(
  _config,
  _variant,
  background,
  border,
  color,
  compose,
  flexbox,
  grid,
  layout,
  position,
  shadow,
  space,
  typography,
);
