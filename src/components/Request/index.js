/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { formatDate } from 'lib/utils/datetime';
import { numberWithCommas } from 'lib/utils/number';

import { SecondaryButton } from 'components/Button';
import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import Note from 'components/Note';

import { styles } from './Request.styles';

export const Request = ({
  date,
  id,
  onDelete,
  onEdit,
  requestDescription,
  requestQuantity,
  requestTitle,
}) => {
  const { t } = useTranslation();
  const numberRequest = +requestQuantity;
  return (
    <div css={styles.root}>
      <div css={styles.section}>
        <Note>
          {' '}
          {t('dashboard.openRequests.requestId')} #{id}
        </Note>
      </div>
      <div css={styles.requestTitle}>
        <Text>{requestTitle}</Text>{' '}
        <Text css={styles.amount}>{numberWithCommas(numberRequest)}</Text>
      </div>
      <Text as="p" type={TEXT_TYPE.NOTE} css={styles.description}>
        {requestDescription}
      </Text>
      <Note css={styles.date}>
        {t('global.addedLabel')} {formatDate(date)}
      </Note>
      <SecondaryButton onClick={onEdit}>
        <Text type={TEXT_TYPE.NOTE}>{t('global.form.editLabel')}</Text>
      </SecondaryButton>
      <SecondaryButton onClick={onDelete}>
        <Text type={TEXT_TYPE.NOTE}>{t('global.form.deleteLabel')}</Text>
      </SecondaryButton>
    </div>
  );
};

Request.propTypes = {
  date: PropTypes.string,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  requestDescription: PropTypes.string,
  requestQuantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  requestTitle: PropTypes.string.isRequired,
};

export default Request;
