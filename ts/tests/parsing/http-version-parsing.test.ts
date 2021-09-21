/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:58 AM -- September 21st, 2021
 * Project: http-js
 */
 
import { DEFAULT_HTTP_VERSION, HTTPVersionObject, normalizeHTTPVersion } from "../../parsing/http-version-parsing";

test("No-args parsing", (): void => {
	
	let version: HTTPVersionObject = normalizeHTTPVersion();
	
	expect(version.major).toBe(DEFAULT_HTTP_VERSION.major);
	expect(version.minor).toBe(DEFAULT_HTTP_VERSION.minor);
	
});

describe("String parsing", (): void => {
	
	test("String parsing defaults to 'DEFAULT_HTTP_VERSION' with empty string.", (): void => {
		
		let version: HTTPVersionObject = normalizeHTTPVersion("");
		
		expect(version.major).toBe(DEFAULT_HTTP_VERSION.major);
		expect(version.minor).toBe(DEFAULT_HTTP_VERSION.minor);
		
	});
	
	test("String parsing works with plain version string.", (): void => {
		
		let version: HTTPVersionObject = normalizeHTTPVersion("4.2");
		
		expect(version.major).toBe("4");
		expect(version.minor).toBe("2");
		
	});
	
	test("String parsing works with long plain version string.", (): void => {
		
		let version: HTTPVersionObject = normalizeHTTPVersion("975.864");
		
		expect(version.major).toBe("975");
		expect(version.minor).toBe("864");
		
	});
	
	test("String parsing works with 'v' prepended version string.", (): void => {
		
		let version: HTTPVersionObject = normalizeHTTPVersion("v4.2");
		
		expect(version.major).toBe("4");
		expect(version.minor).toBe("2");
		
	});
	
	test("String parsing works with 'v' prepended long plain version string.", (): void => {
		
		let version: HTTPVersionObject = normalizeHTTPVersion("v975.864");
		
		expect(version.major).toBe("975");
		expect(version.minor).toBe("864");
		
	});
	
	test("String parsing works with only partially recognized version string.", (): void => {
		
		let version: HTTPVersionObject = normalizeHTTPVersion("version: 8.12.18 of HTTP");
		
		expect(version.major).toBe("8");
		expect(version.minor).toBe("12");
		
	});
	
	test("String parsing works with 'v' prepended, only partially recognized version string.", (): void => {
		
		let version: HTTPVersionObject = normalizeHTTPVersion("but v4.5.9 doesn't work");
		
		expect(version.major).toBe("4");
		expect(version.minor).toBe("5");
		
	});
	
	test("String parsing defaults to 'DEFAULT_HTTP_VERSION' with unrecognized string.", (): void => {
		
		let version: HTTPVersionObject = normalizeHTTPVersion("foobar");
		
		expect(version.major).toBe(DEFAULT_HTTP_VERSION.major);
		expect(version.minor).toBe(DEFAULT_HTTP_VERSION.minor);
		
	});
	
});

describe("Number parsing", (): void => {
	
	test("Number parsing works with plain version numbers.", (): void => {
		
		let version: HTTPVersionObject = normalizeHTTPVersion(4.2);
		
		expect(version.major).toBe("4");
		expect(version.minor).toBe("2");
		
	});
	
	test("Number parsing works with long plain version numbers.", (): void => {
		
		let version: HTTPVersionObject = normalizeHTTPVersion(975.864);
		
		expect(version.major).toBe("975");
		expect(version.minor).toBe("864");
		
	});
	
});

describe("Object parsing", (): void => {
	
	test("Object parsing works with plain version numbers.", (): void => {
		
		let version: HTTPVersionObject = normalizeHTTPVersion(4.2);
		
		expect(version.major).toBe("4");
		expect(version.minor).toBe("2");
		
	});
	
	test("Object parsing works with long plain version numbers.", (): void => {
		
		let version: HTTPVersionObject = normalizeHTTPVersion(975.864);
		
		expect(version.major).toBe("975");
		expect(version.minor).toBe("864");
		
	});
	
});
