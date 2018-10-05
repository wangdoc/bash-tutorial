# 条件判断

Bash 的条件判断语法采用下面的形式。

```bash
if true
then
  echo 'hello world'
fi
```

上面是多行的写法，也可以写成单行。

```bash
$ if true; then echo 'hello world'; fi
hello world
```

注意，`if`后面可以是一个值，也可以是一条命令，判断命令运行的结果。

```bash
$ if echo 'hi'; then echo 'hello world'; fi
hi
hello world
```

上面命令中，`if`后面是一条命令。该命令会执行，如果返回值是`0`，则执行`then`的部分。

`if`后面可以跟任意数量的命令。这时，所有命令都会执行，但是判断真伪只看最后一个命令，即使前面所有命令都失败，只要最后一个命令返回`0`，就会执行`then`的部分。

```bash
$ if false; true; then echo 'hello world'; fi
hello world
$ if true; false; then echo 'hello world'; fi
$
```

上面代码中，`then`的部分是否执行，完全取决于`if`部分的最后一个命令。
