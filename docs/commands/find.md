# find

`find`命令用于寻找文件，会包括当前目录的所有下级目录。

如果不带任何参数，`find`文件会列出当前目录的所有文件，甚至还包括相对路径。如果把结果导入 sort 效果更好。

```bash
$ find | sort
.
./Makefile
./README
./build
./client.c
./client.h
./common.h
./project.c
./server.c
./server.h
./tests
./tests/suite1.pl
./tests/suite2.pl
./tests/suite3.pl
./tests/suite4.pl
```

如果想要 ls -l 样式的列表，只要在 find 后面加上 -ls。

```bash
$ find -ls
```

find 有它自己的一套复杂的过滤语句。下面列举的是一些最常用的你可以用以获取某些文件列表的过滤器：

- find -name '*.c' —— 查找符合某 shell 式样式的文件名的文件。用 iname 开启大小写不敏感搜索。
- find -path '*test*' —— 查找符合某 shell 式样式的路径的文件。用 ipath 开启大小写不敏感搜索。
- find -mtime -5 —— 查找近五天内编辑过的文件。你也可以用 +5 来查找五天之前编辑过的文件。
- find -newer server.c —— 查找比 server.c 更新的文件。
- find -type d —— 查找所有文件夹。如果想找出所有文件，那就用 -type f；找符号连接就用 -type l。

要注意，上面提到的这些过滤器都是可以组合使用的，例如找出近两天内编辑过的 C 源码：

```bash
$ find -name '*.c' -mtime -2
```

默认情况下， find 对搜索结果所采取的动作只是简单地通过标准输出输出一个列表，然而其实还有其他一些有用的后续动作。

- -ls —— 如前文，提供了一种类 ls -l 式的列表。
- -delete —— 删除符合查找条件的文件。
- -exec —— 对搜索结果里的每个文件都运行某个命令， `{}`会被替换成适当的文件名，并且命令用`\;`终结。

```bash
$ find -name '*.pl' -exec perl -c {} \;
```

你也可以使用`+`作为终止符来对所有结果运行一次命令。我还发现一个我经常使用的小技巧，就是用 find 生成一个文件列表，然后在 Vim 的垂直分窗中编辑：

```bash
$ find -name '*.c' -exec vim {} +
```
