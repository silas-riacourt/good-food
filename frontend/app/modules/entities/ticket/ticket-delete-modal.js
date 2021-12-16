import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import TicketActions from './ticket.reducer';

import styles from './ticket-styles';

function TicketDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteTicket(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Ticket');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Ticket {entity.id}?</Text>
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
    ticket: state.tickets.ticket,
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

export default connect(mapStateToProps, mapDispatchToProps)(TicketDeleteModal);
