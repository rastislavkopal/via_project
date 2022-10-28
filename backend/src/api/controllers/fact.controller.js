const httpStatus = require('http-status');
const Fact = require('../models/fact.model');

/**
 * Load fact and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const fact = await Fact.get(id);
    req.locals = { fact };
    return next();
  } catch (error) {
    return next(error);
  }
};

/**
 * Get fact
 * @public
 */
exports.get = (req, res) => res.json(req.locals.fact.transform());

/**
 * Create new fact
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const fact = new Fact(req.body);
    fact.userId = req.user._id;
    const savedFact = await fact.save();
    res.status(httpStatus.CREATED);
    res.json(savedFact.transform());
  } catch (error) {
    next();
  }
};

/**
 * Get fact list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const facts = await Fact.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .exec();
    const transformedFacts = facts.map((fact) => fact.transform());
    res.json(transformedFacts);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete fact
 * @public
 */
exports.remove = (req, res, next) => {
  const { fact } = req.locals;

  fact.remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch((e) => next(e));
};
