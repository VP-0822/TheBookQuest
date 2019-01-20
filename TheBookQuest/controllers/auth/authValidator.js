function authValidator () {
    return function (req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      }
      res.redirect('/users/login');
    }
  }
  
  function isLoggedOut(){
    return function (req, res, next) {
      if (!req.isAuthenticated()) {
        return next()
      }
      res.redirect('/welcome');
  }
}
  module.exports = {authValidator: authValidator, isLoggedOut: isLoggedOut}