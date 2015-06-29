<?php
/**
 * Part of the Robin Radic's PHP packages.
 *
 * MIT License and copyright information bundled with this package
 * in the LICENSE file or visit http://radic.mit-license.com
 */
namespace Laradic\Support\Traits;

/**
 * This is the MultiSingleton.
 *
 * @package        Laradic\Support
 * @version        1.0.0
 * @author         Robin Radic
 * @license        MIT License
 * @copyright      2015, Robin Radic
 * @link           https://github.com/robinradic
 */
trait MultiSingleton
{
    /**
     *
     */
    protected function __construct()
    {
        if ( method_exists($this, 'init') )
        {
            call_user_func_array([ $this, 'init' ], func_get_args());
        }
    }

    /**
     * getInstance
     *
     * @param string $name
     * @return static
     */
    public static function getInstance($name = 'default')
    {
        if ( isset(static::$instances[ $name ]) )
        {
            return static::$instances[ $name ];
        }

        $instance = new static();

        static::$instances[ $name ] = $instance;

        return $instance;
    }

    /**
     * @var array
     */
    private static $instances = array();

    /**
     * init
     *
     * @return mixed
     */
    abstract protected function init();
}
