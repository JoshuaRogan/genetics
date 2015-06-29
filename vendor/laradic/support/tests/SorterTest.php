<?php
/**
 * Part of the Laradic packages.
 * MIT License and copyright information bundled with this package in the LICENSE file.
 *
 * @author      Robin Radic
 * @license     MIT
 * @copyright   2011-2015, Robin Radic
 * @link        http://radic.mit-license.org
 */
namespace Laradic\Tests\Support;

use Laradic\Dev\Traits\LaravelTestCaseTrait;
use Laradic\Dev\Traits\ServiceProviderTestCaseTrait;
use Symfony\Component\VarDumper\VarDumper;

/**
 * Class StrTest
 *
 * @package Laradic\Test\Support
 */
class SorterTest extends SupportTestCase
{
    protected function getSortData()
    {
        return [
            'test' => [],
            'test2' => ['test'],
            'test3' => ['test', 'test2', 'test4'],
            'test4' => ['test2'],
            'test5' => ['not-exist']
        ];
    }
    public function testSorter()
    {
        $a = new \Laradic\Support\Sorter;
        foreach($this->getSortData() as $item => $deps)
        {
            $a->addItem($item, $deps);
        }
        $s = $a->sort();
        $this->assertEquals(['test', 'test2', 'test4', 'test3'], $s);
    }

}
