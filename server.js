var fs = require("fs");
var http = require("http");
var qs = require("querystring")
var formidable = require("formidable")
var db = require(__dirname + "/my_database_methods.js")
console.log(db)






var albumy = []
fs.readdir(__dirname + "/static/mp3", function (err, files) {
    if (err) {
        return console.log(err);
    }
    files.forEach(function (fileName) {
        albumy.push(fileName);
        //tu dodaj foldery do wcześniej utworzonej tablicy
    });
    // tu można od razu wywołać taką samą funkcję, która przeczyta pliki z pierwszego katalogu w tablicy
    console.log(albumy);
});

function Round(n, k) {
    var factor = Math.pow(10, k);
    return Math.round(n * factor) / factor;
}
function album(album, res) {
    var tab2 = []
    fs.readdir(__dirname + "/static/mp3/" + album, function (err, files) {
        if (err) {
            return console.log(err);
        }
        files.forEach(function (file) {
            var stats = fs.statSync(__dirname + "/static/mp3/" + album + "/" + file);
            if (file.search(".mp3") > 0) {
                var size = stats.size / 1000000
                var sizer = Round(size, 2)
                var plik = {
                    "dir": album,
                    "file": file,
                    "size": sizer
                }
                tab2.push(plik)
            }
        });

        console.log(tab2);
        var obj = {
            "dirs": albumy, "files": tab2
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(obj));
        console.log(obj)
    });


}
var a = true
function servResponse(req, res) {
    var allData = "";
    req.on("data", function (data) {
        console.log("data: " + data)
        allData += data;
    })
    req.on("end", function (data) {
        if (a) {
            album(albumy[0], res)
            a = !a
        } else {
            var finish = qs.parse(allData)
            if (finish.album === undefined && finish.list === undefined) {
                add_playlist(finish.dir, finish.file, finish.size)
                res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
                res.end("plik zapisany");
            } else if (finish.list === undefined) {
                album(finish.album, res)
            } else {
                show_playlist(res)
            }
        }
    })
}
function add_playlist(dir, file, size) {
    db.a(dir, file, size)
}
function show_playlist(res) {
    db.b(res, albumy)
}

var server = http.createServer(function (req, res) {
    console.log(req.method)
    console.log(req.url)
    switch (req.method) {
        case "GET":
            if (req.url === "/") {
                fs.readFile("static/index.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/admin") {
                fs.readFile("static/admin.html", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/jquery.js") {
                fs.readFile("static/jquery.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/upload.js") {
                fs.readFile("static/upload.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/style.css") {
                fs.readFile("static/style.css", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'text/css' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Main.js") {
                fs.readFile("static/Main.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Net.js") {
                fs.readFile("static/Net.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Ui.js") {
                fs.readFile("static/Ui.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url === "/Music.js") {
                fs.readFile("static/Music.js", function (error, data) {
                    res.writeHead(200, { 'Content-Type': 'application/javascript' });
                    res.write(data);
                    res.end();
                })

            }
            else if (req.url.indexOf(".mp3") != -1) {
                fs.readFile("static/mp3" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": "audio/mpeg" });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.indexOf(".jpg") != -1) {
                fs.readFile("static/mp3" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": 'image/jpg' });
                    res.write(data);
                    res.end();
                })
            }
            else if (req.url.indexOf(".png") != -1) {
                fs.readFile("static" + decodeURI(req.url), function (error, data) {
                    res.writeHead(200, { "Content-type": 'image/jpg' });
                    res.write(data);
                    res.end();
                })
            }
            break;
        case "POST":
            if (req.url === "/upload") {
                var d = Math.random()
                var dir = 'static/upload/' + d
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir);
                }
                var form = new formidable.IncomingForm();
                form.uploadDir = "static/upload/" + d
                form.keepExtensions = true
                form.parse(req, function (err, fields, files) {
                    console.log(files)
                    res.writeHead(200, { 'content-type': 'text/plain;charset=utf-8' });
                    res.end("plik zapisany");
                //     console.log(files.length)
                //    console.log(Object.keys(files).length)
                    for (let i = 0; i < Object.keys(files).length; i++) {
                        var f = files["file"+i]
                        fs.rename(f.path, "./static/upload/"+d+"/"+f.name, function (err) {
                            if (err) console.log(err)
                            console.log("rename ok")
                        });
                    }
                    
                });

                


            }
            else {
                servResponse(req, res)
            }
            break;
    }

})

server.listen(3000, function () {
    console.log("serwer startuje na porcie 3000")
});