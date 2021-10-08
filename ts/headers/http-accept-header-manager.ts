import { HTTPHeadersManager } from "./http-headers-manager";

/**
 * Matches the various parts of each 'Accept' value:
 *   - Capture Group 0: The entire value, if it is valid.
 *   - Capture Group 1: The primary MIME type (i.e. for 'text/csv' this would be 'text').
 *   - Capture Group 2: The MIME subtype (i.e. for 'text/csv' this would be 'csv').
 *   - Capture Group 3: The relative quality factor of the value, if one is present.
 */
const ACCEPT_HEADER_VALUE_REGEX: RegExp = /(.+)\/(.*?)(?=;|$)(?:;q=(\d+(?:\.\d+)?$))?/;

/**
 * Represents the pertinent information stored in a single 'Accept' header value.
 *
 * For the following raw 'Accept' header value:
 * <pre>
 *     audio/mp3;q=0.8
 * </pre>
 *
 * The following AcceptHeaderValue object would match:
 * <pre>
 * {
 *     "mimePrimaryType": "audio",
 *     "mimeSecondaryType": "mp3",
 *     "relativeQualityFactor": 0.8
 * }
 * </pre>
 */
export type AcceptHeaderValue = {
	
	mimePrimaryType: string,
	
	mimeSecondaryType: string,
	
	relativeQualityFactor: number
	
};

export class HTTPAcceptHeaderManager {
	
	protected acceptedValues: AcceptHeaderValue[];
	
	public constructor(headersManager: HTTPHeadersManager, useAllHeaders: boolean = false) {
		
		// TODO [7/28/21 @ 8:47 PM] Generify this method - other headers also use the 'q' parameter.
		
		// If the 'Accept' header isn't present...
		if (!headersManager.hasHeader("Accept")) {
			
			this.acceptedValues = [{
				mimePrimaryType: "*",
				mimeSecondaryType: "*",
				relativeQualityFactor: 1
			}];
			
		} else {
			
			if (!useAllHeaders) {
				
				this.acceptedValues = HTTPAcceptHeaderManager.parseMIMEListString(
					headersManager.getAuthoritativeHeader("Accept") as string
				);
				
			} else {
				
				this.acceptedValues = headersManager.getHeader("Accept")
				?.map(HTTPAcceptHeaderManager.parseMIMEListString)
				?.flat() ?? [];
				
			}
			
			this.acceptedValues.sort((element1: AcceptHeaderValue, element2: AcceptHeaderValue): number => {
				
				let relativeQualityFactorDelta: number = element2.relativeQualityFactor - element1.relativeQualityFactor;
				
				if (relativeQualityFactorDelta !== 0) return relativeQualityFactorDelta;
				else {
					
					// If that didn't work (they have the same relative quality factor), sort them in this order:
					// Highest Priority -> text/csv -> 2 pts/1 pt  -> 3
					//                     text/*   -> 2 pts/0 pts -> 2
					//                     */text   -> 0 pts/1 pt  -> 1
					// Lowest Priority  -> */*      -> 0 pts/0 pts -> 0
					
					let element1Priority: number = 0;
					let element2Priority: number = 0;
					
					if (element1.mimePrimaryType !== "*") element1Priority += 2;
					if (element2.mimePrimaryType !== "*") element2Priority += 2;
					if (element1.mimeSecondaryType !== "*") element1Priority += 1;
					if (element2.mimeSecondaryType !== "*") element2Priority += 1;
					
					return element2Priority - element1Priority;
					
				}
				
			});
			
		}
		
	}
	
	public static parseMIMEString(mimeString: string): AcceptHeaderValue | undefined {
		
		let matches: string[] | null = mimeString.match(ACCEPT_HEADER_VALUE_REGEX);
		
		// If we found at least the MIME type parts...
		if (matches !== null && matches.length >= 3) {
			
			let mimeType: string = matches[1] as string;
			let mimeSubtype: string = matches[2] as string;
			let relativeQualityFactor: number = 1; // <- Default value, as per spec.
			
			// If we found a value for the relative quality factor...
			if (matches?.length >= 4) {
				
				let parsedNumericValue: number = parseFloat(matches[3]);
				
				// Make sure that the value wasn't somehow malformed.
				// This check shouldn't be necessary based on the above Regex, but better safe than erroring.
				if (!isNaN(parsedNumericValue)) relativeQualityFactor = parsedNumericValue;
				
			}
			
			return { mimePrimaryType: mimeType, mimeSecondaryType: mimeSubtype, relativeQualityFactor };
			
		} else return undefined;
		
	}
	
