/**
 * An object whose fields are each valid HTTP header fields, each field having the values assigned to the HTTP header
 * field.
 *
 * For example:
 * <pre>
 * {
 *     "accept": {
 *         originalFields: ["Accept"],
 *         values: ["image/png, image/webp", "image/jpg"]
 *     }
 *     "connection": {
 *         originalFields: ["Connection"],
 *         values: ["keep-alive"]
 *     }
 * }
 * </pre>
 */
export type HTTPHeaders = {
	
	/**
	 * Each field corresponds to an HTTP header field (i.e. 'Accept-Encoding').
	 *
	 * This field may be modified for the purpose of standardization (for lookup purposes), for example, all incoming
	 * headers are converted to lower-case before being stored here.
	 */
	[field: string]: {
		
		/**
		 * This is the original, un-transformed fields, as received directly from the client.
		 *
		 * Each element of this array matches to it's respective value in the 'values' array.
		 */
		originalFields: string[],
		
		/**
		 * An array of the values for this HTTP header field.
		 *
		 * Each element of the array represents the string provided for exactly one header included on a given HTTP
		 * message. For example, the following headers:
		 * <pre>
		 * Accept: image/png, image/webp
		 * accept: image/jpg
		 * </pre>
		 *
		 * Should result in the following HTTPHeaders object:
		 * <pre>
		 * {
		 *     "accept": {
		 *         originalFields: ["Accept", "accept"],
		 *         values: ["image/png, image/webp", "image/jpg"]
		 *     }
		 * }
		 * </pre>
		 */
		values: string[]
		
	}
	
};

/**
 * A user-friendly version of the HTTPHeaders type that allows for more flexibility during the initialization of
 * HTTPHeadersManager instances.
 */
export type ParseableHTTPHeaders = {
	
	[field: string]: string | string[] | {
		
		originalFields?: string | string[],
		
		values: string | string[]
		
	};
	
};

type FieldTransformer = (field: string) => string;

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
type AcceptHeaderValue = {
	mimePrimaryType: string,
	mimeSecondaryType: string,
	relativeQualityFactor: number
};

/**
 * Matches the various parts of each 'Accept' value:
 *   - Capture Group 0: The entire value, if it is valid.
 *   - Capture Group 1: The primary MIME type (i.e. for 'text/csv' this would be 'text').
 *   - Capture Group 2: The MIME subtype (i.e. for 'text/csv' this would be 'csv').
 *   - Capture Group 3: The relative quality factor of the value, if one is present.
 */
const ACCEPT_HEADER_VALUE_REGEX: RegExp = /(.+)\/(.*?)(?=;|$)(?:;q=(\d+(?:\.\d+)?$))?/;

