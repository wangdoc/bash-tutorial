# 函数

## 定义函数

Bash函数有两种定义方法，它们是等价的。

```bash
# 方法一
function name {
    commands
    return
}

# 方法二
name () {
    commands
    return
}
```

调用函数时，直接写函数名即可。

```bash
#!/bin/bash

function funct {
  echo "Step 2"
  return
}

echo "Step 1"
funct
echo "Step 3"
```

## 局部变量

函数里面可以用`local`命令声明局部变量。

```bash
funct_1 () {
    local foo  # variable foo local to funct_1
    foo=1
    echo "funct_1: foo = $foo"
}
```

