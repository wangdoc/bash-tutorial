# trap 命令

`trap`命令用来在 Bash 脚本中响应系统信号。

最常见的系统信号就是 SIGINT（中断），即按 Ctrl + C 所产生的信号。`trap`命令的`-l`参数，可以列出所有的系统信号。

```bash
$ trap -l
 1) SIGHUP	 2) SIGINT	 3) SIGQUIT	 4) SIGILL	 5) SIGTRAP
 6) SIGABRT	 7) SIGBUS	 8) SIGFPE	 9) SIGKILL	10) SIGUSR1
11) SIGSEGV	12) SIGUSR2	13) SIGPIPE	14) SIGALRM	15) SIGTERM
16) SIGSTKFLT	17) SIGCHLD	18) SIGCONT	19) SIGSTOP	20) SIGTSTP
21) SIGTTIN	22) SIGTTOU	23) SIGURG	24) SIGXCPU	25) SIGXFSZ
26) SIGVTALRM	27) SIGPROF	28) SIGWINCH	29) SIGIO	30) SIGPWR
31) SIGSYS	34) SIGRTMIN	35) SIGRTMIN+1	36) SIGRTMIN+2	37) SIGRTMIN+3
38) SIGRTMIN+4	39) SIGRTMIN+5	40) SIGRTMIN+6	41) SIGRTMIN+7	42) SIGRTMIN+8
43) SIGRTMIN+9	44) SIGRTMIN+10	45) SIGRTMIN+11	46) SIGRTMIN+12	47) SIGRTMIN+13
48) SIGRTMIN+14	49) SIGRTMIN+15	50) SIGRTMAX-14	51) SIGRTMAX-13	52) SIGRTMAX-12
53) SIGRTMAX-11	54) SIGRTMAX-10	55) SIGRTMAX-9	56) SIGRTMAX-8	57) SIGRTMAX-7
58) SIGRTMAX-6	59) SIGRTMAX-5	60) SIGRTMAX-4	61) SIGRTMAX-3	62) SIGRTMAX-2
63) SIGRTMAX-1	64) SIGRTMAX
```

`trap`的命令格式如下。

```bash
$ trap [动作] [信号1] [信号2] ...
```

上面代码中，“动作”是一个 Bash 命令，“信号”常用的有以下几个。

> - HUP：编号1，脚本与所在的终端脱离联系。
> - INT：编号2，用户按下 Ctrl + C，意图让脚本中止运行。
> - QUIT：编号3，用户按下 Ctrl + 斜杠，意图退出脚本。
> - KILL：编号9，该信号用于杀死进程。
> - TERM：编号15，这是`kill`命令发出的默认信号。
> - EXIT：编号0，这不是系统信号，而是 Bash 脚本特有的信号，不管什么情况，只要退出脚本就会产生。

`trap`命令响应`EXIT`信号的写法如下。

```bash
$ trap 'rm -f "$TMPFILE"' EXIT
```

上面命令中，脚本遇到`EXIT`信号时，就会执行`rm -f "$TMPFILE"`。

trap 命令的常见使用场景，就是在 Bash 脚本中指定退出时执行的清理命令。

```bash
#!/bin/bash

trap 'rm -f "$TMPFILE"' EXIT

TMPFILE=$(mktemp) || exit 1
ls /etc > $TMPFILE
if grep -qi "kernel" $TMPFILE; then
  echo 'find'
fi
```

上面代码中，不管是脚本正常执行结束，还是用户按 Ctrl + C 终止，都会产生`EXIT`信号，从而触发删除临时文件。

注意，`trap`命令必须放在脚本的开头。否则，它上方的任何命令导致脚本退出，都不会被它捕获。

如果`trap`需要触发多条命令，可以封装一个 Bash 函数。

```bash
function egress {
  command1
  command2
  command3
}

trap egress EXIT
```

## 参考链接

- [Using Trap to Exit Bash Scripts Cleanly](https://www.putorius.net/using-trap-to-exit-bash-scripts-cleanly.html)
- [Sending and Trapping Signals](https://mywiki.wooledge.org/SignalTrap)

