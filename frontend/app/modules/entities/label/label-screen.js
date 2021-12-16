import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import LabelActions from './label.reducer';
import styles from './label-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function LabelScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { label, labelList, getAllLabels, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Label entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchLabels();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [label, fetchLabels]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('LabelDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Labels Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchLabels = React.useCallback(() => {
    getAllLabels({ page: page - 1, sort, size });
  }, [getAllLabels, page, sort, size]);

  const handleLoadMore = () => {
    if (labelList.length) {
      return;
    }
    setPage(page + 1);
    fetchLabels();
  };
  return (
    <View style={styles.container} testID="labelScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={labelList}
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
    labelList: state.labels.labelList,
    label: state.labels.label,
    fetching: state.labels.fetchingAll,
    error: state.labels.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllLabels: (options) => dispatch(LabelActions.labelAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelScreen);
