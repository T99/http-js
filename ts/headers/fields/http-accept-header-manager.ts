import type { HTTPHeadersManager } from "../http-headers-manager";
import {
	type GenericQualityWeightedValue,
	type QualityWeightedValue,
	HTTPQualityWeightedHeader,
} from "./http-quality-weighted-header";

/**
 * Represents a given chunk of data's MIME type. 
 */
type MIMEType = {
	
	mimePrimaryType: string;
	
	mimeSecondaryType: string;
	
};

/**
 * Represents the pertinent information stored in a single 'Accept' header
 * value.
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
export type AcceptHeaderValue = MIMEType & QualityWeightedValue;

/**
 * A class that seeks to encapsulate much of the interfacing logic with the HTTP
 * 'Accept' header and its values.
 * 
 * @author Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/)
 * @version v0.1.0
 * @since v0.1.0
 */
export class HTTPAcceptHeaderManager extends HTTPQualityWeightedHeader {
	
	/**
	 * Initializes a new HTTPAcceptHeaderManager instance, off of the specified
	 * {@link HTTPHeadersManager}, and optionally using 'all headers', as
	 * opposed to solely referencing the 'authoritative' 'Accept' header.
	 * 
	 * @param {HTTPHeadersManager} headersManager The {@link HTTPHeadersManager}
	 * from which the 'Accept' header should be read.
	 * @param {boolean} useAllHeaders Whether or not all 'Accept' headers should
	 * be used, or if the 'authoritative' header should be used. Defaults to
	 * 'false', which causes the 'authoritative' header to be used.
	 * @see HTTPHeadersManager#getAuthoritativeHeader
	 */
	public constructor(headersManager: HTTPHeadersManager,
					   useAllHeaders: boolean = false) {
		
		super("Accept", headersManager, useAllHeaders);
		
	}
	
	/**
	 * Returns a regular expression that has been created to match strings that
	 * represent the given MIME type.
	 * 
	 * @param {MIMEType} mimeType The MIME type for which to create and return a
	 * regular expression.
	 * @returns {RegExp} A regular expression that matches strings
	 * representative of the given MIME type.
	 */
	protected static getRegexForMIMEType(mimeType: MIMEType): RegExp {
		
		let regexString: string = "";
		
		regexString += "^";
		
		if (mimeType.mimePrimaryType === "*") regexString += ".+";
		else regexString += mimeType.mimePrimaryType;
		
		regexString += "/";
		
		if (mimeType.mimeSecondaryType === "*") regexString += ".+";
		else regexString += mimeType.mimeSecondaryType;
		
		regexString += "$";
		
		return new RegExp(regexString, "u");
		
	}
	
	/**
	 * Returns true if the provided value is a MIME type matching one of the
	 * acceptable formats specified by the 'Accept' header.
	 * 
	 * @param {string} mimeString A string representation of the MIME type for
	 * which to determine its acceptability.
	 * @returns {boolean} true if the provided value is a MIME type matching one
	 * of the acceptable formats specified by the 'Accept' header. 
	 */
	public accepts(mimeString: string): boolean {
		
		return this.getAcceptedValues().some(
			(value: AcceptHeaderValue): boolean =>
				HTTPAcceptHeaderManager.getRegexForMIMEType(value)
					.test(mimeString)
		);
		
	}
	
	/**
	 * Returns the quality factor of the provided MIME type, as indicated by the
	 * 'Accept' header.
	 * 
	 * A quality of zero means that the given MIME type is not acceptable.
	 * 
	 * @param {string} mimeString A string representation of the MIME type for
	 * which to determine its quality factor.
	 * @returns {number} The quality factor of the specified MIME type.
	 */
	public getMIMETypeQuality(mimeString: string): number {
		
		return this.getAcceptedValues().find(
			(value: AcceptHeaderValue): boolean =>
				HTTPAcceptHeaderManager.getRegexForMIMEType(value)
					.test(mimeString)
		)?.relativeQualityFactor ?? 0;
		
	}
	
	/**
	 * Filters the input array of MIME strings down to those that are
	 * 'supported'/'acceptable' as indicated by the associated header, returning
	 * an array that represents the intersection between the two sets.
	 * 
	 * This function's return value is stable to the input array - in other
	 * words, if a given format is specified before another format in the input
	 * array, and both formats are acceptable, matches to the earlier format
	 * will show up before matches to the later format in the output array.
	 * 
	 * @param {string[]} mimeStrings An array of strings representing the
	 * formats supported by the caller. Each element should reference a valid
	 * MIME type as specified by
	 * <a href="https://tools.ietf.org/html/rfc6838">RFC 6838</a> and listed on
	 * <a href="https://www.iana.org/assignments/media-types/media-types.xhtml">
	 * the IANA's 'Media Types' page</a>.
	 * @returns {string[]} An array that represents the intersection between the
	 * input set, and the set of MIME types represented by the associated
	 * header.
	 */
	public filterToSupportedMIMEs(...mimeStrings: string[]): string[] {
		
		// Note to self: The reason I didn't 'unroll' this function to use
		// `#accepts` is because each call to `#accepts` results in a call to
		// `#getAcceptedValues`, whereas this function only calls it once.
		
		const acceptedValues: AcceptHeaderValue[] = this.getAcceptedValues();
		
		// Filter the given MIME strings down to those for which a matching
		// Accept value can be found.
		return mimeStrings.filter((mimeString: string): boolean => {
			
			// If there exists some accepted value that matches the given MIME
			// string, return true.
			return acceptedValues.some(
				(acceptedValue: AcceptHeaderValue): boolean =>
					HTTPAcceptHeaderManager.getRegexForMIMEType(acceptedValue)
						.test(mimeString)
			);
			
		});
		
	}
	
	/**
	 * Returns the MIME type that was indicated to be the 'highest quality' by
	 * the associated header.
	 * 
	 * Example:
	 *   Accept: text/csv;q=0.4, text/html;q=0.73, application/json;q=0.01
	 *   getHighestQuality() --> "text/html"
	 * 
	 * @returns {string} The MIME type that was indicated to be the 'highest
	 * quality' by the associated header.
	 */
	public getHighestQuality(): string {
		
		let acceptedValues: AcceptHeaderValue[] = this.getAcceptedValues();
		
		if (acceptedValues.length >= 1) {
			
			return `${acceptedValues[0].mimePrimaryType}/${acceptedValues[0].mimeSecondaryType}`;
			
		} else return "*/*";
		
	}
	
	/**
	 * Returns an array of 'Accept' header values, as parsed from the 'Accept'
	 * header of the associated HTTP message.
	 * 
	 * @returns {AcceptHeaderValue[]} An array of parsed 'Accept' header values.
	 */
	public getAcceptedValues(): AcceptHeaderValue[] {
		
		return this.getQualityWeightedValues()
			.map((genericValue: GenericQualityWeightedValue
				): AcceptHeaderValue | undefined => {
			
				const separatorIndex: number = genericValue.value.indexOf("/");
				
				if (separatorIndex === -1) return undefined;
				
				return {
					
					mimePrimaryType:
						genericValue.value.substring(0, separatorIndex),
					
					mimeSecondaryType:
						genericValue.value.substring(separatorIndex + 1),
					
					relativeQualityFactor:
						genericValue.relativeQualityFactor,
					
				};
				
			})
			.filter(
				(value: unknown): boolean => value !== undefined
			) as AcceptHeaderValue[];
		
	}
	
}
