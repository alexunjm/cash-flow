/** Módulo para leer y escribir movimientos en memoria */
let movimientos = [];

module.exports = (app, rutaMovimientos) => {

  // Tendremos dos mega-rutas por recurso
  // una para ir a la colección
  // api/priv/movimientos
  app.route(rutaMovimientos)
    .get((req, res) => {
      // filtro para el usuario actual
      let movimientosUsuario = getMovimientosUsuario(req.usuario);
      if (movimientosUsuario && movimientosUsuario.length > 0)
        res.json(movimientosUsuario);
      else
        res.sendStatus(204);
    })
    .post((req, res) => {
      // inserción de un movimiento
      let nuevoMovimiento = req.body
      nuevoMovimiento._id = movimientos.length;
      // firma del movimiento en el servidor
      nuevoMovimiento.usuario = req.usuario;
      movimientos.push(nuevoMovimiento)
      res.status(201).json(nuevoMovimiento);
    })
    .delete((req, res) => {
      movimientos = [];
      res.sendStatus(204);
    });
  /**
   * Ruta para obtener los totales
   */
  app.route(`${rutaMovimientos}/total`)
    .get((req, res) => {
      const total = { ingresos: 0, gastos: 0 };
      let movimientosUsuario = getMovimientosUsuario(req.usuario);
      if (movimientosUsuario && movimientosUsuario.length > 0) {
        movimientosUsuario.forEach(m => {
          if (m.tipo == 1)
            total.ingresos += m.importe ? m.importe : 0;
          else
            total.gastos += m.importe ? m.importe : 0;
        });
        res.json(total);
      }
      else {
        res.json(total);
      }
    });
  // esto otra ruta va a nivel de un elemento concreto
  // // api/priv/movimientos/159
  app.route(`${rutaMovimientos}/:id`)
    .get((req, res) => {
      // lectura de un movimiento por id
      let movimientosUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (movimientosUsuario && movimientosUsuario.length > 0)
        res.json(movimientosUsuario[0]);
      else
        res.sendStatus(404);
    })
    .put((req, res) => {
      // actualización de un movimiento por id
      let movimientosUsuarioIndex = getMovimientoUsuarioIndex(req.params.id, req.usuario);
      if (movimientosUsuarioIndex >= 0) {
        movimientos[movimientosUsuarioIndex] = req.body;
        res.json(1);
      } else {
        res.sendStatus(404);
      }

    })
    .delete((req, res) => {
      // borrado de un movimiento por id
      let movimientosUsuario = getMovimientoUsuario(req.params.id, req.usuario);
      if (movimientosUsuario && movimientosUsuario.length > 0) {
        movimientos.splice(req.params.id, 1)
        res.sendStatus(204);
      } else {
        res.sendStatus(404);
      }
    });


  var getMovimientosUsuario = (usuario) => movimientos.filter(m => m.usuario == usuario);
  var getMovimientoUsuario = (id, usuario) => movimientos.filter(m => m.usuario == usuario && m._id == id);
  var getMovimientoUsuarioIndex = (id, usuario) => movimientos.findIndex(m => m.usuario == usuario && m._id == id);
  var updateMovimientoUsuario = (id, usuario, body) => movimientos.map(m => m.usuario == usuario && m._id == id ? body : m)

  /** Respuesta común a errores */
  var resError = (err, res) => {
    console.error(err);
    res.status(500).send(err);
  }
}
