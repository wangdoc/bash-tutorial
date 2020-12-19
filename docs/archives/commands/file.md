# file

`file`命令用来查看某个文件的类型。

```bash
$ file index.html
 index.html: HTML document, ASCII text
```

file 工具可以对所给的文件输出一行简短的介绍，它用文件后缀、头部信息和一些其他的线索来判断文件。你在检查一堆你不熟悉的文件时使用 find 非常方便：

```bash
$ find -exec file {} \;
.:            directory
./hanoi:      Perl script, ASCII text executable
./.hanoi.swp: Vim swap file, version 7.3
./factorial:  Perl script, ASCII text executable
./bits.c:     C source, ASCII text
./bits:       ELF 32-bit LSB executable, Intel 80386, version ...
```
