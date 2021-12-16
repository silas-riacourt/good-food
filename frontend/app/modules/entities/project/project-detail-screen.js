import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import ProjectActions from './project.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import ProjectDeleteModal from './project-delete-modal';
import styles from './project-styles';

function ProjectDetailScreen(props) {
  const { route, getProject, navigation, project, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = project?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Project');
      } else {
        setDeleteModalVisible(false);
        getProject(routeEntityId);
      }
    }, [routeEntityId, getProject, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Project.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="projectDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{project.id}</Text>
      {/* Name Field */}
      <Text style={styles.label}>Name:</Text>
      <Text testID="name">{project.name}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('ProjectEdit', { entityId })}
          accessibilityLabel={'Project Edit Button'}
          testID="projectEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Project Delete Button'}
          testID="projectDeleteButton"
        />
        {deleteModalVisible && (
          <ProjectDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={project}
            testID="projectDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    project: state.projects.project,
    error: state.projects.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetailScreen);
