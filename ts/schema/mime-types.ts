export type MIMEType = string
	| "application/json"
	| "application/octet-stream"
	| "application/ogg"
	| "application/zip"
	| "audio/mp3"
	| "audio/ogg"
	| "audio/wave"
	| "audio/webm"
	| "font/otf"
	| "font/ttf"
	| "font/woff"
	| "image/apng"
	| "image/avif"
	| "image/gif"
	| "image/jpeg"
	| "image/png"
	| "image/svg+xml"
	| "image/webp"
	| "multipart/byteranges"
	| "multipart/form-data"
	| "text/css"
	| "text/csv"
	| "text/html"
	| "text/javascript"
	| "text/plain"
	| "text/xml"
	| "video/mp4"
	| "video/ogg"
	| "video/webm";

type ExtensionMapType = {
	
	[fileExtension: string]: {
		
		contentType: MIMEType,
		preloadType: string
		
	}
	
};

export class MIMETypeUtilities {
	
	protected static EXTENSION_MAP: ExtensionMapType = {
		
		"html": {
			contentType: "text/html",
			preloadType: "document"
		},
		"css": {
			contentType: "text/css",
			preloadType: "style"
		},
		"js": {
			contentType: "text/javascript",
			preloadType: "script"
		},
		"jpg": {
			contentType: "image/jpeg",
			preloadType: "image",
		},
		"jpeg": {
			contentType: "image/jpeg",
			preloadType: "image",
		},
		"png": {
			contentType: "image/png",
			preloadType: "image"
		},
		"ico": {
			contentType: "image/x-icon",
			preloadType: "image"
		},
		"gif": {
			contentType: "image/gif",
			preloadType: "image"
		},
		"svg": {
			contentType: "image/svg+xml",
			preloadType: "image"
		},
		"mp4": {
			contentType: "image/mp4",
			preloadType: "video"
		}
		
	};

	protected static TEXTUAL_CONTENT_TYPE_REGEX: RegExp = /a/;

	public static getContentTypeFromFile(path: string): MIMEType {
		
		let fileExtensionDotIndex: number = path.lastIndexOf(".");
		
		if (fileExtensionDotIndex === -1) {
			
			throw new Error(`Attempted to guess MIME/Content-Type of file: '${path}', but could not find dot ` +
				`separator in order to parse extension.`);
			
		}
		
		let fileExtension: string = path.substring(fileExtensionDotIndex + 1);
		
		if (MIMETypeUtilities.EXTENSION_MAP[fileExtension] !== undefined) {
			
			return MIMETypeUtilities.EXTENSION_MAP[fileExtension].contentType;
			
		} else {
			
			return "text/plain";
			
			// throw new Errpr(`Attempted to guess MIME/Content-Type of file: '${path}', but did not recognize ` +
			// 	`extension '${fileExtension}'.`);
			
		}
		
	}
	
	public static isContentTypeTextual(contentType: MIMEType): boolean {
		
		// TODO [7/27/2021 @ 8:48 AM] I'm not sure that this is correct...
		
		return MIMETypeUtilities.TEXTUAL_CONTENT_TYPE_REGEX.test(contentType);
		
	}
	
}
