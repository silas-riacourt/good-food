import { takeLatest, all } from 'redux-saga/effects';
import API from '../services/api';
import FixtureAPI from '../services/fixture-api';
import AppConfig from '../../config/app-config';

/* ------------- Types ------------- */

import { StartupTypes } from '../reducers/startup.reducer';
import { LoginTypes } from '../../modules/login/login.reducer';
import { AccountTypes } from '../../shared/reducers/account.reducer';
import { RegisterTypes } from '../../modules/account/register/register.reducer';
import { ForgotPasswordTypes } from '../../modules/account/password-reset/forgot-password.reducer';
import { ChangePasswordTypes } from '../../modules/account/password/change-password.reducer';
import { UserTypes } from '../../shared/reducers/user.reducer';
import { ProjectTypes } from '../../modules/entities/project/project.reducer';
import { LabelTypes } from '../../modules/entities/label/label.reducer';
import { TicketTypes } from '../../modules/entities/ticket/ticket.reducer';
import { AttachmentTypes } from '../../modules/entities/attachment/attachment.reducer';
import { CommentTypes } from '../../modules/entities/comment/comment.reducer';
// jhipster-react-native-saga-redux-import-needle

/* ------------- Sagas ------------- */

import { startup } from './startup.saga';
import { login, logout, loginLoad } from '../../modules/login/login.sagas';
import { register } from '../../modules/account/register/register.sagas';
import { forgotPassword } from '../../modules/account/password-reset/forgot-password.sagas';
import { changePassword } from '../../modules/account/password/change-password.sagas';
import { getAccount, updateAccount } from '../../shared/sagas/account.sagas';
import UserSagas from '../../shared/sagas/user.sagas';
import ProjectSagas from '../../modules/entities/project/project.sagas';
import LabelSagas from '../../modules/entities/label/label.sagas';
import TicketSagas from '../../modules/entities/ticket/ticket.sagas';
import AttachmentSagas from '../../modules/entities/attachment/attachment.sagas';
import CommentSagas from '../../modules/entities/comment/comment.sagas';
// jhipster-react-native-saga-method-import-needle

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = AppConfig.useFixtures ? FixtureAPI : API.create();

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),

    // JHipster accounts
    takeLatest(LoginTypes.LOGIN_LOAD, loginLoad, api),
    takeLatest(LoginTypes.LOGIN_REQUEST, login, api),
    takeLatest(LoginTypes.LOGOUT_REQUEST, logout, api),

    takeLatest(ProjectTypes.PROJECT_REQUEST, ProjectSagas.getProject, api),
    takeLatest(ProjectTypes.PROJECT_ALL_REQUEST, ProjectSagas.getAllProjects, api),
    takeLatest(ProjectTypes.PROJECT_UPDATE_REQUEST, ProjectSagas.updateProject, api),
    takeLatest(ProjectTypes.PROJECT_DELETE_REQUEST, ProjectSagas.deleteProject, api),

    takeLatest(LabelTypes.LABEL_REQUEST, LabelSagas.getLabel, api),
    takeLatest(LabelTypes.LABEL_ALL_REQUEST, LabelSagas.getAllLabels, api),
    takeLatest(LabelTypes.LABEL_UPDATE_REQUEST, LabelSagas.updateLabel, api),
    takeLatest(LabelTypes.LABEL_DELETE_REQUEST, LabelSagas.deleteLabel, api),

    takeLatest(TicketTypes.TICKET_REQUEST, TicketSagas.getTicket, api),
    takeLatest(TicketTypes.TICKET_ALL_REQUEST, TicketSagas.getAllTickets, api),
    takeLatest(TicketTypes.TICKET_UPDATE_REQUEST, TicketSagas.updateTicket, api),
    takeLatest(TicketTypes.TICKET_DELETE_REQUEST, TicketSagas.deleteTicket, api),

    takeLatest(AttachmentTypes.ATTACHMENT_REQUEST, AttachmentSagas.getAttachment, api),
    takeLatest(AttachmentTypes.ATTACHMENT_ALL_REQUEST, AttachmentSagas.getAllAttachments, api),
    takeLatest(AttachmentTypes.ATTACHMENT_UPDATE_REQUEST, AttachmentSagas.updateAttachment, api),
    takeLatest(AttachmentTypes.ATTACHMENT_DELETE_REQUEST, AttachmentSagas.deleteAttachment, api),

    takeLatest(CommentTypes.COMMENT_REQUEST, CommentSagas.getComment, api),
    takeLatest(CommentTypes.COMMENT_ALL_REQUEST, CommentSagas.getAllComments, api),
    takeLatest(CommentTypes.COMMENT_UPDATE_REQUEST, CommentSagas.updateComment, api),
    takeLatest(CommentTypes.COMMENT_DELETE_REQUEST, CommentSagas.deleteComment, api),
    // jhipster-react-native-saga-redux-connect-needle

    takeLatest(RegisterTypes.REGISTER_REQUEST, register, api),
    takeLatest(ForgotPasswordTypes.FORGOT_PASSWORD_REQUEST, forgotPassword, api),
    takeLatest(ChangePasswordTypes.CHANGE_PASSWORD_REQUEST, changePassword, api),
    takeLatest(UserTypes.USER_REQUEST, UserSagas.getUser, api),
    takeLatest(UserTypes.USER_UPDATE_REQUEST, UserSagas.updateUser, api),
    takeLatest(UserTypes.USER_DELETE_REQUEST, UserSagas.deleteUser, api),
    takeLatest(UserTypes.USER_ALL_REQUEST, UserSagas.getAllUsers, api),

    takeLatest(AccountTypes.ACCOUNT_REQUEST, getAccount, api),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_REQUEST, updateAccount, api),
  ]);
}
