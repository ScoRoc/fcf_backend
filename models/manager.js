const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const managerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 99
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 99,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 99
  }
});

managerSchema.methods.authenticated = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, res) {
    err ? cb(err) : cb(null, res ? this : false);
    // if (err) {
    //   console.log(err)
    //   cb(err)
    // } else {
    //   cb(null, res ? this : false)
    // }
  });
}

managerSchema.pre('save', function(next) {
  if (this.isNew) {
    let hash = bcrypt.hashSync(this.password, 10);
    this.password = hash;
  }
  next();
});

managerSchema.set('toJSON', {
  transform: (doc, returned, options) => {
    const returnObject = {...returned};
    delete returnObject.password;
    return returnObject;
  }
});

managerSchema.set('toObject', {
  transform: (doc, returned, options) => {
    const returnObject = {...returned};
    delete returnObject.password;
    return returnObject;
  }
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;
