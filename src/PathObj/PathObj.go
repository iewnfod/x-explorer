package pathobj

import "os"

type PathKind = string

const (
	// PathKindFile is a file
	PathKindFile PathKind = "file"
	// PathKindDir is a directory
	PathKindDir PathKind = "dir"
)

type PathObj struct {
	Path string
	Kind PathKind
}

func NewPathObj(file os.DirEntry) PathObj {
	if file.IsDir() {
		return PathObj{Path: file.Name(), Kind: PathKindDir}
	} else {
		return PathObj{Path: file.Name(), Kind: PathKindFile}
	}
}
