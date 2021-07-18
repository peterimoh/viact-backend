exports.autheticationMiddleware=()=> {
  return (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/");
  };
}


exports.usersAuthRoutes=(app)=>(paths, autheticationMiddleware, routes)=>{
  return app.get(paths, autheticationMiddleware(), routes)
  
}
