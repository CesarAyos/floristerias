const helpers = {};

helpers.encryptPassword = async (password) => {
  return password;
};

helpers.matchPassword = async (password, savedPassword) => {
  try {
    return password === savedPassword;
  } catch (e) {
    console.log(e)
  }
};


module.exports = helpers;