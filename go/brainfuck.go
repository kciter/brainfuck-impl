package main

import (
	"fmt"
	"strings"
	"os"
	"io/ioutil"
)

type Brainfuck struct {
	memory []int
	code []string
	ptr int
	pc int
	jumpTo map[int]int
}

func NewBrainfuck(size int) Brainfuck {
	var bf Brainfuck
	bf.memory = make([]int, size)
	bf.ptr = 0
	bf.pc = 0
	bf.jumpTo = make(map[int]int)
	return bf
}

func (bf *Brainfuck) Load(code string) {
	bf.code = strings.Split(code, "")
}

func (bf *Brainfuck) Preprocess() {
	var stack []int
	for i, command := range bf.code {
		if command == "[" {
			stack = append(stack, i)
		} else if command == "]" {
			if len(stack) == 0 {
				panic("Syntax error")
			}
			j := stack[len(stack)-1]
			stack = stack[:len(stack)-1]
			bf.jumpTo[i] = j
			bf.jumpTo[j] = i
		}
	}

	if len(stack) > 0 {
		panic("Syntax error")
	}
}

func (bf *Brainfuck) IncreasePtr() {
	bf.ptr++
}

func (bf *Brainfuck) DecreasePtr() {
	bf.ptr--
}

func (bf *Brainfuck) IncreaseValue() {
	bf.memory[bf.ptr]++
}

func (bf *Brainfuck) DecreaseValue() {
	bf.memory[bf.ptr]--
}

func (bf Brainfuck) PrintValue() {
	fmt.Printf("%c", bf.memory[bf.ptr])
}

func (bf *Brainfuck) StoringValue() {
	var input string
	fmt.Scanln(&input)
	bf.memory[bf.ptr] = int(input[0])
}

func (bf *Brainfuck) Jump(command string) {
	if command == "[" && bf.memory[bf.ptr] == 0 {
		bf.pc = bf.jumpTo[bf.pc]
	} else if command == "]" && bf.memory[bf.ptr] != 0 {
		bf.pc = bf.jumpTo[bf.pc]
	}
}

func (bf *Brainfuck) Run() {
	bf.Preprocess()

	for bf.pc < len(bf.code) {
		switch bf.code[bf.pc] {
		case ">":
			bf.IncreasePtr()
		case "<":
			bf.DecreasePtr()
		case "+":
			bf.IncreaseValue()
		case "-":
			bf.DecreaseValue()
		case ".":
			bf.PrintValue()
		case ",":
			bf.StoringValue()
		case "[":
			bf.Jump("[")
		case "]":
			bf.Jump("]")
		}
		bf.pc++
	}
}

func main() {
	file, _ := ioutil.ReadFile(os.Args[1])
	bf := NewBrainfuck(30000)
	bf.Load(string(file))
	bf.Run()
	fmt.Println()
}
