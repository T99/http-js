import { MutableHTTPHeadersManager } from "./schema/mutable-http-headers-manager";

export class HTTPRequest {
	
	protected headersManager: MutableHTTPHeadersManager;

	public constructor() {
		
		this.headersManager = new MutableHTTPHeadersManager();
		
	}
	
	public getHeadersManager(): MutableHTTPHeadersManager {
		
		return this.headersManager;
		
	}
	
}
