var emailPattern = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

(function ($, w, d, undefined) {


    function getValue($elm) {

        var val

        if ($elm.is(":checkbox")) {
            val = $elm.is(":checked")
        } else {
            val = $elm.val()
        }

        return val
    }

    function validate($form, rules) {

        var errors = {}, $elm, val, selector, validator, rule, message, error, isValid = true
        for (selector in rules) {

            $elm = $form.find(selector)
            if ($elm.length) {

                val = getValue($elm)

                rule = rules[selector]

                error = false
                for (validator in rule) {
                    message = rule[validator]

                    switch (validator) {
                        case "notblank":
                            if (!val.length) error = true
                            break
                        case "email":
                            if (!val.match(emailPattern)) error = true
                            break
                        case "boolean":
                            if (!~~val) error = true
                            break
                    }

                    if (error == true) {
                        errors[selector] = message
                        error = true
                        isValid = false
                        break
                    }
                }
            }
        }

        return isValid ? true : errors
    }

    function onSubmit($form, rules) {

        //var $groups = $form.find()
        var errors, selector, $elm, message

        $form.find(".has-error").removeClass("has-error")
        $form.find(".help-block").slideUp(0)

        if (true !== (errors = validate($form, rules))) {
            for (selector in errors) {

                $elm = $form.find(selector)
                message = errors[selector]

                if ($elm.length) {
                    $elm.closest('.form-group').addClass("has-error")
                        .find('.help-block').text(message).slideDown(0)
                }
            }

            return false
        }
        return true
    }

    $("#main-form").on('submit', function () {
        var rules = {
            "#inputText": {
                "notblank": "Вы не заполнили поле"
            },
            "#inputEmail": {
                "notblank": "Вы не заполнили поле",
                "email": "Вы некорректно ввели E-mail"
            },
            "#termsCheckbox": {
                "boolean": "Для продолжения, необходимо согласиться с правилами"
            }
        }


        return true // onSubmit($(this), rules)
    })


})(jQuery, window, document)