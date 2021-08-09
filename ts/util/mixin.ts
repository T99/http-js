type Constructor<T = {}> = new (...args: any[]) => T;

function applyMixins<S, C extends S>(derivedClass: Constructor, ...mixinClasses: Constructor[]): void {
	
	for (let mixinClass of mixinClasses) {
		
		for (let mixinClassProperty of Object.getOwnPropertyNames(mixinClass.prototype)) {
			
			Object.defineProperty(
				derivedClass.prototype,
				mixinClassProperty,
				Object.getOwnPropertyDescriptor(mixinClass.prototype, mixinClassProperty) || Object.create(null)
			);
			
		}
		
	}
	
}
