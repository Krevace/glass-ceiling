const User = require('../models/User');

exports.fetchStats = async (req, res) => {
    const users = await User.find({'stats.company': req.params.id}).exec();
    console.log(users);
    if (users.length == 0) {
        res.redirect('/');
        return;
    }

    let salaries = {
        male: { totalSalary: 0, count: 0 },
        female: { totalSalary: 0, count: 0 },
        'non-binary': { totalSalary: 0, count: 0 },
        other: { totalSalary: 0, count: 0 }
    };
    
    users.forEach(user => {
        let gender = user.stats.gender;
        switch (gender) {
            case 'male':
            case 'female':
            case 'non-binary':
            case 'other':
                salaries[gender].totalSalary += user.stats.salary;
                salaries[gender].count++;
                break;
            default:
                break;
        }
    });
    
    let salaryData = Object.keys(salaries).map(key => {
        let { totalSalary, count } = salaries[key];
        return {
            gender: key[0].toUpperCase() + key.substring(1, key.length),
            averageSalary: count > 0 ? totalSalary / count : 0 
        };
    });
    
    res.render('company', {
        title: req.params.id,
        salaries: salaryData
    });
  };