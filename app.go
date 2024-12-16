package main

import (
	"context"
	"os"
	"os/user"
	"path/filepath"
	"strings"
	pathobj "x-explorer/src/PathObj"
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

func (a *App) GetFileList() []pathobj.PathObj {
	files, err := os.ReadDir(a.currentPath)
	if err != nil {
		println("Failed to read files in a dir: ", err.Error())
		return []pathobj.PathObj{}
	}

	returnFiles := []pathobj.PathObj{}

	for _, file := range files {
		returnFiles = append(returnFiles, pathobj.NewPathObj(file))
	}

	return returnFiles
}

func (a *App) SetCurrentPath(path string) {
	a.currentPath = path
}

func (a *App) GetPathSeparator() string {
	return string(filepath.Separator)
}
