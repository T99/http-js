import { HTTPHeaders } from "./http-headers-manager";

// DOC-ME [9/20/2021 @ 4:48 PM] Documentation is required!
export type FieldTransformer = (field: string) => string;

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

// DOC-ME [7/27/2021 @ 3:27 PM] Documentation is required!
export interface ImmutableHTTPHeadersManager {
	
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
	 * Returns an array of desirable formats, as indicated by the 'Accept' header, ordered from most desirable to least
	 * desirable.<br />
	 *
	 * This is determined based on the 'q' parameter, which can optionally be specified for each 'Accept' header
	 * value.<br />
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
	getPreferredFormats(preferAuthoritativeHeader: boolean, collapseToStrings?: true): string[];
	getPreferredFormats(preferAuthoritativeHeader: boolean, collapseToStrings: false): AcceptHeaderValue[];
	
	/**
	 * Returns an array of preferred, supported formats, as decided by a combination of the 'Accept' header on this
	 * object, as well as the array of supported formats provided by the caller.<br />
	 *
	 * In other words, the formats returned by this function represent the intersection of the set of formats that are
	 * acceptable based on the 'Accept' header on this object, as well as the set of supported formats specified by the
	 * caller.<br />
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
	getPreferredSupportedFormats(supportedFormats: string[], preferAuthoritativeHeader: boolean): string[];
	
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
