import { HTTPHeadersManager } from "../http-headers-manager";
import { HTTPHeaderField } from "../../schema/http-headers";

export type QualityWeightedValue = {
	
	relativeQualityFactor: number
	
};

export type GenericQualityWeightedValue = QualityWeightedValue & {
	
	value: string
	
};

export class HTTPQualityWeightedHeader {
	
	private readonly headerField: HTTPHeaderField;
	
	protected headersManager: HTTPHeadersManager;
	
	protected useAllHeaders: boolean;
	
	public constructor(header: HTTPHeaderField, headersManager: HTTPHeadersManager, useAllHeaders: boolean = false) {
		
		// TODO [7/28/21 @ 8:47 PM] Generify this method - other headers also use the 'q' parameter.
		
		this.headerField = header;
		this.headersManager = headersManager;
		this.useAllHeaders = useAllHeaders;
		
	}
	
	public static parseQualityWeightedValue(value: string): GenericQualityWeightedValue {
		
		let semicolonIndex: number = value.lastIndexOf(";");
		
		if (semicolonIndex === -1) return { value, relativeQualityFactor: 1 };
		
		let qualityValueRegexMatch: RegExpMatchArray | null =
			value.substring(semicolonIndex + 1).match(/\d+(?:\.(?:\d+)?)?/);
		
		if (qualityValueRegexMatch === null) return { value, relativeQualityFactor: 1 }
		else {
			
			return {
				value: value.substring(0, semicolonIndex),
				relativeQualityFactor: parseFloat(qualityValueRegexMatch[0])
			};
			
		}
		
	}
	
	public static parseQualityWeightedValueList(valueList: string): GenericQualityWeightedValue[] {
		
		return valueList
			.trim()
			.split(/,\s*/)
			.map(HTTPQualityWeightedHeader.parseQualityWeightedValue);
		
	}
	
	protected getQualityWeightedValues(): GenericQualityWeightedValue[] {
		
		if (!this.headersManager.hasHeader(this.headerField)) return [];
		else {
			
			let result: GenericQualityWeightedValue[];
			
			if (!this.useAllHeaders) {
				
				result = HTTPQualityWeightedHeader.parseQualityWeightedValueList(
					this.headersManager.getAuthoritativeHeader(this.headerField) as string
				);
				
			} else {
				
				result = this.headersManager.getHeader(this.headerField)
					?.map(HTTPQualityWeightedHeader.parseQualityWeightedValueList)
					?.flat() ?? [];
				
			}
			
			result.sort((element1: QualityWeightedValue, element2: QualityWeightedValue): number => {
				
				return element2.relativeQualityFactor - element1.relativeQualityFactor;
				
			});
			
			return result;
			
		}
		
	}
	
}
