const User = require('../models/User');
var _ = require("lodash")

/**
 * GET /
 * Home page.
 */
exports.index = async (req, res) => {
  const users = await User.find({}).exec();
  res.render('home', {
    title: 'Home',
    users: users
  });
};

exports.form = async (req, res) => {
  res.redirect('/company/'+_.startCase((req.body.search).toLowerCase()))

  /*
  let user = new User(req.body);
  user.stats.salary = req.body.salary;
  user.stats.company = req.body.company;
  await user.save();
  res.redirect('back');
  */
}
