/*
 * Created by Trevor Sears <trevor@trevorsears.com> (https://trevorsears.com/).
 * 9:51 AM -- January 27th, 2023.
 * Project: @t99/http
 */

import { HTTPMessageType } from "../http-message-type";
import { HTTPVersion } from "../http-version";
import { HTTPRequestStartLine } from "./http-request-start-line";

export abstract class HTTPMessageStartLine {
	
	protected rawString: string;
	
	protected version?: HTTPVersion;
	
	public constructor(statusLine: string | Buffer) {
		
		this.rawString = statusLine instanceof Buffer ?
			statusLine.toString("utf8") :
			statusLine;
		
	}
	
	public getStartLineType(): HTTPMessageType | null {
		
		if (this.isRequestStartLine()) return "Request";
		else if (this.isResponseStartLine()) return "Response";
		else return null;
		
	}
	
	public isRequestStartLine(): boolean {
		
		return false;
		
	}
	
	public isResponseStartLine(): boolean {
		
		return false;
		
	}
	
	public getRawString(): string {
		
		return this.rawString;
		
	}
	
	public abstract getVersion(): HTTPVersion;
	
}
