<template>
  <a-layout class="layout-warpeer">
    <left-nav @handleFirstRouteChange="handleFirstRouteChange"></left-nav>
    <a-layout>
      <a-layout-header>
        <span>微商城</span>
      </a-layout-header>
      <a-layout-content class="flex">
        <div v-show="secondRouters.length != 0" class="second-nav">
          <ul>
            <li v-for="(item, index) in secondRouters" :key="index">
              <router-link
                :to="item.path"
                :class="{ active: secondRouterPath === item.path }"
                @click="handleSaveRouter(item.path)"
              >
                <span>{{ item.title }}</span>
              </router-link>
            </li>
          </ul>
        </div>
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import LeftNav from "./components/left-nav.vue";
import { toRefs, reactive } from "vue";
export default {
  components: {
    LeftNav,
  },
  setup() {
    const state = reactive({
      secondRouters: [],
      secondRouterPath: "",
    });

    //一级路由改变的时候，获取二级路由
    const handleFirstRouteChange = ({ ars, path }) => {
      state.secondRouters = ars;
      handleSaveRouter(path);
    };

    //保存路由
    const handleSaveRouter = (path) => {
      state.secondRouterPath = path;
      sessionStorage.setItem("secondRouterPath", path);
    };

    return {
      handleFirstRouteChange,
      handleSaveRouter,
      ...toRefs(state),
    };
  },
};
</script>

<style lang="scss" scoped>
.layout-warpeer {
  height: 100vh;
  flex-direction: row;
  overflow: hidden;
  .ant-layout-header {
    height: 50px;
    background-color: #fff;
    box-shadow: 0 2px 5px 0 rgb(15 12 70 / 5%);
    line-height: 50px;
  }
  .ant-layout-content {
    background-color: #fafafa;
    .second-nav {
      background-color: #fafafa;
      padding: 30px 10px 10px 10px;
      width: 110px;
      flex-shrink: 0;
      ul {
        li {
          a {
            padding: 12px 10px;
            font-size: 12px;
            position: relative;
            margin: 2px 0;
            display: block;
            &.active,
            &:hover {
              color: #35323b;
              background: #e9eaf0;
              border-radius: 6px;
              &::after {
                content: "";
                width: 0;
                height: 0;
                border-color: transparent transparent transparent #000;
                border-style: solid;
                border-width: 4px 0 4px 6px;
                position: absolute;
                right: 10px;
                top: 50%;
                transform: translateY(-50%);
              }
            }
          }
        }
      }
    }
    .ant-layout {
      background-color: #fafafa;
    }
  }
}
</style>
