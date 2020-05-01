# [Why I Love Golang](https://medium.com/@saginadir/why-i-love-golang-90085898b4f7) (Sagi Serge Nadir, 2017-04-11)

- GOPATH environment
  - Go enforces a root directory structure.
  - GOPATH sample directory structure (can be anywhere, e.g., home):

    ```txt
    go
    - bin
    - pkg
    - src
    ```

- Create a new Golang app:
  - Go to `$GOPATH/src` directory.
  - Create a new folder.
  - Add `file.go`.
  - Add `func main() {}`.
- Golang modules
  - Modules in Golang: packages
  - Every directory in a Golang app is a package.
  - A package can become an application if its name is `main`.
  - Test files: `_test.go`
  - In OO terms, think of:
    - Each directory as a static class
    - Each function or variable as a method or property
      - Functions or variables beginning with a capital letter are exposed.
  - All methods and variables are shared across a package (e.g., with multiple `.go` files).
    - No classes in Golang; structs/interfaces and packages instead.
- [gofmt](https://golang.org/cmd/gofmt/)
- Import
  - All imports are relative to `GOPATH/src`.
    - Packages, not files, are imported.
  - All imported packages must be used; otherwise, Golang won't compile.
- Get
  - `go get` package manager.
  - Example: AWS SDK &rarr; `go get github.com/aws/aws-sdk-go`
    - Download the repo into `GOPATH/src`.
    - Then it's ready to import.
- Build & package
  - `GOPATH/pkg`
    - When compiling code, Golang creates a `.a` file in path in `GOPATH/pkg` that mirrors `GOPATH/src`.
  - `GOPATH/bin`
    - When running `go install`, a binary file lands in `GOPATH/bin`, named by the main package's directory.
    - Note: Can add `GOPATH/bin` to global `PATH`, and all binaries are available in the command line.
- Cross-platform builds
  - To create a binary for a Windows machine: `GOOS=windows GOARCH=amd64 go install`
- Language
  - "The need to get programmers productive quickly in a new language means that the language cannot be too radical."
  - No support in Go for:
    - Classes
    - Overloading operators or functions
    - Optional parameters
    - Exceptions
- Concurrency
  - Concurrency is enabled by creating cheap goroutines which can be distributed across CPUs.
