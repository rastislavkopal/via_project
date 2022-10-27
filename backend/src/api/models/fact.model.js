const mongoose = require('mongoose');
const httpStatus = require('http-status');
// const { omitBy, isNil } = require('lodash');
const APIError = require('../errors/api-error');

/**
* animals
*/
const animals = ['dog', 'cat', 'other'];

/**
 * Animal fact Schema
 * @private
 */
const factSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  text: {
    type: String,
    maxlength: 16448,
  },
  animal: {
    type: String,
    enum: animals,
    default: 'dog',
  },
}, {
  timestamps: true,
});

/**
 * Methods
 */
factSchema.method({
  transform() {
    const transformed = {};
    const fields = ['_id', 'userId', 'text', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },
});

/**
 * Statics
 */
factSchema.statics = {

  /**
   * Get Fact
   *
   * @param {ObjectId} id - The objectId of fact.
   * @returns {Promise<Fact, APIError>}
   */
  async get(id) {
    let inv;

    if (mongoose.Types.ObjectId.isValid(id)) {
      inv = await this.findById(id).exec();
    }
    if (inv) {
      return inv;
    }

    throw new APIError({
      message: 'Fact does not exist',
      status: httpStatus.NOT_FOUND,
    });
  },
};

/**
 * @typedef Fact
 */
module.exports = mongoose.model('Fact', factSchema);