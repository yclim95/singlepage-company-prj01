<?php

if(!$_POST['course']) die("0");

$course = $_POST['course'];

if(file_exists('courses/'.$course.'.html'))
echo file_get_contents('courses/'.$course.'.html');

else echo " $course There is no such page!";
?>
