<?php

function format_indent($number_of_indent = 1): string
{
    return str_repeat("\t", $number_of_indent);
}

function format_new_line($number_of_lines = 1): string
{
    return str_repeat("\n", $number_of_lines);
}