# tr

`tr`命令用于按照给定模式转换文本。

下面是`example.txt`文件的内容。

```bash
Hello World Foo Bar Baz!
```

`tr`命令可以将所有小写字母转换为大写字母。

```bash
$ cat example.txt | tr 'a-z' 'A-Z'
HELLO WORLD FOO BAR BAZ!
```

`tr`命令还可以将所有空格转为换行符。

```bash
$ cat example.txt | tr ' ' '\n'
Hello
World
Foo
Bar
Baz!
```

