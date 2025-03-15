const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;

const sequelize = new Sequelize('midterm-exam', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false 
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false 
});

//sync the model with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database & tables synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

//define the /users route
app.get('/users', async (req, res) => {
  try {
    //fetch all users from the database
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

//start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});