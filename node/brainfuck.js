const fs = require("fs");

function Brainfuck(size = 32768) {
  this.memory = new Array(size).fill(0);
  this.code = "";
  this.ptr = 0;
  this.pc = 0;
  this.jumpTo = {};
}

Brainfuck.prototype.load = function (code) {
  this.code = code.split("");
};

Brainfuck.prototype.preprocess = function () {
  const stack = [];
  for (let i = 0; i < this.code.length; i += 1) {
    const command = this.code[i];
    if (command === "[") {
      stack.push(i);
    } else if (command === "]") {
      if (stack.length === 0) throw new Error("Syntax error");

      this.jumpTo[i] = stack.pop();
      this.jumpTo[this.jumpTo[i]] = i;
    }
  }

  if (stack.length > 0) throw new Error("Syntax error");
};

Brainfuck.prototype.increasePtr = function () {
  if (this.ptr >= this.memory.length - 1) throw new Error("Out of memory");
  this.ptr += 1;
};

Brainfuck.prototype.decreasePtr = function () {
  if (this.ptr <= 0) throw new Error("Out of memory");
  this.ptr -= 1;
};

Brainfuck.prototype.increaseValue = function () {
  this.memory[this.ptr] += 1;
};

Brainfuck.prototype.decreaseValue = function () {
  this.memory[this.ptr] -= 1;
};

Brainfuck.prototype.printValue = function () {
  process.stdout.write(String.fromCharCode(this.memory[this.ptr]));
};

Brainfuck.prototype.jump = function (command) {
  if (command === "[" && this.memory[this.ptr] === 0) {
    this.pc = this.jumpTo[this.pc];
  } else if (command === "]" && this.memory[this.ptr] !== 0) {
    this.pc = this.jumpTo[this.pc];
  }
};

Brainfuck.prototype.loopEnd = function () {
  if (this.memory[this.ptr] !== 0) {
    let depth = 0;
    while (this.pc > 0) {
      const command = this.code[this.pc];

      if (command === "]") depth += 1;
      else if (command === "[") {
        depth -= 1;
        if (depth === 0) break;
      }

      this.pc -= 1;
    }

    if (depth !== 0) throw new Error("Syntax error");
  }
};

Brainfuck.prototype.run = function () {
  this.preprocess();

  while (this.pc < this.code.length) {
    const command = this.code[this.pc];

    if (command === ">") this.increasePtr();
    else if (command === "<") this.decreasePtr();
    else if (command === "+") this.increaseValue();
    else if (command === "-") this.decreaseValue();
    else if (command === ".") this.printValue();
    else if (command === "[" || command === "]") this.jump(command);

    this.pc += 1;
  }
};

fs.readFile(process.argv[2], function (err, data) {
  if (err) throw new Error(err.message);
  const bf = new Brainfuck();
  bf.load(data.toString());
  bf.run();
  process.stdout.write("\n");
});