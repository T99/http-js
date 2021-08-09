export class HTTPMalformedMessageError {

	protected readonly malformationLine: number;
	
	protected readonly malformationColumn: number;
	
	public constructor(malformationLine: number, malformationColumn: number, message?: string) {
		
		this.malformationLine = malformationLine;
		this.malformationColumn = malformationColumn;
		
		
		
	}
	
}
