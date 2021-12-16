import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ProjectActions from './project.reducer';
import styles from './project-styles';
import AlertMessage from '../../../shared/components/alert-message/alert-message';

function ProjectScreen(props) {
  const [page, setPage] = React.useState(0);
  const [sort /*, setSort*/] = React.useState('id,asc');
  const [size /*, setSize*/] = React.useState(20);

  const { project, projectList, getAllProjects, fetching } = props;

  useFocusEffect(
    React.useCallback(() => {
      console.debug('Project entity changed and the list screen is now in focus, refresh');
      setPage(0);
      fetchProjects();
      /* eslint-disable-next-line react-hooks/exhaustive-deps */
    }, [project, fetchProjects]),
  );

  const renderRow = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => props.navigation.navigate('ProjectDetail', { entityId: item.id })}>
        <View style={styles.listRow}>
          <Text style={styles.whiteLabel}>ID: {item.id}</Text>
          {/* <Text style={styles.label}>{item.description}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  // Render a header

  // Show this when data is empty
  const renderEmpty = () => <AlertMessage title="No Projects Found" show={!fetching} />;

  const keyExtractor = (item, index) => `${index}`;

  // How many items should be kept im memory as we scroll?
  const oneScreensWorth = 20;

  const fetchProjects = React.useCallback(() => {
    getAllProjects({ page: page - 1, sort, size });
  }, [getAllProjects, page, sort, size]);

  const handleLoadMore = () => {
    if (projectList.length) {
      return;
    }
    setPage(page + 1);
    fetchProjects();
  };
  return (
    <View style={styles.container} testID="projectScreen">
      <FlatList
        contentContainerStyle={styles.listContent}
        data={projectList}
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
    projectList: state.projects.projectList,
    project: state.projects.project,
    fetching: state.projects.fetchingAll,
    error: state.projects.errorAll,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProjects: (options) => dispatch(ProjectActions.projectAllRequest(options)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectScreen);
