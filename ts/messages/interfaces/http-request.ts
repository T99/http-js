import { HTTPResponse } from "./http-response";
import { HTTPMessage } from "./http-message";

export interface HTTPRequest extends HTTPMessage {
	
	getMatchingResponse(): HTTPResponse | Promise<HTTPResponse>;
	
}
