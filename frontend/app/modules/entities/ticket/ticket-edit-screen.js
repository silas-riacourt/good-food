import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';
import * as Yup from 'yup';

import TicketActions from './ticket.reducer';
import ProjectActions from '../project/project.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import LabelActions from '../label/label.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './ticket-styles';

// set up validation schema for the form
const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
});

const Status = [
  {
    label: 'OPEN (Open)',
    value: 'OPEN (Open)',
  },
  {
    label: 'WAITING_FOR_RESPONSE (Waiting for Customer Response)',
    value: 'WAITING_FOR_RESPONSE (Waiting for Customer Response)',
  },
  {
    label: 'CLOSED (Closed)',
    value: 'CLOSED (Closed)',
  },
  {
    label: 'DUPLICATE (Duplicate)',
    value: 'DUPLICATE (Duplicate)',
  },
  {
    label: 'IN_PROGRESS (In Progress)',
    value: 'IN_PROGRESS (In Progress)',
  },
  {
    label: 'REOPENED (Reopened)',
    value: 'REOPENED (Reopened)',
  },
  {
    label: 'CANNOT_REPRODUCE (Cannot Reproduce)',
    value: 'CANNOT_REPRODUCE (Cannot Reproduce)',
  },
  {
    label: 'SOLVED (Solved)',
    value: 'SOLVED (Solved)',
  },
  {
    label: 'WONT_IMPLEMENT (Won&#39;t Implement)',
    value: 'WONT_IMPLEMENT (Won&#39;t Implement)',
  },
  {
    label: 'VERIFIED (Verified)',
    value: 'VERIFIED (Verified)',
  },
];
const Type = [
  {
    label: 'BUG (Bug)',
    value: 'BUG (Bug)',
  },
  {
    label: 'FEATURE (Feature)',
    value: 'FEATURE (Feature)',
  },
];
const Priority = [
  {
    label: 'HIGHEST (Highest)',
    value: 'HIGHEST (Highest)',
  },
  {
    label: 'HIGHER (Higher)',
    value: 'HIGHER (Higher)',
  },
  {
    label: 'HIGH (High)',
    value: 'HIGH (High)',
  },
  {
    label: 'NORMAL (Normal)',
    value: 'NORMAL (Normal)',
  },
  {
    label: 'LOW (Low)',
    value: 'LOW (Low)',
  },
  {
    label: 'LOWER (Lower)',
    value: 'LOWER (Lower)',
  },
  {
    label: 'LOWERST (Lowest)',
    value: 'LOWERST (Lowest)',
  },
];

