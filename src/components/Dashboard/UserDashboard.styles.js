import { css } from '@emotion/core';
import { Color, Space } from 'lib/theme';

export const styles = {
  button: css({
    margin: `${Space.S30}px 0`,
  }),
  contact: css({
    marginBottom: Space.S20,
    '> div': {
      marginBottom: Space.S5,
    },
  }),
  kind: css({
    textTransform: 'capitalize',
    marginBottom: Space.S20,
  }),
  footer: css({
    marginTop: Space.S30,
  }),
  loader: css({
    margin: 'auto',
  }),
  name: css({
    color: Color.GRAY,
  }),
  number: css({
    fontWeight: 'normal',
    marginLeft: Space.S10,
  }),
  request: css({
    marginTop: Space.S30,
  }),
  requestsHeader: css({
    color: Color.PRIMARY,
    marginTop: Space.S10,
  }),
  requestsContainer: css({
    background: Color.GRAY_10,
    padding: [
      `${Space.S30}px ${Space.S30}px ${Space.S30}px`,
      '',
      `${Space.S30}px 22% ${Space.S30}px `,
    ],
  }),
  contentContainer: css({
    padding: [`0 ${Space.S30}px ${Space.S30}px`, '', `0 22% ${Space.S30}px `],
  }),
  section: css({
    marginBottom: Space.S30,
  }),
};
