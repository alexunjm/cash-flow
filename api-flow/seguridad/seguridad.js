/** Módulos de ayuda */
const jwt = require('./jwt');
const colName = 'usuarios';
const usuarios = [];
const sesiones = [];

var existeUsuario = usuario => usuarios.some(u => u.email == usuario.email);

var crearUsuario = usuario => usuarios.push(usuario);

var esUsuarioValido = usuario => usuarios.filter(u => u.email == usuario.email && u.password == usuario.password)[0];


/**
 * Módulo con funciones útiles para la seguridad de la aplicación
 */
module.exports = {
    /** determina si una ruta debe usar seguirdad o no */
    usarSeguridad: usarSeguridad,
    /** comprueba si exite un usuario */
    existeUsuario: existeUsuario,
    /** crea un nuevo usuario */
    crearUsuario: crearUsuario,
    /** determina si unas credenciales son válidas */
    esUsuarioValido: esUsuarioValido,
    /** crea un nuevo token de sesión */
    nuevaSesion: (usuario) => jwt.generaToken(usuario)
}

function usarSeguridad(app, ruta) {
    app.use(ruta, (req, res, next) => {
        // la validación de la sesión es en memoria
        // jwt descifra y valida un token
        let sesion = null;
        const authorization = req.get('Authorization');
        const pieces = authorization.split(' ');
        if (pieces && pieces.length > 0) {
            const sessionId = authorization.split(' ')[1];
            sesion = jwt.verify(sessionId);
        }
        if (sesion) {
            req.usuario = sesion.email;
            next();
        } else {
            res.status(401)
                .send('Credencial inválida');
        }
    })
}
