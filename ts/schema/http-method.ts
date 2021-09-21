export class HTTPMethod {
	
	protected static registry: Map<string, HTTPMethod> = new Map();
	
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
	
	protected readonly methodName!: string;
	
	protected constructor(methodName: string) {
		
		if (HTTPMethod.registry.has(methodName)) return HTTPMethod.registry.get(methodName) as HTTPMethod;
		else {
			
			this.methodName = methodName;
			
			HTTPMethod.registry.set(methodName, this);
			
		}
		
	}
	
	public getName(): string {
		
		return this.methodName;
		
	}
	
	public static normalizeHTTPMethod(httpMethod: string | HTTPMethod): HTTPMethod {
		
		if (httpMethod instanceof HTTPMethod) return httpMethod;
		else return new HTTPMethod(httpMethod);
		
	}
	
}
