import { HTTPStatusCode } from "../../schema/http-status-code";
import { HTTPRequest } from "../request/http-request";
import { ImmutableHTTPMessage } from "../message/immutable-http-message";

// DOC-ME [9/20/2021 @ 4:59 PM] Documentation is required!
export interface ImmutableHTTPResponse extends ImmutableHTTPMessage {
	
	// DOC-ME [9/21/2021 @ 9:47 AM] Documentation is required!
	getMatchingRequest(): HTTPRequest;
	
	// DOC-ME [9/20/2021 @ 5:00 PM] Documentation is required!
	getStatusCode(): HTTPStatusCode;
	
}
