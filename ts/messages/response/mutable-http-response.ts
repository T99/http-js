import { ImmutableHTTPResponse } from "./immutable-http-response";
import { MutableHTTPMessage } from "../message/mutable-http-message";
import { MutableHTTPHeadersManager } from "../../headers/mutable-http-headers-manager";

// DOC-ME [9/20/2021 @ 5:00 PM] Documentation is required!
export interface MutableHTTPResponse extends ImmutableHTTPResponse, MutableHTTPMessage {
	
	getHeadersManager(): MutableHTTPHeadersManager;
	
}
