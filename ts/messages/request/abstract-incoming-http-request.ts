import { HTTPRequest } from "./http-request";
import { IncomingHTTPMessage } from "../message/incoming-http-message";

// DOC-ME [9/25/21 @ 1:59 PM] Documentation required!
export abstract class AbstractIncomingHTTPRequest extends HTTPRequest implements IncomingHTTPMessage {
	
	public abstract timeReceived(): number;
	
}
