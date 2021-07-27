import { ImmutableHTTPHeadersManager } from "./immutable-http-headers-manager";
import { MIMEType } from "./mime-types";

export class MutableHTTPHeadersManager extends ImmutableHTTPHeadersManager {
	
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
	public setHeader(field: "Content-Type" | "Accept", value: MIMEType): void;
	public setHeader(field: HTTPHeaderField, ...value: string[]): void;
	public setHeader(field: HTTPHeaderField, ...values: string[]): void {
		
		this.headers[field.toLowerCase()] = {
			originalField: values.map(() => field),
			values
		};
		
	}
	
	public removeHeader(field: HTTPHeaderField): string[];
	public removeHeader(field: HTTPHeaderField, ...values: string[]): string[];
	public removeHeader(field: HTTPHeaderField, matcher: (value: string) => boolean): string[];
	public removeHeader(field: HTTPHeaderField,
						valuesOrMatcher: string | ((value: string) => boolean) | undefined = undefined,
						...rest: string[]): string[] | undefined {
		
		// Transform the field name to lower case for lookup purposes.
		field = field.toLowerCase();
		
		let valueOrMatcherType: string = typeof valuesOrMatcher;
		
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
	
}
