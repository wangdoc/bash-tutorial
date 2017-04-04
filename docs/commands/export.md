# export

`export`命令用于向子Shell输出变量。

```bash
$ export hotellogs="/workspace/hotel-api/storage/logs"
```

然后执行下面的命令，新建一个子 Shell。

```bash
$ bash
$ cd hotellogs
```

上面命令的执行结果会进入`hotellogs`变量指向的目录。

`export`命令还可以显示所有环境变量。

```bash
$ export
SHELL=/bin/zsh
AWS_HOME=/Users/adnanadnan/.aws
LANG=en_US.UTF-8
LC_CTYPE=en_US.UTF-8
LESS=-R
```

如果想查看单个变量，使用`echo $VARIABLE_NAME`。

```bash
$ echo $SHELL
/usr/bin/zsh
```
