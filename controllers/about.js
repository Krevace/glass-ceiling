/**
 * GET /contact
 * Contact form page.
 */
exports.getAbout = (req, res) => {
  const unknownUser = !(req.user);

  res.render('about', {
    title: 'About',
    sitekey: process.env.RECAPTCHA_SITE_KEY,
    unknownUser,
  });
};
