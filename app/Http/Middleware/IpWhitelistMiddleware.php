
/*
|--------------------------------------------------------------------------
| 2. Create IP Whitelist Middleware
|--------------------------------------------------------------------------
|
| This middleware will be the security gate for our API.
| Generate it with: php artisan make:middleware IpWhitelistMiddleware
| Then, place the following code inside the generated file at:
| app/Http/Middleware/IpWhitelistMiddleware.php
|
*/

namespace VanguardLTE\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class IpWhitelistMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $allowedIps = collect(explode(',', env('WHITELISTED_IPS', '127.0.0.1')))
            ->map(fn ($ip) => trim($ip))
            ->filter()
            ->values()
            ->toArray();

        $apiKey = env('HONO_API_KEY');

        // 1. Check if the request's IP is in our whitelist
        if (!in_array($request->ip(), $allowedIps, true)) {
            Log::warning('IP Whitelist Blocked: ' . $request->ip(), ['allowed_ips' => $allowedIps]);

            return response()->json(['error' => 'Forbidden: IP not allowed'], 403);
        }

        // 2. Check for the presence of the secret API key
        if (!$request->hasHeader('X-API-KEY')) {
            Log::warning('IP Whitelist Blocked: Missing API Key', ['ip' => $request->ip()]);

            return response()->json(['error' => 'Forbidden: Missing API Key'], 403);
        }

        // 3. Validates that the secret API key is configured and matches
        if (empty($apiKey)) {
            Log::error('IP Whitelist misconfigured: HONO_API_KEY is missing');

            return response()->json(['error' => 'Server error: API key not configured'], 500);
        }

        if (!hash_equals($apiKey, $request->header('X-API-KEY'))) {
            Log::warning('IP Whitelist Blocked: Invalid API Key from ' . $request->ip());

            return response()->json(['error' => 'Forbidden: Invalid API Key'], 403);
        }

        return $next($request);
    }
}
