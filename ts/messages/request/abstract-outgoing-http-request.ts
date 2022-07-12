import { HTTPRequest } from "./http-request";
import type { OutgoingHTTPMessage } from "../message/outgoing-http-message";
import type { AbstractIncomingHTTPResponse }
	from "../response/abstract-incoming-http-response";

// DOC-ME [9/25/21 @ 2:00 PM] Documentation required!
export abstract class AbstractOutgoingHTTPRequest extends HTTPRequest
	implements OutgoingHTTPMessage {
	
	// TODO [9/25/21 @ 1:58 PM] Move this somewhere else!
	protected static readonly HTTP_STATUS_LINE_REGEX: RegExp = new RegExp(
		"^(?:http)/" +
		"(?<version_number>(?<major_version>\\d+)" +
		"(?:\\.(?<minor_version>\\d+))?)" +
		"[^\\S\\v\\r\\n]+" +
		"(?<status_number>\\d+)" +
		"[^\\S\\v\\r\\n]+" +
		"(?<status_message>.+)$",
		"ui",
	);
	
	public abstract hasBeenSent(): boolean;
	
	public abstract timeSent(): number | undefined;
	
	public abstract send(): Promise<AbstractIncomingHTTPResponse>;
	
}
