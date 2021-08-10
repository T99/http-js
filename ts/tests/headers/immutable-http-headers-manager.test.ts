import { HTTPHeaders, ImmutableHTTPHeadersManager } from "../../headers/immutable-http-headers-manager";

let headersManager: ImmutableHTTPHeadersManager;

describe("Initialization", (): void => {
	
	test("Initialization for empty headers manager with no-args constructor.", (): void => {
		
		let testInstance: ImmutableHTTPHeadersManager = new ImmutableHTTPHeadersManager();
		
		expect(testInstance).not.toBeUndefined();
		
	});
	
	describe("Initialization with ParseableHTTPHeaders object and no field transformer", (): void => {
		
		beforeAll((): void => {
			
			headersManager = new ImmutableHTTPHeadersManager({
				"Content-Type": "text/csv, application/json;q=0.7 text/xml;q=0.8",
				"aCCEPT":
			});
			
		});
		
	});
	
	test("", (): void => {
		
		headersManager = new ImmutableHTTPHeadersManager();
		
	});
	
});

describe("Empty headers object", (): void => {
	
	test("Initialization for empty headers manager with no-args constructor.", (): void => {
		
		let testInstance: ImmutableHTTPHeadersManager = new ImmutableHTTPHeadersManager();
		
		expect(testInstance).not.toBeUndefined();
		
	});
	
	beforeEach((): void => {
	
		headersManager = new ImmutableHTTPHeadersManager();
	
	});
	
	test("#getHeaders should return an empty object.", (): void => {
		
		let headersObject: HTTPHeaders = headersManager.getHeaders();
		
		expect(Object.keys(headersObject).length).toBe(0);
		
	});
	
	test("#getHeadersFields should return an empty array.", (): void => {
		
		expect(headersManager.getHeaderFields().length).toBe(0);
		
	});
	
	// TODO [8/9/21 @ 10:12 PM] Write test to check for #getHeaderFields(fieldTransformer)
	
	test("#hasHeader should return false for any value.", (): void => {
		
		expect(headersManager.hasHeader("")).toBeFalsy();
		expect(headersManager.hasHeader("Host")).toBeFalsy();
		expect(headersManager.hasHeader("Accept")).toBeFalsy();
		expect(headersManager.hasHeader("Content-Type")).toBeFalsy();
		
	});
	
	test("getHeader should return undefined for any value.", (): void => {
		
		expect(headersManager.getHeader("")).toBeUndefined();
		expect(headersManager.getHeader("Host")).toBeUndefined();
		expect(headersManager.getHeader("Accept")).toBeUndefined();
		expect(headersManager.getHeader("Content-Type")).toBeUndefined();
		
	});
	
	test("#getAuthoritativeHeader should return undefined for any value.", (): void => {
		
		expect(headersManager.getAuthoritativeHeader("")).toBeUndefined();
		expect(headersManager.getAuthoritativeHeader("Host")).toBeUndefined();
		expect(headersManager.getAuthoritativeHeader("Accept")).toBeUndefined();
		expect(headersManager.getAuthoritativeHeader("Content-Type")).toBeUndefined();
		
	});
	
	test("#getPreferredFormats should return '*/*'.", (): void => {
	
	});

});

describe("Standard HTTP headers object", (): void => {
	
	beforeEach((): void => {
		
		headersManager = new ImmutableHTTPHeadersManager();
		
	});
	
});
