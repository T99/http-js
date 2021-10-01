import { ImmutableHTTPMessage } from "../message/immutable-http-message";
import { HTTPResponse } from "../response/http-response";

// DOC-ME [9/21/2021 @ 9:44 AM] Documentation is required!
export interface ImmutableHTTPRequest extends ImmutableHTTPMessage {
	
	// DOC-ME [10/1/2021 @ 12:58 PM] Documentation is required!
	hasMatchingResponse(): boolean;
	
	// DOC-ME [10/1/2021 @ 12:58 PM] Documentation is required!
	getMatchingResponse(): HTTPResponse | undefined;
	
}
