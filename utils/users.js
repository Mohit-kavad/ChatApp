const users = [];

function userjoin(id, username, room) {
  const user = { id, username, room };
  console.log("user object", user);
  return users.push(user);
}

// get current user

function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

module.exports = {
  userjoin,
  getCurrentUser,
};
