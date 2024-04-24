const express = require('express');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// GET all authors
app.get('/authors', async (req, res) => {
  try {
    const authors = await prisma.author.findMany();
    res.json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new author
app.post('/authors', async (req, res) => {
  const { name } = req.body;
  try {
    const newAuthor = await prisma.author.create({
      data: {
        name,
      },
    });
    res.json(newAuthor);
  } catch (error) {
    console.error('Error creating author:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all genres
app.get('/genres', async (req, res) => {
  try {
    const genres = await prisma.genre.findMany();
    res.json(genres);
  } catch (error) {
    console.error('Error fetching genres:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new genre
app.post('/genres', async (req, res) => {
  const { name } = req.body;
  try {
    const newGenre = await prisma.genre.create({
      data: {
        name,
      },
    });
    res.json(newGenre);
  } catch (error) {
    console.error('Error creating genre:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all books
app.get('/books', async (req, res) => {
  try {
    const books = await prisma.book.findMany({
      include: {
        author: true,
        genre: true,
      },
    });
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new book
app.post('/books', async (req, res) => {
  const { title, authorId, genreId } = req.body;
  try {
    const newBook = await prisma.book.create({
      data: {
        title,
        author: { connect: { id: authorId } },
        genre: { connect: { id: genreId } },
      },
      include: {
        author: true,
        genre: true,
      },
    });
    res.json(newBook);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}); 


// Route to fetch weather data from the third-party weather API
app.get('/weather', async (req, res) => {
  const city = req.query.city || 'Seattle'; // Default city is Seattle if not provided
  const options = {
    method: 'GET',
    url: 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather',
    params: { city },
    headers: {
      'X-RapidAPI-Key': '619653c978msh46b308d9cca36ebp1149f5jsn44541456f9aa',
      'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
  };

  try {
    // Make a GET request to the third-party weather API
    const response = await axios.request(options);
    // Extract the required weather data fields
    const { temp, humidity, wind_speed } = response.data;
    // Construct the response object with the extracted information
    const weatherData = {
      temp,
      humidity,
      wind_speed
    };
    // Send the weather data as the response
    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  

   
  

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});
