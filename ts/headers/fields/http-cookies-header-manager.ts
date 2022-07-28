import { type HTTPCookie, stringifyCookie } from "../../parsing/cookie-parsing";
import type { HTTPHeadersManager } from "../http-headers-manager";

const trimString: (str: string) => string =
	(str: string): string => str.trim();

const notEmpty: (str: string) => boolean =
	(str: string): boolean => str.length !== 0;

export class HTTPCookiesHeaderManager {
	
	protected readonly headersManager: HTTPHeadersManager;
	
	public constructor(headersManager: HTTPHeadersManager) {
		
		this.headersManager = headersManager;
		
	}
	
	public setCookie(cookie: HTTPCookie): void;
	
	public setCookie(name: string, value: string,
					 settings?: Partial<HTTPCookie>): void;
	
	public setCookie(cookieOrName: HTTPCookie | string, value?: string,
					 settings?: Partial<HTTPCookie>): void {
		
		let cookie: HTTPCookie;
		
		if (value === undefined) cookie = cookieOrName as HTTPCookie;
		else {
			
			cookie = {
				name: cookieOrName as string,
				value,
				secure: false,
				httpOnly: false,
				...settings,
			};
			
		}
		
		this.headersManager.appendHeader(
			"Set-Cookie",
			stringifyCookie(cookie)
		);
		
	}
	
	public hasCookie(name: string): boolean {
		
		// Node pre-processes cookies into a single header field, so we only
		// ever have to worry about the first index.
		const cookies: string[] =
			(this.headersManager.getHeader("Cookie") ?? [""])[0]
				.split(";")
				.map(trimString)
				.filter(notEmpty);
		
		const cookieNames: string[] = cookies.map(
			(cookie: string): string => cookie.split("=", 2)[0]?.trim() ?? ""
		).filter(notEmpty);
		
		return cookieNames.includes(name);
		
	}
	
	public getCookie(name: string): string | undefined {
		
		return (this.headersManager.getHeader("Cookie") ?? [""])[0]
			.split(";")
			.map(trimString)
			.filter(notEmpty)
			.map((cookie: string): [string, string] =>
				cookie.split("=", 2).map(trimString) as [string, string])
			.find((cookieComponents: [string, string]): boolean =>
				cookieComponents[0] === name)
			?.at(1);
		
	}
	
	/**
	 * Attempts to instruct the client to 'unset' a given cookie (specified by
	 * the caller) by re-setting the cookie with an 'expires' date in the
	 * distant past.
	 * 
	 * @param {string} name The name/identifier of the cookie that should be
	 * unset.
	 */
	public unsetCookie(name: string): void {
		
		this.headersManager.appendHeader("Set-Cookie", stringifyCookie({
			name,
			value: "",
			secure: false,
			httpOnly: false,
			expires: new Date(0),
		}));
		
	}
	
}
