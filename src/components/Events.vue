<template>
<md-layout md-column md-vertical-align-start md-flex="25">
        <md-avatar class="md-avatar-icon md-large md-accent">
          <md-icon>person</md-icon>
        </md-avatar>
    <ul>
      <li>{{suspect.name}}</li>
      <li class="md-caption">已入所20小时14分钟</li>
      <li class="md-caption">年龄: {{suspect.age}}, 民族: {{suspect.nationality}}</li>
    </ul>
    <ul  class="events">
      <li v-for="(event, i) in suspect.events">
        <span class="event-time md-caption">{{event.time}}</span>
        <ul>
          <li class="event"><span>{{event.action}}</span></li>
          <li class="officers"></li>
        </ul>
      </li>
    </ul>
</md-layout>
</template>
<script>
</script>
