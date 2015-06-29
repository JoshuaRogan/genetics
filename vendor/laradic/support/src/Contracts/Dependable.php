<?php
/**
 * Part of the Radic packages.
 */
namespace Laradic\Support\Contracts;

/**
 * Dependable contract
 *
 * @package     Laradic\Support\Contracts
 * @author      Robin Radic
 * @license     MIT
 * @copyright   2011-2015, Robin Radic
 * @link        http://radic.mit-license.org
 */
interface Dependable
{
    /**
     * get dependencies
     *
     * @return array
     */
    public function getDependencies();

    /**
     * get item key/identifier
     *
     * @return string|mixed
     */
    public function getHandle();
}
