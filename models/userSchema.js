const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({ 
  username: {
    type: String,
    unique: true,
    required: true    
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true
  }, 
  roles:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Role' }],
  profileInfo: {
    firstName: String,
    lastName: String,
    phone: String,
    // Add additional profile fields as necessary
  },
  tenantId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tenant',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.index({ email: 1, tenantId: 1 }, { unique: true });

// Pre-save hook to hash password before saving if it's new or has been changed
userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password for authentication
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
