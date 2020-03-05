# 重定向

重定向指的是将命令行输出写入指定位置。

- `cmd1 | cmd2`：Pipe; take standard output of cmd1 as standard input to cmd2.
- `> file`：Direct standard output to file.
- `< file`：Take standard input from file.
- `>> file`：Direct standard output to file; append to file if it already exists.
- `>| file`：Force standard output to file even if noclobber is set.
- `n>| file`：Force output to file from file descriptor n even if noclobber is set.
- `<> file`：Use file as both standard input and standard output.
- `n<> file`：Use file as both input and output for file descriptor n.
- `<< label`：Here-document; see text.
- `n > file`：Direct file descriptor n to file.
- `n < file`：Take file descriptor n from file.
- `n >> file`：Direct file descriptor n to file; append to file if it already exists.
- `n>&`：Duplicate standard output to file descriptor n.
- `n<&`：Duplicate standard input from file descriptor n.
- `n>&m`：File descriptor  n is made to be a copy of the output file descriptor.
- `n<&m`：File descriptor  n is made to be a copy of the input file descriptor.
- `&>file`：Directs standard output and standard error to file.
- `<&-`：Close the standard input.
- `>&-`：Close the standard output.
- `n>&-`：Close the output from file descriptor  n.
- `n<&-`：Close the input from file descriptor  n.
- `n>&word`：If  n is not specified, the standard output (file descriptor 1) is used. If the digits in word do not specify a file descriptor open for output, a redirection error occurs. As a special case, if n is omitted, and word does not expand to one or more digits, the standard output and standard error are redirected as described previously.
- `n<&word`：If word expands to one or more digits, the file descriptor denoted by  n is made to be a copy of that file descriptor. If the digits in word do not specify a file descriptor open for input, a redirection error occurs. If word evaluates to -, file descriptor n is closed. If n is not specified, the standard input (file descriptor 0) is used.
- `n>&digit-`：Moves the file descriptor digit to file descriptor  n, or the standard output (file descriptor 1) if n is not specified.
- `n<&digit-`：Moves the file descriptor digit to file descriptor  n, or the standard input (file descriptor 0) if n is not specified. digit is closed after being duplicated to n.


`>`用来将标准输出重定向到指定文件。

```bash
$ ls -l /usr/bin > ls-output.txt
```

如果重定向后的指定文件已经存在，就会被覆盖，不会有任何提示。

如果命令没有任何输出，那么重定向之后，得到的是一个长度为`0`的文件。因此，`>`具有创建新文件或改写现存文件、将其改为长度`0`的作用。

```bash
$ > ls-output.txt
```

`>>`用来将标准输出重定向追加到指定文件。

```bash
$ ls -l /usr/bin >> ls-output.txt
```

`2>`用来将标准错误重定向到指定文件。

```bash
$ ls -l /bin/usr 2> ls-error.txt
```

标准输出和标准错误，可以重定向到同一个文件。

```bash
$ ls -l /bin/usr > ls-output.txt 2>&1
# 或者
$ ls -l /bin/usr &> ls-output.txt

# 追加到同一个文件
$ ls -l /bin/usr &>> ls-output.txt
```

如果不希望输出错误信息，可以将它重定向到一个特殊文件`/dev/null`。

```bash
$ ls -l /bin/usr 2> /dev/null
```

`|`用于将一个命令的标准输出，重定向到另一个命令的标准输入。

```bash
$ ls -l /usr/bin | less
```

不要将`>`与`|`混淆。

```bash
$ ls > less
```

上面命令会在当前目录，生成一个名为`less`的文本文件。

下面是标准错误重定向的一个例子。

```bash
invalid_input () {
    echo "Invalid input '$REPLY'" >&2
    exit 1
}
read -p "Enter a single item > "
[[ -z $REPLY ]] && invalid_input
```

## tee

`tee`命令用于同时将标准输出重定向到文件，以及另一个命令的标准输入。

```bash
$ ls /usr/bin | tee ls.txt | grep zip
```

## 命令替换

命令替换（command substitution）指的是将一个命令的输出，替换进入另一个命令。`$(command)`表示命令替换，另一种写法是使用反引号。

```bash
$ echo $(ls)
# 或者
$ echo `ls`

$ ls -l $(which cp)
# 或者
$ ls -l `which cp`
```

## basename

`basename`命令清除 一个路径名的开头部分，只留下一个文件的基本名称。

```bash
#!/bin/bash
# file_info: simple file information program
PROGNAME=$(basename $0)
if [[ -e $1 ]]; then
    echo -e "\nFile Type:"
    file $1
    echo -e "\nFile Status:"
    stat $1
else
    echo "$PROGNAME: usage: $PROGNAME file" >&2
    exit 1
fi
```
