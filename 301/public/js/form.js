$(document).ready(function() {
    localStorage = window.localStorage;

    //jQuery time
    var current_fs,
        next_fs,
        previous_fs; //fieldsets
    var left; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches

    //checks if input has already been saved and sets it to the default value
    for (var key in localStorage) {
        if (key === "agree") {
            var id = "#" + key;
            if (localStorage.getItem("agree") === "true") {
                $(id).attr('checked', "true");
            }
        } else if (key === "group") {
            var id = "#group-" + localStorage.getItem("group");
            $(id).attr('checked', 'true');
        } else if (key === "veteran") {
            var id = "#" + localStorage.getItem("veteran");
            $(id).attr('checked', 'true');
        } else {
            var id = "#" + key;
            $(id).attr("value", localStorage.getItem(key));
        }
    }

    $(".submit").click(function() {
        var slideElements = $(this).parent()[0].childNodes;
        var valid = true;
        $(this).parent()[0].classList.remove("error");

        //checks if all input fields have been set
        for (var i = 0; i < slideElements.length; i++) {
            if (slideElements[i]instanceof HTMLInputElement) {
                if (slideElements[i].type === "checkbox") {
                    if (!slideElements[i].checked) {
                        valid = false;
                    }
                } else if (slideElements[i].type === "number" || slideElements[i].type === "date") {
                    if (slideElements[i].name !== "oc-date" && slideElements[i].value.length === 0) {
                        valid = false;
                    }
                } else if (slideElements[i].name === "group") {
                    if ($("input[name='group']:checked").length === 0) {
                        valid = false;
                    }
                } else if (slideElements[i].name === "veteran") {
                    if ($("input[name='veteran']:checked").length === 0) {
                        valid = false;
                    }
                }

            }
        }

        if (valid) {
            //saves data to local storage
            $(".section input").each(function(index) {
                if ($(this)[0].name === "group" && $(this).is(':checked')) {
                    var groupNo = $(this)[0].value.toString();
                    localStorage.setItem("group", groupNo);
                }
                if ($(this)[0].name === "veteran" && $(this).is(':checked')) {
                    var veteran = $(this)[0].value.toString();
                    localStorage.setItem("veteran", veteran);
                }
                if ($(this)[0].type === "checkbox") {
                    localStorage.setItem($(this)[0].name, $(this).is(':checked'));
                } else {
                    if ($(this)[0].type !== "radio") {

                        localStorage.setItem($(this)[0].name, $(this)[0].value);
                    }
                }
            });

            //animates slides
            if (animating)
                return false;
            animating = true;

            current_fs = $(this).parent();
            next_fs = $(this).parent().next();

            //activate next step on progressbar using the index of next_fs
            $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

            //show the next fieldset
            next_fs.show();
            //hide the current fieldset with style
            current_fs.animate({}, {
                complete: function() {
                    current_fs.hide();
                    animating = false;
                },
                easing: 'easeInOutBack'
            });
        } else {
            $(this).parent()[0].className += " error";
        }
    });

    $(".previous").click(function() {
        if (animating)
            return false;
        animating = true;

        current_fs = $(this).parent();
        previous_fs = $(this).parent().prev();
        $(this).parent()[0].classList.remove("error");

        //de-activate current step on progressbar
        $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

        //show the previous fieldset
        previous_fs.show();
        //hide the current fieldset with style
        current_fs.animate({}, {
            complete: function() {
                current_fs.hide();
                animating = false;
            },
            easing: 'easeInOutBack'
        });
    });

});

function filterInput(el) {
    return true;
}
