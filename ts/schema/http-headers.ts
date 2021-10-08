export type HTTPHeaderField = 
	| string
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
