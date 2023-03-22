var Datastore = require('nedb')
var coll1 = new Datastore({
    filename: 'kolekcja.db',
    autoload: true
});
var obj = {

    a: function (dir, file, size) {
        console.log("dodawanie do bazy")

        var doc = {
            dir: dir,
            file: file,
            size: size
        };

        coll1.insert(doc, function (err, newDoc) {
            console.log("dodano dokument (obiekt):")
            console.log(newDoc)
            // console.log("losowe id dokumentu: " + newDoc._id)
        });
    },
    b: function (res, albumy) {
        console.log("czytanie")
        var tab2 = []
        coll1.find({}, function (err, docs) {
            //zwracam dane w postaci JSON
            console.log("----- tablica obiektów pobrana z bazy: \n")
            console.log(docs)
            console.log("----- sformatowany z wcięciami obiekt JSON: \n")
            console.log(JSON.stringify({ "docsy": docs }, null, 5))
            console.log(docs.length)
            for (var i = 0; i < docs.length; i++) {
                var plik = {
                    "dir": docs[i].dir,
                    "file": docs[i].file,
                    "size": docs[i].size
                }
                // console.log(plik)
                tab2.push(plik)
            } console.log("TABLICA2:", tab2)
            var obj = {
                "dirs": albumy, "files": tab2
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(obj));
            console.log(obj)

        });
    }
}

module.exports = obj