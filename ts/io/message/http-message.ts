/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 9:44 AM -- January 27th, 2023.
 * Project: @t99/http
 */

import { HTTPMessageStartLine } from "./http-message-start-line";

export class HTTPMessage {

	protected startLine: HTTPMessageStartLine;
	
	protected rawHeaders: string;

}
