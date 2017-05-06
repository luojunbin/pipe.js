# 简单的管道处理器

`tree-pipe` 是一个简单的管道处理器, 在支持同步, 异步处理的同时, 还支持分支处理;

## 安装

```
npm i --save tree-pipe
```

## 例:

```js
import pipe from 'tree-pipe';

function step0(data) {
    return {
        sum: data.a + data.b
    };
}

function step1(data) {
    return {
        sum: data.sum + 1
    };
}

function step2(data) {
    // pipe.save() 返回一个函数, 该方法将后面的方法队列组合为一个方法, 作为请求的回调;
    fetch('someUrl').then(res => res.json()).then(pipe.save());
    // 这里返回 pipe.stop() 阻止队列继续向下执行;
    return pipe.stop();
}

function step3(data) {
    console.log(data);
    return data;
}

// pipe.p(...) 同样返回一个方法, 该方法被调用则表示开始执行;

// 顺序执行
let p0 = pipe.p(step0, step1, step2, step3);

step0 -------> step1 -------> step2 -------> step3
```


```



// 传入数组表示分支
let p1 = pipe.p(step0, [step1, step2], step3);


step0 -------> step1 -------> step2 
  |
  |
  -----------> step3
```


```

  
// 分支嵌套分支
let p2 = pipe.p(step0, [step1], [step2, [step3], step3]);

step0 -------> step1
  |
  |
  -----------> step2 -------> step3
                 |
                 |
                 -----------> step3

```


