import { HTTPHeaders } from "./http-headers-manager";
import { HTTPHeaderField } from "../schema/http-header-fields";
import { HTTPAcceptHeaderManager } from "./http-accept-header-manager";

// DOC-ME [9/20/2021 @ 4:48 PM] Documentation is required!
export type FieldTransformer = (field: string) => string;



// DOC-ME [7/27/2021 @ 3:27 PM] Documentation is required!
export interface ImmutableHTTPHeadersManager {
	
	Accept: HTTPAcceptHeaderManager;
	
	/**
	 * Returns an object containing all of the HTTP headers and their values for this collection of headers.
	 *
	 * @return {HTTPHeaders} An object containing all of the HTTP headers and their values for this collection of
	 * headers.
	 */
	getHeaders(): HTTPHeaders;
	
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
	getHeaderFields(fieldTransformer?: FieldTransformer): string[];
	
	/**
	 * Returns true if the specified HTTP header was found in the headers present on this collection of headers.
	 *
	 * @param {HTTPHeaderField} field The HTTP header field to check for on this collection of headers.
	 * @return {boolean} true if the specified HTTP header was found in this collection of headers.
	 */
	hasHeader(field: HTTPHeaderField): boolean;
	
	/**
	 * Returns the values present for the specified HTTP header, or undefined if the specified field was not found.
	 *
	 * @param {HTTPHeaderField} field The HTTP header field for which to return associated values.
	 * @return {string[] | undefined} The values present for the specified HTTP header, or undefined if the specified
	 * field was not found.
	 */
	getHeader(field: HTTPHeaderField): string[] | undefined;
	
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
	getAuthoritativeHeader(field: HTTPHeaderField): string | undefined;
	
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
	toString(useOriginalFieldName?: boolean): string;
	toString(fieldTransformer?: FieldTransformer): string;
	toString(useOriginalFieldName?: boolean, fieldTransformer?: FieldTransformer): string;
	
}
