const corsMiddleware = (req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next(req, res);
};

module.exports = { corsMiddleware };
