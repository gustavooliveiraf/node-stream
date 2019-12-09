const router = require('express').Router();

const immobleValidator = require('./validators/immoble');
const immobleController = require('../controllers');
const immobleInterfaceRepositories = require('../interfaceRepositories');

/**
 * @swagger
 * /list/{portalOrigin}:
 *   get:
 *     tags:
 *       - Immobile
 *     name: List of real state
 *     summary: List of real state
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: portalOrigin
 *         schema:
 *           type: string
 *           example: zap | viva-real
 *         required: true
 *         description: Portal origin
 *     responses:
 *       '200':
 *         description: Ok
 *       '422':
 *         description: Portal's origin doesn't exist
 */
router.get('/list/:portalOrigin', immobleValidator.findAll,
  immobleController.findAll(immobleInterfaceRepositories)); // dependency injection

// router.get('/:portalOrigin', immobleValidator.create,
//  immobleController.create(immobleInterfaceRepositories)); // dependency injection
// router.get('/:portalOrigin', immobleValidator.update,
//  immobleController.update(immobleInterfaceRepositories)); // dependency injection
// router.get('/:portalOrigin', immobleValidator.delete,
//  immobleController.delete(immobleInterfaceRepositories)); // dependency injection
// ...
// ...
// ...

module.exports = router;
