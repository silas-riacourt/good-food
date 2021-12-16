import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import AttachmentActions from './attachment.reducer';

import styles from './attachment-styles';

function AttachmentDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteAttachment(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Attachment');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Attachment {entity.id}?</Text>
          </View>
          <View style={[styles.flexRow]}>
            <TouchableHighlight
              style={[styles.openButton, styles.cancelButton]}
              onPress={() => {
                setVisible(false);
              }}>
              <Text style={styles.textStyle}>Cancel</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.openButton, styles.submitButton]} onPress={deleteEntity} testID="deleteButton">
              <Text style={styles.textStyle}>Delete</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const mapStateToProps = (state) => {
  return {
    attachment: state.attachments.attachment,
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

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentDeleteModal);
