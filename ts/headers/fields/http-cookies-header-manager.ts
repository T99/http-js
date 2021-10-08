import { HTTPCookie } from "../../parsing/cookie-parsing";


export class HTTPCookiesHeaderManager {
	
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
		
		// TODO [10/8/2021 @ 3:46 PM] Append the Set-Cookie header...
		cookie;
		
	}
	
}
