<?php
/**
 * Part of the Robin Radic's PHP packages.
 *
 * MIT License and copyright information bundled with this package
 * in the LICENSE file or visit http://radic.mit-license.com
 */
namespace Laradic\Support;

use Illuminate\View\Compilers\BladeCompiler;

/**
 * This is the TemplateParser class.
 *
 * @package        Laradic\Support
 * @version        1.0.0
 * @author         Robin Radic
 * @license        MIT License
 * @copyright      2015, Robin Radic
 * @link           https://github.com/robinradic
 */
class StubGenerator
{
    protected $compiler;

    protected $tmpDir;

    protected $files;

    /** Instantiates the class */
    public function __construct(BladeCompiler $compiler)
    {
        $this->compiler = $compiler;
        $this->files = new Filesystem();
    }

    public function render($string, array $vars = array())
    {
        $fileName = uniqid(time());
        $path = storage_path($fileName);
        $this->files->put($path, $this->compiler->compileString($string));

        if (is_array($vars) && !empty($vars)) {
            extract($vars);
        }

        ob_start();
        include($path);
        $var=ob_get_contents();
        ob_end_clean();

        $this->files->delete($path);
        return $var;

    }
}
