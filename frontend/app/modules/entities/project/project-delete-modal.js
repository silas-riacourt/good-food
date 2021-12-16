import React from 'react';
import { TouchableHighlight, Modal, Text, View } from 'react-native';
import { connect } from 'react-redux';

import ProjectActions from './project.reducer';

import styles from './project-styles';

function ProjectDeleteModal(props) {
  const { visible, setVisible, entity, navigation, testID } = props;

  const deleteEntity = () => {
    props.deleteProject(entity.id);
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Project');
  };
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View testID={testID} style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={[styles.flex, styles.flexRow]}>
            <Text style={styles.modalText}>Delete Project {entity.id}?</Text>
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
    project: state.projects.project,
    fetching: state.projects.fetchingOne,
    deleting: state.projects.deleting,
    errorDeleting: state.projects.errorDeleting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProject: (id) => dispatch(ProjectActions.projectRequest(id)),
    getAllProjects: (options) => dispatch(ProjectActions.projectAllRequest(options)),
    deleteProject: (id) => dispatch(ProjectActions.projectDeleteRequest(id)),
    resetProjects: () => dispatch(ProjectActions.projectReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDeleteModal);
