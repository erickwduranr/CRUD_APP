const cluster = require('cluster');
const os = require('os');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');

const PORT = process.env.PORT || 5000;

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running`);

  // Crear un proceso hijo para cada núcleo de CPU
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork(); // Reiniciar el proceso hijo que ha fallado
  });

} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  const app = express();

  // Middleware
  app.use(cors());
  app.use(bodyParser.json());
  app.use('/users', usersRouter);

  // Conectar a MongoDB
  mongoose.connect('mongodb://localhost:27017/merncrud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;
  connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
  });

  // Iniciar el servidor
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} is running on port ${PORT}`);
  });
}
