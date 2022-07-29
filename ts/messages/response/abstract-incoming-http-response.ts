import { HTTPResponse } from "./http-response";
import type { IncomingHTTPMessage } from "../message/incoming-http-message";

/**
 * Represents an HTTP response that was received in response to an enacted
 * {@link OutgoingHTTPRequest} instance.
 *
 * @see {@link HTTPResponse} For a more generic HTTP response object.
 */
export abstract class AbstractIncomingHTTPResponse extends HTTPResponse
	implements IncomingHTTPMessage {
	
	public abstract timeReceived(): number;
	
}
