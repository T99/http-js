import { HTTPResponse } from "./http-response";
import { IncomingHTTPMessage } from "../message/incoming-http-message";

/**
 * Represents an HTTP response that was received in response to an enacted {@link OutgoingHTTPRequest} instance.
 *
 * @see {@link ImmutableHTTPResponse} For a more generic HTTP response object.
 */
export abstract class AbstractIncomingHTTPResponse extends HTTPResponse implements IncomingHTTPMessage {
	
	public abstract timeReceived(): number;
	
}
