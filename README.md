# Brainfuck implementations
Brainfuck implementations in each other in different languages.

## What is brainfuck?
[Brainfuck](https://wikipedia.org/wiki/Brainfuck) is an esoteric programming language.

## Command
The eight language commands each consist of a single character:

| Command | Meaning |
|---------|---------|
| >       | Increment the data pointer. |
| <       | Decrement the data pointer. |
| +       | Increment the byte at the data pointer. |
| -       | Decrement the byte at the data pointer. |
| .       | Output the byte at the data pointer. |
| ,       | Accept one byte of input, storing its value in the byte at the data pointer. |
| [       | If the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command. |
| ]       | If the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command. |

## Sample code
### Hello, World!
```brainfuck
++++++++++
[>+++++++>++++++++++>+++>+<<<<-]
>++.>+.+++++++..+++.>++++++++++++++.------------.<<+++++++++++++++.>.+++.------.--------.>+.
```
### And more
* [Fibonacci numbers](http://progopedia.com/example/fibonacci/14/)
* [Factorial](http://progopedia.com/example/factorial/18/)

## Languages
* [JavaScript (Node)](./node)
* [JavaScript (Browser)](./web)

## License
MIT License.