# 弧形进度条

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>demo</title>
    <script src="./circle-progress.min.js"></script>
<style>
    #app {
        width: 100px;
        height: 100px;
    }
</style>
</head>
<body>
    <div id="app">
        
    </div>
    <script>
        var el = document.getElementById('app');
        var options = {
            baseColor: 'grey', //指定背景圆弧色 不指定则默认使用 #AEC9C9
            coverColor: 'red'  //进度圆弧色 不指定则默认使用 #43BD32
            startRadian: '0.9 * Math.PI', //起始弧度 不指定则默认使用 0.5 * Math.PI 也就是圆形
            //关于startRadian 特别说明的是，只要指定了起始弧度，会根据对称原则计算结束弧度，可自行写demo看实际效果
        };

        //构造函数
        var circle = new CircleProgress(el, options);
        var percent = 0;
        var id = setInterval(function() {
            //更新进度
            circle.progress(++percent);
            if (percent >= 100) {
                clearInterval(id);
            }
        }, 30);
    </script>
</html>
```

