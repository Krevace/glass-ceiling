const User = require('../models/User');
var _ = require('lodash');

exports.fetchStats = async (req, res) => {
    const users = await User.find({'stats.company': req.params.id}).exec();
    if (users.length == 0) {
        req.flash('info', { msg: 'Company not found, sorry!' });
        return res.redirect('/');;
    }

    let positionSalaries = [];

    users.forEach(user => {
        let { position, gender, salary } = user.stats;
        if (gender === 'non-binary') gender = 'other';
    
        let positionData = positionSalaries.find(p => p.position === position);
        if (!positionData) {
            positionData = {
                position: position,
                salaries: {
                    male: { totalSalary: 0, count: 0 },
                    female: { totalSalary: 0, count: 0 },
                    other: { totalSalary: 0, count: 0 }
                }
            };
            positionSalaries.push(positionData);
        }
    
        let salaryData = positionData.salaries[gender];
        salaryData.totalSalary += salary;
        salaryData.count++;
    });

    let positionAverageSalaries = positionSalaries.map(({ position, salaries }) => {
        let averages = Object.keys(salaries).map(gender => {
            let { totalSalary, count } = salaries[gender];
            return {
                gender: _.startCase(gender),
                averageSalary: count > 0 ? totalSalary / count : 0
            };
        });
        position = _.startCase(position);
        return { position, averages };
    });
    
    res.render('company', {
        title: _.startCase(req.params.id),
        salaries: positionAverageSalaries
    });
  };

exports.invalid = async (req, res) => {
    res.redirect('/');
}