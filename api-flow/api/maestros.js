/** Módulo para lecturas de objetos maestros en memoria */
module.exports = (app, ruta) => {

    // Podemos responder emitiendo JSON

    const tipos = [{
        id: 1,
        texto: 'Ingreso'
    }, {
        id: 2,
        texto: 'Gasto'
    }];

    const categorias = [{
        id: 1,
        texto: 'Nómina',
        tipo: 1
    }, {
        id: 2,
        texto: 'Ventas',
        tipo: 1
    }, {
        id: 3,
        texto: 'Intereses',
        tipo: 1
    }, {
        id: 4,
        texto: 'Hipoteca',
        tipo: 2
    }, {
        id: 5,
        texto: 'Compras',
        tipo: 2
    }, {
        id: 6,
        texto: 'Domiciliaciones',
        tipo: 2
    }, {
        id: 7,
        texto: 'Impuestos',
        tipo: 2
    }];

    /** Al recibir un GET ene sta ruta, respondemos con esta funcioón */
    app.get(`${ruta}/tipos`, (req, res) => res.json(tipos));

    app.get(`${ruta}/categorias`, (req, res) => res.json(categorias));
}
