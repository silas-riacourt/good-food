import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import CommentActions from './comment.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import CommentDeleteModal from './comment-delete-modal';
import styles from './comment-styles';

function CommentDetailScreen(props) {
  const { route, getComment, navigation, comment, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = comment?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Comment');
      } else {
        setDeleteModalVisible(false);
        getComment(routeEntityId);
      }
    }, [routeEntityId, getComment, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Comment.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="commentDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{comment.id}</Text>
      {/* Date Field */}
      <Text style={styles.label}>Date:</Text>
      <Text testID="date">{String(comment.date)}</Text>
      {/* Text Field */}
      <Text style={styles.label}>Text:</Text>
      <Text testID="text">{comment.text}</Text>
      <Text style={styles.label}>Login:</Text>
      <Text testID="login">{String(comment.login ? comment.login.id : '')}</Text>
      <Text style={styles.label}>Child:</Text>
      <Text testID="child">{String(comment.child ? comment.child.id : '')}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('CommentEdit', { entityId })}
          accessibilityLabel={'Comment Edit Button'}
          testID="commentEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Comment Delete Button'}
          testID="commentDeleteButton"
        />
        {deleteModalVisible && (
          <CommentDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={comment}
            testID="commentDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    comment: state.comments.comment,
    error: state.comments.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentDetailScreen);
