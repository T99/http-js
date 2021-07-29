import { HTTPStatusCode } from "../../schema/http-status-code";
import { HTTPRequest } from "./http-request";
import { HTTPMessage } from "./http-message";

export interface HTTPResponse extends HTTPMessage {
	
	getStatusCode(): HTTPStatusCode;
	
	getMatchingRequest(): HTTPRequest | Promise<HTTPRequest>;
	
}
