import { ImmutableHTTPRequest } from "./immutable-http-request";
import { MutableHTTPMessage } from "./mutable-http-message";

// @ts-ignore TS2720 - Subclass incorrectly implements implemented interface.
export class MutableHTTPRequest extends ImmutableHTTPRequest implements MutableHTTPMessage {

	
	
}

applyMixins(MutableHTTPRequest, MutableHTTPMessage);
