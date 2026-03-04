 import express from 'express'
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
const mockUsers = [
{ id: 1, name: "Alice" },
{ id: 2, name: "Bob" },
{ id: 3, name: "Charlie" }
];
app.get('/', (request, response) => {
response.status(200).json({ message: "Hey! This is a test message." });
});
app.get('/api/users', (request, response) => {

response.status(200).json(mockUsers);
});
app.get('/api/products', (request, response) => {
const products = [
{ id: 1, name: "Laptop", price: 999.99 },
{ id: 2, name: "Mouse", price: 29.99 },
{ id: 3, name: "Keyboard", price: 79.99 }
];
response.status(200).json(products);
});
app.get("/api/users/:id", (request, response) => {
const parsedUser = parseInt(request.params.id);
//console.log ();
if (isNaN(parsedUser)) {
return response.status(400).json({ error: "Invalid user ID" });
}
const findUser = mockUsers.find(user => user.id === parsedUser);
if (!findUser) {
return response.status(404).json({ error: "User not found" });
}
response.status(200).json(findUser);
});
