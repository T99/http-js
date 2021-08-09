/**
 * Returns a best-guess approximation of the line break character sequence being used by the provided string.
 *
 * @param {string} input The string for which to attempt to determine a line-break style.
 * @returns {string} The character sequence that this function believes serves as the line-break style for the
 * provided input string.
 */
export function determineLineBreakStyle(input: string): string {
	
	let indexOfLineFeed: number = input.indexOf("\n");
	
	// Line-feed character not found...
	if (indexOfLineFeed === -1) {
		
		// If we can find a carriage-return character, that must be the intended line-break style.
		if (input.indexOf("\r") !== -1) return "\r";
		
		// No line break characters found... default to "\r\n" because that is the line-break in the spec.
		else return "\r\n";
		
	// Found a line-feed character...
	} else {
		
		// We found a "\r\n" character sequence, that must be the intended line-break style.
		if (input.charAt(indexOfLineFeed - 1) === "\r") return "\r\n";
		
		// The line-feed character we found was not preceded by a carriage-return, so the intended line-break
		// style must just be a plain line-feed character.
		else return "\n";
		
	}
	
}
