/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 10:40 AM -- September 21st, 2021
 * Project: @t99/http
 */

export type HTTPVersionFormat = "major" | "minor" | "full" | "object";

export type HTTPVersionObject = { major: string, minor: string };

export const DEFAULT_HTTP_VERSION: HTTPVersionObject = {
	major: "1",
	minor: "1"
}

const REGEX: RegExp = /(?<major>\d+)\.(?<minor>\d+)/;

export function normalizeHTTPVersion(version?: string | number | HTTPVersionObject): HTTPVersionObject {
	
	if (version === undefined || version === null) return DEFAULT_HTTP_VERSION;
	else {
		
		let type: typeof version = typeof version;
		
		if (type === "string") {
		
			let matches: RegExpMatchArray | null = (version as string).match(REGEX);
			
			if (matches === null) return DEFAULT_HTTP_VERSION;
			else {
				
				return {
					major: (matches as any)["groups"]["major"],
					minor: (matches as any)["groups"]["minor"]
				}
				
			}
		
		} else if (type === "number") return normalizeHTTPVersion(version.toString())
		else return version as HTTPVersionObject;
		
	}
	
}
