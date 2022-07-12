import { StringMIMEType } from "../schema/mime-types";
import { HTTPHeaderField } from "../schema/http-headers";
import { HTTPAcceptHeaderManager } from "./fields/http-accept-header-manager";
import { HTTPCookiesHeaderManager } from "./fields/http-cookies-header-manager";

// DOC-ME [9/20/2021 @ 4:48 PM] Documentation is required!
export type FieldTransformer = (field: string) => string;

/**
 * An object whose fields are each valid HTTP header fields, each field having
 * the values assigned to the HTTP header field.
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
export type HTTPHeaders = Record<string, {
		
	/**
	 * This is the original, un-transformed fields, as received directly from
	 * the client.
	 *
	 * Each element of this array matches to it's respective value in the
	 * 'values' array.
	 */
	originalFields: string[];
	
	/**
	 * An array of the values for this HTTP header field.
	 *
	 * Each element of the array represents the string provided for exactly one
	 * header included on a given HTTP message. For example, the following
	 * headers:
	 * 
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
	values: string[];
	
}>;

/**
 * A user-friendly version of the HTTPHeaders type that allows for more
 * flexibility during the initialization of HTTPHeadersManager instances.
 */
export type ParseableHTTPHeaders = Record<string, string | string[] | {
		
	originalFields?: string | string[];
	
	values: string | string[];
	
}>;

// DOC-ME [9/20/2021 @ 4:48 PM] Documentation is required!
export class HTTPHeadersManager {
	
	/**
	 * A function that transforms HTTP header field names from whatever
	 * form/case they are in, to 'Title Case'.
	 *
	 * Example:
	 * <pre>
	 *     TITLE_CASE_FIELD_TRANSFORMER("content-security-policy") -->
	 *         "Content-Security-Policy"
	 * </pre>
	 *
	 * @param {string} field The HTTP header field name to transform to 'Title
	 * Case'.
	 * @returns {string} The 'Title Case' transformed input string.
	 */
	public static readonly TITLE_CASE_FIELD_TRANSFORMER: FieldTransformer =
		(field: string): string => {
			
			let words: string[] = field.split("-");
			
			words = words.map(
				(component: string): string =>
					component.charAt(0).toUpperCase() +
					component.substring(1).toLowerCase()
			);
			
			return words.join("-");
			
		};
	
	// DOC-ME [9/20/2021 @ 4:48 PM] Documentation is required!
	public static readonly LOWER_CASE_FIELD_TRANSFORMER: FieldTransformer =
		(field: string): string => field.toLowerCase();
	
	// DOC-ME [9/20/2021 @ 4:48 PM] Documentation is required!
	public static readonly UPPER_CASE_FIELD_TRANSFORMER: FieldTransformer =
		(field: string): string => field.toUpperCase();
	
	/**
	 * A collection of HTTP headers.
	 *
	 * @see HTTPHeaders
	 */
	protected headers: HTTPHeaders;
	
	// DOC-ME [9/20/2021 @ 4:48 PM] Documentation is required!
	protected headerFieldTransformer: FieldTransformer;
	
	public readonly accept: HTTPAcceptHeaderManager;
	
	public readonly acceptEncoding!: HTTPAcceptHeaderManager;
	
	public readonly acceptLanguage!: HTTPAcceptHeaderManager;
	
	public readonly cookies: HTTPCookiesHeaderManager;
	
	/**
	 * Initializes an empty ImmutableHTTPHeadersManager instance.
	 */
	public constructor();
	
	/**
	 * Initializes a new ImmutableHTTPHeadersManager instance by cloning the provided instance.
	 *
	 * @param {ImmutableHTTPHeadersManager} headersManager The ImmutableHTTPHeadersManager instance to clone.
	 */
	public constructor(headersManager: HTTPHeadersManager);
	
	/**
	 * Initializes a new ImmutableHTTPHeadersManager instance with the provided HTTP headers.
	 *
	 * @param {HTTPHeaders} headers The HTTP headers with which to initialize this ImmutableHTTPHeadersManager instance.
	 * @param {FieldTransformer} headerFieldTransformer
	 */
	public constructor(headers?: ParseableHTTPHeaders, headerFieldTransformer?: FieldTransformer);
	
