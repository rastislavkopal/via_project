const express = require('express');
const validate = require('express-validation');
const controller = require('../../controllers/fact.controller');
const { authorize, LOGGED_USER } = require('../../middlewares/auth');
const {
  listFacts,
  createFact,
} = require('../../validations/fact.validation');

const router = express.Router();

/**
 * Load fact when API with factId route parameter is hit
 */
router.param('factId', controller.load);

router
  .route('/')
  /**
   * @api {get} v1/facts List facts
   * @apiDescription Get a list of facts
   * @apiVersion 1.0.0
   * @apiName ListFacts
   * @apiGroup Fact
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {Number{1-}}         [page=1]     List page
   * @apiParam  {Number{1-100}}      [perPage=1]  Users per page
   *
   * @apiSuccess {Object[]} facts List of facts.
   *
   * @apiError (Unauthorized 401)  Unauthorized  Only authenticated users can access the data
   * @apiError (Forbidden 403)     Forbidden     Only admins can access the data
   */
  .get(authorize(), validate(listFacts), controller.list)
  /**
   * @api {post} v1/facts Create Fact
   * @apiDescription Create a new fact
   * @apiVersion 1.0.0
   * @apiName CreateFact
   * @apiGroup Fact
   * @apiPermission admin
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiParam  {String}             text     Fact's text
   *
   * @apiSuccess (Created 201) {String}  id         Fact's id
   * @apiSuccess (Created 201) {String}  userId       Id of user who added the fact
   * @apiSuccess (Created 201) {String}  text      Text of Fact
   *
   * @apiError (Bad Request 400)   ValidationError  Some parameters may contain invalid values
   * @apiError (Unauthorized 401)  Unauthorized     Only authenticated users can create the data
   */
  .post(authorize(), validate(createFact), controller.create);

router
  .route('/:factId')
  /**
   * @api {get} v1/facts/:id Get Fact
   * @apiDescription Get Fact information
   * @apiVersion 1.0.0
   * @apiName GetFact
   * @apiGroup Fact
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess {String}  id         Fact's id
   * @apiSuccess {String}  userId      User's id
   * @apiSuccess {String}  text      text of fact
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   * @apiError (Not Found 404)    NotFound     fact does not exist
   */
  .get(authorize(LOGGED_USER), controller.get)
  /**
   * @api {delete} v1/facts/:id Delete Fact
   * @apiDescription Delete a fact
   * @apiVersion 1.0.0
   * @apiName DeleteFact
   * @apiGroup Fact
   * @apiPermission user
   *
   * @apiHeader {String} Authorization   User's access token
   *
   * @apiSuccess (No Content 204)  Successfully deleted
   *
   * @apiError (Unauthorized 401) Unauthorized  Only authenticated users can delete the data
   * @apiError (Forbidden 403)    Forbidden     Only user with same id or admins can delete the data
   * @apiError (Not Found 404)    NotFound      Fact does not exist
   */
  .delete(authorize(LOGGED_USER), controller.remove);

module.exports = router;
