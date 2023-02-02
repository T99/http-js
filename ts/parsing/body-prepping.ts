/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 4:36 PM -- March 17, 2022.
 * Project: @t99/http
 */

/**
 * The type of function that is capable of taking in any type of data and
 * returning a string that can be sent via HTTP.
 */
export type BodyPrepperFunction = (data: any) => string;

export const defaultBodyPrepperImplementation: BodyPrepperFunction = (data: any): string => {
	
	// TODO [8/9/2021 @ 12:47 PM] This could probably be made more robust.
	
	let bodyType: string = typeof data;
	
	switch (bodyType) {
		
		case "string":
			return data;
		
		case "object":
		case "boolean":
		case "number":
			return JSON.stringify(data);
		
		case "function":
		case "bigint":
		case "symbol":
			return data.toString();
		
		case "undefined":
			throw new Error("Attempted to send undefined body to client.");
		
		default:
			throw new Error(`Attempted to send body of unknown type ('${bodyType}') to client.`);
		
	}

};

let defaultBodyPrepper: BodyPrepperFunction = defaultBodyPrepperImplementation;

export function setDefaultBodyPrepper(bodyPrepper: BodyPrepperFunction): void {
	
	defaultBodyPrepper = bodyPrepper;
	
}

export function getDefaultBodyPrepper(): BodyPrepperFunction {
	
	return defaultBodyPrepper;
	
}
