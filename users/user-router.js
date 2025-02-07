const express = require('express');

const db = require('../data/db-config.js');
const Users = require('./user-model');

const router = express.Router();

router.get('/', async (req, res) => {
 try {
  //   const users = await db('users');
  const users = await Users.find();
  res.json(users);
 } catch (err) {
  res.status(500).json({ message: 'Failed to get users' });
 }
});

router.get('/:id', async (req, res) => {
 const { id } = req.params;

 try {
  const [user] = await Users.findById({ id }); //  object in arr
  //   const user = await Users.findById({ id }); //  object in arr // return first() in db model

  if (user) {
   res.json(user);
  } else {
   res.status(404).json({ message: 'Could not find user with given id.' });
  }
 } catch (err) {
  res.status(500).json({ message: 'Failed to get user' });
 }
});

router.post('/', async (req, res) => {
 const userData = req.body;

 try {
  //   const [id] = await db('users').insert(userData);
  const newUser = await Users.add(userData);
  res.status(201).json(newUser);
 } catch (err) {
  res.status(500).json({ message: 'Failed to create new user' });
 }
});

router.put('/:id', async (req, res) => {
 const { id } = req.params;
 const changes = req.body;

 try {
  const count = await db('users')
   .where({ id })
   .update(changes);

  if (count) {
   res.json({ update: count });
  } else {
   res.status(404).json({ message: 'Could not find user with given id' });
  }
 } catch (err) {
  res.status(500).json({ message: 'Failed to update user' });
 }
});

router.delete('/:id', async (req, res) => {
 const { id } = req.params;

 try {
  const count = await db('users')
   .where({ id })
   .del();

  if (count) {
   res.json({ removed: count });
  } else {
   res.status(404).json({ message: 'Could not find user with given id' });
  }
 } catch (err) {
  res.status(500).json({ message: 'Failed to delete user' });
 }
});

router.get('/:id/posts', async (req, res) => {
 const { id } = req.params;

 try {
  // const posts = await db('posts').where ({id})
  const posts = await Users.findPosts(id);
  //    .join('users as u', 'u.id', 'p.user_id')
  //    .select('p.id', 'u.username', 'p.contents') // to get username
  //    .where({ user_id: id });
  //   const posts = await db('posts')
  //    .where({ user_id: id });
  res.json(posts);
 } catch (err) {
  res.status(500).json({ message: 'failed to get posts' });
 }
});

module.exports = router;
