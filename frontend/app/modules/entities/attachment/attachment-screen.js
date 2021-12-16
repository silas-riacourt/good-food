import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import AttachmentActions from './attachment.reducer';
import styles from './attachment-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function AttachmentScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { attachment, attachmentList, getAllAttachments, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Attachment entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchAttachments();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [attachment, fetchAttachments]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('AttachmentDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Attachments Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchAttachments = React.useCallback(() => {
    getAllAttachments({ page: page - 1, sort, size });
  }, [getAllAttachments, page, sort, size]);

  const handleLoadMore = () => {
    if (attachmentList.length) {
      return;
    }
    setPage(page + 1);
    fetchAttachments();
  };
  return (
    <View style={styles.container} testID="attachmentScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={attachmentList}
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
    attachmentList: state.attachments.attachmentList,
    attachment: state.attachments.attachment,
    fetching: state.attachments.fetchingAll,
    error: state.attachments.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAttachments: (options) => dispatch(AttachmentActions.attachmentAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentScreen);
