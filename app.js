const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Use middleware to parse JSON requests
app.use(bodyParser.json());

// Sample data (replace with your own database)
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
];

// Endpoints for CRUD operations on the resource (items)

// GET all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET a single item by ID
app.get('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = items.find((item) => item.id === id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// POST a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  if (newItem && newItem.name) {
    newItem.id = items.length + 1;
    items.push(newItem);
    res.status(201).json(newItem);
  } else {
    res.status(400).json({ message: 'Invalid item data' });
  }
});

// PUT (update) an item by ID
app.put('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = items.findIndex((item) => item.id === id);

  if (index !== -1 && updatedItem && updatedItem.name) {
    items[index] = { ...items[index], ...updatedItem };
    res.json(items[index]);
  } else {
    res.status(404).json({ message: 'Item not found or invalid data' });
  }
});

// DELETE an item by ID
app.delete('/items/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = items.findIndex((item) => item.id === id);

  if (index !== -1) {
    const deletedItem = items.splice(index, 1)[0];
    res.json(deletedItem);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


/*
Test Your REST API

You can use tools like curl, Postman, or a web browser to test your REST API. Here are some example requests:

GET all items: http://localhost:3000/items
GET a single item by ID: http://localhost:3000/items/1
POST a new item (with JSON data in the request body): POST http://localhost:3000/items
Body: { "name": "New Item" }
PUT (update) an item by ID (with JSON data in the request body): PUT http://localhost:3000/items/1
Body: { "name": "Updated Item" }
DELETE an item by ID: DELETE http://localhost:3000/items/1
These are the basic CRUD operations for your simple RESTful API using Express.js. 

GET all items:
curl http://localhost:3000/items
GET a single item by ID (replace 1 with the desired item ID):
curl http://localhost:3000/items/1
POST a new item (with JSON data in the request body):
curl -X POST -H "Content-Type: application/json" -d '{"name": "New Item"}' http://localhost:3000/items
PUT (update) an item by ID (replace 1 with the desired item ID and provide JSON data in the request body):
curl -X PUT -H "Content-Type: application/json" -d '{"name": "Updated Item"}' http://localhost:3000/items/1
DELETE an item by ID (replace 1 with the desired item ID):
curl -X DELETE http://localhost:3000/items/1
 
*/