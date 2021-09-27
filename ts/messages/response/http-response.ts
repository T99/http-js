import { HTTPMessage, HTTPMessageConfig } from "../message/http-message";
import { ImmutableHTTPResponse } from "./immutable-http-response";
import { MutableHTTPResponse } from "./mutable-http-response";
import { HTTPStatusCode } from "../../schema/http-status-code";
import { HTTPRequest } from "../request/http-request";

export type HTTPResponseConfig = HTTPMessageConfig & {
	
	statusCode: number | HTTPStatusCode;
	
};

export class HTTPResponse extends HTTPMessage implements ImmutableHTTPResponse, MutableHTTPResponse {
	
	// DOC-ME [9/25/21 @ 1:59 PM] Documentation required!
	protected statusCode: HTTPStatusCode;
	
	// DOC-ME [9/25/21 @ 1:59 PM] Documentation required!
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
