const tokenUser = (user) => {
  return {
    username: user.username,
    userId: user._id,
    email: user.email,
    age: user.age,
    role: user.role,
    approval_status: user.approval_status,
  };
};

module.exports = tokenUser;
