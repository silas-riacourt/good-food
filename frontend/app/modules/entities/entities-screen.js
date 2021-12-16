import React from 'react';
import { ScrollView, Text } from 'react-native';
// Styles
import RoundedButton from '../../shared/components/rounded-button/rounded-button';

import styles from './entities-screen.styles';

export default function EntitiesScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.paddedScrollView} testID="entityScreenScrollList">
      <Text style={styles.centerText}>JHipster Entities will appear below</Text>
      <RoundedButton text="Project" onPress={() => navigation.navigate('Project')} testID="projectEntityScreenButton" />
      <RoundedButton text="Label" onPress={() => navigation.navigate('Label')} testID="labelEntityScreenButton" />
      <RoundedButton text="Ticket" onPress={() => navigation.navigate('Ticket')} testID="ticketEntityScreenButton" />
      <RoundedButton text="Attachment" onPress={() => navigation.navigate('Attachment')} testID="attachmentEntityScreenButton" />
      <RoundedButton text="Comment" onPress={() => navigation.navigate('Comment')} testID="commentEntityScreenButton" />
      {/* jhipster-react-native-entity-screen-needle */}
    </ScrollView>
  );
}
