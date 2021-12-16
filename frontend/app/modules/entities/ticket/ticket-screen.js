import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import TicketActions from './ticket.reducer';
import styles from './ticket-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function TicketScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { ticket, ticketList, getAllTickets, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Ticket entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchTickets();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [ticket, fetchTickets]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('TicketDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Tickets Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchTickets = React.useCallback(() => {
    getAllTickets({ page: page - 1, sort, size });
  }, [getAllTickets, page, sort, size]);

  const handleLoadMore = () => {
    if (ticketList.length) {
      return;
    }
    setPage(page + 1);
    fetchTickets();
  };
  return (
    <View style={styles.container} testID="ticketScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={ticketList}
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
    ticketList: state.tickets.ticketList,
    ticket: state.tickets.ticket,
    fetching: state.tickets.fetchingAll,
    error: state.tickets.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllTickets: (options) => dispatch(TicketActions.ticketAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketScreen);
