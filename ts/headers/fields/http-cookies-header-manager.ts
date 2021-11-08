import { HTTPCookie, stringifyCookie } from "../../parsing/cookie-parsing";
import { HTTPHeadersManager } from "../http-headers-manager";

function trimString(str: string): string { return str.trim(); }
function notEmpty(str: string): boolean { return str.length !== 0; }

export class HTTPCookiesHeaderManager {
	
	protected readonly headersManager: HTTPHeadersManager;
	
	public constructor(headersManager: HTTPHeadersManager) {
		
		this.headersManager = headersManager;
		
	}
	
	/**
	 * Adds the provided 
	 * @param {HTTPCookie} cookie
	 */
	public setCookie(cookie: HTTPCookie): void;
	
	public setCookie(name: string, value: string, settings?: Partial<HTTPCookie>): void;
	
	public setCookie(cookieOrName: HTTPCookie | string, value?: string, settings?: Partial<HTTPCookie>): void {
		
		let cookie: HTTPCookie;
		
		if (value === undefined) cookie = cookieOrName as HTTPCookie;
		else {
			
			cookie = {
				name: cookieOrName as string,
				value: value,
				secure: false,
				httpOnly: false,
				...settings
			};
			
		}
		
		this.headersManager.appendHeader("Set-Cookie", stringifyCookie(cookie));
		
	}
	
	public hasCookie(name: string): boolean {
		
		// Node pre-processes cookies into a single header field, so we only ever have to worry about the first index.
		let cookies: string[] =
			(this.headersManager.getHeader("Cookie") ?? [""])[0]
				.split(";")
				.map(trimString)
				.filter(notEmpty);
		
		let cookieNames: string[] = cookies.map(
			(cookie: string): string => cookie.split("=", 2)[0]?.trim() ?? ""
		).filter(notEmpty);
		
		return cookieNames.includes(name);
		
	}
	
	public getCookie(name: string): string | undefined {
		
		let cookies: string[] =
			(this.headersManager.getHeader("Cookie") ?? [""])[0]
				.split(";")
				.map(trimString)
				.filter(notEmpty);
		
		for (let cookie of cookies) {
			
			let cookieComponents: [string, string] = cookie.split("=", 2).map(trimString) as [string, string];
			
			if (cookieComponents[0] === name) return cookieComponents[1];
			
		}
		
		return undefined;
		
	}
	
	/**
	 * Attempts to instruct the client to 'unset' a given cookie (specified by the caller) by re-setting the cookie with
	 * an 'expires' date in the distant past.
	 * 
	 * @param {string} name The name/identifier of the cookie that should be unset.
	 */
	public unsetCookie(name: string): void {
		
		this.headersManager.appendHeader("Set-Cookie", stringifyCookie({
			name,
			value: "",
			secure: false,
			httpOnly: false,
			expires: new Date(0)
		}));
		
	}
	
}
