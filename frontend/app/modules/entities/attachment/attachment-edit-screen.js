import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import AttachmentActions from './attachment.reducer';
import TicketActions from '../ticket/ticket.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './attachment-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(3),
});

function AttachmentEditScreen(props) {
  const {
    getAttachment,
    updateAttachment,
    route,
    attachment,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllTickets,
    ticketList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getAttachment(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getAttachment, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(attachment));
    }
  }, [attachment, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllTickets();
  }, [getAllTickets]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('AttachmentDetail', { entityId: attachment?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateAttachment(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const nameRef = createRef();
  const fileRef = createRef();
  const fileContentTypeRef = createRef();
  const ticketRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="attachmentEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="name"
              ref={nameRef}
              label="Name"
              placeholder="Enter Name"
              testID="nameInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => fileRef.current?.focus()}
            />
            <FormField
              name="file"
              ref={fileRef}
              label="File"
              placeholder="Enter File"
              testID="fileInput"
              onSubmitEditing={() => fileContentTypeRef.current?.focus()}
            />
            <FormField
              name="fileContentType"
              ref={fileContentTypeRef}
              label="File Content Type"
              placeholder="Enter File Content Type"
              testID="fileContentTypeInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="ticket"
              inputType="select-one"
              ref={ticketRef}
              listItems={ticketList}
              listItemLabelField="id"
              label="Ticket"
              placeholder="Select Ticket"
              testID="ticketSelectInput"
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
    name: value.name ?? null,
    file: value.file ?? null,
    fileContentType: value.fileContentType ?? null,
    ticket: value.ticket && value.ticket.id ? value.ticket.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    name: value.name ?? null,
    file: value.file ?? null,
    fileContentType: value.fileContentType ?? null,
  };
  entity.ticket = value.ticket ? { id: value.ticket } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    ticketList: state.tickets.ticketList ?? [],
    attachment: state.attachments.attachment,
    fetching: state.attachments.fetchingOne,
    updating: state.attachments.updating,
    updateSuccess: state.attachments.updateSuccess,
    errorUpdating: state.attachments.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTickets: (options) => dispatch(TicketActions.ticketAllRequest(options)),
    getAttachment: (id) => dispatch(AttachmentActions.attachmentRequest(id)),
    getAllAttachments: (options) => dispatch(AttachmentActions.attachmentAllRequest(options)),
    updateAttachment: (attachment) => dispatch(AttachmentActions.attachmentUpdateRequest(attachment)),
    reset: () => dispatch(AttachmentActions.attachmentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentEditScreen);
