/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 9:53 AM -- February 02, 2023.
 * Project: http-js
 */

import { HTTPMessageStartLine } from "./http-message-start-line";
import { HTTPMethod } from "../../schema/http-method";
import { HTTPVersion } from "../http-version";

type RequestStartLineTuple = [
	string | undefined,
	string | undefined,
	string | undefined,
];

export class HTTPRequestStartLine extends HTTPMessageStartLine {
	
	public static isRequestStartLine(startLine: string): boolean {
		
		const [method, uri, version]: RequestStartLineTuple =
			startLine.split(" ", 3) as RequestStartLineTuple;
		
		return (
			HTTPMethod.isStringValidHTTPMethod(method) &&
			HTTPVersion.
		);
		
	}
	
}
