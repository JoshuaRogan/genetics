<?php namespace Laradic\Support;

/**
 * Part of the Radic packges.
 * Licensed under the MIT license.
 *
 * @package    dev9
 * @author     Robin Radic
 * @license    MIT
 * @copyright  (c) 2011-2015, Robin Radic
 * @link       http://radic.mit-license.org
 */
use Webmozart\PathUtil\Path as BasePath;

/**
 * Provides utility methods for handling path strings.
 *
 * The methods in this class are able to deal with both UNIX and Windows paths
 * with both forward and backward slashes. All methods return normalized parts
 * containing only forward slashes and no excess "." and ".." segments.
 *
 * @package        Laradic\Support
 * @version        1.0.0
 * @author         Robin Radic
 * @license        MIT License
 * @copyright      2015, Robin Radic
 * @link           https://github.com/robinradic
 */
class Path extends BasePath
{

    /**
     * Joins a split file system path.
     *
     * @param string $path,...  Array or parameters of strings , The split path.
     *
     * @return string The joined path.
     */
    public static function join()
    {

        $args = func_get_args();
        if(func_num_args() === 1 and is_array($args[0]))
        {
            $args = $args[0];
        }
        foreach($args as $i => $arg)
        {
            $args[$i] = String::removeRight($args[$i], '/');
            if($i > 0)
            {
                $args[ $i ] = String::removeLeft($args[$i], '/');
            }
        }
        return join(DIRECTORY_SEPARATOR, $args);


    }
}
