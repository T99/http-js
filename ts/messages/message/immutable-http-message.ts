import type { HTTPVersionObject } from "../../parsing/http-version-parsing";
import type { HTTPMethod } from "../../schema/http-method";
import type { ImmutableHTTPHeadersManager } from "../../headers/immutable-http-headers-manager";

// DOC-ME [9/20/2021 @ 5:00 PM] Documentation is required!
export interface ImmutableHTTPMessage {
	
	/**
	 * Returns the HTTP version of this HTTP message in the requested format.
	 *
	 * "major": Returns 'x' for versions of the form 'x.y'.<br />
	 * "minor": Returns 'y' for versions of the form 'x.y'.<br />
	 * "full": Returns 'x.y' for versions of the form 'x.y'.<br />
	 * "object": Returns an HTTPVersionObject object containing 'major' and 'minor' properties.
	 *
	 * @param {"major" | "minor" | "full"} format The format in which to return the HTTP version of this HTTP message.
	 * @returns {string} The HTTP version of this HTTP message in the requested format.
	 */
	getHTTPVersion(format: "major" | "minor" | "full"): string;
	
	/**
	 * Returns the HTTP version of this HTTP message in the requested format.
	 *
	 * "major": Returns 'x' for versions of the form 'x.y'.<br />
	 * "minor": Returns 'y' for versions of the form 'x.y'.<br />
	 * "full": Returns 'x.y' for versions of the form 'x.y'.<br />
	 * "object": Returns an HTTPVersionObject object containing 'major' and 'minor' properties.
	 *
	 * @param {"object"} format The format in which to return the HTTP version of this HTTP message.
	 * @returns {HTTPVersionObject} The HTTP version of this HTTP message in the requested format.
	 */
	getHTTPVersion(format: "object"): HTTPVersionObject;
	
	/**
	 * Returns the HTTP method for this HTTP message.
	 *
	 * @return {HTTPMethod} The HTTP method for this HTTP message.
	 */
	getMethod(): HTTPMethod;
	
	/**
	 * Returns the URL for this HTTP message.
	 *
	 * @return {URL} The URL for this HTTP message.
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
