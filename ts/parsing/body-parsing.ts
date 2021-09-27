import { HTTPMessage } from "../messages/message/http-message";

export type BodyParserResult = {
	type: "undefined" | "object" | "boolean" | "number" | "bigint" | "string" | "symbol" | "function" | string,
	data: any
};

/**
 * The type of function that is capable of taking in a string (typically that which has been received raw from the body
 * of an HTTP message) and parsing out the data contained within.
 */
export type BodyParserFunction = (message: HTTPMessage) => BodyParserResult;

/**
 * The default function used as the global default body parser.
 *
 * In other terms, this function is the default body parser returned from {@link getDefaultBodyParser} if no other
 * default body parser has been configured via {@link setDefaultBodyParser}.
 *
 * @param {HTTPMessage} message The HTTP message, from which a body should be parsed.
 * @returns {BodyParserResult} A BodyParserResult object detailing the type of the parsed data, as well as the parsed
 * data itself.
 */
export const defaultBodyParserImplementation: BodyParserFunction = (message: HTTPMessage): BodyParserResult => {
	
	// TODO [8/9/2021 @ 4:46 PM] This obviously does not yet work - fix it!
	
	return {
		
		type: "undefined",
		data: undefined
		
	};
	
};

let defaultBodyParser: BodyParserFunction = defaultBodyParserImplementation;

/**
 * Sets the global default body parser.
 *
 * The value set here is used globally as the default body parser for all objects that extend
 * {@link ImmutableHTTPMessage}.
 *
 * @param {BodyParserFunction} bodyParser
 */
export function setDefaultBodyParser(bodyParser: BodyParserFunction): void {
	
	defaultBodyParser = bodyParser;
	
}

/**
 * Returns the currently configured default body parser.
 *
 * @returns {BodyParserFunction} The currently configured default body parser.
 */
export function getDefaultBodyParser(): BodyParserFunction {
	
	return defaultBodyParser;
	
}
