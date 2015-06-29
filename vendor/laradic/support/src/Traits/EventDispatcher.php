<?php namespace Laradic\Support\Traits;

use Illuminate\Contracts\Events\Dispatcher;

/**
 * Part of the Radic packages.
 */
trait EventDispatcher
{

    /** @var \Illuminate\Contracts\Events\Dispatcher */
    protected static $dispatcher;

    public static function setDispatcher(Dispatcher $dispatcher)
    {
        static::$dispatcher = $dispatcher;
    }

    public static function getDispatcher()
    {
        return static::$dispatcher;
    }

    protected function registerEvent($name, \Closure $cb)
    {
        if ( ! isset(static::$dispatcher) )
        {
            $this->initEventDispatcher();
        }
        static::$dispatcher->listen($name, $cb);
    }

    protected function fireEvent($name, $payload = null)
    {
        if ( ! isset(static::$dispatcher) )
        {
            $this->initEventDispatcher();
        }
        static::$dispatcher->fire($name, $payload);
    }

    protected function initEventDispatcher()
    {
        static::setDispatcher(app('events'));
    }
}
