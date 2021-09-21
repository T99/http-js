import net from "net";
import http from "http";
import https from "https";
import { HTTPRequestError } from "../../error/http-request-error";
import { IncomingHTTPResponse } from "./incoming-http-response";
import { HTTPStatusCode } from "../../schema/http-status-code";
import { HTTPRequest, HTTPRequestConfig } from "../http-request";

export class OutgoingHTTPRequest extends HTTPRequest {
	
	protected static readonly HTTP_STATUS_LINE_REGEX: RegExp = /^(.+)\/(\d+(?:\.\d+)?) (\d+) (.+)$/;
	
	public constructor(config: HTTPRequestConfig) {
		
		super(config);
		
	}
	
	public execute(): Promise<IncomingHTTPResponse> {
		
		return new Promise<IncomingHTTPResponse>((resolve: (value: IncomingHTTPResponse) => void,
												  reject: (reason: Error) => void): void => {
			
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
				
				socket.on("end", (): void => {
					
					// TODO [8/9/2021 @ 4:34 PM] This is not finished!
					
					rawResponse;
					
					resolve(new IncomingHTTPResponse({
						statusCode: HTTPStatusCode.HTTP_OK,
						method: this.method,
						url: this.url,
						headers: this.headersManager,
						version: this.version
					}));
					
				});
				
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
	
}
