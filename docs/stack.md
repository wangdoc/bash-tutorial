# 目录堆栈

## cd -

Bash 可以记忆用户进入过的目录。默认情况下，只记忆前一次所在的目录，`cd -`命令可以返回前一次的目录。

```bash
# 当前目录是 /path/to/foo
$ cd bar

# 重新回到 /path/to/foo
$ cd -
```

上面例子中，用户原来所在的目录是`/path/to/foo`，进入子目录`bar`以后，使用`cd -`可以回到原来的目录。

## pushd，popd

如果希望记忆多重目录，可以使用`pushd`命令和`popd`命令。

`pushd`命令的用法类似`cd`命令，可以进入指定的目录。

```bash
$ pushd dirname
```

第一次使用`pushd`命令时，会将当前目录先放入堆栈，然后将所要进入的目录也放入堆栈，位置在前一个记录的上方。以后每次使用`pushd`命令，都会将所要进入的目录，放在堆栈的顶部。

使用`popd`命令，会移除堆栈的顶部记录，并进入后一条目录所指向的目录（即原来的第二条目录）。

下面是一个例子。

```bash
# 当前处在主目录，堆栈为空
$ pwd
/home/me

# 进入 /home/me/foo
# 当前堆栈为 /home/me/foo /home/me
$ pushd ~/foo

# 进入 /etc
# 当前堆栈为 /etc /home/me/foo /home/me
$ pushd /etc

# 进入 /home/me/foo
# 当前堆栈为 /home/me/foo /home/me
$ popd

# 进入 /home/me
# 当前堆栈为 /home/me
$ popd

# 目录不变，当前堆栈为空
$ popd
```
