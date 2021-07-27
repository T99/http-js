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
	
	public static normalizeHTTPMethod(httpMethod: HTTPMethodable): string {
		
		if (httpMethod instanceof HTTPMethod) return httpMethod.getName();
		else return httpMethod;
		
	}
	
}
