package filedata

import "os"

type FileData struct {
	IsDir   bool
	ModTime int64
	Mode    os.FileMode
	Name    string
	Size    int64
}

func NewFileData(info os.FileInfo) FileData {
	return FileData{
		IsDir:   info.IsDir(),
		ModTime: info.ModTime().Unix(),
		Mode:    info.Mode(),
		Name:    info.Name(),
		Size:    info.Size(),
	}
}
