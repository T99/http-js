import { ImmutableHTTPResponse } from "./immutable-http-response";
import { MutableHTTPMessage } from "../message/mutable-http-message";
import { MutableHTTPHeadersManager } from "../../headers/mutable-http-headers-manager";
import { HTTPRequest } from "../request/http-request";
import { HTTPStatusCode } from "../../schema/http-status-code";

// DOC-ME [9/20/2021 @ 5:00 PM] Documentation is required!
export interface MutableHTTPResponse extends ImmutableHTTPResponse, MutableHTTPMessage {
	
	getHeadersManager(): MutableHTTPHeadersManager;
	
	// DOC-ME [10/1/2021 @ 12:59 PM] Documentation is required!
	setMatchingRequest(request: HTTPRequest): void;
	
	// DOC-ME [10/1/2021 @ 12:59 PM] Documentation is required!
	setStatusCode(statusCode: number | HTTPStatusCode): void;
	
}
