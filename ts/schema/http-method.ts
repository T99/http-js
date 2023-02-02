/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 4:38 PM -- March 17, 2022.
 * Project: @t99/http
 */

/**
 * An enumeration of valid HTTP methods.
 * 
 * @author Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/)
 * @version v0.1.0
 * @since v0.1.0
 */
export class HTTPMethod {
	
	/**
	 * A registry of valid/official HTTP methods that have been statically initialized on this class.
	 */
	protected static registry: Map<string, HTTPMethod> = new Map();
	
	public static readonly ACL: HTTPMethod = new HTTPMethod("ACL");
	
	public static readonly BIND: HTTPMethod = new HTTPMethod("BIND");
	
	public static readonly CHECKOUT: HTTPMethod = new HTTPMethod("CHECKOUT");
	
	public static readonly CONNECT: HTTPMethod = new HTTPMethod("CONNECT");
	
	public static readonly COPY: HTTPMethod = new HTTPMethod("COPY");
	
	/**
	 * The HTTP 'DELETE' method deletes the target resource.
	 */
	public static readonly DELETE: HTTPMethod = new HTTPMethod("DELETE");
	
	public static readonly GET: HTTPMethod = new HTTPMethod("GET");
	
	public static readonly HEAD: HTTPMethod = new HTTPMethod("HEAD");
	
	public static readonly LINK: HTTPMethod = new HTTPMethod("LINK");
	
	public static readonly LOCK: HTTPMethod = new HTTPMethod("LOCK");
	
	public static readonly MSEARCH: HTTPMethod = new HTTPMethod("M-SEARCH");
	
	public static readonly MERGE: HTTPMethod = new HTTPMethod("MERGE");
	
	public static readonly MKACTIVITY: HTTPMethod = new HTTPMethod("MKACTIVITY");
	
	public static readonly MKCALENDAR: HTTPMethod = new HTTPMethod("MKCALENDAR");
	
	public static readonly MKCOL: HTTPMethod = new HTTPMethod("MKCOL");
	
	public static readonly MOVE: HTTPMethod = new HTTPMethod("MOVE");
	
	public static readonly NOTIFY: HTTPMethod = new HTTPMethod("NOTIFY");
	
	public static readonly OPTIONS: HTTPMethod = new HTTPMethod("OPTIONS");
	
	/**
	 * The HTTP 'PATCH' method functions similarly to the 'PUT' method, but rather than creating or replacing the target
	 * resource, the request payload is instead used to partially modify an existing target resource.
	 */
	public static readonly PATCH: HTTPMethod = new HTTPMethod("PATCH");
	
	public static readonly POST: HTTPMethod = new HTTPMethod("POST");
	
	public static readonly PROPFIND: HTTPMethod = new HTTPMethod("PROPFIND");
	
	public static readonly PROPPATCH: HTTPMethod = new HTTPMethod("PROPPATCH");
	
	public static readonly PURGE: HTTPMethod = new HTTPMethod("PURGE");
	
	/**
	 * The HTTP 'PUT' method serves to either create or replace the target resource with, or based on, the payload of
	 * the request.
	 */
	public static readonly PUT: HTTPMethod = new HTTPMethod("PUT");
	
	public static readonly REBIND: HTTPMethod = new HTTPMethod("REBIND");
	
	public static readonly REPORT: HTTPMethod = new HTTPMethod("REPORT");
	
	public static readonly SEARCH: HTTPMethod = new HTTPMethod("SEARCH");
	
	public static readonly SUBSCRIBE: HTTPMethod = new HTTPMethod("SUBSCRIBE");
	
	/**
	 * The HTTP 'TRACE' method is similar in function to a network 'ping'. The original TRACE request is forwarded to
	 * its intended destination, and then mirrored back to the origin client as the body of a 200 OK response.
	 */
	public static readonly TRACE: HTTPMethod = new HTTPMethod("TRACE");
	
	public static readonly UNBIND: HTTPMethod = new HTTPMethod("UNBIND");
	
	public static readonly UNLINK: HTTPMethod = new HTTPMethod("UNLINK");
	
	public static readonly UNLOCK: HTTPMethod = new HTTPMethod("UNLOCK");
	
	public static readonly UNSUBSCRIBE: HTTPMethod = new HTTPMethod("UNSUBSCRIBE");
	
	/**
	 * The method name for this HTTP method.
	 * 
	 * Example: 'GET', 'PUT', 'TRACE'
	 */
	protected readonly methodName!: string;
	
	/**
	 * Initializes a new HTTPMethod with the provided method name.
	 * 
	 * @param {string} methodName The method name for this HTTP method.
	 */
	protected constructor(methodName: string) {
		
		if (HTTPMethod.registry.has(methodName)) return HTTPMethod.registry.get(methodName) as HTTPMethod;
		else {
			
			this.methodName = methodName;
			
			HTTPMethod.registry.set(methodName, this);
			
		}
		
	}
	
	/**
	 * Returns the method name for this HTTP method.
	 * 
	 * @returns {string} The method name for this HTTP method.
	 */
	public getName(): string {
		
		return this.methodName;
		
	}
	
	public static normalizeHTTPMethod(httpMethod: string | HTTPMethod): HTTPMethod {
		
		if (httpMethod instanceof HTTPMethod) return httpMethod;
		else return new HTTPMethod(httpMethod);
		
	}
	
	public static isStringValidHTTPMethod(input: string): boolean {
		
		return true;
		
	}
	
	/**
	 * Returns the method name for this HTTP method.
	 *
	 * @returns {string} The method name for this HTTP method.
	 */
	public toString(): string {
		
		return this.getName();
		
	}
	
}
