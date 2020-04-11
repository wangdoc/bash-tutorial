# Bash 启动环境

## Session

用户每次使用 Shell，都会开启一个与 Shell 的 Session（对话）。

Session 有两种类型：登录 Session 和非登录 Session，也可以叫做 login shell 和 non-login shell。

### 登录 Session

登录 Session 是用户登录系统以后，系统为用户开启的原始 Session，通常需要用户输入用户名和密码进行登录。

登录 Session 一般进行整个系统环境的初始化，启动的初始化脚本依次如下。

- `/etc/profile`：所有用户的全局配置脚本。
- `/etc/profile.d`目录里面所有`.sh`文件
- `~/.bash_profile`：用户的个人配置脚本。如果该脚本存在，则执行完就不再往下执行。
- `~/.bash_login`：如果`~/.bash_profile`没找到，则尝试执行这个脚本（C shell 的初始化脚本）。如果该脚本存在，则执行完就不再往下执行。
- `~/.profile`：如果`~/.bash_profile`和`~/.bash_login`都没找到，则尝试读取这个脚本（Bourne shell 和 Korn shell 的初始化脚本）。

Linux 发行版更新的时候，会更新`/etc`里面的文件，比如`/etc/profile`，因此不要直接修改这个文件。如果想修改所有用户的登陆环境，就在`/etc/profile.d`目录里面新建`.sh`脚本。

如果想修改你个人的登录环境，一般是写在`~/.bash_profile`里面。下面是一个典型的`.bash_profile`文件。

```bash
# .bash_profile
PATH=/sbin:/usr/sbin:/bin:/usr/bin:/usr/local/bin
PATH=$PATH:$HOME/bin

SHELL=/bin/bash
MANPATH=/usr/man:/usr/X11/man
EDITOR=/usr/bin/vi
PS1='\h:\w\$ '
PS2='> '

if [ -f ~/.bashrc ]; then
. ~/.bashrc
fi

export PATH
export EDITOR
```

可以看到，这个脚本定义了一些最基本的环境变量，然后执行了`~/.bashrc`。

`bash`命令的`--login`参数，会强制执行登录 Session 会执行的脚本。

```bash
$ bash --login
```

`bash`命令的`--noprofile`参数，会跳过上面这些 Profile 脚本。

```bash
$ bash --noprofile
```

### 非登录 Session

非登录 Session 是用户进入系统以后，手动新建的 Session，这时不会进行环境初始化。比如，在命令行执行`bash`命令，就会新建一个非登录 Session。

非登录 Session 的初始化脚本依次如下。

- `/etc/bash.bashrc`：对全体用户有效。
- `~/.bashrc`：仅对当前用户有效。

对用户来说，`~/.bashrc`通常是最重要的脚本。非登录 Session 默认会执行它，而登陆 Session 一般也会通过调用执行它。由于每次执行 Bash 脚本，都会新建一个非登录 Session，所以`~/.bashrc`也是每次执行脚本都会执行的。

`bash`命令的`--norc`参数，可以禁止在非登录 Session 执行`~/.bashrc`脚本。

```bash
$ bash --norc
```

`bash`命令的`--rcfile`参数，指定另一个脚本代替`.bashrc`。

```bash
$ bash --rcfile testrc
```

### .bash_logout

`~/.bash_logout`脚本在每次退出 Session 时执行，通常用来做一些清理工作和记录工作，比如删除临时文件，记录用户在本次 Session 花费的时间。

如果没有退出时要执行的命令，这个文件也可以不存在。

## 启动选项

为了方便 Debug，有时在启动 Bash 的时候，可以加上启动参数。

- `-n`：不运行脚本，只检查是否有语法错误。
- `-v`：输出每一行语句运行结果前，会先输出该行语句。
- `-x`：每一个命令处理完以后，先输出该命令，再进行下一个命令的处理。

```bash
$ bash -n scriptname
$ bash -v scriptname
$ bash -x scriptname
```

## 键盘绑定

Bash 允许用户定义自己的快捷键。全局的键盘绑定文件默认为`/etc/inputrc`，你可以在主目录创建自己的键盘绑定文件`.inputrc`文件。如果定义了这个文件，需要在其中加入下面这行，保证全局绑定不会被遗漏。

```bash
$include /etc/inputrc
```

`.inputrc`文件里面的快捷键，可以像这样定义，`"\C-t":"pwd\n"`表示将`Ctrl + t`绑定为运行`pwd`命令。

## source 命令

`source`命令用于执行一个脚本，通常用于重新加载一个配置文件。

```bash
$ source .bashrc
```

`source`命令最大的特点是在当前 Shell 执行脚本，不像直接执行脚本时，会新建一个子 Shell。所以，`source`命令执行脚本时，不需要`export`变量。

```bash
#!/bin/bash
# test.sh
echo $foo
```

上面脚本输出`$foo`变量的值。

```bash
# 当前 Shell 新建一个变量 foo
$ foo=1

# 打印输出 1
$ source test.sh
1

# 打印输出空字符串
$ bash test.sh
```

上面例子中，当前 Shell 的变量`foo`并没有`export`，所以直接执行无法读取，但是`source`执行可以读取。

`source`命令的另一个用途，是在脚本内部加载外部库。

```bash
#!/bin/bash

source ./lib.sh

function_from_lib
```

上面脚本在内部使用`source`命令加载了一个外部库，然后就可以在脚本里面，使用这个外部库定义的函数。

`source`有一个简写形式，可以使用一个点（`.`）来表示。

```bash
$ . .bashrc
```

