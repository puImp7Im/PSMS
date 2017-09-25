<template>
    <md-table-card md-elevation="0">
      <md-toolbar>
        <h1 class="md-title">犯罪嫌疑人列表</h1>
        <md-button class="md-icon-button">
          <md-icon>filter_list</md-icon>
        </md-button>
        <md-button class="md-icon-button">
          <md-icon>search</md-icon>
        </md-button>
      </md-toolbar>
    <md-table v-once>
      <md-table-header>
        <md-table-row>
          <md-table-head>嫌疑人</md-table-head>
          <md-table-head>状态</md-table-head>
          <md-table-head>房间</md-table-head>
          <md-table-head>入所时间</md-table-head>
          <md-table-head><md-icon>person</md-icon>登记人</md-table-head>
          <md-table-head><md-icon>alarm</md-icon>候押时间</md-table-head>
        </md-table-row>
      </md-table-header>
      <md-table-body>
        <md-table-row v-for="(suspect, index) in suspects" :key="index">
          <md-table-cell>{{suspect.name}}</md-table-cell>
          <md-table-cell>{{suspect.status | statusName}}</md-table-cell>
          <md-table-cell>{{suspect.room | roomName}}</md-table-cell>
          <md-table-cell>{{suspect.recordedOn | format}}</md-table-cell>
          <md-table-cell>{{suspect.recordedBy | officerName}}</md-table-cell>
          <md-table-cell>{{suspect.recordedOn | duration}}</md-table-cell>
        </md-table-row>
      </md-table-body>
    </md-table>
  </md-table-card>

</template>

<script>
export default {
  data: function () {
    var now = new Date()
    var timestamp = now.getTime()
    return {
      suspects: [
          {id: 1, name: '李二狗', sex: 1, room: 1, reason: 1, status: 1, recordedBy: 1, recordedOn: new Date(timestamp - Math.random() * 24 * 3600000)},
          {id: 2, name: '张某某', sex: 1, room: 2, reason: 1, status: 2, recordedBy: 2, recordedOn: new Date(timestamp - Math.random() * 24 * 3600000)},
          {id: 3, name: '谭某某', sex: 1, room: 3, reason: 1, status: 0, recordedBy: 3, recordedOn: new Date(timestamp - Math.random() * 24 * 3600000)},
          {id: 4, name: '朱某某', sex: 1, room: 4, reason: 1, status: 0, recordedBy: 3, recordedOn: new Date(timestamp - Math.random() * 24 * 3600000)}
      ]
    }
  },
  filters: {
    statusName: function (i) {
      const STATUS = {
        0: '醒酒',
        1: '候等',
        2: '讯(询)问',
        3: '临时出所',
        4: '释放'
      }
      return STATUS[i]
    },
    officerName: function (i) {
      const OFFICERS = {
        1: '王警官',
        2: '杨警官',
        3: '张警官',
        4: '毛警官'
      }
      return OFFICERS[i]
    },
    roomName: function (i) {
      const OFFICERS = {
        1: '询问室1',
        2: '询问室2',
        3: '醒酒室1',
        4: '醒酒室2'
      }
      return OFFICERS[i]
    },
    format: function (i) {
      var y = i.getFullYear()
      var M = i.getMonth() + 1
      var d = i.getDate()
      var H = i.getHours()
      var m = i.getMinutes()
      var s = i.getSeconds()
      return y + '-' + M + '-' + d + ' ' + H + ':' + m + ':' + s
    },
    duration: function (i) {
      var now = new Date()
      var sec = Math.round((now.getTime() - i.getTime()) / 1000)
      var arr = []
      arr.push(Math.floor(sec / 3600))
      sec = sec % 3600
      arr.push(Math.floor(sec / 60))
      sec = sec % 60
      arr.push(Math.floor(sec))
      return arr[0] + '时' + arr[1] + '分'
    }
  },
  methods: {

  }
}
</script>