	public constructor(headersManagerOrHeaders: ParseableHTTPHeaders | HTTPHeadersManager = {},
					   headerFieldTransformer?: FieldTransformer) {
		
		// If we are cloning an existing ImmutableHTTPHeadersManager instance...
		if (headersManagerOrHeaders instanceof HTTPHeadersManager) {
			
			let headersManager: HTTPHeadersManager = headersManagerOrHeaders;
			
			this.headers = JSON.parse(JSON.stringify(headersManager.headers));
			this.headerFieldTransformer = headersManager.headerFieldTransformer;
			this.accept = new HTTPAcceptHeaderManager(this);
			this.cookies = new HTTPCookiesHeaderManager(this);
			
		// If we are building a ImmutableHTTPHeadersManager instance from structured data...
		} else {
			
			let headers: ParseableHTTPHeaders = headersManagerOrHeaders as ParseableHTTPHeaders;
			
			this.headers = {};
			this.headerFieldTransformer = headerFieldTransformer ?? ((field: string): string => field);
			
			for (let field of Object.keys(headers)) {
				
				let standardizedField: string = HTTPHeadersManager.getStandardizedHeaderField(field);
				
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
			
			this.accept = new HTTPAcceptHeaderManager(this);
			this.cookies = new HTTPCookiesHeaderManager(this);
			
		}
		
	}
	
	// DOC-ME [9/20/2021 @ 4:47 PM] Documentation is required!
	public static getStandardizedHeaderField(field: string): string {
		
		return field.toLowerCase();
		
	}
	
	/**
	 * Returns an object containing all of the HTTP headers and their values for this collection of headers.
	 *
	 * @return {HTTPHeaders} An object containing all of the HTTP headers and their values for this collection of
	 * headers.
	 */
	public getHeaders(): HTTPHeaders {
		
		// Encode and decode the internal headers object in order to deep-clone it.
		return JSON.parse(JSON.stringify(this.headers));
		
	}
	
	/**
	 * Returns an array of the HTTP header fields present on this collection of headers.<br />
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
		
		field = HTTPHeadersManager.getStandardizedHeaderField(field);
		
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
		
		field = HTTPHeadersManager.getStandardizedHeaderField(field);
		
		if (this.hasHeader(field)) return this.headers[field].values;
		else return undefined;
		
	}
	
	/**
	 * Sets the specified HTTP header to the given value(s).
	 *
	 * Note that for each value provided, a new header will be created. If multiple values are desired to be populated
	 * for a single value (i.e. settings multiple options for 'Accept'), a single, pre-formatted string must be passed.
	 *
	 * Example:
	 * <pre>
	 * // Setting a single value:
	 * message.setHeader("Accept", "video/mp4, video/ogg");
	 * // ...yields:
	 * Accept: video/mp4, video/ogg
	 *
	 * // Setting multiple values:
	 * message.setHeader("Accept", "video/mp4", "video/ogg");
	 * // ...yields:
	 * Accept: video/mp4
	 * Accept: video/ogg
	 * </pre>
	 *
	 * @param {HTTPHeaderField} field The HTTP header field for which to set the specified value(s).
	 * @param {string[]} value The value(s) to set for the specified HTTP header field.
	 */
	public setHeader(field: "Content-Type" | "Accept", value: StringMIMEType): void;
	public setHeader(field: HTTPHeaderField, ...value: string[]): void;
	public setHeader(field: HTTPHeaderField, ...values: string[]): void {
		
		this.headers[field.toLowerCase()] = {
			originalFields: values.map((): string => field),
			values
		};
		
	}
	
	/**
	 * Appends new header field + value pairs to the headers of the relevant request without overwriting existing values
	 * if they exist.
	 * 
	 * @param {HTTPHeaderField} field The HTTP header field for which to append the specified value(s).
	 * @param {string} values The value(s) to append for the specified HTTP header field.
	 */
	public appendHeader(field: HTTPHeaderField, ...values: string[]): void {
		
		let standardizedField: string = field.toLowerCase();
		
		if (this.headers[standardizedField] === undefined) this.setHeader(field, ...values);
		else {
			
			this.headers[standardizedField].originalFields.push(...values.map((): string => field));
			this.headers[standardizedField].values.push(...values);
			
		}
		
	}
	
	public removeHeader(field: HTTPHeaderField): string[];
	public removeHeader(field: HTTPHeaderField, ...values: string[]): string[];
	public removeHeader(field: HTTPHeaderField, matcher: (value: string) => boolean): string[];
	public removeHeader(field: HTTPHeaderField,
						firstValueOrMatcher?: string | ((value: string) => boolean),
						...rest: string[]): string[] | undefined {
		
		// Transform the field name to lower case for lookup purposes.
		field = field.toLowerCase();
		
		let valueOrMatcherType: string = typeof firstValueOrMatcher;
		
		if (valueOrMatcherType === "string") {
			
			// TODO [7/27/2021 @ 2:58 PM] Finish me!
			return [];
			
		} else if (valueOrMatcherType === "function") {
			
			// TODO [7/27/2021 @ 2:58 PM] Finish me!
			return [];
			
		} else {
			
			let result: string[] | undefined = this.getHeader(field);
			
			if (this.hasHeader(field)) delete this.headers[field];
			
			return result;
			
		}
		
	}
	
	/**
	 * Returns the last value present for the specified header field, or undefined if the specified field was not
	 * found.<br />
	 *
	 * For example, in the situation in which the 'Accept' header is set multiple times in the following order:
	 * <pre>
	 * 	- Accept: application/json
	 * 	- Accept: text/xml
	 * 	- Accept: text/csv
	 * </pre>
	 * This function would return 'text/csv'.
	 *
	 * @param {HTTPHeaderField} field The HTTP header field for which to retrieve the authoritative value.
	 * @return {string | undefined} The authoritative value for the specified HTTP header if such a header was present,
	 * otherwise undefined.
	 */
	public getAuthoritativeHeader(field: HTTPHeaderField): string | undefined {
		
		field = HTTPHeadersManager.getStandardizedHeaderField(field);
		
		if (this.hasHeader(field)) {
			
			let headerValues: string[] = this.getHeader(field) as string[];
			return headerValues[headerValues.length - 1];
			
		} else return undefined;
		
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
