import { RawHTTPCookie } from "./raw-http-cookie";
import { CookieSameSiteValue } from "../parsing/cookie-parsing";

export class HTTPCookie implements RawHTTPCookie {
	
	public name: string;
	
	public value: string;
	
	public expires?: Date;
	
	public maxAge?: number;
	
	public domain?: string;
	
	public path?: string;
	
	public secure: boolean;
	
	public httpOnly: boolean;
	
	public sameSite?: CookieSameSiteValue;

	public constructor(cookie: RawHTTPCookie) {
		
		this.name = cookie.name;
		this.value = cookie.value;
		this.expires = cookie.expires;
		this.maxAge = cookie.maxAge;
		this.domain = cookie.domain;
		this.path = cookie.path;
		this.secure = cookie.secure;
		this.httpOnly = cookie.httpOnly;
		this.sameSite = cookie.sameSite;
		
	}
	
	public toString(): string {
		
		type KeyValuePair = {
			key: string;
			value?: string | number;
		};
		
		const results: KeyValuePair[] = [];
		
		results.push({ key: this.name, value: this.value });
		
		if (this.maxAge !== undefined) {
			
			results.push({ key: "Max-Age", value: this.maxAge });
			
		} else if (this.expires !== undefined) {
			
			results.push({ key: "Expires", value: this.expires.toUTCString() });
			
		}
		
		if (this.domain !== undefined) {
			
			results.push({ key: "Domain", value: this.domain });
			
		}
		
		if (this.path !== undefined) {
			
			results.push({ key: "Path", value: this.path });
			
		}
		
		if (this.secure) results.push({ key: "Secure" });
		
		if (this.httpOnly) results.push({ key: "HttpOnly" });
		
		if (this.sameSite !== undefined) {
			
			results.push({ key: "SameSite", value: this.sameSite });
			
		}
		
		return results.map(
			({ key, value }: KeyValuePair): string =>
				value === undefined ? key : `${key}=${value}`
		).join("; ");
		
	}

}
