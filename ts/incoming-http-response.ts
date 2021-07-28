import { HTTPHeaders } from "./schema/immutable-http-headers-manager";
import { ImmutableHTTPMessage } from "./immutable-http-message";
import { HTTPMethodable } from "./schema/http-method";

export class IncomingHTTPResponse extends ImmutableHTTPMessage {
	
	public constructor(method: HTTPMethodable, url: string | URL, headers?: HTTPHeaders) {
		
		super(method, url, headers);
		
	}
	
}
