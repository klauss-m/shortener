import express, { response } from 'express';
import crypto from 'crypto';

const app = express();
const PORT = 3000;
const users = [
  {
    id: crypto.randomUUID(),
    name: 'Fujiwara Takumi',
    email: 'takumi@gmail.com',
  },
];

app.use(express.json());

app.get('/api/user', (req, res) => {
  res.send(users);
});

app.get('/api/user/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === id);
  if (user) {
    return res.send({ user });
  }
  res.status(404).send({ message: 'User not found!' });
});

app.post('/api/user', (req, res) => {
  const { name, email } = req.body;
  const user = { id: crypto.randomUUID(), name, email };

  users.push(user);

  res.send(user);
});

app.put('/api/user/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const user = users.find((user) => user.id === id);

  if (user) {
    user.name = name;
    user.email = email;

    return res.send({ user });
  }
  return res.status(404).send({ message: 'User not found!' });
});

app.delete('/api/user/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex < 0) {
    return res.status(404).send('User not found!');
  }

  users.splice(userIndex, 1);
  return res.send('User successfully deleted!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
