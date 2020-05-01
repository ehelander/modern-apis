# [A Tour of Go](https://tour.golang.org/welcome/1)

## Basics

### Packages

- [Packages](https://tour.golang.org/basics/1)
  - Every program is made up of packages.
  - Programs start running in the package `main`.
  - Convention: Package name is the last element of the import path.
- [Imports](https://tour.golang.org/basics/2)

  - Factorized import statement:

    ```go
    import (
        "fmt"
        "math"
    )
    ```

    - Can be written as separate imports (`import "fmt"), though the factorized style is preferred.

- [Exported names](https://tour.golang.org/basics/3)
  - A name is exported if it begins with a capital letter.
    - Unexported names are not accessible outside the package.

### Functions

- [Functions](https://tour.golang.org/basics/4), [continued](https://tour.golang.org/basics/5)
  - Data types follow the variable name.
  - The type can be omitted from all but the last variable in a sequence of parameters that share a type.
- [Multiple results](https://tour.golang.org/basics/6)
  - A function can return multiple results.
- [Named return values](https://tour.golang.org/basics/7)
  - Naked return: Variables are defined at the top of the function and are returned with a naked `return` keyword.
    - Should only be used for short functions (to not hurt readability).

### Variables

- [Variables](https://tour.golang.org/basics/8)
  - `var` declares a list of variables.
  - Type follows the variable name.
  - A `var` statement can be package- or function-scoped.
- [Variables with initializers](https://tour.golang.org/basics/9)
  - A `var` declaration can include an initializer.
  - If present, the type can be omitted; the variable will take the type of the initializer.
- [Short variable declarations](https://tour.golang.org/basics/10)
  - Inside a function, the `:=` operator can be used to declare a variable and assign it an initial value.

### Types

- [Basic types](https://tour.golang.org/basics/11)
  - Go's basic types
    - `bool`
    - `string`
    - int
      - `int`
      - `int8`
        - Alias: `byte`
      - `int16`
      - `int32`
        - Alias: `rune`
      - `int64`
    - uint
      - `uint`
      - `uint8`
      - `uint16`
      - `uint32`
      - `uint64`
      - `uintptr`
    - float
      - `float32`
      - `float64`
    - complex
      - `complex64`
      - `complex128`
  - Notes:
    - `int`, `uint`, and `uintptr` are 32 bits wide on 32-bit systems and 64 bits wide on 64-bit systems
    - When using an integer, use `int` unless a sized or unsigned integer type is needed.
- [Zero values](https://tour.golang.org/basics/12)
  - Variables declared without an explicit initial value receive their _zero value_:
    - Numeric: `0`
    - Boolean: `false`
    - Strings: `""`
- [Type conversions](https://tour.golang.org/basics/13)
  - `T(v)` converts value `v` to type `T`.
- [Type inference](https://tour.golang.org/basics/14)
  - When the right-hand side of an assignment contains an untyped numeric constant (and no explicit type is supplied), the type is inferred based on the precision of the constant (e.g., `int`, `float64`, `complex128`).
- [Constants](https://tour.golang.org/basics/15)
  - Declared with the `const` keyword
  - Values:
    - character
    - string
    - boolean
    - numeric
  - Constants cannot be declared with `:=`.
- [Numeric constants](https://tour.golang.org/basics/16)
  - Numeric constants are high-precision values.
  - An untyped constant takes the type needed by its context.

## Flow Control

### For

- [For](https://tour.golang.org/flowcontrol/1), [continued](https://tour.golang.org/flowcontrol/2)
  - `for` is the only looping construct in Go.
  - Basic syntax: `for i := 0; i < 10; i++ {}`
    - Init statement (`i := 0`) - optional
      - Executed before the first iteration.
      - Variables declared here are only visible inside the `for` scope.
    - Conditional expression (`i < 10`) - required
      - Evaluated before every iteration.
      - Loop stops as soon as this condition evaluates to `false`.
      - When the init and post statements are excluded, `for` functions like a `while`.
    - Post statement (`i++`) - optional
      - Executed at the end of every iteration.
  - Note: No parentheses; but braces required.
- [Forever](https://tour.golang.org/flowcontrol/4)
  - An empty `for` is an infinite loop.

### If

- [If](https://tour.golang.org/flowcontrol/5)
  - Similar to `for` in that no parentheses, but required braces.
- [If with a short statement](https://tour.golang.org/flowcontrol/6), [If and else if](https://tour.golang.org/flowcontrol/7)
  - `if` can being with a short statement to execute before the condition.
    - Variables declared in the statement are only scoped to the `if` or its `else`s.

### [Exercise: Loops and Functions](https://tour.golang.org/flowcontrol/8)

  ```go
  package main

  import (
    "fmt"
    "math"
  )

  func Sqrt10Iterations(x float64) float64 {
    z := 1.0
    for i := 0; i < 10; i++ {
      z -= (z*z - x) / (2 * z)
    }
    return z
  }

  func valuesDiffer(x, y float64) bool {
    const threshold = 0.0000000001
    var absoluteDifference = math.Abs(x - y)
    return absoluteDifference > threshold
  }

  func SqrtUntilDone(x float64) float64 {
    z := 1.0
    var zPrevious float64
    var iterations int
    for valuesDiffer(z, zPrevious) {
      zPrevious = z
      z -= (z*z - x) / (2 * z)
      iterations++
    }
    fmt.Println(iterations)
    return z
  }

  func main() {
    fmt.Println(Sqrt10Iterations(2))
    fmt.Println(SqrtUntilDone(2))
    fmt.Println(math.Sqrt(2))
  }
  ```

### Switch

- [Switch](https://tour.golang.org/flowcontrol/9), [Switch evaluation order](https://tour.golang.org/flowcontrol/10)
  - Go's `switch` only runs the selected, not those that follow.
    - No `break` statement is needed.
  - The `switch` cases do not need to be constants, nor the value integers.
  - Cases are evaluated from top to bottom.
- [Switch with no condition](https://tour.golang.org/flowcontrol/11)
  - A `switch` with no condition is equivalent to `switch true`.

### Defer

- [Defer](https://tour.golang.org/flowcontrol/12)
  - A `defer` statement delays the execution of a function until its surrounding function returns.
- [Stacking defers](https://tour.golang.org/flowcontrol/13)
  - Deferred functions are pushed onto a stack, evaluated in LIFO order.

## More Types

### Pointers

- [Pointers](https://tour.golang.org/moretypes/1)
  - Go has pointers (which hold the memory address of a value).
    - Type `*T` is a pointer to a `T` value.
    - The zero value of a pointer is `nil`.
    - The `&` operator generates a pointer to its operand.
    - The `*` operator denotes the pointer's underlying value.
      - Known as *dereferencing* or *indirecting*.
  - Go has no pointer arithmetic.

### Structs

- [Structs](https://tour.golang.org/moretypes/2)
  - A `struct` is a collection of fields.
- [Struct fields](https://tour.golang.org/moretypes/3)
  - Struct fields are accessed by a dot.
- [Pointers to structs](https://tour.golang.org/moretypes/4)
  - Struct fields can be accessed through a struct pointer.
    - With a struct pointer `p`, to access the field `X` of a struct: `(*p).X`
      - Shortcut: `p.X`
- [Struct literals](https://tour.golang.org/moretypes/5)
  - A struct can be created as a struct literal, supplying values for its fields.
    - `var v1 = Vertex{1, 2}` &rarr; v1 has type Vertex
    - `var v2 = Vertex{X: 1}` &rarr; Y:0 is implicit

### Arrays

- [Arrays](https://tour.golang.org/moretypes/6)
  - Arrays cannot be resized: The array's length is part of its type.
  - An array of `n` values of type `T` is of type `[n]T`.

### Slices

- [Slices](https://tour.golang.org/moretypes/7)
  - A slice is a dynamically-sized, flexible view into an array's elements.
  - Type `[]T` is a slice with elements of type `T`.
  - A slice includes a low bound index and a high bound index, separated by a colon.
    - `a[low : high]`
    - The slice _includes_ the first element, but _excludes_ the last element.
- [Slices are like references to arrays](https://tour.golang.org/moretypes/8)
  - Changing the elements of a slices modifies the corresponding elements in the underlying array.
- [Slice literals](https://tour.golang.org/moretypes/9)
  - Slice literals are like array literals, except the length is not specified.
- [Slice defaults](https://tour.golang.org/moretypes/10)
  - High or low bounds may be omitted.
    - Default: `0` for low bound
    - Length of the slice for the high bound
- [Slice length and capacity](https://tour.golang.org/moretypes/11)
  - Slice length: Number of elements it contains
    - Of a slice `s`: `len(s)`
  - Slice capacity: Number of elements in the underlying array, beginning with the first element in the slice.
    - Of a slice `s`: `cap(s)`
  - A slice's length can be extended if it has sufficient capacity.
- [Nil slices](https://tour.golang.org/moretypes/12)
  - Zero value of a slice: `nil`
    - Length and capacity of a nil slice: 0
    - No underlying array
- [Creating a slice with make](https://tour.golang.org/moretypes/13)
  - Slices can be created with the `make` function.
    - This can be used to create dynamically-sized arrays.
    - `make` allocates a zeroed array and returns a slice that refers to that array.
    - Arguments: array, length, capacity (optional)
- [Slices of slices](https://tour.golang.org/moretypes/14)
  - Slices can include any type (including other slices)
- [Appending to a slice](https://tour.golang.org/moretypes/15)
  - `append` appends new elements to a slice.
    - `func append(s []T, vs ...T) []T`
    - If the backing array is too small to fit the provided values, a new array will be allocated. The returned slice will point to this new array.

### Range

- [Range](https://tour.golang.org/moretypes/16), [continued](https://tour.golang.org/moretypes/17)
  - The `range` form of `for` loop iterates over a slice/map.
    - Each iteration returns 2 values: index, copy of the element at that index.
    - `for i, v := range someSlice {}`
      - To skip either the range or the value, assign it to `_`.
      - If only the index is desired, omit the value variable.

### [Exercise: Slices](https://tour.golang.org/moretypes/18)

  ```go
  package main

  import "golang.org/x/tour/pic"

  func Pic(dx, dy int) [][]uint8 {
    imageData := make([][]uint8, dy)
    for y := range imageData {
      imageData[y] = make([]uint8, dx)
      for x := range imageData[y] {
        // Diagonal gradient:
        // imageData[y][x] = uint8((x + y)/2)
        // Recursive checkerboard-like pattern:
        imageData[y][x] = uint8(x^y)
      }
    }
    return imageData
  }

  func main() {
    pic.Show(Pic)
  }
  ```

### Maps

- [Maps](https://tour.golang.org/moretypes/19)
  - Maps map keys to values.
  - Zero value: `nil`.
    - No keys; no keys can be added.
  - `make()`  returns an initialized map of the specified type.
    - Example:

      ```go
      package main

      import "fmt"

      type Vertex struct {
        Lat, Long float64
      }

      var m map[string]Vertex

      func main() {
        m = make(map[string]Vertex)
        m["Some Location"] = Vertex{
          40.68433, -74.39967,
        }
        fmt.Println(m["Some Location"])
      }
      ```

- [Map literals](https://tour.golang.org/moretypes/20), [continued](https://tour.golang.org/moretypes/21)
  - Keys are required.

    ```go
    var m = map[string]Vertex{
      "Some Location": Vertex{
        40.68433, -74.39967,
      },
    }
    // Can omit the type from the elements (if the top-level type is just a type name)
    var m2 = map[string]Vertex{
      "Some Location": {40.68433, -74.39967},
    }
    ```

- [Mutating maps](https://tour.golang.org/moretypes/22)
  - Insert or update element `key` in map `m` to value `v`
    - `m[key] = v`
  - Get element `key` from map `m`, assigning it to `elem`:
    - `elem = m[key]`
  - Delete element `key` from map `m`:
    - `delete(m, key)`
  - Check whether `key` exists in `m`:
    - `elem, ok = m[key]` (or `elem, ok := m[key]`, if `elem` and `ok` haven't been declared)
      - If `key` is in `m`:
        - `ok` is `true`
      - If `key` is not in `m`:
        - `ok` is `false`
        - `elem` is zero value

### [Exercise: Maps](https://tour.golang.org/moretypes/23)

  ```go
  package main

  import (
    "golang.org/x/tour/wc";
    "strings";
  )

  func WordCount(s string) map[string]int {
    words := strings.Fields(s)
    wordCount := make(map[string]int)
    for i := range words {
      word := words[i]
      count := wordCount[words[i]]
      wordCount[word] = count + 1
    }
    return wordCount
  }

  func main() {
    wc.Test(WordCount)
  }
  ```

### Functions

- [Function values](https://tour.golang.org/moretypes/24)
  - Functions are values.
  - Functions can be used as function arguments and return values.
- [Function closures](https://tour.golang.org/moretypes/25)
  - Functions may be closures.

### [Exercise: Fibonacci closure](https://tour.golang.org/moretypes/26)

  ```go
  package main

  import "fmt"

  // fibonacci is a function that returns
  // a function that returns an int.
  func fibonacci() func() int {
    current, next := 0, 1
    return func() int {
      returnValue := current
      current, next = next, current + next
      return returnValue
    }
  }

  func main() {
    f := fibonacci()
    for i := 0; i < 10; i++ {
      fmt.Println(f())
    }
  }
  ```
