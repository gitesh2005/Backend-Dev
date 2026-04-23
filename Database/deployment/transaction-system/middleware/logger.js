module.exports = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;

    if (process.env.LOG_LEVEL === "debug") {
      console.log(`[DEBUG] ${req.method} ${req.url} - ${duration}ms`);
    } else if (process.env.LOG_LEVEL === "info") {
      console.log(`[INFO] ${req.method} ${req.url}`);
    } else if (process.env.LOG_LEVEL === "error" && res.statusCode >= 400) {
      console.error(`[ERROR] ${req.method} ${req.url}`);
    }
  });

  next();
};