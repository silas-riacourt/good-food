import * as React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { DrawerButton } from './drawer/drawer-button';
import { navigate, goBackOrIfParamsOrDefault } from './nav-ref';

// import screens
import EntitiesScreen from '../modules/entities/entities-screen';
import ProjectScreen from '../modules/entities/project/project-screen';
import ProjectDetailScreen from '../modules/entities/project/project-detail-screen';
import ProjectEditScreen from '../modules/entities/project/project-edit-screen';
import LabelScreen from '../modules/entities/label/label-screen';
import LabelDetailScreen from '../modules/entities/label/label-detail-screen';
import LabelEditScreen from '../modules/entities/label/label-edit-screen';
import TicketScreen from '../modules/entities/ticket/ticket-screen';
import TicketDetailScreen from '../modules/entities/ticket/ticket-detail-screen';
import TicketEditScreen from '../modules/entities/ticket/ticket-edit-screen';
import AttachmentScreen from '../modules/entities/attachment/attachment-screen';
import AttachmentDetailScreen from '../modules/entities/attachment/attachment-detail-screen';
import AttachmentEditScreen from '../modules/entities/attachment/attachment-edit-screen';
import CommentScreen from '../modules/entities/comment/comment-screen';
import CommentDetailScreen from '../modules/entities/comment/comment-detail-screen';
import CommentEditScreen from '../modules/entities/comment/comment-edit-screen';
// jhipster-react-native-navigation-import-needle

export const entityScreens = [
  {
    name: 'Entities',
    route: '',
    component: EntitiesScreen,
    options: {
      headerLeft: DrawerButton,
    },
  },
  {
    name: 'Project',
    route: 'project',
    component: ProjectScreen,
    options: {
      title: 'Projects',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('ProjectEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'ProjectDetail',
    route: 'project/detail',
    component: ProjectDetailScreen,
    options: { title: 'View Project', headerLeft: () => <HeaderBackButton onPress={() => navigate('Project')} /> },
  },
  {
    name: 'ProjectEdit',
    route: 'project/edit',
    component: ProjectEditScreen,
    options: {
      title: 'Edit Project',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('ProjectDetail', 'Project')} />,
    },
  },
  {
    name: 'Label',
    route: 'label',
    component: LabelScreen,
    options: {
      title: 'Labels',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('LabelEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'LabelDetail',
    route: 'label/detail',
    component: LabelDetailScreen,
    options: { title: 'View Label', headerLeft: () => <HeaderBackButton onPress={() => navigate('Label')} /> },
  },
  {
    name: 'LabelEdit',
    route: 'label/edit',
    component: LabelEditScreen,
    options: {
      title: 'Edit Label',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('LabelDetail', 'Label')} />,
    },
  },
  {
    name: 'Ticket',
    route: 'ticket',
    component: TicketScreen,
    options: {
      title: 'Tickets',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('TicketEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'TicketDetail',
    route: 'ticket/detail',
    component: TicketDetailScreen,
    options: { title: 'View Ticket', headerLeft: () => <HeaderBackButton onPress={() => navigate('Ticket')} /> },
  },
  {
    name: 'TicketEdit',
    route: 'ticket/edit',
    component: TicketEditScreen,
    options: {
      title: 'Edit Ticket',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('TicketDetail', 'Ticket')} />,
    },
  },
  {
    name: 'Attachment',
    route: 'attachment',
    component: AttachmentScreen,
    options: {
      title: 'Attachments',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('AttachmentEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'AttachmentDetail',
    route: 'attachment/detail',
    component: AttachmentDetailScreen,
    options: { title: 'View Attachment', headerLeft: () => <HeaderBackButton onPress={() => navigate('Attachment')} /> },
  },
  {
    name: 'AttachmentEdit',
    route: 'attachment/edit',
    component: AttachmentEditScreen,
    options: {
      title: 'Edit Attachment',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('AttachmentDetail', 'Attachment')} />,
    },
  },
  {
    name: 'Comment',
    route: 'comment',
    component: CommentScreen,
    options: {
      title: 'Comments',
      headerLeft: () => <HeaderBackButton onPress={() => navigate('Entities')} />,
      headerRight: () => (
        <HeaderBackButton
          label=" New "
          onPress={() => navigate('CommentEdit', { id: undefined })}
          backImage={(props) => <Ionicons name="md-add-circle-outline" size={32} color={props.tintColor} />}
        />
      ),
    },
  },
  {
    name: 'CommentDetail',
    route: 'comment/detail',
    component: CommentDetailScreen,
    options: { title: 'View Comment', headerLeft: () => <HeaderBackButton onPress={() => navigate('Comment')} /> },
  },
  {
    name: 'CommentEdit',
    route: 'comment/edit',
    component: CommentEditScreen,
    options: {
      title: 'Edit Comment',
      headerLeft: () => <HeaderBackButton onPress={() => goBackOrIfParamsOrDefault('CommentDetail', 'Comment')} />,
    },
  },
  // jhipster-react-native-navigation-declaration-needle
];

export const getEntityRoutes = () => {
  const routes = {};
  entityScreens.forEach((screen) => {
    routes[screen.name] = screen.route;
  });
  return routes;
};

const EntityStack = createStackNavigator();

export default function EntityStackScreen() {
  return (
    <EntityStack.Navigator>
      {entityScreens.map((screen, index) => {
        return <EntityStack.Screen name={screen.name} component={screen.component} key={index} options={screen.options} />;
      })}
    </EntityStack.Navigator>
  );
}
