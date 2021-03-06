import { css } from '@emotion/core';
import { Color, Space, Radius } from 'lib/theme';

export const styles = {
  amount: css({
    color: Color.PRIMARY,
    fontWeight: 500,
    paddingLeft: Space.S5,
  }),
  date: css({
    marginTop: Space.S20,
  }),
  description: css({
    color: Color.GRAY,
    marginTop: Space.S10,
  }),
  section: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  requestName: css({
    marginBottom: Space.S20,
  }),
  root: css({
    background: Color.WHITE,
    borderRadius: Radius.ROUNDED,
    marginBottom: Space.S20,
    padding: Space.S20,
  }),
};
