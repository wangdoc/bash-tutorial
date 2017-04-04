# sed

`sed`命令用于对文本进行过滤和变形处理。

下面是`example.txt`文件的内容。

```bash
Hello This is a Test 1 2 3 4
replace all spaces with hyphens
```

`sed`命令将所有的空格换成连词线`-`。

```bash
$ sed 's/ /-/g' example.txt
Hello-This-is-a-Test-1-2-3-4
```

下面的命令将数字换成字母`d`。

```bash
$ sed 's/[0-9]/d/g' example.txt
Hello This is a Test d d d d
```

