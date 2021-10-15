import { HTTPCookie, stringifyCookie } from "../../parsing/cookie-parsing";
import { HTTPHeadersManager } from "../http-headers-manager";


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
