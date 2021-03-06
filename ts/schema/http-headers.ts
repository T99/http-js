/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 4:38 PM -- March 17, 2022.
 * Project: @t99/http
 */

export type HTTPHeaderField = 
	| string
	| "Accept"
	| "Access-Control-Allow-Credentials"
	| "Access-Control-Allow-Headers"
	| "Access-Control-Allow-Methods"
	| "Access-Control-Allow-Origin"
	| "Access-Control-Expose-Headers"
	| "Access-Control-Max-Age"
	| "Access-Control-Request-Headers"
	| "Access-Control-Request-Method"
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
	| "Origin"
	| "Set-Cookie"
	| "Vary"
	| "Warning";

export type HTTPContentEncoding =
	| string
	| "aes128gcm"
	| "br"
	| "compress"
	| "deflate"
	| "exi"
	| "gzip"
	| "identity"
	| "pack200-gzip"
	| "x-compress"
	| "x-gzip"
	| "zstd";
