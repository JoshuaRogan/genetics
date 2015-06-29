<?php
/**
 * Part of the Radic packages.
 */
namespace Laradic\Support\Contracts;

/**
 * Sortable contract
 *
 * @package     Laradic\Support\Contracts
 * @author      Robin Radic
 * @license     MIT
 * @copyright   2011-2015, Robin Radic
 * @link        http://radic.mit-license.org
 */
interface Sortable
{

    /**
     * add an array of items for sorting
     *
     * @return void
     */
    public function add(array $item, $allowNumericKey = false);

    /**
     * add a single item for sorting
     *
     * @return void
     */
    public function addItem($item, $dependsOn = null);

    /**
     * sort the items
     *
     * @return array|mixed
     */
    public function sort();

    /**
     * check if item2 is a dependent of item
     *
     * @param  string|mixed $item
     * @param  string|mixed $item2
     * @return boolean
     */
    public function isDependent($item, $item2);

    /**
     * check if item has dependents
     *
     * @param  string|mixed $item
     * @return boolean
     */
    public function hasDependents($item);

    /**
     * check if item has missing dependents
     *
     * @param  string|mixed $item
     * @return boolean
     */
    public function hasMissing($item);

    /**
     * check if an item is a missing dependency
     *
     * @param  string|mixed $dep
     * @return boolean
     */
    public function isMissing($dep);

    /**
     * check if an item has circular dependents
     *
     * @param  string|mixed $item
     * @return boolean
     */
    public function hasCircular($item);

    /**
     * check if an item is a circular dependency
     *
     * @param  string|mixed $dep
     * @return boolean
     */
    public function isCircular($dep);

    /**
     * get circular item list
     *
     * @return array|mixed
     */
    public function getCircular();

    /**
     * get missing item list
     *
     * @return array|mixed
     */
    public function getMissing();

    /**
     * get hit count list
     *
     * @return array|mixed
     */
    public function getHits();
}
