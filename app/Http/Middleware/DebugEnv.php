<?php namespace Genetics\Http\Middleware;

use Closure;

class DebugEnv {

	/**
	 * If we are in debug mode change some things to make debugging easier
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure  $next
	 * @return mixed
	 */
	public function handle($request, Closure $next)
	{
		
		
		if (env('APP_DEBUG')){
			// echo ini_set('opcache.revalidate_freq', '0');
			ini_set('opcache.revalidate_freq', '0');
		}
		else{
			
		}

		// echo "Current" . ini_get('opcache.revalidate_freq');

		return $next($request);
	}

}
