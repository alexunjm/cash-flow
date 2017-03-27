let items = [];

module.exports = (app, rutaitems) => {

  // api/priv/items
  app.route(rutaitems)
    .get((req, res) => {
      let itemsUsuario = getItemsUsuario(req.usuario);
      if (itemsUsuario && itemsUsuario.length > 0)
        res.json(itemsUsuario);
      else
        res.status(204).send();
    })
    .post((req, res) => {
      let nuevoItem = req.body
      nuevoItem._id = items.length;
      nuevoItem.usuario = req.usuario;
      items.push(nuevoItem)
      res.status(201).json(nuevoItem);
    })
    .delete((req, res) => {
      items = [];
      res.status(204).send();
    });
  // // api/priv/items/159
  app.route(`${rutaitems}/:id`)
    .get((req, res) => {
      let itemsUsuario = getItemUsuario(req.params.id, req.usuario);
      if (itemsUsuario && itemsUsuario.length > 0)
        res.json(itemsUsuario[0]);
      else
        res.status(404).send();
    })
    .put((req, res) => {
      let itemsUsuario = getItemUsuario(req.params.id, req.usuario);
      if (itemsUsuario && itemsUsuario.length > 0) {
        itemsUsuario[0] = req.body;
        res.json(1);
      } else {
        res.status(404).send(0);
      }

    })
    .delete((req, res) => {
      let itemsUsuario = getItemUsuario(req.params.id, req.usuario);
      if (itemsUsuario && itemsUsuario.length > 0) {
        items.splice(req.params.id, 1)
        res.status(204).send(1);
      } else {
        res.status(404).send(0);
      }
    });


  var getItemsUsuario = (usuario) => items.filter(m => m.usuario == usuario);
  var getItemUsuario = (id, usuario) => items.filter(m => m.usuario == usuario && m._id == id);


  var resError = (err, res) => {
    console.error(err);
    res.status(500).send(err);
  }
}