import { HTTPMessage, HTTPMessageConfig } from "./http-message";
import { ImmutableHTTPResponse } from "./interfaces/immutable-http-response";
import { MutableHTTPResponse } from "./interfaces/mutable-http-response";
import { HTTPStatusCode } from "../schema/http-status-code";
import { HTTPRequest } from "./http-request";

export type HTTPResponseConfig = HTTPMessageConfig & {
	
	statusCode: number | HTTPStatusCode;
	
};

export class HTTPResponse extends HTTPMessage implements ImmutableHTTPResponse, MutableHTTPResponse {
	
	protected statusCode: HTTPStatusCode;
	
	public constructor(config: HTTPResponseConfig) {
		
		super(config);
		
		if (typeof config.statusCode === "number") this.statusCode = HTTPStatusCode.fromStatusCode(config.statusCode);
		else this.statusCode = config.statusCode;
		
	}
	
	public getMatchingRequest(): HTTPRequest {
		
		return undefined as any;
		
	}
	
	public getStatusCode(): HTTPStatusCode {
		
		return this.statusCode;
		
	}
	
}
