export default {
  // Functions return fixtures

  // entity fixtures
  updateProject: (project) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-project.json'),
    };
  },
  getAllProjects: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-projects.json'),
    };
  },
  getProject: (projectId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-project.json'),
    };
  },
  deleteProject: (projectId) => {
    return {
      ok: true,
    };
  },
  updateLabel: (label) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-label.json'),
    };
  },
  getAllLabels: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-labels.json'),
    };
  },
  getLabel: (labelId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-label.json'),
    };
  },
  deleteLabel: (labelId) => {
    return {
      ok: true,
    };
  },
  updateTicket: (ticket) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-ticket.json'),
    };
  },
  getAllTickets: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-tickets.json'),
    };
  },
  getTicket: (ticketId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-ticket.json'),
    };
  },
  deleteTicket: (ticketId) => {
    return {
      ok: true,
    };
  },
  updateAttachment: (attachment) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-attachment.json'),
    };
  },
  getAllAttachments: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-attachments.json'),
    };
  },
  getAttachment: (attachmentId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-attachment.json'),
    };
  },
  deleteAttachment: (attachmentId) => {
    return {
      ok: true,
    };
  },
  updateComment: (comment) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/update-comment.json'),
    };
  },
  getAllComments: () => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-all-comments.json'),
    };
  },
  getComment: (commentId) => {
    return {
      ok: true,
      data: require('../../shared/fixtures/get-comment.json'),
    };
  },
  deleteComment: (commentId) => {
    return {
      ok: true,
    };
  },
  // jhipster-react-native-api-fixture-needle

  // user fixtures
  updateUser: (user) => {
    return {
      ok: true,
      data: require('../fixtures/update-user.json'),
    };
  },
  getAllUsers: () => {
    return {
      ok: true,
      data: require('../fixtures/get-users.json'),
    };
  },
  getUser: (userId) => {
    return {
      ok: true,
      data: require('../fixtures/get-user.json'),
    };
  },
  deleteUser: (userId) => {
    return {
      ok: true,
    };
  },
  // auth fixtures
  setAuthToken: () => {},
  removeAuthToken: () => {},
  login: (authObj) => {
    if (authObj.username === 'user' && authObj.password === 'user') {
      return {
        ok: true,
        data: require('../fixtures/login.json'),
      };
    } else {
      return {
        ok: false,
        status: 400,
        data: 'Invalid credentials',
      };
    }
  },
  register: ({ user }) => {
    if (user === 'user') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: {
          title: 'Invalid email',
        },
      };
    }
  },
  forgotPassword: ({ email }) => {
    if (email === 'valid@gmail.com') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Invalid email',
      };
    }
  },
  getAccount: () => {
    return {
      ok: true,
      status: 200,
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      data: require('../fixtures/get-account.json'),
    };
  },
  updateAccount: () => {
    return {
      ok: true,
    };
  },
  changePassword: ({ currentPassword }) => {
    if (currentPassword === 'valid-password') {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        data: 'Password error',
      };
    }
  },
};
