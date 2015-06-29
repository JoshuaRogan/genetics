<?php
/**
 * Part of the Robin Radic's PHP packages.
 *
 * MIT License and copyright information bundled with this package
 * in the LICENSE file or visit http://radic.mit-license.com
 */
namespace Laradic\Support\Stringy;

use Stringy\Stringy as BaseStringy;

/**
 * This is the Stringy.
 *
 * @package        Laradic\Support
 * @version        1.0.0
 * @author         Robin Radic
 * @license        MIT License
 * @copyright      2015, Robin Radic
 * @link           https://github.com/robinradic
 */
class Stringy extends BaseStringy
{

    /**
     * Transforms "vendor-name/package-name" into "VendorName\PackageName"
     *
     * @return \Laradic\Support\Stringy\Stringy
     */
    public function namespacedStudly()
    {
        $str = implode('\\', array_map('studly_case', explode('/', $this->str)));
        return static::create($str, $this->encoding);
    }

    /**
     * explode
     *
     * @param      $delimiter
     * @param null $limit
     * @return array
     */
    public function split($delimiter, $limit = null)
    {
        return explode($delimiter, $this->str, $limit);
    }
}
