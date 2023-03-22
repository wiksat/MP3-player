$(document).ready(function () {
    $("html").on("dragover", function (e) {
        $("#drop").empty()
        $("#drop").append("<h1>Przesuń tutaj</h1>")
        // console.log("dragover nad dokumentem html")
        e.preventDefault(); // usuwa domyślne zachowanie strony po wykonaniu zdarzenia
        e.stopPropagation(); // zatrzymuje dalszą propagację zdarzenia
    });
    $('#drop').on('drop', function (e) {
        console.log("drop na divie")
        $("#drop").empty()
        $("#drop").append("<h1>PRZESŁANO</h1>")
        e.stopPropagation();
        e.preventDefault();

        var file = e.originalEvent.dataTransfer.files;
        // console.log(file)

        var fd = new FormData();
        for (let i = 0; i < file.length; i++) {
            var files= file[i]
            fd.append('file'+i, files);
            // fd.push(files)
   
        }

         
        // console.log(files)
        
        $.ajax({
            url: '/upload',
            type: 'POST',
            data: fd,
            contentType: false, // ajax nie określa typu przesyłanych danych
            processData: false, // ajax w żaden sposób nie przetwarza danych
            success: function (response) {
                console.log(response)
                // tutaj pokaż obrazek w img lub div
                // którego nazwa przyszła z serwer-a
            },

        })



    });
    $('#drop').on('dragenter', function (e) {
        // console.log("drag enter na divie")
        $("#drop").empty()
        $("#drop").append("<h1>Upuść pliki</h1>")
        e.stopPropagation();
        e.preventDefault();
    });

    $('#drop').on('dragover', function (e) {
        // console.log("drag over na divie")
        $("#drop").empty()
        $("#drop").append("<h1>Upuść pliki</h1>")
        e.stopPropagation();
        e.preventDefault();
    });


    $('#drop').on('dragleave', function (e) {
        $("#drop").empty()
        $("#drop").append("<h1>Prześlij pliki</h1>")
        // console.log("dragleave na divie")
        e.stopPropagation();
        e.preventDefault();
    });
    $('html').on('dragleave', function (e) {
        $("#drop").empty()
        $("#drop").append("<h1>Prześlij pliki</h1>")
        // console.log("dragleave na divie")
        e.stopPropagation();
        e.preventDefault();
    });
})