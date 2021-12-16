import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import CommentActions from './comment.reducer';
import styles from './comment-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function CommentScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { comment, commentList, getAllComments, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Comment entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchComments();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [comment, fetchComments]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('CommentDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Comments Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchComments = React.useCallback(() => {
    getAllComments({ page: page - 1, sort, size });
  }, [getAllComments, page, sort, size]);

  const handleLoadMore = () => {
    if (commentList.length) {
      return;
    }
    setPage(page + 1);
    fetchComments();
  };
  return (
    <View style={styles.container} testID="commentScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={commentList}
        renderItem={renderRow}
        keyExtractor={keyExtractor}
        initialNumToRender={oneScreensWorth}
        onEndReached={handleLoadMore}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    // ...redux state to props here
    commentList: state.comments.commentList,
    comment: state.comments.comment,
    fetching: state.comments.fetchingAll,
    error: state.comments.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllComments: (options) => dispatch(CommentActions.commentAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentScreen);
