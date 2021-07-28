export type HTTPMethodable = HTTPMethod | string;

export class HTTPMethod {
	
	public static readonly DELETE: HTTPMethod = new HTTPMethod("DELETE");
	
	public static readonly GET: HTTPMethod = new HTTPMethod("GET");
	
	public static readonly HEAD: HTTPMethod = new HTTPMethod("DELETE");
	
	public static readonly POST: HTTPMethod = new HTTPMethod("POST");
	
	/**
	 * The HTTP 'PUT' method serves to either create or replace the target resource with, or based on, the payload of
	 * the request.
	 */
	public static readonly PUT: HTTPMethod = new HTTPMethod("PUT");
	
	/**
	 * The HTTP 'TRACE' method is similar in function to a network 'ping'. The original TRACE request is forwarded to
	 * its intended destination, and then mirrored back to the origin client as the body of a 200 OK response.
	 */
	public static readonly TRACE: HTTPMethod = new HTTPMethod("TRACE");
	
	protected methodName: string;
	
	protected constructor(methodName: string) {
		
		this.methodName = methodName;
		
	}
	
	public getName(): string {
		
		return this.methodName;
		
	}
	
	public static normalizeHTTPMethod(httpMethod: HTTPMethodable): HTTPMethod {
		
		if (httpMethod instanceof HTTPMethod) return httpMethod;
		else if (typeof httpMethod === "string") return new HTTPMethod(httpMethod);
		else {
			
			throw new Error("Failed to normalize value to HTTPMethod instance, expected HTTPMethod instance or " +
				`string, received type '${typeof httpMethod}' instead.`);
			
		}
		
	}
	
}
