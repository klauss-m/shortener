import crypto from 'crypto';
import { users } from '../model/UserModel.js';

const Controller = {
  index: (req, res) => {
    res.send(users);
  },
  getOne: (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === id);
    if (user) {
      return res.send({ user });
    }
    res.status(404).send({ message: 'User not found!' });
  },
  store: (req, res) => {
    const { name, email } = req.body;
    const user = { id: crypto.randomUUID(), name, email };

    users.push(user);

    res.send(user);
  },
  update: (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = users.find((user) => user.id === id);

    if (user) {
      user.name = name;
      user.email = email;

      return res.send({ user });
    }
    return res.status(404).send({ message: 'User not found!' });
  },
  remove: (req, res) => {
    const { id } = req.params;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
      return res.status(404).send('User not found!');
    }

    users.splice(userIndex, 1);
    return res.send('User successfully deleted!');
  },
};

export default Controller;
