export type BodyParserResult = {
	type: "undefined" | "object" | "boolean" | "number" | "bigint" | "string" | "symbol" | "function",
	data: any
};

/**
 * The type of function that is capable of taking in a string (typically that which has been received raw from the body
 * of an HTTP message) and parsing out the data contained within.
 */
export type BodyParserFunction = (data: string) => BodyParserResult;

export const defaultBodyParserImplementation: BodyParserFunction = (data: string): BodyParserResult => {
	
	// TODO [8/9/2021 @ 4:46 PM] This obviously does not yet work - fix it!
	
	return {
		
		type: "undefined",
		data: undefined
		
	}
	
};

let defaultBodyParser: BodyParserFunction = defaultBodyParserImplementation;

export function setDefaultBodyParser(bodyParser: BodyParserFunction): void {
	
	defaultBodyParser = bodyParser;
	
}

export function getDefaultBodyParser(): BodyParserFunction {
	
	return defaultBodyParser;
	
}
