

// const mongoose = require('mongoose');

// mongoose
//   .connect('mongodb://localhost:27017/miniDB')
//   .then(() => {
//     console.log('DB is connected');
//   })
//   .catch(e => {
//     console.log(e);
//   });

// module.exports = mongoose;



const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('DB is connected');
  })
  .catch(e => {
    console.log(e);
  });

module.exports = mongoose;

