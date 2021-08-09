import { ImmutableHTTPMessage } from "./immutable-http-message";
import { ParseableHTTPHeaders } from "../../headers/immutable-http-headers-manager";
import { MutableHTTPHeadersManager } from "../../headers/mutable-http-headers-manager";
import { HTTPMethod, HTTPMethodable } from "../../schema/http-method";

export class MutableHTTPMessage extends ImmutableHTTPMessage {
	
	protected headersManager!: MutableHTTPHeadersManager;
	
	public constructor(httpMessage: ImmutableHTTPMessage);
	
	public constructor(method: HTTPMethodable,
					   url: string | URL,
					   headersOrHeadersManager?: ParseableHTTPHeaders | MutableHTTPHeadersManager)
	
	public constructor(httpMessageOrMethod: ImmutableHTTPMessage | HTTPMethodable, url?: string | URL,
						  headersOrHeadersManager?: ParseableHTTPHeaders | MutableHTTPHeadersManager) {
		
		if (httpMessageOrMethod instanceof ImmutableHTTPMessage) {
			
			// TODO [8/9/2021 @ 4:33 PM] Clone the input object!
			
		} else {
			
			let method: HTTPMethodable = httpMessageOrMethod;
			
			// If the value being passed for the headers of this message is not a pre-baked MutableHTTPHeadersManager...
			if (!(headersOrHeadersManager instanceof MutableHTTPHeadersManager)) {
				
				// Form it into one so that the parent class doesn't instantiate headersManager as immutable.
				if (headersOrHeadersManager === undefined) headersOrHeadersManager = new MutableHTTPHeadersManager();
				else headersOrHeadersManager = new MutableHTTPHeadersManager(headersOrHeadersManager);
				
			}
			
			super(method, url as string | URL, headersOrHeadersManager);
			
		}
		
	}
	
	public setMethod(method: HTTPMethodable): void {
		
		this.method = HTTPMethod.normalizeHTTPMethod(method);
		
	}
	
	public setURL(url: string | URL): void {
		
		if (typeof url === "string") this.url = new URL(url);
		else this.url = url;
		
	}
	
	public getHeadersManager(): MutableHTTPHeadersManager {
		
		return this.headersManager;
		
	}
	
	public setBody(body: any): void {
		
		this.body = body;
		
	}
	
	/**
	 * Returns an immutable version of this MutableHTTPMessage.
	 * 
	 * @returns {ImmutableHTTPMessage} An immutable version of this MutableHTTPMessage.
	 */
	public freeze(): ImmutableHTTPMessage {
		
		return new ImmutableHTTPMessage(this);
		
	}
	
}
