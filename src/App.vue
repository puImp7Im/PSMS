<template>
    <div>
    <md-toolbar class="md-dense">
        <md-button class="md-icon-button">
            <md-icon>menu</md-icon>
        </md-button>
        <h2 style="flex: 1">PSMS<sup>2.0</sup></h2>
        <md-button class="md-icon-button">
            <md-icon>chat</md-icon>
        </md-button>
        <md-button class="md-icon-button">
            <md-icon>email</md-icon>
        </md-button>
        <md-button class="md-icon-button">
            <md-icon>person</md-icon>
        </md-button>
    </md-toolbar>
    <!--
    <md-tabs md-centered class="md-accent">
        <md-tab id="Register" md-label="入所登记" md-icon="person_add">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
        </md-tab>
        <md-tab id="Inquiry" md-label="讯(询)问" md-icon="group">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
        </md-tab>
        <md-tab id="Release" md-label="出所登记" md-icon="local_taxi">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolorum quas amet cum vitae, omnis! Illum quas voluptatem, expedita iste, dicta ipsum ea veniam dolore in, quod saepe reiciendis nihil.</p>
        </md-tab>
    </md-tabs>
    -->
    <md-layout md-gutter>
        <!--sidebar-->
        <md-layout md-column md-flex="20">
            <md-list>
                <md-list-item>
                    <router-link to="/register">
                        <md-icon>person_add</md-icon>
                        <span>入所</span>
                    </router-link>
                </md-list-item>
                <md-list-item>
                    <router-link to="/inquiry">
                        <md-icon>contacts</md-icon>
                        <span>讯(询)问</span>
                    </router-link>
                </md-list-item>
                <md-list-item>
                    <router-link to="/inquiryDone">
                        <md-icon>people outline</md-icon>
                        <span>结束讯(询)问</span>
                    </router-link>
                </md-list-item>
                <md-list-item>
                    <router-link to="/takeOut">
                        <md-icon>local_taxi</md-icon>
                        <span>临时出所</span>
                    </router-link>
                </md-list-item>
                <md-list-item>
                    <router-link to="/takeBack">
                        <md-icon>move_to_inbox</md-icon>
                        <span>临时出所返回</span>
                    </router-link>
                </md-list-item>
                <md-list-item>
                    <router-link to="/releaseOrTransport">
                        <md-icon>local_taxi</md-icon>
                        <span>出所</span>
                    </router-link>
                </md-list-item>
                <md-list-item>
                    <router-link to="/map">
                        <md-icon>local_taxi</md-icon>
                        <span>实时监控</span>
                    </router-link>
                </md-list-item>
                <md-list-item>
                    <md-icon>whatshot</md-icon>
                    <span>更多</span>

                    <md-list-expand>
                        <md-list>
                            <md-list-item>
                                <router-link to="/suspects">
                                    <md-icon>move_to_inbox</md-icon>
                                    <span>在押嫌疑人列表</span>
                                </router-link>
                            </md-list-item>
                        </md-list>
                    </md-list-expand>
                </md-list-item>
            </md-list>
        </md-layout>
        <!--main-->
        <md-layout md-column md-flex="60">
            <router-view></router-view>
        </md-layout>
        <!--main-->
        <!--
        <md-layout md-column md-flex="20">
            <router-view name="sidebar"></router-view>
        </md-layout>-->
    </md-layout>

    <!--
    <md-sidenav class="md-right" ref="tips" @open="open('Right')" @close="close('Right')">
        <md-toolbar>
            <div class="md-toolbar-container">
                <h3 class="md-title">Sidenav content</h3>
            </div>
        </md-toolbar>
        <md-button class="md-raised md-accent" @click.prevent="closeRightSidenav">Close</md-button>
    </md-sidenav>
-->
    </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
