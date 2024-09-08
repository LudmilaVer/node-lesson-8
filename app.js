import express from 'express';
import sequelize from './config/db.js';

const app = express();
app.use(express.json());

app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    console.log('Server running on http://localhost:3000');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
