const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { getItem, setItem } = require('../config/edgeDb');

const SALT_ROUNDS = 6;

async function getUsers() {
  return (await getItem('users')) || [];
}

const User = {
  async create({ name, email, password }) {
    const users = await getUsers();
    const normalizedEmail = email.toLowerCase().trim();
    if (users.find(u => u.email === normalizedEmail)) {
      const err = new Error('Email already in use');
      err.code = 11000;
      throw err;
    }
    const hashed = await bcrypt.hash(password, SALT_ROUNDS);
    const user = {
      _id: uuidv4(),
      name,
      email: normalizedEmail,
      password: hashed,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await setItem('users', users);
    const { password: _, ...safeUser } = user;
    return safeUser;
  },

  async findOne({ email }) {
    const users = await getUsers();
    return users.find(u => u.email === email.toLowerCase().trim()) || null;
  },
};

module.exports = User;