	public static parseMIMEListString(mimeListString: string): AcceptHeaderValue[] {
		
		let result: AcceptHeaderValue[] = [];
		
		// Sanitize and separate the values for the authoritative 'Accept' header into an array of strings.
		let splitValues: string[] = mimeListString.trim().split(/,\s+/);
		
		for (let splitValue of splitValues) {
			
			let parsedValue: AcceptHeaderValue | undefined = HTTPAcceptHeaderManager.parseMIMEString(splitValue);
			
			if (parsedValue !== undefined) result.push(parsedValue);
			// Otherwise, ignore the non-standard/malformed value and move on.
			
		}
		
		return result;
		
	}
	
	protected static getRegexForMIMEType(mimeType: string): RegExp {
		
		let separatorIndex: number = mimeType.indexOf("/");
		let mimePrimaryType: string = mimeType.substring(0, separatorIndex);
		let mimeSecondaryType: string = mimeType.substring(separatorIndex + 1);
		
		let regexString: string = "";
		
		regexString += "^";
		regexString += (mimePrimaryType === "*" ? ".+" : mimePrimaryType);
		regexString += "/";
		regexString += (mimeSecondaryType === "*" ? ".+" : mimeSecondaryType);
		regexString += "$";
		
		return new RegExp(regexString);
		
	}

	public accepts(mimeString: string): boolean {
		
		return this.acceptedValues.some(
			(value: AcceptHeaderValue): boolean => `${value.mimePrimaryType}/${value.mimeSecondaryType}` === mimeString
		);
		
	}
	
	/**
	 * Filters the input array of MIME strings down to those that are 'supported'/'acceptable' as indicated by the
	 * associated header, returning an array that represents the intersection between the two sets.
	 * 
	 * This function's return value is stable to the input array - in other words, if a given format is specified before
	 * another format in the input array, and both formats are acceptable, matches to the earlier format will show up
	 * before matches to the later format in the output array.
	 * 
	 * @param {string[]} mimeStrings An array of strings representing the formats supported by the caller. Each
	 * element should reference a valid MIME type as specified by
	 * <a href="https://tools.ietf.org/html/rfc6838">RFC 6838</a> and listed on
	 * <a href="https://www.iana.org/assignments/media-types/media-types.xhtml">the IANA's 'Media Types' page</a>.
	 * @return {string[]} An array that represents the intersection between the input set, and the set of MIME types
	 * represented by the associated header.
	 */
	public filter(...mimeStrings: string[]): string[] {
		
		let preferredSupportedFormats: string[] = [];
		
		for (let preferredFormat of this.acceptedValues) {
			
			let regexString: string = "";
			
			regexString += "^";
			regexString += (preferredFormat.mimePrimaryType === "*" ? ".+" : preferredFormat.mimePrimaryType);
			regexString += "/";
			regexString += (preferredFormat.mimeSecondaryType === "*" ? ".+" : preferredFormat.mimeSecondaryType);
			regexString += "$";
			
			let preferredFormatRegex: RegExp = new RegExp(regexString);
			
			for (let supportedFormat of mimeStrings) {
				
				if (preferredFormatRegex.test(supportedFormat)) preferredSupportedFormats.push(supportedFormat);
				
			}
			
		}
		
		// Convert the array into a set (removing duplicates), and then convert it back.
		return Array.from(new Set(preferredSupportedFormats));
		
	}
	
	public getHighestQuality(): string {
		
		return `${this.acceptedValues[0].mimePrimaryType}/${this.acceptedValues[0].mimeSecondaryType}`;
		
	}
	
	public getAcceptedValues(): AcceptHeaderValue[] {
		
		return this.acceptedValues;
		
	}
	
}