import jwt from 'jsonwebtoken';
import HttpError from 'http-errors';

const { JWT_SECRET } = process.env;

const EXCLUDE = [
  '/login',
  'register',
];

const authorization = (req, res, next) => {
  try {
    if (!EXCLUDE.includes(req.path) || req.method === 'OPTIONS') {
      next();
      return;
    }

    const { authorization: token } = req.headers;
    const { id } = jwt.verify(token, JWT_SECRET);

    if (!id) {
      HttpError(401);
    }

    req.id = id;
    next();
  } catch (e) {
    e.status = 401;
    next(e);
  }
};

export default authorization;
