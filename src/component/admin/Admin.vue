<template>
    <el-container>
        <!-- 页面左侧是公共的导航 -->
        <el-aside width="200px">
             <app-aside></app-aside>
        </el-aside>
        <!-- 页面右侧 -->
        <el-container>
                <!-- 头部是公共的 -->
                <el-header>
                    <app-header></app-header>
                </el-header>
                <!-- 这一块是动态变化的，将来通过路由控制 -->
                <el-main>
                    <router-view></router-view>
                </el-main>
        </el-container>
    </el-container>
</template>
<script>
// 导入公共的左侧与头部组件，注册成专属子组件使用
import AsideComponent from './frame/Aside.vue';
import HeaderComponent from './frame/Header.vue';
export default {
  data(){
      return {

      };
  },
  methods:{

  },
  // 注册子组件, key为组件使用时的标签名, value为对应组件
        components: {
            appAside: AsideComponent,
            appHeader: HeaderComponent,
        },
}
</script>
<style scoped lang="less">
    .el-container{
        height:100%;
        // 左侧高度100%
        .el-aside{
            height:100%;
            background-color:#D3DCE6;
            color:#333;
            text-align: center;
        }
        // 右侧头部
        .el-header{
            background-color:#B3C0D1;
            color:#333;
            text-align: right;
            line-height: 60px;
        }
        // 右侧变化内容
        .el-main{
            background-color:#E9EEF3;
            color:#333;
            text-align: center;
        }
    }
</style>
