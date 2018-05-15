# ps

`ps`命令列出当前正在执行的进程信息。

由于进程很多，所以为了快速找到某个进程，一般与`grep`配合使用。

```bash
# 找出正在运行 vim 的进程
$ ps | grep vi
```

## 参数

`-u`参数列出指定用户拥有的进程。

```bash
$ ps -u yourusername
```

