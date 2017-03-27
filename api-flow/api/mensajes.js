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
  /**
   * Ruta para obtener los totales
   */
  app.route(`${rutamensajes}/total`)
    .get((req, res) => {
      const total = { ingresos: 0, gastos: 0 };
      let mensajesUsuario = getmensajesUsuario(req.usuario);
      if (mensajesUsuario && mensajesUsuario.length > 0) {
        mensajesUsuario.forEach(m => {
          if (m.tipo == 1)
            total.ingresos += m.importe ? m.importe : 0;
          else
            total.gastos += m.importe ? m.importe : 0;
        });
        res.json(total);
      }
      else
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
    .put((req, res) => {
      // actualización de un movimiento por id
      let mensajesUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (mensajesUsuario && mensajesUsuario.length > 0) {
        mensajesUsuario[0] = req.body;
        res.json(1);
      } else {
        res.status(404).send(0);
      }

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