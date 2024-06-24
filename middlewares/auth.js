const { getUser } = require("../services/auth");


function checkAuth(req, res, next) {  

  const tokenCookie = req.cookies.uid;
  req.user = null

  if(!tokenCookie)return next();

  const user = getUser(tokenCookie);
  req.user = user;
  next();

}
  
function restrictTo(roles = []){

  return function(req, res, next) {
    if(!req.user) return res.redirect("/login");

    if(!roles.includes(req.user.role)) return res.status(403).json({message: "You are not allowed to access this route!"});

   return next();


}
}

module.exports = {
  checkAuth,
  restrictTo,
};