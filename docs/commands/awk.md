# awk

`awk`命令用于处理文本文件。它会依次处理每一行，并将每一行按照空格分成若干个字段。

```bash
$ awk '/search_pattern/ { action_to_take_if_pattern_matches; }' file_to_parse
```

下面是`/etc/passwd`文件。

```bash
root:x:0:0:root:/root:/usr/bin/zsh
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
```

下面的命令可以取出所有的用户名。

```bash
$ awk -F':' '{ print $1 }' /etc/passwd
root
daemon
bin
sys
sync
```

上面命令中，`-F`参数指定字段的分隔符。`{ print $1 }`表示打印第一个字段。

