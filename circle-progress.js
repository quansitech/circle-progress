

(function(w){


    var CircleProgress = function(el, options){
        this.el = el;
        this.options = options;
        this.cWidth = this.el.offsetWidth;
        this.cHeight = this.el.offsetHeight;
        this.baseColor = this.options.baseColor || '#AEC9C9';
        this.coverColor = this.options.coverColor || "#43BD32";
        this.r = this.cWidth/2 - 2;
        this._init();
    };

    //canvas 实现圆形进度条
    CircleProgress.prototype = {
        _init: function(){
            if(this.cWidth != this.cHeight){
                console.error('容器必须是正方形');
                return;
            }
            this._createCanvas();
            this.startRadian = this.options.startRadian || 1/2 * Math.PI;
            if(!(this.startRadian >= 0.5 * Math.PI && this.startRadian <= 1.5 * Math.PI)){
                console.error('起始弧度必须在0.5π到1.5π之间');
                return;
            }
            this.finalRadian = 2.5 * Math.PI - (this.startRadian - 0.5 * Math.PI);
            this.step = (this.finalRadian - this.startRadian) / 100;
        },
        _createCanvas: function(){
            var canvas = document.createElement('canvas');
            canvas.width = this.cWidth;
            canvas.height = this.cHeight;
            this.el.appendChild(canvas);
            this.ctx = canvas.getContext('2d');   
        },
        _drawCanvas: function(x, y, r, sRadian, eRadian, color, lineWidth){
            this.ctx.beginPath();
            this.ctx.lineCap = "round";
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = lineWidth;
            this.ctx.arc(x, y, r, sRadian, eRadian, false);
            this.ctx.stroke();
        },
        progress: function(percent){
            if(percent > 100 || percent < 0){
                console.error('进度值必须在0到100之间');
                return;
            }

            this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
            var endRadian = this.startRadian + this.step * percent;

            //画底色
            this._drawCanvas(this.cWidth/2, this.cHeight/2, this.r, this.startRadian, this.finalRadian, this.baseColor, 2);
            //画进度条
            this._drawCanvas(this.cWidth/2, this.cHeight/2, this.r, this.startRadian, endRadian, this.coverColor, 2);
            var angle = 2*Math.PI - endRadian; 
            xPos = Math.cos(angle) * this.r + this.cWidth/2;
            yPos = -Math.sin(angle) * this.r + this.cHeight/2;
            //画圆头
            this._drawCanvas(xPos, yPos, 2, 0, 2*Math.PI, this.coverColor, 2);

            this.ctx.fillStyle = this.coverColor;
            this.ctx.font = this.cWidth / 5 + 'px PT Sans';
            var textWidth = this.ctx.measureText(percent+'%').width;
            this.ctx.fillText(percent+'%', this.cWidth/2 - textWidth/2, this.cHeight/2 + this.cWidth / 10);
        }
    }

    w.CircleProgress = CircleProgress;


}(window));
