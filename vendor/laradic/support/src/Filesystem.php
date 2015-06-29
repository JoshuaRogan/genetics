<?php
/**
 * Part of the Robin Radic's PHP packages.
 *
 * MIT License and copyright information bundled with this package
 * in the LICENSE file or visit http://radic.mit-license.com
 */
namespace Laradic\Support;

use Illuminate\Filesystem\Filesystem as BaseFS;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;
use RegexIterator;
use Symfony\Component\Filesystem\Filesystem as SymFS;

/**
 * Extends the Laravel Filesystem with extra functionality like recursive glob and recursive search.
 *
 * @package        Laradic\Support
 * @version        1.0.0
 * @author         Robin Radic
 * @license        MIT License
 * @copyright      2015, Robin Radic
 * @link           https://github.com/robinradic
 * @mixin \Symfony\Component\Filesystem\Filesystem
 * {@inheritdoc}
 */
class Filesystem extends BaseFS
{

    protected $symFs;

    public function __construct()
    {
        $this->symFs = new SymFS;
    }

    public function __call($method, $parameters)
    {
        if ( method_exists($this->symFs, $method) )
        {
            return call_user_func_array([ $this->symFs, $method ], $parameters);
        }
    }


    /**
     * Recursive glob
     *
     * @param     $pattern
     * @param int $flags
     * @return array
     */
    public function rglob($pattern, $flags = 0)
    {
        $files = glob($pattern, $flags);
        foreach ( glob(dirname($pattern) . '/*', GLOB_ONLYDIR | GLOB_NOSORT) as $dir )
        {
            $files = array_merge($files, $this->rglob($dir . '/' . basename($pattern), $flags));
        }

        return $files;
    }

    /**
     * Search the folder recursively for files using regular expressions
     *
     * @param $folder
     * @param $pattern
     * @return array
     */
    public function rsearch($folder, $pattern)
    {
        $dir      = new RecursiveDirectoryIterator($folder);
        $ite      = new RecursiveIteratorIterator($dir);
        $files    = new RegexIterator($ite, $pattern, RegexIterator::GET_MATCH);
        $fileList = array();
        foreach ( $files as $file )
        {
            $fileList = array_merge($fileList, $file);
        }

        return $fileList;
    }
}
