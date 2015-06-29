<?php
/**
 * Part of the Robin Radic's PHP packages.
 *
 * MIT License and copyright information bundled with this package
 * in the LICENSE file or visit http://radic.mit-license.com
 */
namespace Laradic\Support;

/**
 * {@inheritdoc}
 */
class SupportServiceProvider extends ServiceProvider
{

    /**
     * {@inheritdoc}
     */
    public function boot()
    {
        /** @var \Illuminate\Foundation\Application $app */
        $app = parent::boot();
    }

    /**
     * {@inheritdoc}
     */
    public function register()
    {
        /** @var \Illuminate\Foundation\Application $app */
        $app          = parent::register();
        $app['files'] = $app->share(function () #Application $app)
        {
            return new Filesystem();
        });
        require_once __DIR__ . '/helpers.php';


    }
}
