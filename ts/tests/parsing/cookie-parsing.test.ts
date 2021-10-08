/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 11:41 AM -- October 8th, 2021
 * Project: http-js
 */

import { HTTPCookie, parseCookie } from "../../parsing/cookie-parsing";

const COOKIES: { [cookie: string]: HTTPCookie } = {
	
	"id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT": {
		
		name: "id",
		value: "a3fWa",
		expires: new Date("Wed, 21 Oct 2015 07:28:00 GMT"),
		secure: false,
		httpOnly: false
		
	},
	"sessionId=38afes7a8": {
		
		name: "sessionId",
		value: "38afes7a8",
		secure: false,
		httpOnly: false
		
	},
	"qwerty=219ffwef9w0f; Domain=somecompany.co.uk": {
		
		name: "qwerty",
		value: "219ffwef9w0f",
		domain: "somecompany.co.uk",
		secure: false,
		httpOnly: false
		
	},
	"sessionId=e8bb43229de9; Domain=foo.example.com": {
		
		name: "sessionId",
		value: "e8bb43229de9",
		domain: "foo.example.com",
		secure: false,
		httpOnly: false
		
	},
	"__Secure-ID=123; Secure; Domain=example.com": {
		
		name: "__Secure-ID",
		value: "123",
		domain: "example.com",
		secure: true,
		httpOnly: false
		
	},
	"__Host-ID=123; Secure; Path=/": {
		
		name: "__Host-ID",
		value: "123",
		path: "/",
		secure: true,
		httpOnly: false
		
	},
	"__Secure-id=1": {
		
		name: "__Secure-id",
		value: "1",
		secure: false,
		httpOnly: false
		
	},
	"__Host-id=1; Secure": {
		
		name: "__Host-id",
		value: "1",
		secure: true,
		httpOnly: false
		
	},
	"__Host-id=1; Secure; Path=/; HttpOnly; Domain=example.com": {
		
		name: "__Host-id",
		value: "1",
		domain: "example.com",
		path: "/",
		secure: true,
		httpOnly: true
		
	},
	"myCOOKIE=\"this is my cookie value\"; SameSite=Lax; HttpOnly": {
		
		name: "myCOOKIE",
		value: "this is my cookie value",
		sameSite: "Lax",
		secure: false,
		httpOnly: true
		
	},
	"myCOOKIE=\"this is my cookie value; SameSite=Nonsense; HttpOnly": {
		
		name: "myCOOKIE",
		value: "\"this is my cookie value",
		sameSite: undefined,
		secure: false,
		httpOnly: true
		
	}
	
}

for (let cookie of Object.keys(COOKIES)) {
	
	test(cookie, (): void => {
		
		let testCookie: HTTPCookie = parseCookie(cookie);
		let realCookie: HTTPCookie = COOKIES[cookie];
		
		expect(testCookie.name).toBe(realCookie.name);
		expect(testCookie.value).toBe(realCookie.value);
		expect(testCookie.expires).toStrictEqual(realCookie.expires);
		expect(testCookie.maxAge).toBe(realCookie.maxAge);
		expect(testCookie.domain).toBe(realCookie.domain);
		expect(testCookie.path).toBe(realCookie.path);
		expect(testCookie.secure).toBe(realCookie.secure);
		expect(testCookie.httpOnly).toBe(realCookie.httpOnly);
		expect(testCookie.sameSite).toBe(realCookie.sameSite);
		
	});
	
}
