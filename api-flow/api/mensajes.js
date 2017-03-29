let mensajes = [];

module.exports = (app, rutamensajes) => {

  // api/priv/mensajes
  app.route(rutamensajes)
    .get((req, res) => {
      let mensajesUsuario = getMensajesUsuario(req.usuario);
      if (mensajesUsuario && mensajesUsuario.length > 0)
        res.json(mensajesUsuario);
      else
        res.status(204).send();
    })
    .post((req, res) => {
      let nuevoMensaje = req.body
      nuevoMensaje._id = mensajes.length;
      nuevoMensaje.usuario = req.usuario;
      mensajes.push(nuevoMensaje)
      res.status(201).json(nuevoMensaje);
      console.log('ok guardando mensaje');
    })
    .delete((req, res) => {
      mensajes = [];
      res.status(204).send();
    });
  // // api/priv/mensajes/159
  app.route(`${rutamensajes}/:id`)
    .get((req, res) => {
      let mensajesUsuario = getMensajeUsuario(req.params.id, req.usuario);
      if (mensajesUsuario && mensajesUsuario.length > 0)
        res.json(mensajesUsuario[0]);
      else
        res.status(404).send();
    })
    .delete((req, res) => {
      let mensajesUsuario = getMensajeUsuario(req.params.id, req.usuario);
      if (mensajesUsuario && mensajesUsuario.length > 0) {
        mensajes.splice(req.params.id, 1)
        res.status(204).send(1);
      } else {
        res.status(404).send(0);
      }
    });


  var getMensajesUsuario = (usuario) => mensajes.filter(m => m.usuario == usuario);
  var getMensajeUsuario = (id, usuario) => mensajes.filter(m => m.usuario == usuario && m._id == id);


  /** Respuesta común a errores */
  var resError = (err, res) => {
    console.error(err);
    res.status(500).send(err);
  }
}