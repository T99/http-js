export type StringMIMEType = string
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

export type PreloadType =
	  "audio"
	| "document"
	| "embed"
	| "fetch"
	| "font"
	| "image"
	| "object"
	| "script"
	| "style"
	| "track"
	| "worker"
	| "video";

type ExtensionMapType = {
	
	[fileExtension: string]: {
		
		contentType: StringMIMEType,
		preloadType: PreloadType
		
	}
	
};

export const EXTENSION_MAP: ExtensionMapType = {
	
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

export class MIMETypeUtilities {

	// TODO [10/8/2021 @ 3:49 PM] This doesn't seem right...
	protected static TEXTUAL_CONTENT_TYPE_REGEX: RegExp = /a/;

	public static getContentTypeFromFile(path: string): StringMIMEType {
		
		let fileExtensionDotIndex: number = path.lastIndexOf(".");
		
		if (fileExtensionDotIndex === -1) {
			
			throw new Error(`Attempted to guess MIME/Content-Type of file: '${path}', but could not find dot ` +
				`separator in order to parse extension.`);
			
		}
		
		let fileExtension: string = path.substring(fileExtensionDotIndex + 1);
		
		if (EXTENSION_MAP[fileExtension] !== undefined) {
			
			return EXTENSION_MAP[fileExtension].contentType;
			
		} else {
			
			return "text/plain";
			
			// throw new Error(`Attempted to guess MIME/Content-Type of file: '${path}', but did not recognize ` +
			// 	`extension '${fileExtension}'.`);
			
		}
		
	}
	
	public static isContentTypeTextual(contentType: StringMIMEType): boolean {
		
		// TODO [7/27/2021 @ 8:48 AM] I'm not sure that this is correct...
		
		return MIMETypeUtilities.TEXTUAL_CONTENT_TYPE_REGEX.test(contentType);
		
	}
	
}
