type HTTPHeaderField = CommonHTTPHeaderFields | string;

type CommonHTTPHeaderFields =
	| "Accept"
	| "Authorization"
	| "Age"
	| "Cache-Control"
	| "Clear-Site-Data"
	| "Connection"
	| "Content-Length"
	| "Content-Type"
	| "Cookie"
	| "Expires"
	| "Host"
	| "Keep-Alive"
	| "Last-Modified"
	| "Location"
	| "Set-Cookie"
	| "Vary"
	| "Warning";
