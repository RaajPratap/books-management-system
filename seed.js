const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');
const User = require('./models/User');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    await Book.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    const user = await User.create({
      username: 'raj',
      email: 'dev@raj.codes',
      password: 'password1223'
    });
    console.log('Created user:', user.username);

    const books = [
      { title: 'Clean Code', author: 'Robert C. Martin', year: 2008, user: user._id },
      { title: 'The Pragmatic Programmer', author: 'David Thomas', year: 1999, user: user._id },
      { title: 'Design Patterns', author: 'Gang of Four', year: 1994, user: user._id },
      { title: 'Introduction to Algorithms', author: 'Thomas Cormen', year: 2009, user: user._id },
      { title: 'Structure and Interpretation', author: 'Harold Abelson', year: 1985, user: user._id }
    ];

    await Book.insertMany(books);
    console.log('Seeded 5 books');

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
