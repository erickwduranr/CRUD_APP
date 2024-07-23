// backend/routes/users.js   ERICK DURAN
const router = require('express').Router();
let User = require('../models/user.model');

// Crear un nuevo usuario
router.route('/add').post((req, res) => {
  const newUser = new User(req.body);

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Leer todos los usuarios
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Leer un usuario por ID
router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Actualizar un usuario por ID
router.route('/update/:id').post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.password;

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Eliminar un usuario por ID
router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
