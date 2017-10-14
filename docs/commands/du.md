# du

`du`命令显示某个文件或目录的磁盘使用量。

```bash
$ du filename
```

`-h`参数将返回的大小显示为人类可读的格式，即显示单位为 K、M、G 等。

`-s`参数表示总结（summarize）。

`-x`参数表示不显示不在当前分区的目录，通常会忽略`/dev`、`/proc`、`/sys`等目录。

`-c`参数表示显示当前目录总共占用的空间大小。

```bash
# 显示根目录下各级目录占用的空间大小
$ sudo du -shxc /*
```

`--exclude`参数用于排除某些目录或文件。

```bash
$ sudo du -shxc /* --exclude=proc
$ sudo du -sh --exclude=*.iso
```

`--max-depth`参数用于设定目录大小统计到第几层。如果设为`-–max-depth=0`，那么等同于`-s`参数。

```bash
$ sudo du /home/ -hc --max-depth=2
```
