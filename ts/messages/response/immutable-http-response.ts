import { HTTPStatusCode } from "../../schema/http-status-code";
import { HTTPRequest } from "../request/http-request";
import { ImmutableHTTPMessage } from "../message/immutable-http-message";

// DOC-ME [9/20/2021 @ 4:59 PM] Documentation is required!
export interface ImmutableHTTPResponse extends ImmutableHTTPMessage {
	
	// DOC-ME [10/1/2021 @ 12:53 PM] Documentation is required!
	hasMatchingRequest(): boolean;
	
	// DOC-ME [9/25/21 @ 1:59 PM] Documentation required!
	getMatchingRequest(): HTTPRequest | undefined;
	
	// DOC-ME [9/25/21 @ 1:59 PM] Documentation required!
	getStatusCode(): HTTPStatusCode;
	
}
