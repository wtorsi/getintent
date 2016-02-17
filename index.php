<?php
$rootPath = __DIR__;
$filesDir = "/files/";
$filesPath = $rootPath . $filesDir;

function validate(array $rules, array $data)
{
    $errors = [];
    foreach ($rules as $key => $rule) {
        foreach ($rule as $validator => $message) {
            $val = !isset($data[$key]) ?: $data[$key];
            $pass = true;
            switch ($validator) {
                case "notblank":
                    $pass = (bool)strlen($val);
                    break;
                case "email":
                    $pass = (bool)filter_var($val, FILTER_VALIDATE_EMAIL);
                    break;
                case "boolean":
                    $pass = (bool)$val;
                    break;
            }

            if ($pass == false) {
                $errors[$key] = $message;
                break;
            }
        }
    }

    return $errors;
}

if (isset($_POST['form']) and $form = $_POST['form']) {

    $rules = [
        'name' => [
            "notblank" => "Вы не заполнили поле",
        ],
        'email' => [
            "notblank" => "Вы не заполнили поле",
            "email" => "Email введен некорректно",
        ],
        'terms' => [
            "boolean" => "Вы должны согласиться с правилами ",
        ],
    ];

    if (false == $errors = validate($rules, $form)) {
        $string = json_encode($form);

        if(false == file_exists($filesPath) || false == is_writable($filesPath)){
            throw new Exception("Files dir does not exist or not writable");
        }

        $name = sprintf("%s.json", date("d.m.Y_H:i:s"));
        if(false === file_put_contents($filesPath . $name, $string)){
            throw new Exception("Can not create file for data");
        }

        header("Location: /success.html");
    }
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="media/main/css/main.min.css"/>
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-xs-12 col-sm-6 col-sm-offset-3 ">
            <form id="main-form" action="" method="post" novalidate="novalidate" class="form-horizontal">
                <fieldset>
                    <div class="form-header">
                        <h3>Регистрация</h3>
                    </div>
                    <div class="form-content">

                        <div class="form-group <? if (isset($errors['name'])): ?>has-error<? endif ?>">
                            <label class="col-xs-3 control-label" for="inputText">Имя</label>
                            <div class="col-xs-9">
                                <input id="inputText" name="form[name]" class="form-control" type="text"
                                       value="<? if (isset($form['name'])): ?><?= $form['name'] ?><? endif ?>">
                                <p class="help-block"
                                   <? if (!isset($errors['name'])): ?>style="display: none"<? endif ?>>
                                    <? if (isset($errors['name'])): ?><?= $errors['name'] ?><? endif ?>
                                </p>
                            </div>
                        </div>
                        <div class="form-group <? if (isset($errors['email'])): ?>has-error<? endif ?>">
                            <label class="col-xs-3 control-label" for="inputEmail">Email</label>
                            <div class="col-xs-9">
                                <input id="inputEmail" name="form[email]" class="form-control" type="email"
                                       value="<? if (isset($form['email'])): ?><?= $form['email'] ?><? endif ?>">
                                <p class="help-block"
                                   <? if (!isset($errors['email'])): ?>style="display: none"<? endif ?>>
                                    <? if (isset($errors['email'])): ?><?= $errors['email'] ?><? endif ?>
                                </p>

                            </div>
                        </div>
                        <div class="form-group <? if (isset($errors['terms'])): ?>has-error<? endif ?>">

                            <div class="col-xs-9 col-xs-offset-3">
                                <div class="checkbox">
                                    <label>
                                        <input id="termsCheckbox" name="form[terms]" type="checkbox"
                                               <? if (isset($form['name'])): ?>checked="checked"<? endif ?>>
                                        Согласен с <a href="" target="_blank">правилами</a>
                                    </label>
                                </div>
                                <p class="help-block"
                                   <? if (!isset($errors['terms'])): ?>style="display: none"<? endif ?>>
                                    <? if (isset($errors['terms'])): ?><?= $errors['terms'] ?><? endif ?>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="form-footer">
                        <div class="row">
                            <div class="col-xs-12 text-right">
                                <button type="submit" class="btn btn-default">Отправить</button>
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    </div>
</div>

<script src="media/main/js/jquery-2.1.4.min.js"></script>
<script src="media/main/js/main.min.js"></script>
</body>