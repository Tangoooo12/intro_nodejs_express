const express = require('express');
const app = express();
const port = 1649; 
const items = ['Apple', 'Banana', 'Orange'];

app.get('/items', (req, res) => {
    res.json(items)
})

// Serve static files from the "public" directory
app.use(express.static('public'));

// Define a route for the home page (optional)
app.get('/about', (req, res) => {
    res.send('About Us');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

app.use(express.json()); //Middleware to parse JSON bodies

app.post('/submit', (req, res) => {
    const data = req.body;
    res.send(`Received: ${JSON.stringify(data)}`);
});

app.post('/items', (req, res) => {
    const newItem = req.body.item;
    items.push(newItem);
    res.json(items);
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});