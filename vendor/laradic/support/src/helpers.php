<?php
/**
 * Part of the Laradic packages.
 * MIT License and copyright information bundled with this package in the LICENSE file.
 *
 * @author      Robin Radic
 * @license     MIT
 * @copyright   2011-2015, Robin Radic
 * @link        http://radic.mit-license.org
 */

use Laradic\Support\Path;

if ( ! function_exists('path_join') )
{
    function path_join()
    {
        return forward_static_call_array(['Laradic\Support\Path', 'join'], func_get_args());
    }
}

if ( ! function_exists('path_is_absolute') )
{
    function path_is_absolute()
    {
        return forward_static_call_array(['Laradic\Support\Path', 'isAbsolute'], func_get_args());
    }
}

if ( ! function_exists('path_is_relative') )
{
    function path_is_relative()
    {
        return forward_static_call_array(['Laradic\Support\Path', 'isRelative'], func_get_args());
    }
}

if ( ! function_exists('path_get_directory') )
{
    function path_get_directory()
    {
        return forward_static_call_array(['Laradic\Support\Path', 'getDirectory'], func_get_args());
    }
}

if ( ! function_exists('path_get_extension') )
{
    /**
     * path_get_extension
     *
     * @return mixed
     */
    function path_get_extension()
    {
        return forward_static_call_array(['Laradic\Support\Path', 'getExtension'], func_get_args());
    }
}

if ( ! function_exists('path_get_filename') )
{
    function path_get_filename()
    {
        return forward_static_call_array(['Laradic\Support\Path', 'getFilename'], func_get_args());
    }
}

