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
			ini_set('opcache.fast_shutdown', '0');

			$cachedViewsDirectory=app('path.storage').'/views/';
        	$files = glob($cachedViewsDirectory.'*');
	        foreach($files as $file) {
	            if(is_file($file)) {
	                @unlink($file);
	            }
	              
	        }
	         
		}
		else{
			
		}

		// echo "Current" . ini_get('opcache.revalidate_freq');

		return $next($request);
	}

}
