import { CookieSameSiteValue } from "../parsing/cookie-parsing";

export type RawHTTPCookie = {
	
	name: string;
	
	value: string;
	
	expires?: Date;
	
	maxAge?: number;
	
	domain?: string;
	
	path?: string;
	
	secure: boolean;
	
	httpOnly: boolean;
	
	sameSite?: CookieSameSiteValue;
	
}
