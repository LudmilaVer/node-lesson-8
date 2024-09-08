const express = require('express');
const sequelize = require('./config/db');
const BookModel = require('./models/book');

const app = express();
app.use(express.json());  // Позволяет работать с JSON в запросах

// Инициализация модели
const Book = BookModel(sequelize, require('sequelize').DataTypes);

// Проверка подключения к базе данных и запуск сервера
app.listen(3000, async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    console.log('Server running on http://localhost:3000');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});

// Маршрут для корневого пути "/"
app.get('/', (req, res) => {
  res.send('Welcome to the Book API');
});

// Маршрут для получения всех книг
app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Маршрут для создания книги
app.post('/books', async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const newBook = await Book.create({ title, author, year });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// Маршрут для обновления книги по ID
app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, year } = req.body;
    await Book.update({ title, author, year }, { where: { id } });
    res.json({ message: 'Book updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// Маршрут для удаления книги по ID
app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Book.destroy({ where: { id } });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});
