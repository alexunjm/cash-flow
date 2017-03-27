/** Módulo para leer y escribir items en memoria */
let items = [];

module.exports = (app, rutaitems) => {

  // Tendremos dos mega-rutas por recurso
  // una para ir a la colección
  // api/priv/items
  app.route(rutaitems)
    .get((req, res) => {
      // filtro para el usuario actual
      let itemsUsuario = getitemsUsuario(req.usuario);
      if (itemsUsuario && itemsUsuario.length > 0)
        res.json(itemsUsuario);
      else
        res.status(204).send();
    })
    .post((req, res) => {
      // inserción de un movimiento
      let nuevoMovimiento = req.body
      nuevoMovimiento._id = items.length;
      // firma del movimiento en el servidor
      nuevoMovimiento.usuario = req.usuario;
      items.push(nuevoMovimiento)
      res.status(201).json(nuevoMovimiento);
    })
    .delete((req, res) => {
      items = [];
      res.status(204).send();
    });
  // esto otra ruta va a nivel de un elemento concreto
  // // api/priv/items/159
  app.route(`${rutaitems}/:id`)
    .get((req, res) => {
      // lectura de un movimiento por id
      let itemsUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (itemsUsuario && itemsUsuario.length > 0)
        res.json(itemsUsuario[0]);
      else
        res.status(404).send();
    })
    .put((req, res) => {
      // actualización de un movimiento por id
      let itemsUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (itemsUsuario && itemsUsuario.length > 0) {
        itemsUsuario[0] = req.body;
        res.json(1);
      } else {
        res.status(404).send(0);
      }

    })
    .delete((req, res) => {
      // borrado de un movimiento por id
      let itemsUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (itemsUsuario && itemsUsuario.length > 0) {
        items.splice(req.params.id, 1)
        res.status(204).send(1);
      } else {
        res.status(404).send(0);
      }
    });


  var getitemsUsuario = (usuario) => items.filter(m => m.usuario == usuario);
  var getMovimientoUsuario = (id, usuario) => items.filter(m => m.usuario == usuario && m._id == id);


  /** Respuesta común a errores */
  var resError = (err, res) => {
    console.error(err);
    res.status(500).send(err);
  }
}