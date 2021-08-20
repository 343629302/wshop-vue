<template>
  <a-layout>
    <div class="scroll-box">
      <div class="public-page bg-white">
        <div class="page-name">
          <span class="name">店铺导航</span>
        </div>
        <div class="page-bg-gray">
          <div class="visible-warpper">
            <img src="src/assets/nav-mobile-top.png" alt="" />
            <div class="d1"></div>
            <div class="d2">
              <ul>
                <li v-for="(item, index) in tabbarOpt.list" :key="index">
                  <img
                    :src="`src/assets/tab-icon/${item.icon}-${tabbarOpt.color}.png`"
                    alt=""
                    v-if="item.icon"
                  />
                  <img
                    src="src/assets/upload-img.png"
                    v-else
                    alt=""
                    class="empty-icon"
                  />
                  <span>{{ item.text }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="edit-warpper">
            <div class="color-select">
              <span>导航配色</span>
              <div class="color-circle">
                <div
                  class="d1"
                  :style="{
                    'background-color': `${colorOpt[tabbarOpt.activeColor]}`,
                  }"
                ></div>
                <div
                  class="d2"
                  :style="{
                    'background-color': `${colorOpt[tabbarOpt.color]}`,
                  }"
                ></div>
              </div>
              <a-popover
                placement="bottom"
                trigger="click"
                v-model:visible="colorVisible"
              >
                <template #content>
                  <div class="color-popover-content">
                    <span> 图标选中状态 </span>
                    <div>
                      <span>选中</span>
                      <ul>
                        <li
                          v-for="item in selectColorList"
                          :key="item"
                          :style="{ 'background-color': colorOpt[item] }"
                          :class="{ active: item === tabbarOpt.activeColor }"
                          @click="handleTableColorChange(item)"
                        >
                          <i class="icon-dui iconfont"></i>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <span>未选</span>
                      <ul>
                        <li
                          v-for="item in colorList"
                          :key="item"
                          :class="{ active: item === tabbarOpt.color }"
                          :style="{ 'background-color': colorOpt[item] }"
                        >
                          <i class="icon-dui iconfont"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                </template>
                <div class="color-popover-btn">
                  <span>修改</span>
                </div>
              </a-popover>
            </div>
            <div class="tabbar-list">
              <div
                class="tabbar-item"
                v-for="(item, index) in tabbarOpt.list"
                :key="index"
              >
                <div class="d1">
                  <div>导航{{ index + 1 }}</div>
                  <i
                    class="icon-guanbi iconfont"
                    v-if="index != 0 && tabbarOpt.list.length > 2"
                    @click="handleDeleteTableItem(index)"
                  ></i>
                </div>
                <div class="d2 px-md mb-lg">
                  <span class="title">名称</span>
                  <a-input
                    v-model:value="item.text"
                    maxLength="4"
                    :suffix="`${item.text.length}/4`"
                    class="flex-1"
                  />
                </div>
                <div class="d3 px-md mb-lg">
                  <span class="title">链接</span>
                  <span class="flex-1" v-if="index === 0"> 首页 </span>
                  <a-input
                    v-model:value="item.pathName"
                    suffix="修改"
                    class="flex-1"
                    readOnly
                    v-else
                    @click="handleLinkSelectShow(index, item.path)"
                  />
                </div>
                <div class="d4 px-md pb-lg">
                  <span class="title">图标</span>
                  <div>
                    <a-button
                      type="link"
                      @click="handleIconSelectShow(index, item.icon)"
                      >选择图标</a-button
                    >
                    <div class="select-icon">
                      <div
                        class="icon-item"
                        @click="handleIconSelectShow(index, item.icon)"
                      >
                        <img
                          :src="`src/assets/tab-icon/${item.icon}-${tabbarOpt.activeColor}.png`"
                          alt=""
                          v-if="item.icon"
                        />
                        <img
                          src="src/assets/upload-img.png"
                          v-else
                          alt=""
                          class="empty-icon"
                        />
                      </div>
                      <div
                        class="icon-item"
                        @click="handleIconSelectShow(index, item.icon)"
                      >
                        <img
                          :src="`src/assets/tab-icon/${item.icon}-${tabbarOpt.color}.png`"
                          alt=""
                          v-if="item.icon"
                        />
                        <img
                          src="src/assets/upload-img.png"
                          v-else
                          alt=""
                          class="empty-icon"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="add-tabbar"
              v-show="tabbarOpt.list.length < 5"
              @click="handleAddTableItem"
            >
              <a-button>添加导航</a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <a-layout-footer>
      <div class="public-page-bottom">
        <a-button type="primary"> 保存 </a-button>
      </div>
    </a-layout-footer>
    <tabbar-icon-select
      v-model:visible="iconSelectOpt.show"
      v-model:activeIcon="iconSelectOpt.value"
      @ok="handleIconSelectConfirm"
    ></tabbar-icon-select>
    <tabbar-link-select
      v-model:visible="linkSelectOpt.show"
      v-model:activeLink="linkSelectOpt.value"
      @confirm="handleLinkSelectConfirm"
    ></tabbar-link-select>
  </a-layout>
