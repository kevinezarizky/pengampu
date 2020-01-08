'use strict';
module.exports = function(app) {
    var todoList = require('./controller');

    app.route('/')
        .get(todoList.index);

    app.route('/awal')
        .get(todoList.awal);
    
    app.route('/awal')
        .post(todoList.createAwal);

    app.route('/awal')
        .put(todoList.updateAwal);
    
    app.route('/awal')
        .delete(todoList.deleteAwal);

    app.route('/mk')
        .post(todoList.DaftarMK);

    app.route('/dsn')
        .post(todoList.DaftarDsn);

    app.route('/pembelajaran')
        .post(todoList.pembelajaran);

    app.route('/ap_finalisasi')
        .post(todoList.ap_finalisasi);

    app.route('/koordinator')
        .post(todoList.koordinator);

    app.route('/koor_finalisasi')
        .post(todoList.koor_finalisasi);

};