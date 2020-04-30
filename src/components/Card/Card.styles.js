import { css } from '@emotion/core';
import { Color } from 'lib/theme';

export const styles = {
  root: css({
    alignContent: 'baseline',
    display: 'flex',
    justifyContent: 'space-between',
  }),
  label: css({
    color: Color.GRAY_75,
    fontWeight: 500,
  }),
  details: css({
    color: Color.GRAY,
  }),
};
