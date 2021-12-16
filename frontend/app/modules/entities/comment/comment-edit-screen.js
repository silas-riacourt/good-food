import React, { createRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { connect } from 'react-redux';

import CommentActions from './comment.reducer';
import UserActions from '../../../shared/reducers/user.reducer';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormButton from '../../../shared/components/form/jhi-form-button';
import FormField from '../../../shared/components/form/jhi-form-field';
import Form from '../../../shared/components/form/jhi-form';
import { useDidUpdateEffect } from '../../../shared/util/use-did-update-effect';
import styles from './comment-styles';

function CommentEditScreen(props) {
  const {
    getComment,
    updateComment,
    route,
    comment,
    fetching,
    updating,
    errorUpdating,
    updateSuccess,
    navigation,
    reset,
    getAllUsers,
    userList,
  } = props;

  const [formValue, setFormValue] = React.useState();
  const [error, setError] = React.useState('');

  const isNewEntity = !(route.params && route.params.entityId);

  React.useEffect(() => {
    if (!isNewEntity) {
      getComment(route.params.entityId);
    } else {
      reset();
    }
  }, [isNewEntity, getComment, route, reset]);

  React.useEffect(() => {
    if (isNewEntity) {
      setFormValue(entityToFormValue({}));
    } else if (!fetching) {
      setFormValue(entityToFormValue(comment));
    }
  }, [comment, fetching, isNewEntity]);

  // fetch related entities
  React.useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useDidUpdateEffect(() => {
    if (updating === false) {
      if (errorUpdating) {
        setError(errorUpdating && errorUpdating.detail ? errorUpdating.detail : 'Something went wrong updating the entity');
      } else if (updateSuccess) {
        setError('');
        isNewEntity || !navigation.canGoBack() ? navigation.replace('CommentDetail', { entityId: comment?.id }) : navigation.pop();
      }
    }
  }, [updateSuccess, errorUpdating, navigation]);

  const onSubmit = (data) => updateComment(formValueToEntity(data));

  if (fetching) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const formRef = createRef();
  const dateRef = createRef();
  const textRef = createRef();
  const loginRef = createRef();
  const childRef = createRef();

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        enableResetScrollToCoords={false}
        testID="commentEditScrollView"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.paddedScrollView}>
        {!!error && <Text style={styles.errorText}>{error}</Text>}
        {formValue && (
          <Form initialValues={formValue} onSubmit={onSubmit} ref={formRef}>
            <FormField
              name="date"
              ref={dateRef}
              label="Date"
              placeholder="Enter Date"
              testID="dateInput"
              inputType="datetime"
              onSubmitEditing={() => textRef.current?.focus()}
            />
            <FormField
              name="text"
              ref={textRef}
              label="Text"
              placeholder="Enter Text"
              testID="textInput"
              inputType="text"
              autoCapitalize="none"
            />
            <FormField
              name="login"
              inputType="select-one"
              ref={loginRef}
              listItems={userList}
              listItemLabelField="id"
              label="Login"
              placeholder="Select Login"
              testID="userSelectInput"
            />
            <FormField
              name="child"
              inputType="select-one"
              ref={childRef}
              listItems={commentList}
              listItemLabelField="id"
              label="Child"
              placeholder="Select Child"
              testID="commentSelectInput"
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
    date: value.date ?? null,
    text: value.text ?? null,
    login: value.login && value.login.id ? value.login.id : null,
    child: value.child && value.child.id ? value.child.id : null,
  };
};
const formValueToEntity = (value) => {
  const entity = {
    id: value.id ?? null,
    date: value.date ?? null,
    text: value.text ?? null,
  };
  entity.login = value.login ? { id: value.login } : null;
  entity.child = value.child ? { id: value.child } : null;
  return entity;
};

const mapStateToProps = (state) => {
  return {
    userList: state.users.userList ?? [],
    comment: state.comments.comment,
    fetching: state.comments.fetchingOne,
    updating: state.comments.updating,
    updateSuccess: state.comments.updateSuccess,
    errorUpdating: state.comments.errorUpdating,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (options) => dispatch(UserActions.userAllRequest(options)),
    getComment: (id) => dispatch(CommentActions.commentRequest(id)),
    getAllComments: (options) => dispatch(CommentActions.commentAllRequest(options)),
    updateComment: (comment) => dispatch(CommentActions.commentUpdateRequest(comment)),
    reset: () => dispatch(CommentActions.commentReset()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentEditScreen);
