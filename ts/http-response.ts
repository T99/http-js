import { ImmutableHTTPHeadersManager } from "./schema/immutable-http-headers-manager";

export class HTTPResponse {
	
	protected headersManager: ImmutableHTTPHeadersManager;

	public constructor() {
		
		this.headersManager = new ImmutableHTTPHeadersManager();
		
	}
	
	public getHeadersManager(): ImmutableHTTPHeadersManager {
		
		return this.headersManager;
		
	}
	
}
