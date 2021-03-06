import { HTTPMessage, HTTPMessageConfig } from "../message/http-message";
import { HTTPStatusCode } from "../../schema/http-status-code";
import { HTTPRequest } from "../request/http-request";

export type HTTPResponseConfig = HTTPMessageConfig & {
	
	statusCode: number | HTTPStatusCode;
	
};

export class HTTPResponse extends HTTPMessage {
	
	// DOC-ME [10/1/2021 @ 12:57 PM] Documentation is required!
	protected request?: HTTPRequest;
	
	// DOC-ME [9/25/21 @ 1:59 PM] Documentation required!
	protected statusCode!: HTTPStatusCode;
	
	// DOC-ME [9/25/21 @ 1:59 PM] Documentation required!
	public constructor(config: HTTPResponseConfig) {
		
		super(config);
		
		if (typeof config.statusCode === "number") this.statusCode = HTTPStatusCode.fromStatusCode(config.statusCode);
		else this.statusCode = config.statusCode;
		
	}
	
	public hasMatchingRequest(): boolean {
		
		return this.request !== undefined;
		
	}
	
	public getMatchingRequest(): HTTPRequest | undefined {
		
		return this.request;
		
	}
	
	public setMatchingRequest(request: HTTPRequest): void {
	
		this.request = request;
	
	}
	
	public getStatusCode(): HTTPStatusCode {
		
		return this.statusCode;
		
	}
	
	public setStatusCode(statusCode: number | HTTPStatusCode): void {
		
		if (typeof statusCode === "number") this.statusCode = HTTPStatusCode.fromStatusCode(statusCode);
		else this.statusCode = statusCode;
		
	}
	
}
