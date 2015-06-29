<?php
namespace Laradic\Support;

/**
 * Part of the Robin Radic's PHP packages.
 *
 * MIT License and copyright information bundled with this package
 * in the LICENSE file or visit http://radic.mit-license.com
 */
use Illuminate\Foundation\Bus\DispatchesCommands;

/**
 * This is the Command.
 *
 * @version        1.0.0
 * @author         Robin Radic
 * @license        MIT License
 * @copyright      2015, Robin Radic
 * @link           https://github.com/robinradic
 */
abstract class Command
{
    use DispatchesCommands;

    /**
     * @var Command[]
     */
    protected $commands = [ ];

    /**
     * @param Command|Command[] $command
     */
    public function addNextCommand($command)
    {
        if ( is_array($command) )
        {
            foreach ( $command as $item )
            {
                $this->commands[ ] = $item;
            }
        }
        else
        {
            $this->commands[ ] = $command;
        }
    }

    public function handlingCommandFinished()
    {
        if ( ! $this->commands )
        {
            return;
        }
        $command = array_shift($this->commands);
        $command->addNextCommand($this->commands);
        $this->dispatch($command);
    }
}
