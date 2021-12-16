// a library to wrap and simplify api calls
import apisauce from 'apisauce';

import AppConfig from '../../config/app-config';

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //
  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000,
  });

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth);
  const removeAuthToken = () => api.deleteHeader('Authorization');
  const login = (userAuth) => api.post('api/authenticate', userAuth);
  const register = (user) => api.post('api/register', user);
  const forgotPassword = (data) =>
    api.post('api/account/reset-password/init', data, {
      headers: { 'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*' },
    });

  const getAccount = () => api.get('api/account');
  const updateAccount = (account) => api.post('api/account', account);
  const changePassword = (currentPassword, newPassword) =>
    api.post(
      'api/account/change-password',
      { currentPassword, newPassword },
      { headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/plain, */*' } },
    );

  const getUser = (userId) => api.get('api/users/' + userId);
  const getAllUsers = (options) => api.get('api/users', options);
  const createUser = (user) => api.post('api/users', user);
  const updateUser = (user) => api.put('api/users', user);
  const deleteUser = (userId) => api.delete('api/users/' + userId);

  const getProject = (projectId) => api.get('api/projects/' + projectId);
  const getAllProjects = (options) => api.get('api/projects', options);
  const createProject = (project) => api.post('api/projects', project);
  const updateProject = (project) => api.put(`api/projects/${project.id}`, project);
  const deleteProject = (projectId) => api.delete('api/projects/' + projectId);

  const getLabel = (labelId) => api.get('api/labels/' + labelId);
  const getAllLabels = (options) => api.get('api/labels', options);
  const createLabel = (label) => api.post('api/labels', label);
  const updateLabel = (label) => api.put(`api/labels/${label.id}`, label);
  const deleteLabel = (labelId) => api.delete('api/labels/' + labelId);

  const getTicket = (ticketId) => api.get('api/tickets/' + ticketId);
  const getAllTickets = (options) => api.get('api/tickets', options);
  const createTicket = (ticket) => api.post('api/tickets', ticket);
  const updateTicket = (ticket) => api.put(`api/tickets/${ticket.id}`, ticket);
  const deleteTicket = (ticketId) => api.delete('api/tickets/' + ticketId);

  const getAttachment = (attachmentId) => api.get('api/attachments/' + attachmentId);
  const getAllAttachments = (options) => api.get('api/attachments', options);
  const createAttachment = (attachment) => api.post('api/attachments', attachment);
  const updateAttachment = (attachment) => api.put(`api/attachments/${attachment.id}`, attachment);
  const deleteAttachment = (attachmentId) => api.delete('api/attachments/' + attachmentId);

  const getComment = (commentId) => api.get('api/comments/' + commentId);
  const getAllComments = (options) => api.get('api/comments', options);
  const createComment = (comment) => api.post('api/comments', comment);
  const updateComment = (comment) => api.put(`api/comments/${comment.id}`, comment);
  const deleteComment = (commentId) => api.delete('api/comments/' + commentId);
  // jhipster-react-native-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    createUser,
    updateUser,
    getAllUsers,
    getUser,
    deleteUser,

    createProject,
    updateProject,
    getAllProjects,
    getProject,
    deleteProject,

    createLabel,
    updateLabel,
    getAllLabels,
    getLabel,
    deleteLabel,

    createTicket,
    updateTicket,
    getAllTickets,
    getTicket,
    deleteTicket,

    createAttachment,
    updateAttachment,
    getAllAttachments,
    getAttachment,
    deleteAttachment,

    createComment,
    updateComment,
    getAllComments,
    getComment,
    deleteComment,
    // jhipster-react-native-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword,
  };
};

// let's return back our create method as the default.
export default {
  create,
};
