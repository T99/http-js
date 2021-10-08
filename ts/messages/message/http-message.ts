import { HTTPMethod } from "../../schema/http-method";
import { HTTPHeadersManager, ParseableHTTPHeaders } from "../../headers/http-headers-manager";
import { HTTPVersionFormat, HTTPVersionObject, normalizeHTTPVersion } from "../../parsing/http-version-parsing";

// DOC-ME [9/25/21 @ 2:01 PM] Documentation required!
export type HTTPMessageConfig = {
	
	version?: string | number | HTTPVersionObject,
	
	method: string | HTTPMethod,
	
	url: string | URL,
	
	headers?: ParseableHTTPHeaders | HTTPHeadersManager
	
};

// DOC-ME [9/25/21 @ 2:01 PM] Documentation required!
export class HTTPMessage {
	
	// DOC-ME [9/25/21 @ 2:01 PM] Documentation required!
	public static readonly DEFAULT_HTTP_VERSION: HTTPVersionObject = {
		major: "1",
		minor: "1"
	};
	
	// DOC-ME [9/25/21 @ 2:01 PM] Documentation required!
	protected version: HTTPVersionObject;
	
	// DOC-ME [9/25/21 @ 2:01 PM] Documentation required!
	protected method: HTTPMethod;
	
	// DOC-ME [9/25/21 @ 2:01 PM] Documentation required!
	protected url: URL;
	
	// DOC-ME [9/25/21 @ 2:01 PM] Documentation required!
	protected body: any;
	
	/**
	 * The {@link HTTPHeadersManager} for this HTTP message.
	 */
	public headers: HTTPHeadersManager;
	
	// DOC-ME [9/25/21 @ 2:01 PM] Documentation required!
	public constructor(config: HTTPMessageConfig) {
		
		this.version = normalizeHTTPVersion(config.version);
		this.method = HTTPMethod.normalizeHTTPMethod(config.method);
		
		if (typeof config.url === "string") this.url = new URL(config.url);
		else this.url = config.url as URL;
		
		if (config.headers instanceof HTTPHeadersManager) this.headers = config.headers;
		else this.headers = new HTTPHeadersManager(config.headers);
		
	}
	
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
	public getHTTPVersion(format?: "object"): HTTPVersionObject;
	
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
	public getHTTPVersion(format: "major" | "minor" | "full"): string;
	
	public getHTTPVersion(format?: HTTPVersionFormat): string | HTTPVersionObject {
		
		if (format === "major") return this.version.major;
		else if (format === "minor") return this.version.minor;
		else if (format === "full") return `${this.version.minor}.${this.version.minor}`;
		else {
			
			return {
				major: this.version.major,
				minor: this.version.minor
			};
			
		}
		
	}
	
	public setHTTPVersion(version: string | number | HTTPVersionObject): void {
		
		this.version = normalizeHTTPVersion(version);
		
	}
	
	/**
	 * Returns the HTTP method for this HTTP message.
	 *
	 * @return {HTTPMethod} The HTTP method for this HTTP message.
	 */
	public getMethod(): HTTPMethod {
		
		return this.method;
		
	}
	
	public setMethod(method: string | HTTPMethod): void {
		
		this.method = HTTPMethod.normalizeHTTPMethod(method);
	
	}
	
	/**
	 * Returns the URL for this HTTP message.
	 *
	 * @return {URL} The URL for this HTTP message.
	 */
	public getURL(): URL {
		
		return this.url;
		
	}
	
	public setURL(url: string | URL): void {
		
		if (typeof url === "string") this.url = new URL(url);
		else this.url = url;
		
	}
	
	/**
	 * Returns the body of this HTTP message.
	 *
	 * @returns {any} The body of this HTTP message.
	 */
	public getBody(): any {
		
		return this.body;
		
	}
	
	public setBody(body: any): void {
		
		this.body = body;
		
	}
	
}
