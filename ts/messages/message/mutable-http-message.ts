import type { ImmutableHTTPMessage } from "./immutable-http-message";
import type { MutableHTTPHeadersManager } from "../../headers/mutable-http-headers-manager";
import type { HTTPMethod } from "../../schema/http-method";

/**
 * An interface representing a mutable HTTP message.
 * 
 * @author Trevor Sears <trevorsears.main@gmail.com>
 * @version v0.1.0
 * @since v0.1.0
 */
export interface MutableHTTPMessage extends ImmutableHTTPMessage {
	
	// DOC-ME [9/20/2021 @ 5:00 PM] Documentation is required!
	setMethod(method: string | HTTPMethod): void;
	
	// DOC-ME [9/20/2021 @ 5:00 PM] Documentation is required!
	setURL(url: string | URL): void;
	
	getHeadersManager(): MutableHTTPHeadersManager;
	
	// DOC-ME [9/20/2021 @ 5:00 PM] Documentation is required!
	setBody(body: any): void;
	
}
