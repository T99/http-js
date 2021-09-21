import { HTTPMessage, HTTPMessageConfig } from "./http-message";
import { ImmutableHTTPRequest } from "./interfaces/immutable-http-request";
import { MutableHTTPRequest } from "./interfaces/mutable-http-request";

export type HTTPRequestConfig = HTTPMessageConfig & {};

export class HTTPRequest extends HTTPMessage implements ImmutableHTTPRequest, MutableHTTPRequest {
	
	public constructor(config: HTTPRequestConfig) {
		
		super(config);
		
	}
	
}
