import { HTTPMessage, HTTPMessageConfig } from "../message/http-message";
import { HTTPResponse } from "../response/http-response";

export type HTTPRequestConfig = HTTPMessageConfig & {};

export class HTTPRequest extends HTTPMessage {
	
	protected response?: HTTPResponse;
	
	public constructor(config: HTTPRequestConfig) {
		
		super(config);
		
	}
	
	public hasMatchingResponse(): boolean {
		
		return this.response !== undefined;
		
	}
	
	public getMatchingResponse(): HTTPResponse | undefined {
		
		return this.response;
		
	}
	
	public setMatchingResponse(response: HTTPResponse): void {
		
		this.response = response;
		
	}
	
}
