import type { HTTPHeadersManager } from "../http-headers-manager";
import type { HTTPHeaderField } from "../../schema/http-headers";

export type QualityWeightedValue = {
	
	relativeQualityFactor: number;
	
};

export type GenericQualityWeightedValue = QualityWeightedValue & {
	
	value: string;
	
};

export class HTTPQualityWeightedHeader {
	
	private readonly headerField: HTTPHeaderField;
	
	protected headersManager: HTTPHeadersManager;
	
	protected useAllHeaders: boolean;
	
	public constructor(header: HTTPHeaderField,
					   headersManager: HTTPHeadersManager,
					   useAllHeaders: boolean = false) {
		
		// TODO [7/28/21 @ 8:47 PM] Generify this method - other headers also
		//  use the 'q' parameter.
		
		this.headerField = header;
		this.headersManager = headersManager;
		this.useAllHeaders = useAllHeaders;
		
	}
	
	public static parseQualityWeightedValue(
		value: string): GenericQualityWeightedValue {
		
		const semicolonIndex: number = value.lastIndexOf(";");
		
		if (semicolonIndex === -1) {
			
			return {
				value,
				relativeQualityFactor: 1,
			};
			
		}
		
		const qualityValueRegexMatch: RegExpMatchArray | null =
			/\d+(?:\.(?:\d+)?)?/u.exec(value.substring(semicolonIndex + 1));
		
		if (qualityValueRegexMatch === null) {
			
			return {
				value,
				relativeQualityFactor: 1,
			};
			
		} else {
			
			return {
				value: value.substring(0, semicolonIndex),
				relativeQualityFactor: parseFloat(qualityValueRegexMatch[0]),
			};
			
		}
		
	}
	
	public static parseQualityWeightedValueList(
		valueList: string): GenericQualityWeightedValue[] {
		
		return valueList
			.trim()
			.split(/,\s*/u)
			.map(HTTPQualityWeightedHeader.parseQualityWeightedValue);
		
	}
	
	protected getQualityWeightedValues(): GenericQualityWeightedValue[] {
		
		if (!this.headersManager.hasHeader(this.headerField)) return [];
		
		let result: GenericQualityWeightedValue[];
		
		if (this.useAllHeaders) {
			
			result = this.headersManager.getHeader(this.headerField)
				?.map(
					HTTPQualityWeightedHeader.parseQualityWeightedValueList
				)?.flat() ?? [];
			
		} else {
			
			result =
				HTTPQualityWeightedHeader.parseQualityWeightedValueList(
					this.headersManager.getAuthoritativeHeader(
						this.headerField
					) as string
				);
			
		}
		
		result.sort(
			(element1: QualityWeightedValue,
			 element2: QualityWeightedValue): number =>
				element2.relativeQualityFactor -
				element1.relativeQualityFactor
		);
		
		return result;
		
	}
	
}
