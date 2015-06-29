<?php
/**
 * Part of the Robin Radic's PHP packages.
 *
 * MIT License and copyright information bundled with this package
 * in the LICENSE file or visit http://radic.mit-license.com
 */
namespace Laradic\Support\Traits;

/**
 * This is the Singleton class.
 *
 * @package        Laradic\Support
 * @version        1.0.0
 * @author         Robin Radic
 * @license        MIT License
 * @copyright      2015, Robin Radic
 * @link           https://github.com/robinradic
 */
trait Singleton {
    /**
     *
     */
    protected function __construct()
    {
        if(method_exists($this, 'init')){
            call_user_func_array([$this, 'init'], func_get_args());
        }
    }

    /**
     * getInstance
     *
     * @return static
     */
    public static function getInstance()
    {
        if (isset(static::$instance))
        {
            return static::$instance;
        }

        $instance = new static();

        static::$instance = $instance;

        return $instance;
    }

    /**
     * @var
     */
    private static $instance;

    /**
     * init
     *
     * @return mixed
     */
    abstract protected function init();
}
