<template>
<div>
    <md-stepper ref="stepper" @change="change" @completed="finish" md-elevation="0">
        <md-step id="step1" md-button-back="上一步" md-button-continue="下一步">
            <md-layout>
                <md-layout md-column md-flex="70">
                    <h3 class="md-title">醉酒状态确认</h3>
                    <p class="md-caption">请确认犯罪嫌疑人是否处于醉酒状态。</p>
                    <div>
                        <md-radio id="drunk" v-model="drunk" name="drunk" md-value="1">是</md-radio>
                        <md-radio id="drunk" v-model="drunk" name="drunk" md-value="0">否</md-radio>
                    </div>
                </md-layout>
                <md-layout md-column md-align="end">
                        <h3 class="md-caption">如何判断醉酒？</h3>
                        <md-checkbox class="md-caption">可以正常站立？</md-checkbox>
                        <md-checkbox class="md-caption">可以按直线方向行走？</md-checkbox>
                        <md-checkbox class="md-caption">可以说出自己的住址？</md-checkbox>
                        <md-checkbox class="md-caption">可以从10倒数到1？</md-checkbox>
                </md-layout>
            </md-layout>
        </md-step>
        <md-step id="step_2_1" v-if="!isDrunk" md-button-back="上一步" md-button-continue="下一步">
            <h2 class="md-title">案件信息登记</h2>
            <h3 class="md-caption">请认真录入案件相关信息</h3>
            <md-layout md-gutter="24">
                <md-layout>
                    <md-input-container>
                        <label>案由</label>
                        <md-input required v-model="criminal"></md-input>
                    </md-input-container>
                </md-layout>
                <md-layout md-flex="50">
                    <md-input-container>
                        <label>入所原因</label>
                        <md-select required name="reason" id="reason" v-model="reason">
                            <md-option :key="i.id" v-for="i in reasons" :value="i.id">{{i.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
            </md-layout>
            <md-layout md-gutter="24">
                <md-layout>
                    <md-input-container>
                        <label>入所时间</label>
                        <md-input required v-model="recordedOn">2017-08-31 12:00:00</md-input>
                    </md-input-container>
                </md-layout>
                <md-layout>
                    <md-input-container>
                        <label>登记人员</label>
                        <md-select required name="officer" id="officer2" v-model="infoCollectedBy">
                            <md-option :key="officer.id" v-for="officer in officers" :value="officer.id">{{officer.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </md-layout>
            </md-layout>
        </md-step>
        <md-step id="step3" v-if="!isDrunk" :md-continue="suspectDone" md-button-back="上一步" md-button-continue="下一步">
            <md-card-header>
                <h2 class="md-title">犯罪嫌疑人基本信息登记</h2>
                <h3 class="md-caption">
                    <md-icon class="md-warn">warning</md-icon>
                    请仔细填写犯罪嫌疑人信息，确保信息完整、准确、无误！
                </h3>
            </md-card-header>
            <md-card-content>
                <form @submit.stop.prevent="submit">
                    <md-layout md-gutter="24">
                        <md-layout md-flex="50">
                            <md-input-container>
                                <label>姓名</label>
                                <md-input required v-model="suspect.name"></md-input>
                                <span class="md-error">姓名不能为空</span>
                            </md-input-container>
                        </md-layout>
                        <md-layout md-flex="25">
                            <md-input-container>
                                <label>性别</label>
                                <md-select required name="sex" id="sex" v-model="suspect.sex">
                                    <md-option :key="d.id" v-for="d in [{id: 1, name: '男'}, {id: 0, name: '女'}]" :value="d.id">{{d.name}}</md-option>
                                </md-select>
                            </md-input-container>
                        </md-layout>
                        <md-layout md-flex="25">
                            <md-input-container>
                                <label>民族</label>
                                <md-select required name="nationality" id="nationality" v-model="suspect.nationality">
                                    <md-option :key="d.id" v-for="d in nationalities" :value="d.id">{{d.name}}</md-option>
                                </md-select>
                            </md-input-container>
                        </md-layout>
                    </md-layout>
                    <md-input-container>
                        <label>危险程度</label>
                        <md-select required placeholder="请选择" name="violence" id="violence" v-model="suspect.violence">
                            <md-option :key="i.id" v-for="i in violences" :value="i.id">{{i.name}}</md-option>
                        </md-select>
                    </md-input-container>
                </form>
            </md-card-content>
        </md-step>
        <md-step id="step4" v-if="!isDrunk" md-button-back="上一步" md-button-continue="下一步">
            <md-card-header>
                <h2 class="md-title">个人物品登记</h2>
                <h3 class="md-caption">请仔细核对物品数量确保无误</h3>
            </md-card-header>
            <md-card-content>
                <md-checkbox id="security_check" name="security_check" v-model="hasBelongings">是否有个人物品寄存？</md-checkbox>
                <md-layout md-gutter="24" v-if="hasBelongings">
                    <md-layout>
                        <md-input-container>
                            <label>储物柜号</label>
                            <md-input></md-input>
                        </md-input-container>
                    </md-layout>
                    <md-layout>
                        <md-input-container>
                            <label>登记单号</label>
                            <md-input></md-input>
                        </md-input-container>
                    </md-layout>
                </md-layout>
                <md-input-container>
                    <label>备注</label>
                    <md-input></md-input>
                </md-input-container>
            </md-card-content>
        </md-step>
        <md-step id="step5" v-if="!isDrunk" md-button-back="上一步" md-button-continue="下一步" :md-continue="securityChecked">
            <md-card-header>
                <h2 class="md-title">人身安全检查确认</h2>
                <h3 class="md-caption">请严格按照规定对犯罪嫌疑人的人身案件进行检查</h3>
            </md-card-header>
            <md-card-content>
                <md-checkbox id="security_check" name="security_check" v-model="securityChecked">已经完成对犯罪嫌疑人的人身检查</md-checkbox>
                <md-input-container>
                    <label>检查人员</label>
                    <md-select required name="officer" id="officer1" v-model="securityCheckedBy">
                        <md-option :key="officer.id" v-for="officer in officers" :value="officer.id">{{officer.name}}</md-option>
                    </md-select>
                </md-input-container>
            </md-card-content>
        </md-step>
        <md-step id="step6" v-if="!isDrunk" md-button-back="上一步" md-button-continue="下一步" :md-continue="infoCollected">
            <md-card-header>
                <h2 class="md-title">信息采集确认</h2>
                <h3 class="md-caption">请严格按照规定对犯罪嫌疑人信息进行采集</h3>
            </md-card-header>
            <md-card-content>
                <md-checkbox id="my-test1" name="my-test1" v-model="infoCollected">已经对犯罪嫌疑人的信息采集</md-checkbox>
                <md-input-container>
                    <label>检查人员</label>
                    <md-select required name="officer" id="officer2" v-model="infoCollectedBy">
                        <md-option :key="officer.id" v-for="officer in officers" :value="officer.id">{{officer.name}}</md-option>
                    </md-select>
                </md-input-container>
            </md-card-content>
        </md-step>
        <md-step id="step7" md-button-back="上一步" md-button-continue="下一步">
            <md-card-header>
                <h2 class="md-title">绑定标签及穿戴识别服</h2>
                <h3 class="md-caption">&nbsp;</h3>
            </md-card-header>
            <md-card-content>
                <md-layout md-gutter="24">
                    <md-layout>
                        <md-input-container>
                            <label>标签</label>
                            <md-select required name="officer" id="officer2" v-model="tagId">
                                <md-option :key="tag.id" v-for="tag in tags" :value="tag.id">{{tag.name}}</md-option>
                            </md-select>
                        </md-input-container>
                    </md-layout>
                    <md-layout>
                        <md-input-container>
                            <label>识别服编号</label>
                            <md-input v-model="uniform" required></md-input>
                        </md-input-container>
                    </md-layout>
                </md-layout>
            </md-card-content>
        </md-step>
        <md-step md-button-back="上一步" md-button-continue="完成">
            <md-card-header>
                <h2 class="md-title">待看押</h2>
                <h3 class="md-caption">请将犯罪嫌疑人关押到指定房间并由相关民警及工作人员看管</h3>
            </md-card-header>
            <md-card-content>
                    <md-input-container>
                        <label>看押房间</label>
                        <md-select name="room" id="room" v-model="roomId">
                            <md-option :key="room.id" v-for="room in filteredRooms" :value="room.id">{{room.name}}</md-option>
                        </md-select>
                    </md-input-container>
                <md-layout md-gutter="24">
                    <md-layout md-gutter>
                        <md-input-container>
                            <label>责任民警</label>
                            <md-select required name="watchedBy1" id="watchedBy1" multiple v-model="watchedBy1">
                                <md-option :key="officer.id" v-for="officer in officers" :value="officer.id">{{officer.name}}</md-option>
                            </md-select>
                            <span class="md-error">Textarea validation message</span>
                        </md-input-container>
                    </md-layout>
                    <md-layout md-gutter>
                        <md-input-container>
                            <label>工作人员</label>
                            <md-select required name="watchedBy2" id="watchedBy2" multiple v-model="watchedBy2">
                                <md-option :key="staff.id" v-for="staff in staffs" :value="staff.id">{{staff.name}}</md-option>
                            </md-select>
                        </md-input-container>
                    </md-layout>
                </md-layout>
            </md-card-content>
        </md-step>
    </md-stepper>
    <md-snackbar md-position="bottom center" ref="snackbar" md-duration="3000" @close="close">
        <span>入所登记完成！</span>
        <md-button class="md-accent" @click="$refs.snackbar.close()"><md-icon>close</md-icon></md-button>
    </md-snackbar>
    <md-dialog md-open-from="#custom" md-close-to="#custom" ref="dialog">
        <md-dialog-title>即将完成</md-dialog-title>
        <md-dialog-content>
            {{suspect.name}}, {{suspect.sex}}, {{suspect.nationality}}
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click="closeDialog('dialog')">Cancel</md-button>
            <md-button class="md-primary" @click="closeDialog('dialog')">Ok</md-button>
        </md-dialog-actions>
    </md-dialog>
</div>
</template>

<script>
const ROOMS = [
  {id: 1, type: 1, name: '候问室'},
  {id: 2, type: 2, name: '讯(询)问室-1'},
  {id: 3, type: 2, name: '讯(询)问室-2'},
  {id: 4, type: 0, name: '醒酒室1'},
  {id: 5, type: 0, name: '醒酒室2'}
]
const TAGS = [
  {id: 1, name: 'T001'},
  {id: 2, name: 'T002'},
  {id: 3, name: 'T003'},
  {id: 4, name: 'T004'}
]
const OFFICERS = [
  {id: 1, name: '王警官'},
  {id: 2, name: '杨警官'},
  {id: 3, name: '张警官'},
  {id: 4, name: '毛警官'}
]
const STAFFS = [
  {id: 1, name: '王协警'},
  {id: 2, name: '李协警'}
]
export default {
  data: function () {
    let now = new Date()
    let today = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()

    return {
      drunk: 0,
      suspect: {
        name: '',
        sex: 1,
        nationality: 0,
        violence: 1
      },
      criminal: '打架斗殴',
      reason: 1,
      tagId: 1,
      roomId: 1,
      uniform: '9527',
      hasBelongings: false,
      securityCheckedBy: 2,
      securityChecked: false,
      infoCollectedBy: 1,
      infoCollected: false,
      watchedBy1: [],
      watchedBy2: [],
      recordedOn: today,
      confirm: {
        title: '即将完成',
        contentHtml: '',
        ok: '完成',
        cancel: '取消'
      },
      officers: OFFICERS,
      tags: TAGS,
      rooms: ROOMS,
      reasons: [
        {id: 1, name: '投案自首'},
        {id: 2, name: '110'}
      ],
      nationalities: [
        {id: 0, name: '未知'},
        {id: 1, name: '汉族'},
        {id: 99, name: '其它'}
      ],
      violences: [
        {id: 1, name: '低'},
        {id: 2, name: '中'},
        {id: 3, name: '高'}
      ],
      staffs: STAFFS
    }
  },
  computed: {
    isDrunk: function () {
      return (Number(this.drunk) === 1)
    },
    suspectNameDone: function () {
      return this.suspect.name !== ''
    },
    suspectDone: function () {
      return this.suspect.name !== ''
    },
    waitingRooms: function () {
      return this.rooms.filter(i => {
        return i.type !== 0
      })
    },
    filteredRooms: function () {
      return this.rooms.filter(i => {
        if (this.drunk) {
          return i.type === 0
        } else {
          return i.type !== 0
        }
      })
    }
  },
  watch: {
    drunk: function () {
      this.suspect.name = this.drunk ? '醉酒' : ''
    }
  },
  methods: {
    change: function () {
      console.log(1111)
    },
    showTips: function () {
      this.$refs.tips.toggle()
    },
    finish: function () {
      this.$refs.snackbar.open()
    },
    finish2: function () {
      this.$refs.dialog.open()
    },
    close: function () {
      this.$router.push({name: 'Welcome'})
    },
    closeDialog: function () {
      this.$router.push({name: 'Welcome'})
    }
  }
}
</script>
