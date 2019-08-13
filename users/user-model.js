const db = require('../data/db-config');

module.exports = {
 find,
 findById,
 findPosts,
 add,
 updateUser,
 remove,
};

function find() {
 return db('users');
}

function findById(id) {
 return db('users')
  .where({ id })
  .first(); // if not destructured
}

function findPosts(user_id) {
 //  console.log({ user_id: user_id });
 return db('posts as p')
  .join('users as u', 'u.id', 'p.user_id')
  .select('p.id', 'u.username', 'p.contents')
  .where({ user_id });
}

async function add(user) {
 const [id] = await db('users').insert(user);
 return findById(id);
}

function remove(id) {
 return db('users')
  .where({ id })
  .del();
}

function updateUser(id, user) {
 return db('users')
  .update(user)
  .where({ id });
}