</template>

<script setup>
import { reactive, getCurrentInstance, ref } from 'vue';
import TabbarIconSelect from './components/tabbar-icon-select.vue';
import TabbarLinkSelect from './components/tabbar-link-select.vue';

const tabbarOpt = reactive({
  color: 'gray',
  activeColor: 'red',
  list: [
    {
      text: '首页',
      path: '/pages/tab/index',
      pathName: '首页',
      code: 'function',
      icon: 'home',
    },
    {
      text: '分类',
      path: '/pages/tab/classify',
      pathName: '分类页',
      code: 'function',
      icon: 'classify',
    },
    {
      text: '购物车',
      path: '/pages/tab/car',
      pathName: '购物车',
      code: 'function',
      icon: 'car',
    },
    {
      text: '我的',
      path: '/pages/tab/user',
      pathName: '用户中心',
      code: 'function',
      icon: 'user',
    },
  ],
});
const colorVisible = ref(false);
const iconSelectOpt = reactive({
  show: false,
  value: '',
  valueIndex: 0,
});
const linkSelectOpt = reactive({
  show: false,
  value: '',
  valueIndex: 0,
});
const colorOpt = {
  red: '#FA392D',
  gray: '#B2B1AF',
  black: '#454545',
  pink: '#FF7DAC',
  yellow: '#FF8B0F',
};
const selectColorList = ['red', 'pink', 'yellow', 'black'];
const colorList = ['gray'];
const { proxy } = getCurrentInstance();

//改变导航选中颜色
const handleTableColorChange = (color) => {
  tabbarOpt.activeColor = color;
  colorVisible.value = false;
};

//显示图标选择弹窗
const handleIconSelectShow = (index, image) => {
  iconSelectOpt.show = true;
  iconSelectOpt.value = image;
  iconSelectOpt.valueIndex = index;
};

//显示链接选择弹窗
const handleLinkSelectShow = (index, link) => {
  linkSelectOpt.show = true;
  linkSelectOpt.value = link;
  linkSelectOpt.valueIndex = index;
};

//确认选择图标
const handleIconSelectConfirm = () => {
  tabbarOpt.list[iconSelectOpt.valueIndex].icon = iconSelectOpt.value;
  iconSelectOpt.show = false;
};

//确认选择链接
const handleLinkSelectConfirm = (event) => {
  const index = linkSelectOpt.valueIndex;
  const item = tabbarOpt.list[index];
  linkSelectOpt.show = false;
  item.code = event.code;
  item.pathName = event.name;
  item.path = event.path;
  // state.tabbarOpt.list.splice(index, 1, item);
};

