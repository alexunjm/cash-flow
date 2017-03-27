/** Módulo para leer y escribir mensajes en memoria */
let mensajes = [];

module.exports = (app, rutamensajes) => {

  // Tendremos dos mega-rutas por recurso
  // una para ir a la colección
  // api/priv/mensajes
  app.route(rutamensajes)
    .get((req, res) => {
      // filtro para el usuario actual
      let mensajesUsuario = getmensajesUsuario(req.usuario);
      if (mensajesUsuario && mensajesUsuario.length > 0)
        res.json(mensajesUsuario);
      else
        res.status(204).send();
    })
    .post((req, res) => {
      // inserción de un movimiento
      let nuevoMovimiento = req.body
      nuevoMovimiento._id = mensajes.length;
      // firma del movimiento en el servidor
      nuevoMovimiento.usuario = req.usuario;
      mensajes.push(nuevoMovimiento)
      res.status(201).json(nuevoMovimiento);
    })
    .delete((req, res) => {
      mensajes = [];
      res.status(204).send();
    });
  // esto otra ruta va a nivel de un elemento concreto
  // // api/priv/mensajes/159
  app.route(`${rutamensajes}/:id`)
    .get((req, res) => {
      // lectura de un movimiento por id
      let mensajesUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (mensajesUsuario && mensajesUsuario.length > 0)
        res.json(mensajesUsuario[0]);
      else
        res.status(404).send();
    })
    .delete((req, res) => {
      // borrado de un movimiento por id
      let mensajesUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (mensajesUsuario && mensajesUsuario.length > 0) {
        mensajes.splice(req.params.id, 1)
        res.status(204).send(1);
      } else {
        res.status(404).send(0);
      }
    });


  var getmensajesUsuario = (usuario) => mensajes.filter(m => m.usuario == usuario);
  var getMovimientoUsuario = (id, usuario) => mensajes.filter(m => m.usuario == usuario && m._id == id);


  /** Respuesta común a errores */
  var resError = (err, res) => {
    console.error(err);
    res.status(500).send(err);
  }
}