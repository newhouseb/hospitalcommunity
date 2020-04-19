/** @jsx jsx */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { Routes } from 'constants/Routes';
import { Emails } from 'constants/Emails';
import { routeWithParams } from 'lib/utils/routes';
import { isValidZipCode } from 'lib/utils/validations';

import Text from 'components/Text';
import { TEXT_TYPE } from 'components/Text/constants';
import FormBuilder from 'components/Form/FormBuilder';
import { formFieldTypes } from 'components/Form/CreateFormFields';

const validate = (val) => {
  if (val === '') {
    return;
  }
  if (!isValidZipCode(val)) {
    return 'Please enter a valid ZIP code';
  }
};

function ServiceLocationUpdateForm({ backend, serviceUser }) {
  const history = useHistory();
  const { t } = useTranslation();

  const email = `[${Emails.UPDATE}](mailto:${Emails.UPDATE})`;

  const [isLoading, setIsLoading] = useState(false);
  const [fields, setFields] = useState({
    zipCode: serviceUser?.data?.zipCode || '',
  });

  const handleFieldChange = useCallback(
    (field) => (value) => {
      setFields((fields) => ({
        ...fields,
        [field]: value,
      }));
    },
    [],
  );

  const { zipCode, ...requiredFields } = fields;

  const handleSubmit = () => {
    setIsLoading(true);

    const servicesByZip = backend.getServicesForZip(fields.zipCode);

    if (!servicesByZip?.length) {
      history.push(routeWithParams(Routes.SERVICE_LOCATION_UNAVAILABLE));
      return;
    }

    backend.setLocalZip(fields.zipCode);
    history.push(
      routeWithParams(Routes.SERVICE_LOCATION_AVAILABLE, {
        zip: fields.zipCode,
      }),
    );
  };

  const fieldData = [
    {
      customOnChange: handleFieldChange('zipCode'),
      defaultValue: fields.zipCode,
      label: t('service.locationForm.labels.zipCode'),
      name: 'zipCode',
      type: formFieldTypes.INPUT_TEXT,
      value: fields.zipCode,
      validation: { validate },
    },
  ];

  return (
    <FormBuilder
      defaultValues={fields}
      onSubmit={handleSubmit}
      title={t('service.updateLocationForm.title')}
      description={t('service.updateLocationForm.description')}
      disabled={
        (fields.phone !== '' && !isValidZipCode(fields.zipCode)) ||
        !Object.keys(requiredFields).every((key) => !!fields[key])
      }
      fields={fieldData}
      isLoading={isLoading}
      buttonLabel={t('global.form.submitLabelNext')}
    >
      <Text as="p" type={TEXT_TYPE.NOTE}>
        <ReactMarkdown
          source={t('service.updateLocationForm.note', { email })}
        />
      </Text>
    </FormBuilder>
  );
}

export default ServiceLocationUpdateForm;