const mongoose = require('mongoose');
const app = require('./app');
const config = require("./config");
const fetchInterval = require('./interval');
const port = config.port;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../doc.json');
const { rpcMainnet } = require('./config');

app.use(
  '/docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);


mongoose.connect(config.mongooseURL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Connected to MongoDB');
    server = app.listen(port, () => {
      console.log(`Listening to port ${port}`);
      fetchInterval();
    });
  })
  .catch(err => {
    console.log("err: ", err)
  })
