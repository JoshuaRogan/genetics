<?php
/**
 * Part of the Robin Radic's PHP packages.
 *
 * MIT License and copyright information bundled with this package
 * in the LICENSE file or visit http://radic.mit-license.com
 */
namespace Laradic\Support;

use App;
use Illuminate\Foundation\AliasLoader;
use Illuminate\Support\ServiceProvider as BaseServiceProvider;

/**
 * Extends the Laravel service provider with extra functionality
 *
 * @package        Laradic\Support
 * @version        1.0.0
 * @author         Robin Radic
 * @license        MIT License
 * @copyright      2015, Robin Radic
 * @link           https://github.com/robinradic
 */
abstract class ServiceProvider extends BaseServiceProvider
{

    /**
     * The application instance.
     *
     * @var \Illuminate\Foundation\Application
     */
    protected $app;

    /**
     * Array of configuration files
     *
     * @var array
     */
    protected $configFiles = [ ];

    /** @var string */
    protected $dir;

    /**
     * Path to resources folder, relative to $dir
     *
     * @var string
     */
    protected $resourcesPath = '../resources';

    /**
     * @var array
     */
    protected $providers = [ ];

    /**
     * @var array
     */
    protected $aliases = [ ];

    /**
     * @var array
     */
    protected $middlewares = [ ];

    /**
     * @var array
     */
    protected $prependMiddlewares = [ ];

    /**
     * @var array
     */
    protected $routeMiddlewares = [ ];

    /**
     * @var array
     */
    protected $migrationDirs = [ ];

    /**
     * @var array
     */
    protected $provides = [ ];


    /**
     * Boots the service provider.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function boot()
    {
        /** @var \Illuminate\Foundation\Application $app */
        $app = $this->app;

        if ( isset($this->dir) and isset($this->configFiles) and is_array($this->configFiles) )
        {
            foreach ( $this->configFiles as $fileName )
            {
                $configPath = $this->dir . '/' . $this->resourcesPath . '/config/' . $fileName . '.php';
                $this->publishes([ $configPath => config_path($fileName . '.php') ], 'config');
            }
        }

        return $app;
    }

    /**
     * Register the service provider.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function register()
    {

        /** @var \Illuminate\Foundation\Application $app */
        $app = $this->app;


        $router = $app->make('router');
        $kernel = $app->make('Illuminate\Contracts\Http\Kernel');


        if ( isset($this->dir) )
        {
            foreach ( $this->configFiles as $fileName )
            {
                $configPath = Path::join($this->dir, $this->resourcesPath, 'config', $fileName . '.php');
                #$configPath = $this->dir . $this->resourcesPath . '/config/' . $fileName . '.php';
                $this->mergeConfigFrom($configPath, $fileName);
            }

            foreach ( $this->migrationDirs as $migrationDir )
            {
                $migrationPath = Path::join($this->dir, $this->resourcesPath, $migrationDir);
                $this->publishes([ $migrationPath => base_path('/database/migrations') ], 'migrations');
            }
        }

        foreach ( $this->prependMiddlewares as $middleware )
        {
            $kernel->prependMiddleware($middleware);
        }

        foreach ( $this->middlewares as $middleware )
        {
            $kernel->pushMiddleware($middleware);
        }

        foreach ( $this->routeMiddlewares as $key => $middleware )
        {
            $router->middleware($key, $middleware);
        }

        foreach ( $this->providers as $provider )
        {
            $app->register($provider);
        }

        foreach ( $this->aliases as $alias => $full )
        {
            $app->booting(function () use ($alias, $full)
            {
                $this->alias($alias, $full);
            });
        }

        return $app;
    }

    /**
     * alias
     *
     * @param $name
     * @param $fullyQualifiedName
     */
    protected function alias($name, $fullyQualifiedName)
    {
        AliasLoader::getInstance()->alias($name, $fullyQualifiedName);
    }

    public function provides()
    {
        return $this->provides;
    }
}
