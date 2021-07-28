export type HTTPMethodable = HTTPMethod | string;

export class HTTPMethod {
	
	public static readonly GET: HTTPMethod = new HTTPMethod("GET");
	
	public static readonly POST: HTTPMethod = new HTTPMethod("POST");
	
	public static readonly PUT: HTTPMethod = new HTTPMethod("PUT");
	
	public static readonly DELETE: HTTPMethod = new HTTPMethod("DELETE");
	
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
