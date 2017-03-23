/** Módulo para leer y escribir contactos en memoria */
let contactos = [];

module.exports = (app, rutaContactos) => {

  // Tendremos dos mega-rutas por recurso
  // una para ir a la colección
  // api/priv/contactos
  app.route(rutaContactos)
    .get((req, res) => {
      // filtro para el usuario actual
      let contactosUsuario = getcontactosUsuario(req.usuario);
      if (contactosUsuario && contactosUsuario.length > 0)
        res.json(contactosUsuario);
      else
        res.status(204).send();
    })
    .post((req, res) => {
      // inserción de un movimiento
      let nuevoMovimiento = req.body
      nuevoMovimiento._id = contactos.length;
      // firma del movimiento en el servidor
      nuevoMovimiento.usuario = req.usuario;
      contactos.push(nuevoMovimiento)
      res.status(201).json(nuevoMovimiento);
    })
    .delete((req, res) => {
      contactos = [];
      res.status(204).send();
    });
  /**
   * Ruta para obtener los totales
   */
  app.route(`${rutaContactos}/total`)
    .get((req, res) => {
      const total = { ingresos: 0, gastos: 0 };
      let contactosUsuario = getcontactosUsuario(req.usuario);
      if (contactosUsuario && contactosUsuario.length > 0) {
        contactosUsuario.forEach(m => {
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
  // // api/priv/contactos/159
  app.route(`${rutaContactos}/:id`)
    .get((req, res) => {
      // lectura de un movimiento por id
      let contactosUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (contactosUsuario && contactosUsuario.length > 0)
        res.json(contactosUsuario[0]);
      else
        res.status(404).send();
    })
    .put((req, res) => {
      // actualización de un movimiento por id
      let contactosUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (contactosUsuario && contactosUsuario.length > 0) {
        contactosUsuario[0] = req.body;
        res.json(1);
      } else {
        res.status(404).send(0);
      }

    })
    .delete((req, res) => {
      // borrado de un movimiento por id
      let contactosUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (contactosUsuario && contactosUsuario.length > 0) {
        contactos.splice(req.params.id, 1)
        res.status(204).send(1);
      } else {
        res.status(404).send(0);
      }
    });


  var getcontactosUsuario = (usuario) => contactos.filter(m => m.usuario == usuario);
  var getMovimientoUsuario = (id, usuario) => contactos.filter(m => m.usuario == usuario && m._id == id);


  /** Respuesta común a errores */
  var resError = (err, res) => {
    console.error(err);
    res.status(500).send(err);
  }
}