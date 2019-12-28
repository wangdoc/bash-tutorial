# 启动

## Session

用户每次使用Shell，都要开启一个Session（对话）。

Session有两种类型：登录Shell和非登录Shell。它们的区别有两点，一是“登录Shell”会提示用户输入用户名和密码，二是它们的初始化脚本不同。

登录Shell的初始化脚本如下。

- `/etc/profile`：所有用户的全局配置脚本。
- `/etc/profile.d`目录里面所有`.sh`文件
- `~/.bash_profile`：用户的个人配置脚本。
- `~/.bash_login`：如果`~/.bash_profile`没找到，则尝试读取这个脚本。
- `~/.profile`：如果`~/.bash_profile`和`~/.bash_login`都没找到，则尝试读取这个脚本。

发行版更新的时候，会更新`/etc`里面的文件，比如`/etc/profile`，因此不要直接修改这个文件。如果想修改所有用户的登陆环境，就在`/etc/profile.d`目录里面新建`.sh`脚本。

非登录Shell的初始化脚本如下。

- `/etc/bash.bashrc`
- `~/.bashrc`

对用户来说，`~/.bashrc`通常是最重要的脚本。非登录Shell默认会执行它，而登录Shell也会通过调用执行它。

下面是一个典型的`.bash_profile`文件。

```bash
# .bash_profile
# Get the aliases and functions
if [ -f ~/.bashrc ]; then
. ~/.bashrc
fi
# User specific environment and startup programs
PATH=$PATH:$HOME/bin
export PATH
```

上面代码中，只要`.bashrc`存在，就会执行它。

`bash`命令的`--login`参数，会强制执行登陆shell会执行的脚本；`--noprofile`参数告诉Bash跳过这些profile脚本。`--norc`参数禁止在互动Shell执行`~/.bashrc`脚步；`--rcfile`参数指定一个配置，代替`.bashrc`。

```bash
$ echo VAR1=var1>testrc
$ echo $VAR1

$ bash --rcfile testrc
$ echo $VAR1
var1
```

## 启动选项

为了方便 Debug，有时在启动 Bash 的时候，可以加上启动选项。

`-n`不运行脚本，只检查是否有语法错误。

`-v`参数在输出每一行语句运行结果前，会先输出该行语句。

`-x`参数在每一个命令处理完以后，先输出该命令，再进行下一个命令的处理。

```bash
$ bash -n scriptname
$ bash -v scriptname
$ bash -x scriptname
```

## 键盘绑定

可以用`"\C-t":"pwd\n"`将 Ctrl-t 绑定为运行`pwd`命令。

全局的键盘绑定文件默认为`/etc/inputrc`，你可以创造自己的键盘绑定在主目录的`.inputrc`文件。如果你定义这个文件，需要在其中加入下面这行，保证全局绑定不会被遗漏。

```bash
$include /etc/inputrc
```

## source

`source`命令用于执行一个脚本，通常用于重新加载一个配置文件。

```bash
$ source .bashrc
```

`source`有一个简写形式，可以使用一个点（`.`）来表示。

```bash
$ . .bashrc
```
