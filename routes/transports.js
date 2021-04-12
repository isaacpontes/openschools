const express = require('express');
const Transport = require('../models/transport');

const router = express.Router();


// Render a list of all transports
// GET /transports
router.get('/', async (req, res) => {
  try {
    const transports = await Transport.find({});
    res.render('transports/index', { transports });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar lista de transportes.' });
  }
});


// Save a new transport to the database
// POST /transports
router.post('/', async (req, res) => {
  const { name, driver, info } = req.body.transport;
  const transport = new Transport({ name, driver, info });

  try {
    await transport.save();
    req.flash('success', 'Transporte salvo com sucesso.');
    res.redirect('/transports');
  } catch (error) {
    res.render('transports/new', { transport, error: 'Erro ao salvar transporte.' });
  }
});


// Render the new transport form
// GET /transports/new
router.get('/new', async (req, res) => {
  try {
    const transport = new Transport();
    res.render('transports/new', { transport });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar página.' });
  }
});


// Render a single transport
// GET /transports/:id
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const transport = await Transport.findById(id);
    res.render('transports/show', { transport });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar página.' });
  }
});


// Render transport edit form
// GET /transports/:id/edit
router.get('/:id/edit', async (req, res) => {
  const id = req.params.id;

  try {
    const transport = await Transport.findById(id);
    res.render('transports/edit', { transport });
  } catch (error) {
    res.render('pages/error', { error: 'Erro ao carregar página.' });
  }
});


// Update a transport in the database
// PUT /transports/:id
router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { name, driver, info } = req.body.transport;

  try {
    await Transport.findByIdAndUpdate(id, { name, driver, info });

    req.flash('success', 'Transporte atualizado com sucesso.');
    res.redirect('/transports');
  } catch (error) {
    res.render('transports/new', { transport: { name, driver, info }, error: 'Erro ao salvar transporte.' });
  }
});


// Delete transport from database
// DELETE /transports/:id
router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Transport.findByIdAndRemove(id);

    req.flash('success', 'Transporte excluído com sucesso.');
    res.redirect('/transports');
  } catch (error) {
    res.render('transports/index', { error: 'Erro ao excluir transporte.' });
  }
});

module.exports = router;
