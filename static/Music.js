console.log("wczytano plik Music.js")

class Music {

    constructor() {
        console.log("konstruktor klasy Music")
        this.work()
    }

    work() {
        $("#audio").off("loadeddata")
        $("#audio").on("loadeddata", () => {
            $("#audio").trigger("play");
            $("#audio").off("timeupdate")
            this.prog(0)
        })

    }
    prog(t) {
        $("#audio").prop("currentTime", t); // niestety bug w chrome, ustawia się zawsze 0 sekunda
        $("#audio").on("timeupdate", () => {
            // console.log("czas leci" + $("#audio").prop("currentTime"))
            var c = $("#audio").prop("currentTime")
            var d = $("#audio").prop("duration")
            var c1 = Math.floor(c / 60)
            var c2 = Math.floor(c % 60)
            var d1 = Math.floor(d / 60)
            var d2 = Math.floor(d % 60)
            $("#time").text(c1 + ":" + c2 + "/" + d1 + ":" + d2)
            var x = c * 100 / d
            $("#progress").css('width', x + "%")
        });
    }
    load(w) {
        $("#audio").trigger("stop");
        $("#sor").attr("src", "/" + $(w).parent().children()[0].innerHTML + "/" + $(w).parent().children()[1].innerHTML)
        $("#current").empty()
        $("#current").append($(w).parent().children()[1].innerHTML + "<br>" + $(w).parent().children()[0].innerHTML)
        $("#audio").trigger('load');
        $(".soundp").removeClass("soundp");
        $("#" + $(w).parent().attr('id')).addClass("soundp");

    }
    next(id) {
        $(".soundp").removeClass("soundp");
        $("#" + id).addClass("soundp");
        console.log("id:", id)
        console.log($("#" + id).children()[0].innerHTML + "/" + $("#" + id).children()[1].innerHTML)
        $("#sor").attr("src", $("#" + id).children()[0].innerHTML + "/" + $("#" + id).children()[1].innerHTML)
        $("#current").empty()
        $("#current").append($("#" + id).children()[1].innerHTML + "<br>" + $("#" + id).children()[0].innerHTML)
        $("#audio").trigger('load');
    }
}