function TicketEditScreen(props) {
  const {
    getTicket,
    updateTicket,
    route,
    ticket,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllProjects,
    projectList,
    getAllUsers,
    userList,
    getAllLabels,
    labelList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getTicket(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getTicket, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(ticket));
    }
  }, [ticket, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllProjects();
    getAllUsers();
    getAllLabels();
  }, [getAllProjects, getAllUsers, getAllLabels]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('TicketDetail', { entityId: ticket?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateTicket(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const titleRef = createRef();
  const descriptionRef = createRef();
  const dueDateRef = createRef();
  const dateRef = createRef();
  const statusRef = createRef();
  const typeRef = createRef();
  const priorityRef = createRef();
  const projectRef = createRef();
  const assignedToRef = createRef();
  const reportedByRef = createRef();
  const labelsRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="ticketEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} validationSchema={validationSchema} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="title"
              ref={titleRef}
              label="Title"
              placeholder="Enter Title"
              testID="titleInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => descriptionRef.current?.focus()}
            />
            <FormField
              name="description"
              ref={descriptionRef}
              label="Description"
              placeholder="Enter Description"
              testID="descriptionInput"
              inputType="text"
              autoCapitalize="none"
              onSubmitEditing={() => dueDateRef.current?.focus()}
            />
            <FormField
              name="dueDate"
              ref={dueDateRef}
              label="Due Date"
              placeholder="Enter Due Date"
              testID="dueDateInput"
              inputType="date"
              onSubmitEditing={() => dateRef.current?.focus()}
            />
            <FormField name="date" ref={dateRef} label="Date" placeholder="Enter Date" testID="dateInput" inputType="datetime" />
            <FormField
              name="status"
              ref={statusRef}
              label="Status"
              placeholder="Enter Status"
              testID="statusInput"
              inputType="select-one"
              listItems={Status}
            />
            <FormField
              name="type"
              ref={typeRef}
              label="Type"
              placeholder="Enter Type"
              testID="typeInput"
              inputType="select-one"
              listItems={Type}
            />
            <FormField
              name="priority"
              ref={priorityRef}
              label="Priority"
              placeholder="Enter Priority"
              testID="priorityInput"
              inputType="select-one"
              listItems={Priority}
            />
            <FormField
              name="project"
              inputType="select-one"
              ref={projectRef}
              listItems={projectList}
              listItemLabelField="name"
              label="Project"
              placeholder="Select Project"
              testID="projectSelectInput"
            />
            <FormField
              name="assignedTo"
              inputType="select-one"
              ref={assignedToRef}
              listItems={userList}
              listItemLabelField="login"
              label="Assigned To"
              placeholder="Select Assigned To"
              testID="userSelectInput"
            />
            <FormField
              name="reportedBy"
              inputType="select-one"
              ref={reportedByRef}
              listItems={userList}
              listItemLabelField="login"
              label="Reported By"
              placeholder="Select Reported By"
              testID="userSelectInput"
            />
            <FormField
              name="labels"
              inputType="select-multiple"
              ref={labelsRef}
              listItems={labelList}
              listItemLabelField="label"
              label="Label"
              placeholder="Select Label"
              testID="labelSelectInput"
            />

            <FormButton title={'Save'} testID={'submitButton'} />
          </Form>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
}

// convenience methods for customizing the mapping of the entity to/from the form value
const entityToFormValue = (value) => {
  if (!value) {
    return {};
  }
  return {
    id: value.id ?? null,
    title: value.title ?? null,
    description: value.description ?? null,
    dueDate: value.dueDate ?? null,
    date: value.date ?? null,
    status: value.status ?? null,
    type: value.type ?? null,
    priority: value.priority ?? null,
    project: value.project && value.project.id ? value.project.id : null,
    assignedTo: value.assignedTo && value.assignedTo.id ? value.assignedTo.id : null,
    reportedBy: value.reportedBy && value.reportedBy.id ? value.reportedBy.id : null,
    labels: value.labels?.map((i) => i.id),
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    title: value.title ?? null,
    description: value.description ?? null,
    dueDate: value.dueDate ?? null,
    date: value.date ?? null,
    status: value.status ?? null,
    type: value.type ?? null,
    priority: value.priority ?? null,
  };
  entity.project = value.project ? { id: value.project } : null;
  entity.assignedTo = value.assignedTo ? { id: value.assignedTo } : null;
  entity.reportedBy = value.reportedBy ? { id: value.reportedBy } : null;
  entity.labels = value.labels.map((id) => ({ id }));
  return entity;
};

const mapStateToProps = (state) => {
  return {
    projectList: state.projects.projectList ?? [],
    userList: state.users.userList ?? [],
    labelList: state.labels.labelList ?? [],
    ticket: state.tickets.ticket,
    fetching: state.tickets.fetchingOne,
    updating: state.tickets.updating,
    updateSuccess: state.tickets.updateSuccess,
    errorUpdating: state.tickets.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProjects: (options) => dispatch(ProjectActions.projectAllRequest(options)),
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getAllLabels: (options) => dispatch(LabelActions.labelAllRequest(options)),
    getTicket: (id) => dispatch(TicketActions.ticketRequest(id)),
    getAllTickets: (options) => dispatch(TicketActions.ticketAllRequest(options)),
    updateTicket: (ticket) => dispatch(TicketActions.ticketUpdateRequest(ticket)),
    reset: () => dispatch(TicketActions.ticketReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TicketEditScreen);
