require(["./js/main.js"], function() {
    require(["jquery"], function($) {
        $.ajax({
            url: "/api/list",
            type: "get",
            dataType: "json",
            success: function(res) {
                if (res.code == 0) {
                    render(res.data, "全部");
                    tab(res.data)
                }
            }
        })

        function render(data, k) {
            $.each(data, function(i, ks) {
                if (k == i) {
                    console.log(32)
                    $.each(ks, function(i, item) {
                        var str = "";
                        str += `
                                <li>
                                <p>${item.title}</p>
                            </li>`
                        $(".rigth").append(str)
                    })
                }
            })
        }
        tab();

        function tab(data) {
            $(".left li").on("click", function() {
                var text = $(this).text();
                $(this).addClass("active").siblings().removeClass("active");
                $(".rigth").html("");
                render(data, text)
            })
        }
    })
})