function validateYear(req, res, next) {
    const { year } = req.body;

    if (year === undefined) return next();

    if (typeof year !== "number" || year < 1500 || year > new Date().getFullYear()) {
        return res.status(400).json({
            message: "Year must be a valid number between 1500 and current year"
        });
    }

    next();
}

module.exports = validateYear;
