import type { ImmutableHTTPRequest } from "./immutable-http-request";
import { MutableHTTPMessage } from "../message/mutable-http-message";
import { MutableHTTPHeadersManager } from "../../headers/mutable-http-headers-manager";

// DOC-ME [9/20/2021 @ 5:00 PM] Documentation is required!
export interface MutableHTTPRequest	extends ImmutableHTTPRequest, MutableHTTPMessage {
	
	getHeadersManager(): MutableHTTPHeadersManager;

}
