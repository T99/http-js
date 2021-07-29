import { HTTPMethod } from "../../schema/http-method";
import { ImmutableHTTPHeadersManager } from "../../headers/immutable-http-headers-manager";

export interface HTTPMessage {
	
	/**
	 * Returns the HTTP method for this HTTP message.
	 * 
	 * @returns {HTTPMethod} The HTTP method for this HTTP message.
	 */
	getMethod(): HTTPMethod;
	
	/**
	 * Returns the URL for this HTTP message.
	 * 
	 * This represents the location of the resource relevant to this HTTP message.
	 * 
	 * @returns {URL} The URL for this HTTP message.
	 */
	getURL(): URL;
	
	/**
	 * Returns the {@link ImmutableHTTPHeadersManager} for this HTTP message.
	 * 
	 * @returns {ImmutableHTTPHeadersManager} The ImmutableHTTPHeadersManager for this HTTP message.
	 */
	getHeadersManager(): ImmutableHTTPHeadersManager;
	
	/**
	 * Returns the body of this HTTP message.
	 * 
	 * @returns {any} The body of this HTTP message.
	 */
	getBody(): any;
	
}
