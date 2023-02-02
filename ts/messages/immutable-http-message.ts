import { HTTPMessage } from "./http-message";
import { HTTPMethod } from "../schema/http-method";
import { HTTPHeadersManager } from "../headers/http-headers-manager";
import { HTTPVersionObject } from "../parsing/http-version-parsing";

// DOC-ME [9/25/21 @ 2:01 PM] Documentation required!
export class ImmutableHTTPMessage extends HTTPMessage {
	
	protected readonly version!: Readonly<HTTPVersionObject>;
	
	protected readonly method!: HTTPMethod;
	
	protected readonly url!: URL;
	
	protected readonly body!: any;
	
	public headers!: HTTPHeadersManager;
	
}

let imm: ImmutableHTTPMessage = new ImmutableHTTPMessage({
	
});
