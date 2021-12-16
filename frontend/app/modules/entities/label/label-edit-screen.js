import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import LabelActions from './label.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './label-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  label: Yup.string().required().min(3),
});

function LabelEditScreen(props) {
  const { getLabel, updateLabel, route, label, fetching, updating, errorUpdating, updateSuccess, navigation, reset } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getLabel(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getLabel, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(label));
    }
  }, [label, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {}, []);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('LabelDetail', { entityId: label?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateLabel(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const labelRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="labelEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="label"
              ref={labelRef}
              label="Label"
              placeholder="Enter Label"
              testID="labelInput"
              inputType="text"
              autoCapitalize="none"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    label: value.label ?? null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    label: value.label ?? null,
  };
  return entity;
};

const mapStateToProps = (state) => {
  return {
    label: state.labels.label,
    fetching: state.labels.fetchingOne,
    updating: state.labels.updating,
    updateSuccess: state.labels.updateSuccess,
    errorUpdating: state.labels.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLabel: (id) => dispatch(LabelActions.labelRequest(id)),
    getAllLabels: (options) => dispatch(LabelActions.labelAllRequest(options)),
    updateLabel: (label) => dispatch(LabelActions.labelUpdateRequest(label)),
    reset: () => dispatch(LabelActions.labelReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelEditScreen);
