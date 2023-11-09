const allowOrigins = ['http://localhost:3000'];

export default function cors(req, res, next) {
  try {
    const { origin } = req.headers;
    if (allowOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,OPTIONS,DELETE,PATCH');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type,authorization');
    }
    next();
  } catch (e) {
    next(e);
  }
}
