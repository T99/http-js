/*
 * All of the regular expressions in this file attempt to be fully compliant with the most recent defining standard for
 * HTTP messaging. The current spec that these regular expressions have been tested against is RFC2616, found here:
 * https://datatracker.ietf.org/doc/html/rfc2616
 */

/**
 * Matches any valid HTTP method identifier.
 *
 * Note that many characters are technically allowed in HTTP method identifiers that most would consider non-standard -
 * see the section below for examples.
 *
 * Examples:
 * <pre>
 *  - GET
 *  - DELETE
 *  - ~Replace
 *  - #get#
 *  - !#$%&'*+-.1234567890^_`|~
 * </pre>
 *
 * The last example shown above shows the complete list of non-alphabetic characters that are allowed in HTTP method
 * identifiers.
 */
export const HTTP_METHOD_REGEXP: RegExp = /[\u0021\u0023-\u0027\u002A-\u002B\u002D-\u002E\u0030-\u0039\u0041-\u005A\u005E-\u007A\u007C\u007E]+/u;
