import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CommentActions from './comment.reducer';

import styles from './comment-styles';

function CommentDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteComment(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Comment');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Comment {entity.id}?</Text>
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
    comment: state.comments.comment,
    fetching: state.comments.fetchingOne,
    deleting: state.comments.deleting,
    errorDeleting: state.comments.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getComment: (id) => dispatch(CommentActions.commentRequest(id)),
    getAllComments: (options) => dispatch(CommentActions.commentAllRequest(options)),
    deleteComment: (id) => dispatch(CommentActions.commentDeleteRequest(id)),
    resetComments: () => dispatch(CommentActions.commentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentDeleteModal);
