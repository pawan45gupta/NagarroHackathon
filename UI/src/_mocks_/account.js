// ----------------------------------------------------------------------

const account = {
  displayName: (sessionStorage && `${JSON.parse(sessionStorage.getItem('user'))?.firstName} ${JSON.parse(sessionStorage.getItem('user'))?.lastName}`) || 'Admin',
  email: 'demo@minimals.cc',
  photoURL: '/static/mock-images/avatars/avatar_default.jpg'
};

export default account;
