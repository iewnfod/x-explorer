export namespace filedata {
	
	export class FileData {
	    IsDir: boolean;
	    ModTime: number;
	    Mode: number;
	    Name: string;
	    Size: number;
	
	    static createFrom(source: any = {}) {
	        return new FileData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.IsDir = source["IsDir"];
	        this.ModTime = source["ModTime"];
	        this.Mode = source["Mode"];
	        this.Name = source["Name"];
	        this.Size = source["Size"];
	    }
	}

}

