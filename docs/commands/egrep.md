# egrep

`egrep`命令用于显示匹配正则模式的行，与`grep -E`命令等价。

下面是`example.txt`文件的内容。

```
Lorem ipsum
dolor sit amet, 
consetetur
sadipscing elitr,
sed diam nonumy
eirmod tempor
invidunt ut labore
et dolore magna
aliquyam erat, sed
diam voluptua. At
vero eos et
accusam et justo
duo dolores et ea
rebum. Stet clita
kasd gubergren,
no sea takimata
sanctus est Lorem
ipsum dolor sit
amet.
```

`egrep`命令显示包括`Lorem`或`dolor`的行。

```bash
$ egrep '(Lorem|dolor)' example.txt
# 或者
$ grep -E '(Lorem|dolor)' example.txt
Lorem ipsum
dolor sit amet,
et dolore magna
duo dolores et ea
sanctus est Lorem
ipsum dolor sit
```

