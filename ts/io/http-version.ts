/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 12:14 PM -- January 31st, 2023.
 * Project: @t99/http-js
 */

/**
 * A class representing an HTTP version, including a major and minor version
 * number.
 */
export class HTTPVersion {
	
	/**
	 * An integer value representing the major version of this HTTP version.
	 */
	protected readonly major_version: number;
	
	/**
	 * An integer value representing the minor version of this HTTP version.
	 */
	protected readonly minor_version: number | undefined;
	
	/**
	 * Initializes a new HTTPVersion instance with the provided major and minor
	 * version.
	 * 
	 * @param major_version {number} An integer value representing the major
	 * version of this HTTP version.
	 * @param minor_version {number | undefined} An integer value representing
	 * the minor version of this HTTP version.
	 */
	public constructor(major_version: number,
					   minor_version: number | undefined) {
		
		this.major_version = major_version;
		this.minor_version = minor_version;
		
	}
	
	/**
	 * Returns a regular expression (a Regexp object) that is capable of
	 * matching HTTP version strings.
	 * 
	 * @param fullWidth {boolean} Set to true to only match strings whose entire
	 * contents serve as the HTTP version string (potentially including the
	 * 'HTTP/' preamble). Set to false to match HTTP version strings that might
	 * occur within larger strings that have other, non-HTTP-version-string
	 * content.
	 * @returns {RegExp} A regular expression (a Regexp object) that is capable
	 * of matching HTTP version strings.
	 */
	protected static getHTTPVersionRegex(fullWidth: boolean): RegExp {
		
		const coreRegex: string =
			"(?<http>HTTP\\/)?(?<major>\\d+)(?:\\.(?<minor>\\d+))?";
		const flags: string = "gui";
		
		if (!fullWidth) return new RegExp(coreRegex, flags);
		else return new RegExp(`^${coreRegex}$`, flags);
		
	}
	
	/**
	 * Returns true if some substring of the provided input string represents a
	 * valid HTTP version string.
	 *
	 * @param version {string} The string to check for containing a conforming
	 * HTTP version string.
	 * @returns {boolean} true if some substring of the provided input string
	 * represents a valid HTTP version string.
	 */
	public static doesStringContainHTTPVersion(version: string): boolean {
		
		return this.getHTTPVersionRegex(false).test(version);
		
	}
	
	/**
	 * Returns true if the entire provided input string represents a valid HTTP
	 * version string (not including exterior whitespace).
	 * 
	 * @param version {string} The string to check for conformity as an HTTP
	 * version string.
	 * @returns {boolean} true if the entire provided input string represents a
	 * valid HTTP version string (not including exterior whitespace).
	 */
	public static isStringHTTPVersion(version: string): boolean {
		
		return this.getHTTPVersionRegex(true).test(version.trim());
		
	}
	
	public static fromString(version: string, fullWidth: boolean): HTTPVersion {
		
		type RegExpMatchResult = RegExpMatchArray & {
			groups?: Record<string, string>;
		};
		
		let matches: RegExpMatchResult | null = version.trim().match(
			this.getHTTPVersionRegex(fullWidth)
		);
		
		if (matches === null) {
			
			throw new Error(
				`Failed to parse an HTTP version out of the provided string: 
				'${version}'`
			);
			
		}
		
		const results: Record<string, string> | undefined = matches.groups;
		
		return new HTTPVersion(
			parseInt(results?.major as string),
			results?.minor === undefined ? undefined : parseInt(results.minor),
		);
		
	}
	
	/**
	 * Returns an integer value representing the major version of this HTTP
	 * version.
	 * 
	 * @returns {number} An integer value representing the major version of this
	 * HTTP version.
	 */
	public getMajorVersion(): number {
		
		return this.major_version;
		
	}
	
	/**
	 * Returns an integer value representing the minor version of this HTTP
	 * version.
	 *
	 * @returns {number | undefined} An integer value representing the minor
	 * version of this HTTP version.
	 */
	public getMinorVersion(): number | undefined {
		
		return this.minor_version;
		
	}
	
	public toString(includeHTTP: boolean = true): string {
		
		const parts: string[] = [];
		
		if (includeHTTP) parts.push("HTTP/");
		
		parts.push(this.major_version.toString());
		
		if (this.minor_version !== undefined) {
			
			parts.push(".");
			parts.push(this.minor_version.toString());
			
		}
		
		return parts.join("");
		
	}
	
}
