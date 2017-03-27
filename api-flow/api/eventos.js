/** Módulo para leer y escribir eventos en memoria */
let eventos = [];

module.exports = (app, rutaeventos) => {

  // Tendremos dos mega-rutas por recurso
  // una para ir a la colección
  // api/priv/eventos
  app.route(rutaeventos)
    .get((req, res) => {
      // filtro para el usuario actual
      let eventosUsuario = geteventosUsuario(req.usuario);
      if (eventosUsuario && eventosUsuario.length > 0)
        res.json(eventosUsuario);
      else
        res.status(204).send();
    })
    .post((req, res) => {
      // inserción de un movimiento
      let nuevoMovimiento = req.body
      nuevoMovimiento._id = eventos.length;
      // firma del movimiento en el servidor
      nuevoMovimiento.usuario = req.usuario;
      eventos.push(nuevoMovimiento)
      res.status(201).json(nuevoMovimiento);
    })
    .delete((req, res) => {
      eventos = [];
      res.status(204).send();
    });
  // esto otra ruta va a nivel de un elemento concreto
  // // api/priv/eventos/159
  app.route(`${rutaeventos}/:id`)
    .get((req, res) => {
      // lectura de un movimiento por id
      let eventosUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (eventosUsuario && eventosUsuario.length > 0)
        res.json(eventosUsuario[0]);
      else
        res.status(404).send();
    })
    .put((req, res) => {
      // actualización de un movimiento por id
      let eventosUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (eventosUsuario && eventosUsuario.length > 0) {
        eventosUsuario[0] = req.body;
        res.json(1);
      } else {
        res.status(404).send(0);
      }

    })
    .delete((req, res) => {
      // borrado de un movimiento por id
      let eventosUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (eventosUsuario && eventosUsuario.length > 0) {
        eventos.splice(req.params.id, 1)
        res.status(204).send(1);
      } else {
        res.status(404).send(0);
      }
    });


  var geteventosUsuario = (usuario) => eventos.filter(m => m.usuario == usuario);
  var getMovimientoUsuario = (id, usuario) => eventos.filter(m => m.usuario == usuario && m._id == id);


  /** Respuesta común a errores */
  var resError = (err, res) => {
    console.error(err);
    res.status(500).send(err);
  }
}