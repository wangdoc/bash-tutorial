# echo

`echo`命令会显示它的参数。

```bash
$ echo hello
hello
```

注意，`echo`命令会在打印结束后，添加行尾的回车符。

## 参数

`-n`参数

`echo`命令默认会在打印结束后，添加一个回车。`n`参数可以去除这个回车。

```bash
$ echo a;echo b
a
b
$ echo -n a;echo b
ab
```

`-e`参数表示转义特殊字符。

```bash
$ echo "Hello\nWorld"
Hello\nWorld
$ echo -e "Hello\nWorld"
Hello
World
```
