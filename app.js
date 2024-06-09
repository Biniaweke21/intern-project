require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

pool.on('error', (err) => {
    console.error('Error connecting to PostgreSQL:', err);
    process.exit(1);
});


express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5500; // Use a default port if not specified

app.use(bodyParser.urlencoded({ extended: false }));

// Route for hrauthentication.html (assuming it's in the project's root)
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/HRauthentication.html');
});

// Route to handle login form submission (POST request)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM hrmanagers WHERE username = $1', [username]);

        if (result.rows.length === 0) {
            // Username not found
            return res.status(401).send('Invalid username or password');
        }

        const user = result.rows[0];
        if (password !== user.password) {
            // Incorrect password
            return res.status(401).send('Invalid username or password');
        }

        // Successful login, redirect to hrpage.html
        res.redirect('/HRpage.html'); // Assuming hrpage.html is in the project's root
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).send('Internal Server Error');
    } finally {
        client.release();
    }
});

// Route for hrpage.html (assuming it's in the project's root)
app.get('/hrpage', (req, res) => {
    res.sendFile(__dirname + '/hrpage.html');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });