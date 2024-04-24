// Fetch genres data from your Express API
async function fetchGenresData() {
  try {
    const response = await fetch('/genres');
    const data = await response.json();
    // Update the HTML content to display genres data
    // Example: display genres in a list
    const genresList = data.map(genre => `<li>${genre.name}</li>`).join('');
    document.getElementById('genres-list').innerHTML = genresList;
  } catch (error) {
    console.error('Error fetching genres data:', error);
  }
}

// Fetch books data from your Express API
async function fetchBooksData() {
  try {
    const response = await fetch('/books');
    const data = await response.json();
    // Update the HTML content to display books data
    // Example: display books in a table
    const booksTable = `
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody id="books-list">
          ${data.map(book => `
            <tr>
              <td>${book.title}</td>
              <td>${book.author.name}</td>
              <td>${book.genre.name}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
    document.getElementById('books').innerHTML = booksTable;
  } catch (error) {
    console.error('Error fetching books data:', error);
  }
}

// Fetch authors data from your Express API
async function fetchAuthorsData() {
  try {
    const response = await fetch('/authors');
    const data = await response.json();
    // Update the HTML content to display authors data
    // Example: display authors in a list
    const authorsList = data.map(author => `<li>${author.name}</li>`).join('');
    document.getElementById('authors-list').innerHTML = authorsList;
  } catch (error) {
    console.error('Error fetching authors data:', error);
  }
}

// Function to fetch weather data
async function searchWeather() {
  try {
    const city = document.getElementById('cityInput').value;
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    // Check if the response contains the required weather data
    if (data && data.temp !== undefined && data.humidity !== undefined && data.wind_speed !== undefined) {
      const { temp, humidity, wind_speed } = data;
      const weatherInfo = `Temperature: ${temp}°C, Humidity: ${humidity}%, Wind Speed: ${wind_speed} m/s`;
      document.getElementById('weather-info').innerText = weatherInfo;
    } else {
      // Handle case where weather data is missing or incomplete
      document.getElementById('weather-info').innerText = 'Weather data not available';
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Function to fetch JWT token from the server and display it
async function displayToken() {
  try {
    const response = await fetch('/protected', {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
    if (response.ok) {
      const data = await response.json();
      document.getElementById('jwt-token').textContent = `JWT Token: ${data.token}`;
    } else {
      console.error('Failed to fetch JWT token:', response.status);
    }
  } catch (error) {
    console.error('Error fetching JWT token:', error);
  }
}

// Call functions to fetch data and display JWT token when the page loads
window.onload = () => {
  fetchGenresData();
  fetchBooksData();
  fetchAuthorsData();
  searchWeather();
  displayToken(); // Call the function to display JWT token
};
