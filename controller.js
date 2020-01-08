'use strict';

var response = require('./res');
var connection = require('./dbcon');
var query = "select a.id_awal,a.id_mk, c.nama_mk,c.sks,a.bentuk,kls.kelas,kls.j_kuliah,kls.j_terstruktur,dsn.nama as pengajar, ass.nama as assisten,a.materi, a.blended as blend,a.implementasi,a.semester, kls.flag "; 
query = query += "from p_awal as a join pa_kelas as kls on a.id_awal = kls.id_awal join dosen as dsn on kls.dosen = dsn.nid join dosen as ass on kls.asisten = ass.nid join matakuliah as c on a.id_mk = c.id_mk ";
query = query += "where flag=1 order by a.id_awal, kls.kelas";

exports.awal = function(req, res) {
    connection.query(query, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createAwal = function(req, res) {
    
    
    var id_mk = req.body.id_mk;
    var bentuk = req.body.bentuk;
    var kelas = req.body.kelas;
    var kuliah = req.body.kuliah;
    var terstruktur = req.body.terstruktur;
    var nid = req.body.nid;
    var asisten = req.body.asisten;
    var blended = req.body.blended;
    var semester = req.body.semester;

    connection.query('Insert into p_awal values(NULL,?,?,?,?,?,?,?,?,?,0)',
    [ id_mk, bentuk, kelas, kuliah, terstruktur, nid, asisten, blended, semester ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan Data!", res)
        }
    });
};

exports.updateAwal = function(req, res) {
    
    var id_awal = req.body.id_awal;
    var id_mk = req.body.id_mk;
    var bentuk = req.body.bentuk;
    var kelas = req.body.kelas;
    var kuliah = req.body.kuliah;
    var terstruktur = req.body.terstruktur;
    var nid = req.body.nid;
    var asisten = req.body.asisten;
    var blended = req.body.blended;
    var semester = req.body.semester;

    connection.query('update p_awal set id_mk = ?, bentuk = ?, kelas = ?, kuliah = ?, terstruktur = ?, nid = ?, asisten = ?, blended = ?, semester = ? where id_awal = ? ',
     [ id_mk, bentuk, kelas, kuliah, terstruktur, nid, asisten, blended, semester,id_awal ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah Data!", res)
        }
    });
};

exports.deleteAwal = function(req, res) {
    
    var id_awal = req.body.id_awal;
    var kelas = req.body.kelas;

    connection.query('UPDATE pa_kelas set flag = 0 where id_awal = ? and kelas = ?',
    [ id_awal,kelas ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus user!", res)
        }
    });
};

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

exports.DaftarMK = function(req, res) {
    var jurusan = req.body.jurusan;
    connection.query("SELECT * FROM matakuliah WHERE jurusan = ?",
    [jurusan],
    function(error,rows,fields){
       if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        } 
    });
};

exports.DaftarDsn = function(req, res) {
    var jurusan = req.body.jurusan;
    connection.query("SELECT nid, nama FROM dosen WHERE jurusan = ?",
    [jurusan],
    function(error,rows,fields){
       if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        } 
    });
};

exports.pembelajaran = function(req, res) {
    var query = "select a.id_awal,a.id_mk, c.nama_mk,c.sks,a.bentuk, a.koordinator as idkoor, koor.nama as koordinator, kls.kelas,kls.j_kuliah,kls.j_terstruktur, kls.dosen, dsn.nama as pengajar, kls.asisten, ass.nama as assisten,a.materi, a.blended as blend,a.implementasi,a.semester, kls.flag "; 
    query = query += "from p_awal as a join pa_kelas as kls on a.id_awal = kls.id_awal join dosen as dsn on kls.dosen = dsn.nid join dosen as ass on kls.asisten = ass.nid join matakuliah as c on a.id_mk = c.id_mk ";
    query = query += "join dosen as koor on a.koordinator = koor.nid where flag=1 and a.tahun = "+req.body.tahun+" and a.semester mod 2 ="+req.body.semester+" and c.jurusan = "+req.body.jurusan+" order by a.id_awal, kls.kelas";
    connection.query(query, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res);
        }
    });
};

exports.ap_finalisasi = function(req, res) {

    var id_awal = req.body.id_awal;
    var materi = req.body.materi;
    var blend = req.body.blend;

    var kelas = req.body.kelas;
    var dosen = req.body.dosen;
    var asisten = req.body.asisten;

    connection.query('UPDATE p_awal set materi = ?, blended = ? where id_awal = ? ',
     [ materi, blend, id_awal ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            //response.ok("Update Materi Berhasil", res)
        }
    });

    connection.query('UPDATE pa_kelas set dosen = ?, asisten = ? where id_awal = ? and kelas = ? ',
     [ dosen, asisten, id_awal, kelas ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Update Dosen Berhasil", res)
        }
    });
};

exports.koordinator = function(req, res) {
    var query = "select a.id_awal, a.id_mk, b.nama_mk,b.sks,a.koordinator,a.kelas, a.implementasi, a.semester, a.tahun "; 
    query = query += "from p_awal a, matakuliah b ";
    query = query += "where a.id_mk = b.id_mk and a.tahun = "+req.body.tahun+" and a.semester mod 2 ="+req.body.semester+" and b.jurusan ="+req.body.jurusan+" order by a.id_awal";
    connection.query(query, function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res);
        }
    });
};

exports.koor_finalisasi = function(req, res) {

    var id_awal = req.body.id_awal;
    var koordinator = req.body.koordinator;
    var implementasi = req.body.implementasi;

    connection.query('UPDATE p_awal set koordinator = ?, implementasi = ? where id_awal = ? ',
     [ koordinator, implementasi, id_awal ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Update Materi Berhasil", res)
        }
    });
};