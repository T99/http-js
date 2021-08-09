import { HTTPMethod, HTTPMethodable } from "../../schema/http-method";
import { ParseableHTTPHeaders, ImmutableHTTPHeadersManager } from "../../headers/immutable-http-headers-manager";

export class ImmutableHTTPMessage {
	
	protected method: HTTPMethod;
	
	protected url: URL;
	
	protected headersManager: ImmutableHTTPHeadersManager;
	
	protected body: any;
	
	/**
	 * Initializes a new ImmutableHTTPMessage instance by cloning the provided instance.
	 *
	 * @param {ImmutableHTTPMessage} httpMessage The ImmutableHTTPMessage instance to clone.
	 */
	public constructor(httpMessage: ImmutableHTTPMessage);
	
	/**
	 * Initializes a new ImmutableHTTPMessage instance
	 *
	 * @param {HTTPMethodable} method
	 * @param {string | URL} url
	 * @param {ParseableHTTPHeaders | ImmutableHTTPHeadersManager} headersOrHeadersManager
	 */
	public constructor(method: HTTPMethodable, url: string | URL,
						  headersOrHeadersManager?: ParseableHTTPHeaders | ImmutableHTTPHeadersManager);
	
	public constructor(httpMessageOrMethod: ImmutableHTTPMessage | HTTPMethodable, url?: string | URL,
					   headersOrHeadersManager?: ParseableHTTPHeaders | ImmutableHTTPHeadersManager) {
		
		// If we are cloning an existing ImmutableHTTPMessage instance...
		if (httpMessageOrMethod instanceof ImmutableHTTPMessage) {
			
			let httpMessage: ImmutableHTTPMessage = httpMessageOrMethod;
			
			// Because HTTPMethod instances are immutable, we can copy this by reference.
			this.method = httpMessage.method;
			
			// Clone the source URL by using the 'href' property on the object.
			this.url = new URL(httpMessage.url.href);
			
			// The ImmutableHTTPHeadersManager has its own built-in way of cloning instances.
			this.headersManager = new ImmutableHTTPHeadersManager(httpMessage.headersManager);
			
		// If we are building a custom ImmutableHTTPMessage instance...
		} else {
			
			let method: HTTPMethodable = httpMessageOrMethod;
			
			this.method = HTTPMethod.normalizeHTTPMethod(method);
			
			if (typeof url === "string") this.url = new URL(url);
			else this.url = url as URL;
			
			if (headersOrHeadersManager instanceof ImmutableHTTPHeadersManager) {
				
				this.headersManager = headersOrHeadersManager;
				
			} else this.headersManager = new ImmutableHTTPHeadersManager(headersOrHeadersManager);
			
		}
		
		// If this is the final constructor call, freeze this object, protecting us from any possible mutation.
		if (Object.getPrototypeOf(this) === ImmutableHTTPMessage) Object.freeze(this);
		
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
