# cut

`cut`命令用于显示每行的指定字段。

下面是`example.txt`文件的内容。

```bash
red riding hood went to the park to play
```

下面的命令可以显示第2、7和9字段，指定每个字段之间使用空格分隔。

```bash
$ cut -d " " -f2,7,9 example.txt
riding park play
```

