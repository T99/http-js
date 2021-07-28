import { HTTPMethod, HTTPMethodable } from "./schema/http-method";
import { HTTPHeaders, ImmutableHTTPHeadersManager } from "./schema/immutable-http-headers-manager";

export abstract class ImmutableHTTPMessage {
	
	protected method: HTTPMethod;
	
	protected url: URL;
	
	protected headersManager: ImmutableHTTPHeadersManager;
	
	protected constructor(method: HTTPMethodable, url: string | URL,
						  headersOrHeadersManager?: HTTPHeaders | ImmutableHTTPHeadersManager) {
		
		this.method = HTTPMethod.normalizeHTTPMethod(method);
		
		if (typeof url === "string") this.url = new URL(url);
		else this.url = url;
		
		if (headersOrHeadersManager instanceof ImmutableHTTPHeadersManager) {
			
			this.headersManager = headersOrHeadersManager;
			
		} else this.headersManager = new ImmutableHTTPHeadersManager(headersOrHeadersManager);
		
	}
	
	/**
	 * Returns the HTTP method for this HTTP message.
	 * 
	 * @return {HTTPMethod} The HTTP method for this HTTP message.
	 */
	public getMethod(): HTTPMethod {
		
		return this.method;
		
	}
	
	/**
	 * Returns the URL for this HTTP message.
	 * 
	 * @return {URL} The URL for this HTTP message.
	 */
	public getURL(): URL {
		
		return this.url;
		
	}
	
	public getHeadersManager(): ImmutableHTTPHeadersManager {
		
		return this.headersManager;
		
	}
	
}
