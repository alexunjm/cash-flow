/**
 * Permite que un usuario haga login
 * Es una inserción de un objeto en el recuros de sesiones
 */
// Usa la librería de seguridad
const seguridad = require('./../seguridad/seguridad.js')
module.exports = (app, ruta) => {
    // Gestión de sesiones:  login
    app.route(ruta)
        .post((req, res) => {
            // inserción de un registro de sesión
            let sesion = req.body
            let result = seguridad.esUsuarioValido(sesion)
            if (result) {
                console.log(`aceptado: ${sesion.email}`)
                let nuevoSessionId = seguridad.nuevaSesion(sesion)
                res.status(201).json(nuevoSessionId)
            } else {
                console.log(`Credencial inválida: ${JSON.stringify(result)}`)
                res.status(401).send('Credencial inválida')
                res.send()
            }
        })
}