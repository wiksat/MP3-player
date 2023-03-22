console.log("wczytano plik Net.js")

class Net {

    constructor() {
        this.a = 100 // użycie zmiennych
        this.b = 200
        console.log("konstruktor klasy Net")
        this.doSth() // wywołanie funkcji z tej samej klasy
        this.sendData("album1")
    }

    doSth() {
        console.log("funcja doSth " + this.a + " - " + this.b)
    }

    sendData(current) {
        $.ajax({
            url: "/ albumy",
            data: {
                album: current
            },
            type: "POST",
            success: function (data) {
                //czytamy odesłane z serwera dane
                console.log(data)
                // console.log(JSON.parse(data))
                $("#albumy").empty()
                for (var i = 1; i < data.dirs.length + 1; i++) {
                    $("#albumy").append("<img class='al' id=okladka" + i + " src='/" + data.dirs[i - 1] + "/okladka.jpg' alt='" + data.dirs[i - 1] + "'>")
                }
                $("#content").empty()
                for (var i = 0; i < data.files.length; i++) {
                    $("#content").append("<div id='" + i + "' class='sound'><div class='dir'>" + data.files[i].dir + "</div><div class='file'>" + data.files[i].file + "</div><div class='size'>" + data.files[i].size + " MB</div><div class='play'><img src='img/play.png' alt='PLAY'></div><div class='add'>add</div></div>")
                }
                ui.clicks()
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },

        });
    }
    add_playlist(dir, file, size) {
        console.log("add_playlist")
        $.ajax({
            url: "/ add",
            data: {
                dir: dir,
                file: file,
                size: size
            },
            type: "POST",
            success: function (data) {
            },
            error: function (xhr, status, error) {
                // console.log(xhr);
            },

        });
    }
    open_playlist() {
        $.ajax({
            url: "/ playlist",
            data: {
                list: "1"
            },
            type: "POST",
            success: function (data) {
                //czytamy odesłane z serwera dane
                console.log(data)
                $("#albumy").empty()
                for (var i = 1; i < data.dirs.length + 1; i++) {
                    $("#albumy").append("<img class='al' id=okladka" + i + " src='/" + data.dirs[i - 1] + "/okladka.jpg' alt='" + data.dirs[i - 1] + "'>")
                }
                $("#content").empty()
                $("#content").append("<h2>Odtwarzanie playlisty</h2>")
                for (var i = 0; i < data.files.length; i++) {
                    $("#content").append("<div id='" + i + "' class='sound'><div class='dir'>" + data.files[i].dir + "</div><div class='file'>" + data.files[i].file + "</div><div class='size'>" + data.files[i].size + "</div><div class='play'>play</div></div>")
                }
                ui.clicks()
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            },

        });
    }
}