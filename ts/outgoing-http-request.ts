// import http from "http";
import { IncomingHTTPResponse } from "./incoming-http-response";
import { MutableHTTPMessage } from "./mutable-http-message";
import { HTTPMethodable } from "./schema/http-method";

export class OutgoingHTTPRequest extends MutableHTTPMessage {
	
	public constructor(method: HTTPMethodable, url: string | URL) {
		
		super(method, url);
		
	}
	
	public execute(): Promise<IncomingHTTPResponse> {
		
		return new Promise<IncomingHTTPResponse>((resolve: (value: IncomingHTTPResponse | PromiseLike<IncomingHTTPResponse>) => void, reject: (reason: Error) => void): void => {
			
			// http.request(this.getURL(), {
			// 	method: this.getMethod().getName()
			// });
			
		});
		
	}
	
}
