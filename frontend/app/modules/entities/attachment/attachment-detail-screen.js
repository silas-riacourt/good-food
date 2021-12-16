import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import AttachmentActions from './attachment.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import AttachmentDeleteModal from './attachment-delete-modal';
import styles from './attachment-styles';

function AttachmentDetailScreen(props) {
  const { route, getAttachment, navigation, attachment, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = attachment?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Attachment');
      } else {
        setDeleteModalVisible(false);
        getAttachment(routeEntityId);
      }
    }, [routeEntityId, getAttachment, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Attachment.</Text>
      </View>
    );
  }
  if (!entityId || fetching || !correctEntityLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="attachmentDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{attachment.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{attachment.name}</Text>
      {/* File Field */}
      <Text style={styles.label}>File:</Text>
      <Text testID="file">Open {attachment.fileContentType} (not implemented)</Text>
      <Text style={styles.label}>Ticket:</Text>
      <Text testID="ticket">{String(attachment.ticket ? attachment.ticket.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('AttachmentEdit', { entityId })}
          accessibilityLabel={'Attachment Edit Button'}
          testID="attachmentEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Attachment Delete Button'}
          testID="attachmentDeleteButton"
        />
        {deleteModalVisible && (
          <AttachmentDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={attachment}
            testID="attachmentDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    attachment: state.attachments.attachment,
    error: state.attachments.errorOne,
    fetching: state.attachments.fetchingOne,
    deleting: state.attachments.deleting,
    errorDeleting: state.attachments.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAttachment: (id) => dispatch(AttachmentActions.attachmentRequest(id)),
    getAllAttachments: (options) => dispatch(AttachmentActions.attachmentAllRequest(options)),
    deleteAttachment: (id) => dispatch(AttachmentActions.attachmentDeleteRequest(id)),
    resetAttachments: () => dispatch(AttachmentActions.attachmentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentDetailScreen);
