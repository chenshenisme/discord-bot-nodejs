const mongoose = require('mongoose');
const config = require('./config');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL || config.mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    username: String,
    cash: {
      type: Number,
      default: 1000,
    },
    bank: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Transaction Schema
const transactionSchema = new mongoose.Schema(
  {
    fromUserId: String,
    toUserId: String,
    amount: Number,
    type: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

// Get or create user
async function getUser(userId, username) {
  let user = await User.findOne({ userId });
  if (!user) {
    user = new User({
      userId,
      username,
      cash: 1000,
      bank: 0,
    });
    await user.save();
  }
  return user;
}

// Add cash to user
async function addCash(userId, amount) {
  await User.findOneAndUpdate(
    { userId },
    { $inc: { cash: amount } },
    { new: true }
  );
}

// Remove cash from user
async function removeCash(userId, amount) {
  await User.findOneAndUpdate(
    { userId },
    { $inc: { cash: -amount } },
    { new: true }
  );
}

// Set cash
async function setCash(userId, amount) {
  await User.findOneAndUpdate({ userId }, { cash: amount }, { new: true });
}

// Add bank money
async function addBank(userId, amount) {
  await User.findOneAndUpdate(
    { userId },
    { $inc: { bank: amount } },
    { new: true }
  );
}

// Remove bank money
async function removeBank(userId, amount) {
  await User.findOneAndUpdate(
    { userId },
    { $inc: { bank: -amount } },
    { new: true }
  );
}

// Transfer money
async function transfer(fromUserId, toUserId, amount, type = 'transfer') {
  try {
    await User.findOneAndUpdate(
      { userId: fromUserId },
      { $inc: { cash: -amount } },
      { new: true }
    );

    await User.findOneAndUpdate(
      { userId: toUserId },
      { $inc: { cash: amount } },
      { new: true }
    );

    await Transaction.create({
      fromUserId,
      toUserId,
      amount,
      type,
    });
  } catch (error) {
    console.error('Transfer error:', error);
    throw error;
  }
}

// Get leaderboard
async function getLeaderboard(limit = 10) {
  const users = await User.find()
    .sort({ cash: -1, bank: -1 })
    .limit(limit)
    .lean();

  return users.map(user => ({
    userId: user.userId,
    username: user.username,
    cash: user.cash,
    bank: user.bank,
    total: user.cash + user.bank,
  }));
}

module.exports = {
  User,
  Transaction,
  getUser,
  addCash,
  removeCash,
  setCash,
  addBank,
  removeBank,
  transfer,
  getLeaderboard,
};
