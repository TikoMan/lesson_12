// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).send({
    status: 'error',
    message: err.message,
    error: err.errors,
    stack: process.env.NODE_MODULES !== 'production' ? err.stack : undefined,
  });
};

export default errorHandler;
