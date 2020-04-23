/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import OrganizationDetails from 'lib/organizations/details';
import RequestKinds from 'lib/organizations/kinds';

import { useMediaQuery } from 'hooks/useMediaQuery';
import { Routes } from 'constants/Routes';
import { Breakpoints } from 'constants/Breakpoints';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import { LinkButton, PrimaryButton, SecondaryButton } from 'components/Button';

import ConfirmationWrapper from './ConfirmationWrapper';
import OrganizationConfirmation from './OrganizationConfirmation';
import styles from './ServiceConfirmation.styles';

export const ServiceConfirmation = ({ service }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const { matchesBreakpoint } = useMediaQuery();
  const isDesktop =
    (`(min-width: ${Breakpoints.LARGE}px)`,
    matchesBreakpoint(Breakpoints.LARGE));
  const { kind } = service;

  const mapServiceToOrganization = () => ({
    [RequestKinds.GROCERY]: [OrganizationDetails.MUTUAL_AID_NYC],
    [RequestKinds.MENTALHEALTH]: [OrganizationDetails.NYC_COVID_CARE_NETWORK],
    [RequestKinds.CHILDCARE]: [OrganizationDetails.WORKERS_NEED_CHILDCARE],
  });

  const mapServiceToName = () => ({
    [RequestKinds.GROCERY]: 'groceries',
    [RequestKinds.MENTALHEALTH]: 'emotional support',
    [RequestKinds.CHILDCARE]: 'childcare',
  });

  const organization = mapServiceToOrganization()[kind][0];
  const organizationName = organization.name;
  const serviceName = mapServiceToName()[kind];

  const handleViewRequests = () => {
    history.push(Routes.DASHBOARD);
  };

  const handleRequestServices = () => {
    history.push(Routes.SERVICE_TYPE);
  };

  const handleShare = () => {
    const url = 'https://help.supply/';
    if (navigator.share) {
      navigator
        .share({
          text: 'Help Supply',
          title: 'Help Supply',
          url: url,
        })
        .then(() => {
          console.warn('Thanks for sharing!');
        })
        .catch((error) => console.log('Error sharing:', error));
    } else {
      const url = 'https://help.supply/';
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.warn('Link copied to clipboard');
        })
        .catch((error) => console.log('Error copying link:', error));
    }
  };

  return (
    <ConfirmationWrapper
      title={t('request.serviceConfirmation.title', { serviceName })}
    >
      <Text as="p" type={TEXT_TYPE.BODY_2} css={styles.description}>
        {kind !== RequestKinds.CHILDCARE
          ? t('request.serviceConfirmation.description', { organizationName })
          : t('request.serviceConfirmation.childcareDescription', {
              organizationName,
            })}
      </Text>
      <OrganizationConfirmation organization={organization} />
      {!isDesktop && (
        <div css={styles.shareLink}>
          <LinkButton css={styles.link} onClick={handleShare}>
            {t('request.serviceConfirmation.share')}
          </LinkButton>
        </div>
      )}
      <SecondaryButton
        type="submit"
        onClick={handleViewRequests}
        css={styles.secondaryButton}
      >
        {t('request.serviceConfirmation.viewRequests')}
      </SecondaryButton>
      <PrimaryButton
        type="submit"
        onClick={handleRequestServices}
        css={styles.primaryButton}
      >
        <Text type={TEXT_TYPE.BODY_1}>
          {t('request.serviceConfirmation.requestServices')}
        </Text>
      </PrimaryButton>
    </ConfirmationWrapper>
  );
};

export default ServiceConfirmation;
