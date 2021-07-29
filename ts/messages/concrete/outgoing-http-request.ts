import net from "net";
import http from "http";
import https from "https";
import { MutableHTTPMessage } from "../abstract/mutable-http-message";
import { HTTPMethodable } from "../../schema/http-method";
import { HTTPRequestError } from "../../error/http-request-error";
import { HTTPRequest } from "../interfaces/http-request";
import { HTTPResponse } from "../interfaces/http-response";
import { IncomingHTTPResponse } from "./incoming-http-response";

export class OutgoingHTTPRequest extends MutableHTTPMessage implements HTTPRequest {
	
	protected static readonly HTTP_STATUS_LINE_REGEX: RegExp = /^(.+)\/(\d+(?:\.\d+)?) (\d+) (.+)$/;
	
	public constructor(method: HTTPMethodable, url: string | URL) {
		
		super(method, url);
		
	}
	
	public execute(): Promise<IncomingHTTPResponse> {
		
		return new Promise<IncomingHTTPResponse>((resolve: (value: IncomingHTTPResponse) => void,
									reject: (reason: Error) => void): void => {
			
			let result: IncomingHTTPResponse = new IncomingHTTPResponse(this)
			
			let method: string = this.getMethod().getName();
			let headers: { [field: string]: string[] } = {};
			
			for (let headerField of this.getHeadersManager().getHeaderFields()) {
				
				headers[headerField] = this.getHeadersManager().getHeader(headerField) as string[];
				
			}
			
			let request: http.ClientRequest = https.request(
				this.getURL(),
				{ method, headers },
				(response: http.IncomingMessage): void => {
					
					// TODO [7/28/21 @ 11:17 PM] Refactor this so that it doesn't use a string (use a Buffer instead).
					
					let rawBody: string = "";

					response.on("data", (data: any): void => {
						
						rawBody += data;
						
					});
					
					rawBody;

					// response.on("end", (): void => resolve(rawBody));
					
				}
			);
			
			request.on("socket", (socket: net.Socket): void => {
				
				let rawResponse: string = "";
				
				socket.on("data", (data: any): void => {
					
					rawResponse += data;
					
				});
				
				socket.on("end", (): void => resolve(rawResponse));
				
			});
			
			request.on("error", (error: Error): void => {
				
				reject(new HTTPRequestError(this, error.message, error));
				
			});
			
			// Write the request body to the client if this request has a body.
			let body: any = this.getBody();
			if (body !== undefined) request.write(body);
			
			// End the request.
			request.end();
			
		});
		
	}
	
	public getMatchingResponse(): HTTPResponse | Promise<HTTPResponse> {
		
		// FIX-ME [7/28/21 @ 9:01 PM] This method is unfinished!
		
		return undefined as any;
		
	}
	
}
