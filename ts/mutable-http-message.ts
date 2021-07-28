import { ImmutableHTTPMessage } from "./immutable-http-message";
import { HTTPHeaders } from "./schema/immutable-http-headers-manager";
import { MutableHTTPHeadersManager } from "./schema/mutable-http-headers-manager";
import { HTTPMethod, HTTPMethodable } from "./schema/http-method";

export abstract class MutableHTTPMessage extends ImmutableHTTPMessage {
	
	protected headersManager!: MutableHTTPHeadersManager;
	
	protected constructor(method: HTTPMethodable, url: string | URL,
						  headersOrHeadersManager?: HTTPHeaders | MutableHTTPHeadersManager) {
		
		// If the value being passed for the headers of this message is not a pre-baked MutableHTTPHeadersManager...
		if (!(headersOrHeadersManager instanceof MutableHTTPHeadersManager)) {
			
			// Form it into one so that the parent class doesn't instantiate headersManager as immutable.
			if (headersOrHeadersManager === undefined) headersOrHeadersManager = new MutableHTTPHeadersManager();
			else headersOrHeadersManager = new MutableHTTPHeadersManager(headersOrHeadersManager);
			
		}
		
		super(method, url, headersOrHeadersManager);
		
	}
	
	public setMethod(method: HTTPMethodable): void {
		
		this.method = HTTPMethod.normalizeHTTPMethod(method);
		
	}
	
	public setURL(url: string | URL) {
		
		if (typeof url === "string") this.url = new URL(url);
		else this.url = url;
		
	}
	
	public getHeadersManager(): MutableHTTPHeadersManager {
		
		return this.headersManager;
		
	}
	
}
