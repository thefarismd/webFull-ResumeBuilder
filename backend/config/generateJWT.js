import jwt from 'jsonwebtoken';

function generateJWT(id) {
  const payload = { id };
  const secretKey = process.env.SECRET_KEY;
  const options = { expiresIn: '15m' };

  const token = jwt.sign(payload, secretKey, options);

  return token;
}

export default generateJWT;
