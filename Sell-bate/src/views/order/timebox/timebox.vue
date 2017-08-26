<template>
    <div class="submit-box" v-show="showFlag">
      <transition name="move">
        <div class="submit-time">
          <div class="submit-box-head">
            <span class="black bold">选择送达时间</span>
          </div>
          <div class="submit-select">
            <div class="submit-date">
              <ul v-if="dateTime">
                <li v-for="(item,index) in dateTime" :class="{'date':dateIndex===index}" class="submit-date-li" @click.stop="selectDate(index,$event)" >
                  <span class="submit-date-content">{{item.month_date | getMonthDate}} ({{weekMap[item.day]}})</span>
                </li>
              </ul>
            </div>
            <div class="submit-hour" ref="hourWrapper">
              <ul v-if="hourTime">
                <li v-for="(item,index) in hourTime" class="submit-hour-li" @click.stop="selectHour(index,$event)" >
                  <span class="submit-hour-content">{{item.time}} ({{item.detail}})</span>
                </li>
                <div class="aaa">
                  <div class="aaa-text"></div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </transition>
      <transition name="fade">
        <div class="box-mask" @click="hide"></div>
      </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  export default{
    data() {
      return {
        showFlag: false,
        dateIndex: 0,
        dateTime: [],
        hourTime: [],
        detailText: null,
        selected: {
          date: {},
          hour: {}
        },
        data_time: {
          year: 0,
          month_date: 0,
          hours: 0,
          minute: 0,
          second: 0,
          day: 0
        }
      };
    },
    created() {
      this.weekMap = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    },
    filters: {
      getMonthDate(data) {
        let date = new Date();
        let date1 = new Date();
        date1.setDate(date1.getDate() + 1);// 获取AddDayCount天后的日期
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = '0' + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate;
        }
        let month1 = date1.getMonth() + 1;
        let strDate1 = date1.getDate();
        if (month1 >= 1 && month1 <= 9) {
          month1 = '0' + month1;
        }
        if (strDate1 >= 0 && strDate1 <= 9) {
          strDate1 = '0' + strDate1;
        }
        let bb = month1 + '-' + strDate1;// 获取当前月份和日期
        let aa = month + '-' + strDate;// 获取当前月份和日期
          if (data === aa) {
            return `今天`;
          } else if (data === bb) {
            return `明天`;
          } else {
            return `${data}`;
          }
      }
    },
    methods: {
      show(detailText) {
        if (detailText === undefined) {
          this.detailText = '免费配送';
        } else {
          this.detailText = detailText;
        }
        this.dateIndex = 0;
        this.initDate();
        this.initTime(this.dateTime[0], this.detailText);
        this.selected.date = this.dateTime[0];
        this.showFlag = true;
        this._initScroll();
      },
      hide() {
        this.showFlag = false;
      },
      /**
       * 日期加减
       * @param AddDayCount
       * @returns {string}
       */
      getDateStr(AddDayCount) {
        let date = new Date();
        if (AddDayCount !== 0) {
          date.setDate(date.getDate() + AddDayCount);// 获取AddDayCount天后的日期
          this.data_time.hours = '';
          this.data_time.second = '';
        } else {
          this.data_time.hours = date.getHours();
          this.data_time.second = date.getSeconds();
        }
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
          month = '0' + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate;
        }
        this.data_time.day = date.getDay();
        this.data_time.year = date.getFullYear();
        this.data_time.month_date = month + '-' + strDate;// 获取当前月份和日期
        return this.data_time;
      },
      initDate() {
        this.dateTime.splice(0, this.dateTime.length);
        for (let i = 0; i < 4; i++) {
          this.dateTime.push({
            year: this.getDateStr(i).year,
            month_date: this.getDateStr(i).month_date,
            hours: this.getDateStr(i).hours,
            minute: this.getDateStr(i).minute,
            second: this.getDateStr(i).second,
            day: this.getDateStr(i).day
          });
        }
      },
      initTime(date, detailText) {
          this.hourTime.splice(0, this.hourTime.length);
          for (let i = date.hours; i < 24; i++) {
            let timeHours = i;
            let timeHoursAdd = timeHours + 1;
            if (timeHours >= 1 && timeHours <= 9) { timeHours = '0' + timeHours; }
            if (timeHoursAdd >= 0 && timeHoursAdd <= 9) { timeHoursAdd = '0' + timeHoursAdd; }
            if (date.second < 25 && i === date.hours) {
              this.hourTime.push({
                time: timeHoursAdd + ':00',
                detail: detailText
              });
            } else {
              if (timeHours === '') {
                timeHours = 0;
              }
              this.hourTime.push({
                time: timeHours + ':30',
                detail: detailText
              });
              this.hourTime.push({
                time: timeHoursAdd + ':00',
                detail: detailText
              });
          }
        }
      },
      selectDate(index, event) {
        if (!event._constructed) {
          return;
        }
        this.dateIndex = index;
        this.initTime(this.dateTime[index], this.detailText);
        this._initScroll();
        this.selected.date = this.dateTime[index];
      },
      selectHour(index, event) {
        if (!event._constructed) {
          return;
        }
        this.selected.hour = this.hourTime[index];
        this.$emit('getTime', this.selected);
        this.hide();
      },
      _initScroll() {
        this.$nextTick(() => {
          if (!this.hourScroll) {
            this.hourScroll = new BScroll(this.$refs.hourWrapper, {
              click: true
            });
          } else {
            this.hourScroll.refresh();
          }
        });
      }
    }
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .submit-box
    .box-mask
      position: fixed
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: 40
      backdrop-filter: blur(10px)
      opacity: 1
      background: rgba(0,0,0,0.3)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(0,0,0,0.3)
    .submit-time
      position: absolute
      left: 0
      z-index: 60
      width: 100%
      height: 310px
      background: #ffffff
      bottom: 0px
      opacity 1
      &.move-enter-active, &.move-leave-active
        transition: all 0.5s
      &.move-enter, &.move-leave-active
        opacity: 0
      .submit-box-head
        display flex
        height 45px
        vertical-align middle
        align-items center
        justify-content: center
        font-size 16px
        font-family "PingFang SC"
        font-weight bold
        background #f1f1f1
      .submit-select
        display flex
        height 100%
        .submit-date
          border none
          width 100px
          height 100%
          text-align center
          background #f1f1f1
          .submit-date-li
            border-none();
            height 45px
            width 100px
            justify-content: center;
            display: table
            &.date
              border-none();
              width 100px
              background white
            .submit-date-content
              display: table-cell
              vertical-align: middle
              font-size 12px
              color #37373b
              font-family "PingFang-SC-Medium"
        .submit-hour
          border none
          height 100%
          width 100%
          text-align center
          background white
          overflow hidden
          border-none();
          .submit-hour-li
            display: table
            width 100%
            border none
            height 44px
            justify-content: center;
            .submit-hour-content
              display: table-cell
              vertical-align: middle
              font-size 14px
              color #37373b
              font-family "PingFang-SC-Medium"
          .aaa
            display table
            width 100%
            font-size 12px
            margin-top 10px
            margin-bottom 15px
            height 44px
            text-align center
            .aaa-text
              display: table-cell
              vertical-align: middle
</style>
