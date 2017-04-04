# sort

`sort`命令用于文本文件的排序。

下面是`example.txt`文件的内容。

```bash
f
b
c
g
a
e
d
```

执行`sort`命令对其进行排序。

```bash
$ sort example.txt
a
b
c
d
e
f
g
```

## 参数

`-R`参数表示随机排序。

```bash
sort -R example.txt
b
d
a
c
g
e
f
```

