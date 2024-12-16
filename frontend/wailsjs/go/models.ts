export namespace pathobj {
	
	export class PathObj {
	    Path: string;
	    Kind: string;
	
	    static createFrom(source: any = {}) {
	        return new PathObj(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Path = source["Path"];
	        this.Kind = source["Kind"];
	    }
	}

}

