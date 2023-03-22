console.log("wczytano plik Ui.js")

class Ui {

    constructor() {
        console.log("konstruktor klasy Ui")
        net.doSth() // wywołanie funkcji z innej klasy
        this.ind = -1
        this.mus(this.ind)
    }


    clicks() {
        $(".al").on("click", function () {
            net.sendData(this.alt)
        })
        $(".al").on("click", () => {
            this.ind = -1
        })
        $(".sound").on("mouseover", function () {
            $(this.children[3]).css("display", "inline-block")
            $(this.children[4]).css("display", "inline-block")
        })
        $(".sound").on("mouseout", function () {
            $(this.children[3]).css("display", "none")
            $(this.children[4]).css("display", "none")
        })
        $(".play").on("click", function () {
            this.ind = parseInt($(this).parent().attr('id'))
            ui.mus(this.ind)
            $("#play").css("display", "none")
            $("#pause").css("display", "inline-block")
            $("#audio").off("timeupdate")
            music.load(this)
        })
        $(".file").on("click", function () {
            this.ind = parseInt($(this).parent().attr('id'))
            ui.mus(this.ind)
            $("#play").css("display", "none")
            $("#pause").css("display", "inline-block")
            $("#audio").off("timeupdate")
            music.load(this)
        })
        $(".add").on("click", function () {
            console.log("add")
            var dir = $(this).parent().children()[0].innerHTML
            var file = $(this).parent().children()[1].innerHTML
            var size = $(this).parent().children()[2].innerHTML
            console.log(dir, file, size)
            net.add_playlist(dir, file, size)
        })

        $("#border_progress").on("click", function (e) {
            $("#audio").off("timeupdate")
            var zew = $(this).offset().left
            var def = Math.floor($(this).width())
            var wew = e.clientX
            var progr = wew - zew
            var proc = progr / def * 100
            var d = $("#audio").prop("duration")
            var ddd = d * proc / 100
            music.prog(ddd)
        })
    }



    mus(dis) {
        $("#playlist").off("click")
        $("#playlist").on("click", function () {
            console.log("playlist klik")
            net.open_playlist()
        })
        $("#pause").on("click", function () {
            $("#audio").trigger('pause');
            $("#play").css("display", "inline-block")
            $("#pause").css("display", "none")

        })
        $("#play").on("click", function () {
            if ($("#sor").attr("src") == "") {
                music.next(0)
                dis = dis + 1
            }
            $("#audio").trigger('play');
            $("#play").css("display", "none")
            $("#pause").css("display", "inline-block")
        })
        $("#prawo").on("click", function () {
            $("#play").css("display", "none")
            $("#pause").css("display", "inline-block")
            dis = dis + 1
            var l = $(".sound").length
            if (dis >= l) {
                dis = 0
            }
            $("#audio").off("timeupdate")
            music.next(dis)
        })
        $("#lewo").on("click", function () {
            dis = dis - 1
            var l = $(".sound").length
            if (dis < 0) {
                dis = l - 1
            }
            if (dis > l) {
                dis = l - 1
            }
            $("#audio").off("timeupdate")
            music.next(dis)
        })
    }

}

