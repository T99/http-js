import { HTTPMessage, HTTPMessageConfig } from "../message/http-message";
import { ImmutableHTTPRequest } from "./immutable-http-request";
import { MutableHTTPRequest } from "./mutable-http-request";

export type HTTPRequestConfig = HTTPMessageConfig & {};

export class HTTPRequest extends HTTPMessage implements ImmutableHTTPRequest, MutableHTTPRequest {
	
	public constructor(config: HTTPRequestConfig) {
		
		super(config);
		
	}
	
}
