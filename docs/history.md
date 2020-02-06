# Bash 操作历史

Bash 会保留用户的操作历史，即用户输入的每一条命令。退出当前 Shell 的时候，Bash 会将用户刚才的操作历史写入`~/.bash_history`文件。

环境变量`$HISTFILE`总是指向这个文件。

```bash
$ echo $HISTFILE
/home/me/.bash_history
```

## history 命令

`history`命令能显示操作历史。最近的操作在最后面，所有的操作都带有行号。

```bash
$ history
```

通过定制环境变量`$HISTTIMEFORMAT`，可以保留每个操作的时间。

```bash
$ export HISTTIMEFORMAT='%F %T  '
$ history
1  2013-06-09 10:40:12   cat /etc/issue
2  2013-06-09 10:40:12   clear
```

上面代码中，`%F`相当于`%Y - %m - %d`，`%T`相当于` %H : %M : %S`。

如果不希望保存本次操作的历史，可以设置环境变量`HISTSIZE`等于0。

```bash
export HISTSIZE=0
```

如果`HISTSIZE=0`写入`.bashrc`文件，那么都不会保留该用户的操作历史。如果写入`/etc/profile`，整个系统都不会保留操作历史。

配合`grep`命令，可以搜索操作历史。

```bash
$ history | grep <所要搜索的命令>
```

按下 Ctrl + r，可以搜索到符合条件的最近一个执行的命令。

知道了命令的行号以后，可以用`感叹号 + 行号`执行该命令。

```bash
$ !8
```

上面的命令执行操作历史里面第8条命令。

`感叹号 + 搜索字符串`会执行最近一个符合条件的命令。比如，以前执行过`netstat -np | grep 22`，那么输入`!net`就会执行这条命令。

`-c`参数可以清除操作历史。

```bash
$ history -c
```


