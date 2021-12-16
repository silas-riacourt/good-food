import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { convertLocalDateToString } from '../../../shared/util/date-transforms';

import TicketActions from './ticket.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import TicketDeleteModal from './ticket-delete-modal';
import styles from './ticket-styles';

function TicketDetailScreen(props) {
  const { route, getTicket, navigation, ticket, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = ticket?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Ticket');
      } else {
        setDeleteModalVisible(false);
        getTicket(routeEntityId);
      }
    }, [routeEntityId, getTicket, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Ticket.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="ticketDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{ticket.id}</Text>
      {/* Title Field */}
      <Text style={styles.label}>Title:</Text>
      <Text testID="title">{ticket.title}</Text>
      {/* Description Field */}
      <Text style={styles.label}>Description:</Text>
      <Text testID="description">{ticket.description}</Text>
      {/* DueDate Field */}
      <Text style={styles.label}>DueDate:</Text>
      <Text testID="dueDate">{convertLocalDateToString(ticket.dueDate)}</Text>
      {/* Date Field */}
      <Text style={styles.label}>Date:</Text>
      <Text testID="date">{String(ticket.date)}</Text>
      {/* Status Field */}
      <Text style={styles.label}>Status:</Text>
      <Text testID="status">{ticket.status}</Text>
      {/* Type Field */}
      <Text style={styles.label}>Type:</Text>
      <Text testID="type">{ticket.type}</Text>
      {/* Priority Field */}
      <Text style={styles.label}>Priority:</Text>
      <Text testID="priority">{ticket.priority}</Text>
      <Text style={styles.label}>Project:</Text>
      <Text testID="project">{String(ticket.project ? ticket.project.name : '')}</Text>
      <Text style={styles.label}>Assigned To:</Text>
      <Text testID="assignedTo">{String(ticket.assignedTo ? ticket.assignedTo.login : '')}</Text>
      <Text style={styles.label}>Reported By:</Text>
      <Text testID="reportedBy">{String(ticket.reportedBy ? ticket.reportedBy.login : '')}</Text>
      <Text style={styles.label}>Label:</Text>
      {ticket.labels &&
        ticket.labels.map((entity, index) => (
          <Text key={index} testID={`labels-${index}`}>
            {String(entity.label || '')}
          </Text>
        ))}

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('TicketEdit', { entityId })}
          accessibilityLabel={'Ticket Edit Button'}
          testID="ticketEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Ticket Delete Button'}
          testID="ticketDeleteButton"
        />
        {deleteModalVisible && (
          <TicketDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={ticket}
            testID="ticketDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    ticket: state.tickets.ticket,
    error: state.tickets.errorOne,
    fetching: state.tickets.fetchingOne,
    deleting: state.tickets.deleting,
    errorDeleting: state.tickets.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTicket: (id) => dispatch(TicketActions.ticketRequest(id)),
    getAllTickets: (options) => dispatch(TicketActions.ticketAllRequest(options)),
    deleteTicket: (id) => dispatch(TicketActions.ticketDeleteRequest(id)),
    resetTickets: () => dispatch(TicketActions.ticketReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketDetailScreen);
