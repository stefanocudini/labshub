<?php
$ip = $_SERVER['REMOTE_ADDR'];
#$ua = $_SERVER['HTTP_USER_AGENT'];

header("Content-Type: application/json; charset=UTF-8");
echo json_encode(array('ip'=>$ip));
?>

