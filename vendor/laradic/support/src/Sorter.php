<?php
/**
 * Part of the Robin Radic's PHP packages.
 *
 * MIT License and copyright information bundled with this package
 * in the LICENSE file or visit http://radic.mit-license.com
 */
namespace Laradic\Support;

use Laradic\Support\Contracts\Dependable;
use Laradic\Support\Contracts\Sortable;

/**
 * Provides dependency sorter functionality
 *
 * @package        Laradic\Support
 * @version        1.0.0
 * @author         Robin Radic
 * @license        MIT License
 * @copyright      2015, Robin Radic
 * @link           https://github.com/robinradic
 */
class Sorter implements Sortable
{

    protected $items = [];

    protected $dependencies = [];

    protected $dependsOn = [];

    protected $missing = [];

    protected $circular = [];

    protected $hits = [];

    protected $sorted = [];

    /**
     * add
     *
     * @param array $items
     * @param bool  $allowNumericitem
     */
    public function add(array $items, $allowNumericitem = false)
    {
        foreach ($items as $item => $_deps)
        {
            if ( ! $allowNumericitem and is_int($item) )
            {
                $this->addItem($_deps);
            }
            else
            {
                $this->addItem($item, $_deps);
            }
        }
    }

    /**
     * addItem
     *
     * @param      $item
     * @param null $_deps
     */
    public function addItem($item, $_deps = null)
    {
        list($item, $_deps) = $this->prepNewItem($item, $_deps);
        $this->setItem($item, $_deps);
    }

    /**
     * sort
     *
     * @return array
     */
    public function sort()
    {
        $this->sorted = array();
        $hasChanged   = true;
        while (count($this->sorted) < count($this->items) && $hasChanged)
        {
            $hasChanged = false;
            foreach ($this->dependencies as $item => $deps)
            {
                if ( $this->satisfied($item) )
                {
                    $this->setSorted($item);
                    $this->removeDependents($item);
                    $hasChanged = true;
                }
                $this->hits[$item]++;
            }
        }

        return $this->sorted;
    }

    /**
     * setItem
     *
     * @param       $item
     * @param array $_deps
     */
    protected function setItem($item, array $_deps)
    {
        $this->items[] = $item;
        foreach ($_deps as $_dep)
        {
            $this->items[]                 = $_dep;
            $this->dependsOn[$_dep][$item] = $item;
            $this->hits[$_dep]             = 0;
        }
        $this->items               = array_unique($this->items);
        $this->dependencies[$item] = $_deps;
        $this->hits[$item]         = 0;
    }

    /**
     * prepNewItem
     *
     * @param $item
     * @param $_deps
     * @return array
     */
    protected function prepNewItem($item, $_deps)
    {
        if ( $item instanceof Dependable )
        {
            $_deps = $item->getDependencies();
            $item  = $item->getHandle();
        }
        elseif ( $_deps instanceof Dependable )
        {
            $_deps = $_deps->getDependencies();
        }
        if ( empty($_deps) )
        {
            $_deps = [];
        }
        elseif ( is_string($_deps) )
        {
            $_deps = (array)preg_split('/,\s?/', $_deps);
        }

        return [$item, $_deps];
    }

    /**
     * satisfied
     *
     * @param $item
     * @return bool
     */
    protected function satisfied($item)
    {
        $pass = true;
        foreach ($this->getDependents($item) as $dep)
        {
            if ( $this->isSorted($dep) )
            {
                continue;
            }

            if ( ! $this->exists($item) )
            {
                $this->setMissing($item, $dep);
                if ( $pass )
                {
                    $pass = false;
                }
            }
            if ( ! $this->hasDependents($dep) )
            {
                if ( $pass )
                {
                    $pass = false;
                }
            }
            else
            {
                $this->setFound($item, $dep);
            }
            if ( $this->isDependent($item, $dep) )
            {
                $this->setCircular($item, $dep);
                if ( $pass )
                {
                    $pass = false;
                }
            }
        }

        return $pass;
    }

    /**
     * setSorted
     *
     * @param $item
     */
    protected function setSorted($item)
    {
        $this->sorted[] = $item;
    }

    /**
     * exists
     *
     * @param $item
     * @return bool
     */
    protected function exists($item)
    {
        return isset($this->items[$item]);
    }

    /**
     * removeDependents
     *
     * @param $item
     */
    protected function removeDependents($item)
    {
        unset($this->dependencies[$item]);
    }

    /**
     * setCircular
     *
     * @param $item
     * @param $item2
     */
    protected function setCircular($item, $item2)
    {
        $this->circular[$item][$item2] = $item2;
    }

    /**
     * setMissing
     *
     * @param $item
     * @param $item2
     */
    protected function setMissing($item, $item2)
    {
        $this->missing[$item][$item2] = $item2;
    }

    /**
     * setFound
     *
     * @param $item
     * @param $item2
     */
    protected function setFound($item, $item2)
    {
        if ( isset($this->missing[$item]) )
        {
            unset($this->missing[$item][$item2]);
            if ( empty($this->missing[$item]) )
            {
                unset($this->missing[$item]);
            }
        }
    }

    /**
     * isSorted
     *
     * @param $item
     * @return bool
     */
    protected function isSorted($item)
    {
        return in_array($item, $this->sorted);
    }

    public function requiredBy($item)
    {
        return isset($this->dependsOn[$item]) ? $this->dependsOn[$item] : [];
    }

    /**
     * isDependent
     *
     * @param mixed|string $item
     * @param mixed|string $item2
     * @return bool
     */
    public function isDependent($item, $item2)
    {
        return isset($this->dependsOn[$item][$item2]);
    }

    /**
     * hasDependents
     *
     * @param mixed|string $item
     * @return bool
     */
    public function hasDependents($item)
    {
        return isset($this->dependencies[$item]);
    }

    /**
     * hasMissing
     *
     * @param mixed|string $item
     * @return bool
     */
    public function hasMissing($item)
    {
        return isset($this->missing[$item]);
    }

    /**
     * isMissing
     *
     * @param mixed|string $dep
     * @return bool
     */
    public function isMissing($dep)
    {
        foreach ($this->missing as $item => $deps)
        {
            if ( in_array($dep, $deps) )
            {
                return true;
            }
        }
    }

    /**
     * hasCircular
     *
     * @param mixed|string $item
     * @return bool
     */
    public function hasCircular($item)
    {
        return isset($this->circular[$item]);
    }

    /**
     * isCircular
     *
     * @param mixed|string $dep
     * @return bool
     */
    public function isCircular($dep)
    {
        foreach ($this->circular as $item => $deps)
        {
            if ( in_array($dep, $deps) )
            {
                return true;
            }
        }
    }

    /**
     * getDependents
     *
     * @param $item
     * @return mixed
     */
    public function getDependents($item)
    {
        return $this->dependencies[$item];
    }

    /**
     * getMissing
     *
     * @param null $str
     * @return array
     */
    public function getMissing($str = null)
    {
        if ( $str )
        {
            return $this->missing[$str];
        }

        return $this->missing;
    }

    /**
     * getCircular
     *
     * @param null $str
     * @return array
     */
    public function getCircular($str = null)
    {
        if ( $str )
        {
            return $this->circular[$str];
        }

        return $this->circular;
    }

    /**
     * getHits
     *
     * @param null $str
     * @return array
     */
    public function getHits($str = null)
    {
        if ( $str )
        {
            return $this->hits[$str];
        }

        return $this->hits;
    }
}
