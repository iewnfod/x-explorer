package main

import (
	"context"
	"os"
	"os/exec"
	"os/user"
	"path/filepath"
	"runtime"
	"strings"
	filedata "x-explorer/src/file-data"

	"github.com/shirou/gopsutil/disk"
)

// App struct
type App struct {
	ctx         context.Context
	currentPath string
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) OnAppReady() {
	u, err := user.Current()
	if err != nil {
		println("Failed to get current user: ", err.Error())
	}
	a.currentPath = u.HomeDir
}

func (a *App) GetCurrentPath() string {
	return a.currentPath
}

func (a *App) GetSplitPath() []string {
	sep := string(filepath.Separator)
	return strings.Split(a.currentPath, sep)
}

func (a *App) GetFileList() []filedata.FileData {
	if a.currentPath == "" {
		partitions, err := disk.Partitions(true)
		if err != nil {
			println("Failed to read partitions: ", err.Error())
		}
		returnPartitions := []filedata.FileData{}
		for i := range partitions {
			returnPartitions = append(returnPartitions, filedata.FileData{
				Name:  partitions[i].Mountpoint,
				IsDir: true,
			})
		}
		return returnPartitions
	}

	files, err := os.ReadDir(a.currentPath)
	if err != nil {
		println("Failed to read files in a dir: ", err.Error())
		return []filedata.FileData{}
	}

	returnFiles := []filedata.FileData{}

	for _, file := range files {
		info, err := file.Info()
		if err != nil {
			println("Failed to read file info: ", file.Name(), "|", err.Error())
			continue
		}
		returnFiles = append(returnFiles, filedata.NewFileData(info))
	}

	return returnFiles
}

func (a *App) SetCurrentPath(path string) {
	a.currentPath = path
}

func (a *App) GetPathSeparator() string {
	return string(filepath.Separator)
}

func (a *App) OpenFile(p string) {
	var err error
	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", p).Start()
	case "darwin":
		err = exec.Command("open", p).Start()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", p).Start()
	}
	if err != nil {
		println("Failed to open file: ", err.Error())
	}
}
