import { ImmutableHTTPMessage } from "./immutable-http-message";
import { HTTPStatusCode } from "../../schema/http-status-code";
import { HTTPMethodable } from "../../schema/http-method";
import { ImmutableHTTPHeadersManager, ParseableHTTPHeaders } from "../../headers/immutable-http-headers-manager";

export class ImmutableHTTPResponse extends ImmutableHTTPMessage {
	
	protected statusCode: HTTPStatusCode;
	
	public constructor(statusCode: HTTPStatusCode, method: HTTPMethodable, url: string | URL,
					   headersOrHeadersManager?: ParseableHTTPHeaders | ImmutableHTTPHeadersManager) {
		
		super(method, url, headersOrHeadersManager);
		
		this.statusCode = statusCode;
		
		// If this is the final constructor call, freeze this object, protecting us from any possible mutation.
		if (Object.getPrototypeOf(this) === ImmutableHTTPResponse) Object.freeze(this);
		
	}
	
	public getStatusCode(): HTTPStatusCode {
		
		return this.statusCode;
		
	}
	
}
