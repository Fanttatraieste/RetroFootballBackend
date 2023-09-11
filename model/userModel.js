const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user needs an name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: [true, 'A user needs to have a unique email'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  role: {
    type: String,
    enum: ['admin', 'plebeu'],
    default: 'plebeu',
  },
  password: {
    type: String,
    required: [true, 'A user needs a password'],
    minlength: 12,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'A user needs a password'],
    minlength: 12,
    validate: {
      // this only works on save
      validator: function (el) {
        return el === this.password;
      },
    },
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  // this.email = await bcrypt.hash(this.email, 18);

  this.password = await bcrypt.hash(this.password, 18);

  this.passwordConfirm = undefined;
  next();
});

// instance methods
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// userSchema.methods.correctEmail = async function (candidateEmail, userEmail) {
//   return await bcrypt.compare(candidateEmail, userEmail);
// };

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  // console.log(JWTTimestamp, this.passwordChangedAt);

  if (this.passwordChangedAt) {
    const changedTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );

    // console.log(
    //   parseInt(this.passwordChangedAt.getTime() / 1000, 10),
    //   JWTTimestamp,
    // );

    return JWTTimestamp < changedTimeStamp;
  }

  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // expira in 10 minute

  console.log({ resetToken }, this.passwordResetToken);

  return resetToken;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
