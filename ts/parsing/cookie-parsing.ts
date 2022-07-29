/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 9:55 AM -- October 8th, 2021
 * Project: @t99/http
 */

/**
 * An enumeration of acceptable values for an HTTP cookie's 'SameSite' value.
 */
export type CookieSameSiteValue = "Strict" | "Lax" | "None";

/**
 * An object representative of an HTTP cookie.
 */
export type HTTPCookie = {
	
	name: string;
	
	value: string;
	
	expires?: Date;
	
	maxAge?: number;
	
	domain?: string;
	
	path?: string;
	
	secure: boolean;
	
	httpOnly: boolean;
	
	sameSite?: CookieSameSiteValue;
	
};

/**
 * A regular expression that matches the 'name' part of a textual HTTP cookie.
 * The first capture group matches the cookie's name, while the second capture
 * group matches the remaining part of the cookie after the '=' separator
 * between the cookie name and cookie value.
 */
const COOKIE_NAME_REGEX: RegExp =
	/^\s*([^\x00-\x20()<>@,;:\\"\/[\]?={}]+)\s*=\s*(.+)$/;

/**
 * Attempts to parse HTTP cookie information out the provided string, returning
 * the resulting {@link HTTPCookie} object.
 * 
 * @param {string} cookie The string HTTP cookie to parse to an
 * {@link HTTPCookie} object.
 * @returns {HTTPCookie} The resulting {@link HTTPCookie} object, as parsed from
 * the provided string.
 * @throws {Error} If the provided string cannot be parsed as an HTTP cookie.
 */
export function parseCookie(cookie: string): HTTPCookie {
	
	let rest: string = cookie;
	
	const cookieNameRegexResult: RegExpMatchArray | null =
		COOKIE_NAME_REGEX.exec(rest);
	
	if (cookieNameRegexResult === null) {
		
		throw new Error(
			`Failed to parse HTTP cookie name from cookie. Cookie: ${cookie}`
		);
		
	}
	
	const name: string = cookieNameRegexResult[1];
	
	rest = cookieNameRegexResult[2];
	
	let cookieValue: string | undefined;
	
	// If the cookie value is surrounded by quotes, parse out the quoted
	// content.
	if (rest.charAt(0) === "\"") {
		
		// Look for the closing quote.
		const nextQuoteIndex: number = rest.indexOf("\"", 1);
		
		// If the closing quote was found...
		if (nextQuoteIndex !== -1) {
			
			cookieValue = rest.substring(1, nextQuoteIndex);
			rest = rest.substring(nextQuoteIndex);
			
		}
		
	}
		
	if (cookieValue === undefined) {
		
		// Look for the closing semicolon instead.
		const semicolonIndex: number = rest.indexOf(";", 1);
		
		// If the closing semicolon was NOT found...
		if (semicolonIndex === -1) {
			
			cookieValue = rest;
			rest = "";
			
		// If the closing semicolon WAS found...
		} else {
			
			cookieValue = rest.substring(0, semicolonIndex);
			rest = rest.substring(semicolonIndex);
			
		}
		
	}
	
	const remainingPhrases: string[] =
		rest.split(";")
		    .map((phrase: string): string => phrase.trim());
	
	let expires: Date | undefined;
	let maxAge: number | undefined;
	let domain: string | undefined;
	let path: string | undefined;
	let secure: boolean = false;
	let httpOnly: boolean = false;
	let sameSite: CookieSameSiteValue | undefined;
	
	for (const phrase of remainingPhrases) {
		
		const lowercasePhrase: string = phrase.toLowerCase();
		
		if (lowercasePhrase === "secure") secure = true;
		else if (lowercasePhrase === "httponly") httpOnly = true;
		else {
			
			const keyValuePair: string[] = phrase.split("=");
			
			if (keyValuePair.length === 2) {
				
				const key: string = keyValuePair[0].trim().toLowerCase();
				let valueOfKey: string = keyValuePair[1];
				
				if (key === "expires") expires = new Date(valueOfKey);
				else if (key === "max-age") maxAge = parseFloat(valueOfKey);
				else if (key === "domain") domain = valueOfKey;
				else if (key === "path") path = valueOfKey;
				else if (key === "samesite") {
					
					valueOfKey = valueOfKey.trim().toLowerCase();
					
					if (valueOfKey === "strict") sameSite = "Strict";
					else if (valueOfKey === "lax") sameSite = "Lax";
					else if (valueOfKey === "none") sameSite = "None";
					
				}
				
			}
			
		}
		
	}
	
	return {
		name,
		value: cookieValue,
		expires,
		maxAge,
		domain,
		path,
		secure,
		httpOnly,
		sameSite,
	};
	
}

/**
 * Converts an {@link HTTPCookie} object to it's equivalent string version,
 * returning the result.
 * 
 * @param {HTTPCookie} cookie The {@link HTTPCookie} object to convert to a
 * string.
 * @returns {string} The resulting string version of the provided
 * {@link HTTPCookie} object.
 */
export function stringifyCookie(cookie: HTTPCookie): string {
	
	let result: string = `${cookie.name}=${cookie.value}`;
	
	if (cookie.maxAge !== undefined) result += `; Max-Age=${cookie.maxAge}`;
	else if (cookie.expires !== undefined) {
		
		result += `; Expires=${cookie.expires.toUTCString()}`;
		
	}
	
	if (cookie.domain !== undefined) result += `; Domain=${cookie.domain}`;
	
	if (cookie.path !== undefined) result += `; Path=${cookie.path}`;
	
	if (cookie.secure) result += `; Secure`;
	
	if (cookie.httpOnly) result += `; HttpOnly`;
	
	if (cookie.sameSite !== undefined) {
		
		result += `; SameSite=${cookie.sameSite}`;
		
	}
	
	return result;
	
}
