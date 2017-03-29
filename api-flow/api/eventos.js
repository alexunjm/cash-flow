let eventos = [];

module.exports = (app, rutaeventos) => {

  app.route(rutaeventos)
    .get((req, res) => {
      let eventosUsuario = getEventosUsuario(req.usuario);
      if (eventosUsuario && eventosUsuario.length > 0)
        res.json(eventosUsuario);
      else
        res.status(204).send();
    })
    .post((req, res) => {
      let nuevoEvento = req.body
      nuevoEvento._id = eventos.length;
      nuevoEvento.usuario = req.usuario;
      eventos.push(nuevoEvento)
      res.status(201).json(nuevoEvento);
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
      let eventosUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (eventosUsuario && eventosUsuario.length > 0) {
        eventos.splice(req.params.id, 1)
        res.status(204).send(1);
      } else {
        res.status(404).send(0);
      }
    });


  var getEventosUsuario = (usuario) => eventos.filter(m => m.usuario == usuario);
  var getEventoUsuario = (id, usuario) => eventos.filter(m => m.usuario == usuario && m._id == id);

  var resError = (err, res) => {
    console.error(err);
    res.status(500).send(err);
  }
}