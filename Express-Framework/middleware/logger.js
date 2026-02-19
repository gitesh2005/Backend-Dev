module.exports = function (req, res, next) {

  const start = Date.now();

  res.on("finish", () => {
    const end = Date.now();
    console.log(`${req.method} ${req.url} -> ${end - start}ms`);
  });

  next();
};
