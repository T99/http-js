import type { ImmutableHTTPHeadersManager } from "./immutable-http-headers-manager";
import type { StringMIMEType } from "../schema/mime-types";
import type { HTTPHeaderField } from "../schema/http-header-fields";

// DOC-ME [9/20/2021 @ 4:56 PM] Documentation is required!
export interface MutableHTTPHeadersManager extends ImmutableHTTPHeadersManager {
	
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
	 * @param {HTTPHeaderField} field
	 * @param {string[]} value
	 */
	setHeader(field: "Content-Type" | "Accept", value: StringMIMEType): void;
	setHeader(field: HTTPHeaderField, ...value: string[]): void;
	setHeader(field: HTTPHeaderField, ...values: string[]): void;
	
	// DOC-ME [9/20/2021 @ 4:56 PM] Documentation is required!
	removeHeader(field: HTTPHeaderField): string[];
	removeHeader(field: HTTPHeaderField, ...values: string[]): string[];
	removeHeader(field: HTTPHeaderField, matcher: (value: string) => boolean): string[];
	removeHeader(field: HTTPHeaderField, firstValueOrMatcher?: string | ((value: string) => boolean),
						...rest: string[]): string[] | undefined;
	
}
