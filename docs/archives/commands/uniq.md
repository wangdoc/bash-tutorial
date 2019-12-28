# uniq

`uniq`用于过滤掉重复的行，该命令只对排序后的文件有效。

下面是`example.txt`文件的内容。

```bash
a
a
b
a
b
c
d
c
```

对该文件进行排序后，再过滤掉重复的行。

```bash
$ sort example.txt | uniq
a
b
c
d
```

## 参数

`-c`参数会显示每行一共出现了多少次。

```bash
sort example.txt | uniq -c
    3 a
    2 b
    2 c
    1 d
```

