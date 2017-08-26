<template>
    <span :endTime="endTime" :starTime="starTime" :callback="callback" :endText="endText">
      {{content}}
    </span>
</template>
<script>
  export default {
    data() {
      return {
        content: ''
      };
    },
    props: {
      starTime: {
        type: String,
        default: ''
      },
      endTime: {
        type: Number,
        default: ''
      },
      endText: {
        type: String,
        default: '已结束'
      },
      callback: {
        type: Function,
        default: ''
      }
    },
    mounted () {
      this.countdowm(this.endTime);
    },
    methods: {
      countdowm(timestamp) {
        let self = this;
        let timer = setInterval(function() {
          let nowTime = new Date();
          let endTime = new Date(timestamp);
          let t = endTime.getTime() - nowTime.getTime();
//          console.log('相差：' + t + '最后：' + endTime.getTime() + '开始：' + nowTime.getTime());
          if (t > 0) {
            let min = Math.floor((t / 60000) % 60);
            let sec = Math.floor((t / 1000) % 60);
            min = min < 10 ? '0' + min : min;
            sec = sec < 10 ? '0' + sec : sec;
            let format = '';
              format = `${min}:${sec}`;
            self.content = format;
          } else {
            clearInterval(timer);
            self.content = self.endText;
            self._callback();
          }
        }, 1000);
      },
      _callback() {
        if (this.callback && this.callback instanceof Function) {
          this.callback(...this);
        }
      }
    }
  };
</script>
