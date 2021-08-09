import { HTTPMethod, HTTPMethodable } from "../../schema/http-method";
import { ParseableHTTPHeaders, ImmutableHTTPHeadersManager } from "../../headers/immutable-http-headers-manager";

export abstract class ImmutableHTTPMessage implements HTTPMessage {
	
	protected method: HTTPMethod;
	
	protected url: URL;
	
	protected headersManager: ImmutableHTTPHeadersManager;
	
	protected body: any;
	
	protected constructor(method: HTTPMethodable, url: string | URL,
						  headersOrHeadersManager?: ParseableHTTPHeaders | ImmutableHTTPHeadersManager) {
		
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
	 * Note that the returned URL instance is a copy of the actual internal URL, and thus the returned object cannot be
	 * used to modify the internal URL.
	 * 
	 * @return {URL} The URL for this HTTP message.
	 */
	public getURL(): URL {
		
		// Return a copy of the internal URL so that callers can't use the return value to modify internal state.
		return new URL(this.url.toString());
		
	}
	
	/**
	 * Returns the {@link ImmutableHTTPHeadersManager} for this HTTP message.
	 *
	 * @returns {ImmutableHTTPHeadersManager} The ImmutableHTTPHeadersManager for this HTTP message.
	 */
	public getHeadersManager(): ImmutableHTTPHeadersManager {
		
		return this.headersManager;
		
	}
	
	/**
	 * Returns the body of this HTTP message.
	 *
	 * @returns {any} The body of this HTTP message.
	 */
	public getBody(): any {
		
		return this.body;
		
	}
	
}
