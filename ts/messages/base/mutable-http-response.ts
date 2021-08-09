import { ImmutableHTTPResponse } from "./immutable-http-response";
import { MutableHTTPMessage } from "./mutable-http-message";

// @ts-ignore TS2720 - Subclass incorrectly implements implemented interface.
export class MutableHTTPResponse extends ImmutableHTTPResponse implements MutableHTTPMessage {



}

applyMixins(MutableHTTPResponse, MutableHTTPMessage);
