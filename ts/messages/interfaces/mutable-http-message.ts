import type { ImmutableHTTPMessage } from "./immutable-http-message";
import type { MutableHTTPHeadersManager } from "../../headers/mutable-http-headers-manager";
import type { HTTPMethod } from "../../schema/http-method";

// DOC-ME [9/20/2021 @ 5:00 PM] Documentation is required!
export interface MutableHTTPMessage extends ImmutableHTTPMessage {
	
	// DOC-ME [9/20/2021 @ 5:00 PM] Documentation is required!
	setMethod(method: string | HTTPMethod): void;
	
	// DOC-ME [9/20/2021 @ 5:00 PM] Documentation is required!
	setURL(url: string | URL): void;
	
	// DOC-ME [9/20/2021 @ 5:00 PM] Documentation is required!
	getHeadersManager(): MutableHTTPHeadersManager;
	
	// DOC-ME [9/20/2021 @ 5:00 PM] Documentation is required!
	setBody(body: any): void;
	
}
