<?php
/**
 * Part of the Robin Radic's PHP packages.
 *
 * MIT License and copyright information bundled with this package
 * in the LICENSE file or visit http://radic.mit-license.com
 */
namespace Laradic\Support\Traits;

/**
 * This is the DotArrayAccessTrait class.
 *
 * @package        Laradic\Support
 * @version        1.0.0
 * @author         Robin Radic
 * @license        MIT License
 * @copyright      2015, Robin Radic
 * @link           https://github.com/robinradic
 */
trait DotArrayAccess
{
    /**
     * getArrayAccessor
     *
     * @return mixed
     */
    abstract protected function getArrayAccessor();

    /**
     * Determine if an item exists at an offset.
     *
     * @param  mixed $key
     * @return bool
     */
    public function offsetExists($key)
    {
        return array_has($this->{$this->getArrayAccessor()}, $key);
    }

    /**
     * Get an item at a given offset.
     *
     * @param  mixed $key
     * @return mixed
     */
    public function offsetGet($key)
    {
        return array_get($this->{$this->getArrayAccessor()}, $key);
    }

    /**
     * Set the item at a given offset.
     *
     * @param  mixed $key
     * @param  mixed $value
     * @return $this
     */
    public function offsetSet($key, $value = null)
    {
        if ( is_array($key) )
        {
            foreach ($key as $innerKey => $innerValue)
            {
                array_set($this->{$this->getArrayAccessor()}, $innerKey, $innerValue);
            }
        }
        else
        {
            array_set($this->{$this->getArrayAccessor()}, $key, $value);
        }
        return $this;
    }

    /**
     * Unset the item at a given offset.
     *
     * @param  string $key
     * @return $this
     */
    public function offsetUnset($key)
    {
        array_set($this->{$this->getArrayAccessor()}, $key, null);
        return $this;
    }
}
