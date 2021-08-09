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
	
	protected readonly methodName: string;
	
	protected constructor(methodName: string) {
		
		this.methodName = methodName;
		
		/*
		 * We want to strictly prevent mutation of HTTPMethod references so that their semantic value CANNOT and WILL
		 * NOT be changed by users down-the-line.
		 *
		 * Take, as a shallow example, the situation in which a user decides to change the method name for
		 * HTTPMethod.GET, meanwhile other parts of the same codebase are utilizing the HTTPMethod.GET constant for
		 * their own purposes. Because each reference to this supposed constant points to the same instance, the initial
		 * change to the HTTPMethod.GET method name is propogated throughout the codebase, and suddenly the users API
		 * begins 404'ing on 'GET', and responding on 'JET', even though the the HTTPMethod.GET constant is still being
		 * used.
		 */
		Object.freeze(this);
		
	}
	
	public getName(): string {
		
		return this.methodName;
		
	}
	
	public static normalizeHTTPMethod(httpMethod: HTTPMethodable): HTTPMethod {
		
		if (httpMethod instanceof HTTPMethod) return httpMethod;
		else return new HTTPMethod(httpMethod);
		
	}
	
}