//删除tabbar
const handleDeleteTableItem = (index) => {
  proxy.$confirm((status) => {
    if (status) {
      tabbarOpt.list.splice(index, 1);
    }
  }, '确认删除导航？');
};

//添加tabbar
const handleAddTableItem = () => {
  tabbarOpt.list.push({
    text: '',
    path: '',
    pathName: '',
    icon: '',
  });
};
</script>

<style scoped lang="scss">
.page-bg-gray {
  display: flex;
  .visible-warpper {
    width: 306px;
    margin-right: 50px;
    & > img {
      width: 100%;
    }
    .d1 {
      height: 400px;
      background-color: #fff;
    }
    .d2 {
      background-color: #fff;
      border-top: 1px solid #e3e2e5;
      height: 50px;
      ul {
        display: flex;
        align-items: center;
        height: 100%;
        li {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          img {
            width: 18px;
            margin-bottom: 5px;
            &.empty-icon {
              width: 20px;
            }
          }
          span {
            font-size: 12px;
            width: 100%;
            display: inline-block;
            text-align: center;
            height: 12px;
          }
        }
      }
    }
  }
  .edit-warpper {
    width: 430px;
    .color-select {
      background-color: #fff;
      height: 50px;
      padding: 0px 10px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .color-circle {
        margin-left: 20px;
        display: flex;
        align-items: center;
        div {
          border: 2px solid #fff;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          &.d2 {
            position: relative;
            left: -8px;
          }
        }
      }
      .color-popover-btn {
        cursor: pointer;
        span:hover {
          color: $theme-color;
        }
      }
    }

    .tabbar-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .tabbar-item {
        width: 210px;
        flex-shrink: 0;
        background: #fff;
        border: 1px solid #e3e2e5;
        border-radius: 4px;
        margin-bottom: 10px;
        display: flex;
        flex-direction: column;
        .title {
          flex-shrink: 0;
          margin-right: 10px;
          font-size: 12px;
        }

        .d1 {
          background: #efefef;
          border-radius: 4px 4px 0 0;
          height: 39px;
          padding: 0 19px 0 9px;
          @extend .d-flex;
          justify-content: space-between;
          i {
            font-size: 14px;
            color: rgb(178, 174, 188);
            cursor: pointer;
          }
        }
        .d2 {
          margin-top: 20px;
          @extend .d-flex;
        }
        .d3 {
          @extend .d-flex;
          & > span:nth-of-type(2) {
            height: 32px;
            @extend .d-flex;
          }
          ::v-deep(.ant-input-affix-wrapper) {
            cursor: pointer;
            &:hover {
              .ant-input-suffix {
                color: $theme-color;
              }
            }
            .ant-input {
              cursor: pointer;
            }
          }
        }
        .d4 {
          display: flex;
          & > span {
            line-height: 32px;
            margin-top: 1px;
          }
          button {
            height: auto;
            line-height: 32px;
            padding: 0;
            height: 32px;
          }
          .select-icon {
            @extend .d-flex;
            margin-top: 10px;
            .icon-item {
              height: 38px;
              width: 38px;
              border: 1px solid #e3e2e5;
              border-radius: 4px;
              &:nth-of-type(1) {
                margin-right: 10px;
              }
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                padding: 5px;
                box-sizing: border-box;
                &.empty-icon {
                  padding: 0px;
                }
              }
            }
          }
        }
      }
    }

    .add-tabbar {
      margin-bottom: 20px;
      button {
        width: 210px;
        height: 60px;
      }
    }
  }
}
.color-popover-content {
  div {
    font-size: 13px;
    color: #595961;
    margin-top: 20px;
    @extend .d-flex;
    ul {
      @extend .d-flex;
      li {
        cursor: pointer;
        width: 20px;
        height: 20px;
        border-radius: 4px;
        margin-left: 15px;
        text-align: center;
        &.active {
          i {
            display: inline-block;
          }
        }
        i {
          display: none;
          color: #fff;
          font-size: 13px;
        }
      }
    }
  }
}
</style>
