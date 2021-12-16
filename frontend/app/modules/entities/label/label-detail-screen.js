import React from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

import LabelActions from './label.reducer';
import RoundedButton from '../../../shared/components/rounded-button/rounded-button';
import LabelDeleteModal from './label-delete-modal';
import styles from './label-styles';

function LabelDetailScreen(props) {
  const { route, getLabel, navigation, label, fetching, error } = props;
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  // prevents display of stale reducer data
  const entityId = label?.id ?? null;
  const routeEntityId = route.params?.entityId ?? null;
  const correctEntityLoaded = routeEntityId && entityId && routeEntityId.toString() === entityId.toString();

  useFocusEffect(
    React.useCallback(() => {
      if (!routeEntityId) {
        navigation.navigate('Label');
      } else {
        setDeleteModalVisible(false);
        getLabel(routeEntityId);
      }
    }, [routeEntityId, getLabel, navigation]),
  );

  if (!entityId && !fetching && error) {
    return (
      <View style={styles.loading}>
        <Text>Something went wrong fetching the Label.</Text>
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
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="labelDetailScrollView">
      <Text style={styles.label}>Id:</Text>
      <Text>{label.id}</Text>
      {/* Label Field */}
      <Text style={styles.label}>Label:</Text>
      <Text testID="label">{label.label}</Text>

      <View style={styles.entityButtons}>
        <RoundedButton
          text="Edit"
          onPress={() => navigation.navigate('LabelEdit', { entityId })}
          accessibilityLabel={'Label Edit Button'}
          testID="labelEditButton"
        />
        <RoundedButton
          text="Delete"
          onPress={() => setDeleteModalVisible(true)}
          accessibilityLabel={'Label Delete Button'}
          testID="labelDeleteButton"
        />
        {deleteModalVisible && (
          <LabelDeleteModal
            navigation={navigation}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            entity={label}
            testID="labelDeleteModal"
          />
        )}
      </View>
    </ScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    label: state.labels.label,
    error: state.labels.errorOne,
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

export default connect(mapStateToProps, mapDispatchToProps)(LabelDetailScreen);
