const User = require('../models/User');

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
  res.redirect('/company/'+req.body.search)

  /*
  let user = new User(req.body);
  user.stats.salary = req.body.salary;
  user.stats.company = req.body.company;
  await user.save();
  res.redirect('back');
  */
}
