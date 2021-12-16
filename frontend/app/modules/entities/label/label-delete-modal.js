import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import LabelActions from './label.reducer';

import styles from './label-styles';

function LabelDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteLabel(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Label');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Label {entity.id}?</Text>
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
    label: state.labels.label,
    fetching: state.labels.fetchingOne,
    deleting: state.labels.deleting,
    errorDeleting: state.labels.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLabel: (id) => dispatch(LabelActions.labelRequest(id)),
    getAllLabels: (options) => dispatch(LabelActions.labelAllRequest(options)),
    deleteLabel: (id) => dispatch(LabelActions.labelDeleteRequest(id)),
    resetLabels: () => dispatch(LabelActions.labelReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LabelDeleteModal);
