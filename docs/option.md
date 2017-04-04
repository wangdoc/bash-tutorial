# 脚本参数

## 位置参数

shell 提供了一个称为位置参数的变量集合，这个集合包含了命令行中所有独立的单词。这些变量按照从0到9给予命名。

`$0`到`$9`，是脚本的所有参数。其中，`$0`是脚本本身的路径名。

如果参数个数多于9个。只要指定一个大于9的数字，用花括号把该数字括起来就可以，例如`${10}`、`${55}`、`${211}`等等。

位置参数除了可以取到脚本的参数，还可以取到函数的参数。

```bash
file_info () {
  # file_info: function to display file information
  if [[ -e $1 ]]; then
      echo -e "\nFile Type:"
      file $1
      echo -e "\nFile Status:"
      stat $1
  else
      echo "$FUNCNAME: usage: $FUNCNAME file" >&2
      return 1
  fi
}
```

## 参数个数

shell 还提供了一个名为`$#`，可以得到命令行参数个数的变量。

## shift

`shift`命令会导致所有的位置参数 “向下移动一个位置”。事实上，用 shift 命令也可以 处理只有一个参数的情况（除了其值永远不会改变的变量 $0）。

每次 shift 命令执行的时候，变量 $2 的值会移动到变量 $1 中，变量 $3 的值会移动到变量 $2 中，依次类推。 变量 $# 的值也会相应的减1。

```bash
#!/bin/bash
# posit-param: script to display all arguments
count=1
while [[ $# -gt 0 ]]; do
    echo "Argument $count = $1"
    count=$((count + 1))
    shift
done
```

上面代码中，只要参数个数不为零就会继续执行的 while 循环。 我们显示当前的位置参数，每次循环迭代变量 count 的值都会加1，用来计数处理的参数数量， 最后，执行 shift 命令加载 $1，其值为下一个位置参数的值。下面是程序运行结果。

```bash
$ posit-param2 a b c d
Argument 1 = a
Argument 2 = b
Argument 3 = c
Argument 4 = d
```

下面是依次处理每个参数的常用写法。

```bash
usage () {
    echo "$PROGNAME: usage: $PROGNAME [-f file | -i]"
    return
}
# process command line options
interactive=
filename=
while [[ -n $1 ]]; do
    case $1 in
    -f | --file)            shift
                            filename=$1
                            ;;
    -i | --interactive)     interactive=1
                            ;;
    -h | --help)            usage
                            exit
                            ;;
    *)                      usage >&2
                            exit 1
                            ;;
    esac
    shift
done
```

上面代码中，当位置参数 $1 不为空的时候，这个循环会持续运行。在循环的底部，有一个 shift 命令， 用来提升位置参数，以便确保该循环最终会终止。在循环体内，我们使用了一个 case 语句来检查当前位置参数的值， 看看它是否匹配某个支持的选项。若找到了匹配项，就会执行与之对应的代码。若没有，就会打印出程序使用信息， 该脚本终止且执行错误。

另外，处理`-f`参数的方式很有意思。当监测到 -f 参数的时候，会执行一次 shift 命令，从而提升位置参数 $1 为 伴随着 -f 选项的 filename 参数。

## 参数引用

shell 提供了两种特殊的参数。他们二者都能扩展成完整的位置参数列表，但以相当微妙的方式略有不同。

- `$*`	展开成一个从1开始的位置参数列表。当它被用双引号引起来的时候，展开成一个由双引号引起来 的字符串，包含了所有的位置参数，每个位置参数由 shell 变量 IFS 的第一个字符（默认为一个空格）分隔开。
- `$@`	展开成一个从1开始的位置参数列表。当它被用双引号引起来的时候， 它把每一个位置参数展开成一个由双引号引起来的分开的字符串。

```bash
#!/bin/bash
# posit-params3 : script to demonstrate $* and $@
print_params () {
    echo "\$1 = $1"
    echo "\$2 = $2"
    echo "\$3 = $3"
    echo "\$4 = $4"
}
pass_params () {
    echo -e "\n" '$* :';      print_params   $*
    echo -e "\n" '"$*" :';    print_params   "$*"
    echo -e "\n" '$@ :';      print_params   $@
    echo -e "\n" '"$@" :';    print_params   "$@"
}
pass_params "word" "words with spaces"
```

上面脚本中，`"$*"`和`"$@"`产生的结果如下。

```bash
word words with spaces
"$*" produces a one word result:
    "word words with spaces"
"$@" produces a two word result:
    "word" "words with spaces"
```

下面是运行结果。

```bash
$ posit-param3
 $* :
$1 = word
$2 = words
$3 = with
$4 = spaces
 "$*" :
$1 = word words with spaces
$2 =
$3 =
$4 =
 $@ :
$1 = word
$2 = words
$3 = with
$4 = spaces
 "$@" :
$1 = word
$2 = words with spaces
$3 =
$4 =
```

`"$@"`在大多数情况下是最有用的方法，因为它保留了每一个位置参数的完整性。
