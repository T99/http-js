import { ImmutableHTTPMessage } from "./immutable-http-message";
import { ImmutableHTTPResponse } from "./immutable-http-response";
import { HTTPMethodable } from "../../schema/http-method";
import { ImmutableHTTPHeadersManager, ParseableHTTPHeaders } from "../../headers/immutable-http-headers-manager";

export class ImmutableHTTPRequest extends ImmutableHTTPMessage {
	
	public constructor(method: HTTPMethodable, url: string | URL,
					   headersOrHeadersManager?: ParseableHTTPHeaders | ImmutableHTTPHeadersManager) {
		
		super(method, url, headersOrHeadersManager);
		
		// If this is the final constructor call, freeze this object, protecting us from any possible mutation.
		if (Object.getPrototypeOf(this) === ImmutableHTTPRequest) Object.freeze(this);
		
	}
	
	public getMatchingResponse(): ImmutableHTTPResponse | Promise<ImmutableHTTPResponse> {
		
		return undefined as any;
		
	}

}
