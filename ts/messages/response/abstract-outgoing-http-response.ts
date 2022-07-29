import { HTTPResponse } from "./http-response";
import type { OutgoingHTTPMessage } from "../message/outgoing-http-message";

// DOC-ME [9/25/21 @ 1:58 PM] Documentation required!
export abstract class AbstractOutgoingHTTPResponse extends HTTPResponse
	implements OutgoingHTTPMessage {
	
	public abstract hasBeenSent(): boolean;
	
	public abstract timeSent(): number | undefined;
	
	public abstract send(): Promise<void>;
	
}
