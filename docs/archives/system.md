# 系统信息

## uname

`uname`命令返回当前机器的信息。

```bash
# 内核的版本
$ uname -r
3.2.0-24-virtual

# CPU 架构
$ uname -m
x86_64
```

如果要了解操作系统的版本，可以查看`/etc/issue`文件。

```bash
$ cat /etc/issue
Debian GNU/Linux 9 \n \l
```

## service

`service`命令可以查看当前正在运行的服务。

```bash
$ service --status-all
 [ + ]  apache2
 [ ? ]  atd
 [ - ]  bootlogd
```

上面代码中，`+`表示正在运行，`-`表示已经停止，`?`表示`service`命令不了解相关信息。