// DOC-ME [7/27/2021 @ 3:27 PM] Documentation is required!
function parseAcceptHeaderValue(rawValue: string): AcceptHeaderValue | undefined {
	
	let matches: string[] | null = rawValue.match(ACCEPT_HEADER_VALUE_REGEX);
	
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

// DOC-ME [7/27/2021 @ 3:27 PM] Documentation is required!
export class ImmutableHTTPHeadersManager {
	
	/**
	 * A function that transforms HTTP header field names from whatever form/case they are in, to 'Title Case'.
	 * 
	 * Example:
	 * <pre>
	 *     TITLE_CASE_FIELD_TRANSFORMER("content-security-policy") --> "Content-Security-Policy"
	 * </pre>
	 * 
	 * @param {string} field The HTTP header field name to transform to 'Title Case'.
	 * @returns {string} The 'Title Case' transformed input string.
	 */
	public static readonly TITLE_CASE_FIELD_TRANSFORMER: FieldTransformer = (field: string): string => {
		
		return field.split("-").map((component: string): string => {
			return component.charAt(0).toUpperCase() + component.substring(1).toLowerCase();
		}).join("-");
		
	};
	
	public static readonly LOWER_CASE_FIELD_TRANSFORMER: FieldTransformer =
		(field: string): string => field.toLowerCase();
	
	public static readonly UPPER_CASE_FIELD_TRANSFORMER: FieldTransformer =
		(field: string): string => field.toUpperCase();
	
	/**
	 * A collection of HTTP headers.
	 *
	 * @see HTTPHeaders
	 */
	protected headers: HTTPHeaders;
	
	protected headerFieldTransformer: FieldTransformer;
	
	/**
	 * Initializes a new ImmutableHTTPHeadersManager instance with the provided HTTP headers.
	 *
	 * @param {HTTPHeaders} headers The HTTP headers with which to initialize this ImmutableHTTPHeadersManager instance.
	 * @param {FieldTransformer} headerFieldTransformer
	 */
	public constructor(headers: ParseableHTTPHeaders = {}, headerFieldTransformer?: FieldTransformer) {
		
		this.headers = {};
		this.headerFieldTransformer = headerFieldTransformer ?? ((field: string): string => field);
		
		for (let field of Object.keys(headers)) {
			
			let standardizedField: string = ImmutableHTTPHeadersManager.getStandardizedHeaderField(field);
			
			if (typeof headers[field] === "string") {
				
				this.headers[standardizedField] = {
					
					originalFields: [field],
					values: [headers[field] as string]
					
				};
				
			} else if (Array.isArray(headers[field])) {
				
				this.headers[standardizedField] = {
					
					originalFields: (headers[field] as string[]).map((): string => field),
					values: headers[field] as string[]
					
				};
				
			} else if ((headers[field] as any)?.values !== undefined) {
				
				let inputOriginalFields: any = (headers[field] as any)?.originalFields;
				let inputValues: any = (headers[field] as any)?.values;
				
				let value: HTTPHeaders[keyof HTTPHeaders] = {
					originalFields: undefined as any,
					values: undefined as any
				};
				
				if (typeof inputValues === "string") value.values = [inputValues];
				else if (Array.isArray(inputValues)) value.values = inputValues;
				else continue; // The object was improperly formatted, so ignore it.
				
				if (typeof inputOriginalFields === "string") value.originalFields = [inputOriginalFields];
				else if (Array.isArray(inputOriginalFields)) value.originalFields = inputOriginalFields;
				else continue; // The object was improperly formatted, so ignore it.
				
				this.headers[standardizedField] = value;
				
			} // Otherwise, ignore it.
			
		}
		
	}
	
	public static getStandardizedHeaderField(field: string): string {
		
		return field.toLowerCase();
		
	}
	
	/**
	 * Returns an object containing all of the HTTP headers and their values for this collection of headers.
	 *
	 * Note that this object is a clone of the original, and therefore cannot be used to modify the internal state of
	 * this ImmutableHTTPHeadersManager instance.
	 *
	 * @return {HTTPHeaders} An object containing all of the HTTP headers and their values for this collection of
	 * headers.
	 */
	public getHeaders(): HTTPHeaders {
		
		// Encode and decode the internal headers object in order to deep-clone it.
		return JSON.parse(JSON.stringify(this.headers));
		
	}
	
	/**
	 * Returns an array of the HTTP header fields present on this collection of headers.
	 *
	 * Note that this function does not return the fields associated with the returned fields, but rather simply an
	 * array containing the field names.
	 *
	 * @param {FieldTransformer | undefined} fieldTransformer An optional function taking a string that applies a
	 * desired string transformation and returns the resulting string. Applied to each header field name if provided.
	 * @return {string[]} An array of the HTTP header fields present on this collection of headers.
	 */
	public getHeaderFields(fieldTransformer?: FieldTransformer): string[] {
		
		let fields: string[] = Object.keys(this.headers);
		
		if (fieldTransformer !== undefined) fields = fields.map(fieldTransformer);
		
		return fields;
		
	}
	
	/**
	 * Returns true if the specified HTTP header was found in the headers present on this collection of headers.
	 *
	 * @param {HTTPHeaderField} field The HTTP header field to check for on this collection of headers.
	 * @return {boolean} true if the specified HTTP header was found in this collection of headers.
	 */
	public hasHeader(field: HTTPHeaderField): boolean {
		
		field = ImmutableHTTPHeadersManager.getStandardizedHeaderField(field);
		
		return (
			this.headers[field] !== undefined &&
			this.headers[field].values.length > 0
		);
		
	}
	
	/**
	 * Returns the values present for the specified HTTP header, or undefined if the specified field was not found.
	 *
	 * @param {HTTPHeaderField} field The HTTP header field for which to return associated values.
	 * @return {string[] | undefined} The values present for the specified HTTP header, or undefined if the specified
	 * field was not found.
	 */
	public getHeader(field: HTTPHeaderField): string[] | undefined {
		
		field = ImmutableHTTPHeadersManager.getStandardizedHeaderField(field);
		
		if (this.hasHeader(field)) return this.headers[field].values;
		else return undefined;
		
	}
	
	/**
	 * Returns the last value present for the specified header field, or undefined if the specified field was not found.
	 *
	 * For example, in the situation in which the 'Accept' header is set multiple times in the following order:
	 * 	- Accept: application/json
	 * 	- Accept: text/xml
	 * 	- Accept: text/csv
	 * This function would return 'text/csv'.
	 *
	 * @param {HTTPHeaderField} field The HTTP header field for which to retrieve the authoritative value.
	 * @return {string | undefined} The authoritative value for the specified HTTP header if such a header was present,
	 * otherwise undefined.
	 */
	public getAuthoritativeHeader(field: HTTPHeaderField): string | undefined {
		
		field = ImmutableHTTPHeadersManager.getStandardizedHeaderField(field);
		
		if (this.hasHeader(field)) {
			
			let headerValues: string[] = this.getHeader(field) as string[];
			return headerValues[headerValues.length - 1];
			
		} else return undefined;
		
	}
	
	/**
	 * Returns an array of desirable formats, as indicated by the 'Accept' header, ordered from most desirable to least
	 * desirable.
	 *
	 * This is determined based on the 'q' parameter, which can optionally be specified for each 'Accept' header value.
	 * Each value (in which the aforementioned 'q' parameter is specified) takes the form:
	 * <pre>
	 *     mimePrimaryType/mimeSecondaryType;q=relativeQualityFactor
	 * </pre>
	 *
	 * For example:
	 * <pre>
	 *     application/json;q=0.5
	 * </pre>
	 *
	 * Values for which a relative quality factor is not explicitly set default to a value of 1. More explicit MIME
	 * types are also always preferred over less explicit types. For example:
	 * <pre>
	 *     image/webp;q=0.7
	 * </pre>
	 *
	 * Would take precedence over:
	 * <pre>
	 *     image/*;q=0.7
	 * </pre>
	 *
	 * @param {boolean} preferAuthoritativeHeader Whether or not to exclusively use the authoritative 'Accept' header
	 * to determine the preferred format. If not, all 'Accept' headers will be aggregated in order to find the preferred
	 * format.
	 * @param {boolean} collapseToStrings An optional parameter that determines the format of the return value. Set to
	 * true if the return value should consist of strings, or false if the return value should consist of an array of
	 * {@link AcceptHeaderValue} objects. Defaults to true.
	 * @return {string[] | AcceptHeaderValue[]} An array of desirable formats, as indicated by the 'Accept' header,
	 * ordered from most desirable to least desirable. This will be an array of strings if 'collapseToStrings' is either
	 * not set, or explicitly set to true, but will be an array of AcceptHeaderValue objects otherwise.
	 * @see ImmutableHTTPHeadersManager#getPreferredSupportedFormats
	 */
	public getPreferredFormats(preferAuthoritativeHeader: boolean, collapseToStrings?: true): string[];
	public getPreferredFormats(preferAuthoritativeHeader: boolean, collapseToStrings: false): AcceptHeaderValue[];
	public getPreferredFormats(preferAuthoritativeHeader: boolean = true, collapseToStrings: boolean = true): string[] | AcceptHeaderValue[] {
		
		// TODO [7/28/21 @ 8:47 PM] Generify this method - other heads also use the 'q' parameter.
		
		// If the 'Accept' header isn't present
		if (!this.hasHeader("Accept")) return ["*/*"];
		
		let acceptedFormats: AcceptHeaderValue[] = [];
		
		function processAcceptHeaderValue(rawFieldValue: string): void {
			
			// Sanitize and separate the values for the authoritative 'Accept' header into an array of strings.
			let splitValues: string[] = rawFieldValue.trim().split(/,\s+/);
			
			for (let splitValue of splitValues) {
				
				let parsedValue: AcceptHeaderValue | undefined = parseAcceptHeaderValue(splitValue);
				
				if (parsedValue !== undefined) acceptedFormats.push(parsedValue);
				// Otherwise, ignore the non-standard/malformed value and move on.
			
			}
			
		}
		
		if (preferAuthoritativeHeader) processAcceptHeaderValue(this.getAuthoritativeHeader("Accept") as string);
		else {
			
			for (let headerValue of this.getHeader("Accept") as string[]) {
				
				processAcceptHeaderValue(headerValue);
				
			}
			
		}
		
		acceptedFormats.sort((element1: AcceptHeaderValue, element2: AcceptHeaderValue): number => {
			
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
		
		if (collapseToStrings) {
			
			return acceptedFormats.map((element: AcceptHeaderValue): string => {
				
				return `${element.mimePrimaryType}/${element.mimeSecondaryType}`;
				
			});
			
		} else return acceptedFormats;
		
	}
	
	/**
	 * Returns an array of preferred, supported formats, as decided by a combination of the 'Accept' header on this
	 * object, as well as the array of supported formats provided by the caller.
	 *
	 * In other words, the formats returned by this function represent the intersection of the set of formats that are
	 * acceptable based on the 'Accept' header on this object, as well as the set of supported formats specified by the
	 * caller.
	 *
	 * This function's return value is stable to the input array - in other words, if a given format is specified before
	 * another format in the input array, and both formats are acceptable, matches to the earlier format will show up
	 * before matches to the later format in the output array.
	 *
	 * @param {string[]} supportedFormats An array of strings representing the formats supported by the caller. Each
	 * element should reference a valid MIME type as specified by
	 * <a href="https://tools.ietf.org/html/rfc6838">RFC 6838</a> and listed on
	 * <a href="https://www.iana.org/assignments/media-types/media-types.xhtml">the IANA's 'Media Types' page</a>.
	 * @param {boolean} preferAuthoritativeHeader
	 * @return {string[]}
	 */
	public getPreferredSupportedFormats(supportedFormats: string[], preferAuthoritativeHeader: boolean = true): string[] {
		
		let preferredFormats: AcceptHeaderValue[] = this.getPreferredFormats(preferAuthoritativeHeader, false);
		let preferredSupportedFormats: string[] = [];
		
		for (let preferredFormat of preferredFormats) {
			
			let regexString: string = "";
			
			regexString += "^";
			regexString += (preferredFormat.mimePrimaryType === "*" ? ".+" : preferredFormat.mimePrimaryType);
			regexString += "/";
			regexString += (preferredFormat.mimeSecondaryType === "*" ? ".+" : preferredFormat.mimeSecondaryType);
			regexString += "$";
			
			let preferredFormatRegex: RegExp = new RegExp(regexString);
			
			for (let supportedFormat of supportedFormats) {
				
				if (preferredFormatRegex.test(supportedFormat)) preferredSupportedFormats.push(supportedFormat);
				
			}
			
		}
		
		// Convert the array into a set (removing duplicates), and then convert it back.
		return Array.from(new Set(preferredSupportedFormats));
	
	}
	
	/**
	 * Returns a string representation of this ImmutableHeadersManager class, formatted as though it were part of an
	 * actual HTTP message header.
	 *
	 * @param {boolean | undefined} useOriginalFieldName If set to true, the resulting string will use the HTTP field
	 * names provided during initialization or through mutation. Otherwise, a standardized form of the field name will
	 * be used.
	 * @param {FieldTransformer | undefined} fieldTransformer An optional function taking a string that applies a
	 * desired string transformation and returns the resulting string. Applied to each header field name if provided.
	 * @returns {string} A string representation of this ImmutableHeadersManager class, formatted as though it were part
	 * of an actual HTTP message header.
	 */
	public toString(useOriginalFieldName?: boolean): string;
	public toString(fieldTransformer?: FieldTransformer): string;
	public toString(useOriginalFieldName?: boolean, fieldTransformer?: FieldTransformer): string;
	public toString(useOriginalFieldNameOrFieldTransformer?: boolean | FieldTransformer, fieldTransformer?: FieldTransformer): string {
		
		// Why not just make everything complicated? 
		
		let useOriginalFieldName: boolean = false;
		
		switch (arguments.length) {
			
			case 0:
				// Do nothing!
				break;
			
			case 1:
				if (typeof useOriginalFieldNameOrFieldTransformer === "boolean") {
					
					useOriginalFieldName = useOriginalFieldNameOrFieldTransformer;
					
				} else fieldTransformer = useOriginalFieldNameOrFieldTransformer;
				break;
			
			case 2:
				useOriginalFieldName = useOriginalFieldNameOrFieldTransformer as boolean;
				break;
				
			default:
				// This case should never occur - typechecking was ignored, so we'll do the same.
				// That should teach em'.
				return undefined as unknown as string;
			
		}
		
		let result: string = "";
		
		for (let standardizedFieldName of this.getHeaderFields()) {
			
			let field: HTTPHeaders[keyof HTTPHeaders] = this.headers[standardizedFieldName];
			
			for (let valueIndex: number = 0; valueIndex < field.values.length; valueIndex++) {
				
				let outputFieldName!: string;
				
				// If the list of original field names is long enough that we can grab the original field name from it,
				// do so, otherwise default to the standardized field name.
				if (useOriginalFieldName &&
					(valueIndex < field.originalFields.length)) outputFieldName = field.originalFields[valueIndex];
				else outputFieldName = standardizedFieldName;
				
				// Transform the field using the provided field transformer, if one was provided.
				if (fieldTransformer !== undefined) outputFieldName = fieldTransformer(outputFieldName);
				
				result += `${outputFieldName}: ${field.values[valueIndex]}\n`;
				
			}
			
		}
		
		return result;
		
	}
}