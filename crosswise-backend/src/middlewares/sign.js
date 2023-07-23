const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
  // Get token from header
  const authorization = req.header('Authorization');

  // Check if not token
  if (!authorization) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  
  const token = authorization.split(' ')[1];
  try {
    jwt.verify(token, config.secretKey, (error, decoded) => {
      if (error) {
        console.log(error);
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        if( decoded.address === req.params.address ) {
          next();
        } else {
          return res.status(401).json({ msg: 'Token is not valid' });
        }
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
};
