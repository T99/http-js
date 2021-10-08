/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 9:55 AM -- October 8th, 2021
 * Project: http-js
 */
 
import { CookieSameSiteValue } from "../headers/http-cookies-header-manager";

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
 * A regular expression that matches the 'name' part of a textual HTTP cookie. The first capture group matches the
 * cookie's name, while the second capture group matches the remaining part of the cookie after the '=' separator
 * between the cookie name and cookie value.
 */
const COOKIE_NAME_REGEX: RegExp = /^\s*([^\x00-\x20()<>@,;:\\"\/[\]?={}]+)\s*=\s*(.+)$/;

// /**
//  * A regular express that matches the 'value' part of a textual HTTP cookie. The first capture group matches the
//  * cookie's value, while the second capture group 
//  */
// const COOKIE_VALUE_REGEX: RegExp = /^\s*([^\x00-\x20",;\\]+)\s*;?\s*(.*)$/;

/**
 * Attempts to parse HTTP cookie information out the provided string, returning the resulting {@link HTTPCookie} object.
 * 
 * @param {string} cookie The string HTTP cookie to parse to an {@link HTTPCookie} object.
 * @returns {HTTPCookie} The resulting {@link HTTPCookie} object, as parsed from the provided string.
 * @throws {Error} If the provided string cannot be parsed as an HTTP cookie.
 */
export function parseCookie(cookie: string): HTTPCookie {
	
	let rest: string = cookie;
	
	let cookieNameRegexResult: RegExpMatchArray | null = rest.match(COOKIE_NAME_REGEX);
	
	if (cookieNameRegexResult === null) {
		
		throw new Error(`Failed to parse HTTP cookie name from cookie. Cookie: ${cookie}`);
		
	}
	
	let name: string = cookieNameRegexResult[1];
	rest = cookieNameRegexResult[2];
	
	let value: string | undefined = undefined;
	
	// If the cookie value is surrounded by quotes, parse out the quoted content.
	if (rest.charAt(0) === "\"") {
		
		// Look for the closing quote.
		let nextQuoteIndex: number = rest.indexOf("\"", 1);
		
		// If the closing quote was found...
		if (nextQuoteIndex !== -1) {
			
			value = rest.substring(1, nextQuoteIndex);
			rest = rest.substring(nextQuoteIndex);
			
		}
		
	}
		
	if (value === undefined) {
		
		// Look for the closing semicolon instead.
		let semicolonIndex: number = rest.indexOf(";", 1);
		
		// If the closing semicolon was found...
		if (semicolonIndex !== -1) {
			
			value = rest.substring(0, semicolonIndex);
			rest = rest.substring(semicolonIndex);
			
		// If the closing semicolon was not found...
		} else {
			
			value = rest;
			rest = "";
			
		}
		
	}
	
	let remainingPhrases: string[] = rest.split(";").map((phrase: string): string => phrase.trim());
	
	let expires: Date | undefined = undefined;
	let maxAge: number | undefined = undefined;
	let domain: string | undefined = undefined;
	let path: string | undefined = undefined;
	let secure: boolean = false;
	let httpOnly: boolean = false;
	let sameSite: CookieSameSiteValue | undefined = undefined;
	
	for (let phrase of remainingPhrases) {
		
		let lcPhrase: string = phrase.toLowerCase();
		
		if (lcPhrase === "secure") secure = true;
		else if (lcPhrase === "httponly") httpOnly = true;
		else {
			
			let keyValuePair: string[] = phrase.split("=");
			
			if (keyValuePair.length === 2) {
				
				let key: string = keyValuePair[0].trim().toLowerCase();
				let value: string = keyValuePair[1];
				
				if (key === "expires") expires = new Date(value);
				else if (key === "max-age") maxAge = parseFloat(value);
				else if (key === "domain") domain = value;
				else if (key === "path") path = value;
				else if (key === "samesite") {
					
					value = value.trim().toLowerCase();
					
					if (value === "strict") sameSite = "Strict";
					else if (value === "lax") sameSite = "Lax";
					else if (value === "none") sameSite = "None";
					
				}
			}
			
		}
		
	}
	
	return {
		
		name,
		value,
		expires,
		maxAge,
		domain,
		path,
		secure,
		httpOnly,
		sameSite
		
	};
	
}

/**
 * Converts an {@link HTTPCookie} object to it's equivalent string version, returning the result.
 * 
 * @param {HTTPCookie} cookie The {@link HTTPCookie} object to convert to a string.
 * @param {boolean} strict Whether or not the resulting string should be checked for technical validity against a regex
 * that represents the official specification.
 * @returns {string} The resulting string version of the provided {@link HTTPCookie} object. 
 * @throws {Error} If 'strict' is set to true and the resulting HTTP cookie is invalid.
 */
export function stringifyCookie(cookie: HTTPCookie, strict: boolean = true): string {
	
	let result: string = `${cookie.name}=${cookie.value}`;
	
	if (strict) {
		
		let regexResult: RegExpMatchArray | null = result.match(COOKIE_NAME_REGEX);
		
		if (regexResult === null) throw new Error("Cookie name or value contained invalid characters.");
		
	}
	
	if (cookie.maxAge !== undefined) result += `; Max-Age=${cookie.maxAge}`;
	else if (cookie.expires !== undefined) result += `; Expires=${cookie.expires.toUTCString()}`;
	
	if (cookie.domain !== undefined) result += `; Domain=${cookie.domain}`;
	
	if (cookie.path !== undefined) result += `; Path=${cookie.path}`;
	
	if (cookie.secure) result += `; Secure`;
	
	if (cookie.httpOnly) result += `; HttpOnly`;
	
	if (cookie.sameSite !== undefined) result += `; SameSite=${cookie.sameSite}`;
	
	return result;
	
}
