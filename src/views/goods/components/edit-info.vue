<template>
  <div class="goods-edit-info">
    <div class="bg-white info-item">
      <div class="page-title">基础信息</div>
      <div class="page-form">
        <a-form
          :model="form"
          :label-col="{
            style: 'width:150px',
          }"
        >
          <a-form-item label="商品名称">
            <a-input
              v-model:value="form.name"
              placeholder="请输入商品名称"
              maxLength="40"
              :suffix="`${form.name.length}/40`"
              class="w-550px"
            />
          </a-form-item>

          <a-form-item label="副标题">
            <div class="w-550px">
              <c-textarea
                v-model:value="form.subhead"
                placeholder="请输入商品名称"
                type="textarea"
                maxLength="30"
                :auto-size="{ minRows: 4 }"
              />
            </div>
          </a-form-item>

          <a-form-item label="商品主图">
            <upload-image
              :maxLength="1"
              v-model="form.coverImage"
            ></upload-image>

            <div class="form-hint">
              作用于商城列表、分享头图；建议尺寸：750*750像素。
            </div>
          </a-form-item>

          <a-form-item label="商品轮播图">
            <upload-image
              :maxLength="10"
              v-model="form.swiperImage"
              :disabled="false"
            ></upload-image>
            <div class="form-hint">
              作用于商品详情页顶部轮播；建议尺寸：750*750像素，轮播图可以拖拽图片调整顺序，最多上传10张（至少1张）
            </div>
          </a-form-item>

          <a-form-item label="分类">
            <div class="w-550px">
              <c-select
                value="id"
                label="name"
                :columns="classifyList"
                v-model="form.classify"
                placeholder="请选择分类"
                :allowClear="true"
              ></c-select>
            </div>
          </a-form-item>
        </a-form>
      </div>
    </div>

    <div class="mt-lg bg-white info-item">
      <div class="page-title">价格库存</div>
      <div class="page-form">
        <a-form
          :model="form"
          :label-col="{
            style: 'width:150px',
          }"
        >
          <a-form-item label="规格类型">
            <a-radio-group name="radioGroup" v-model:value="form.type">
              <a-radio value="0">单规格商品</a-radio>
              <a-radio value="1">多规格商品</a-radio>
            </a-radio-group>
          </a-form-item>
          <div v-show="form.type === '0'">
            <a-form-item label="售卖价格">
              <a-input
                v-model:value="form.price"
                placeholder="请输入价格"
                type="number"
                class="w-150px"
                addon-after="元"
              />
            </a-form-item>

            <a-form-item label="成本价">
              <a-input
                v-model:value="form.cost"
                placeholder="请输入价格"
                type="number"
                class="w-150px"
                addon-after="元"
              />
              <div class="form-hint mt-md">
                成本价将不会对用户展示，仅在订单导出时，可导出该价格，便于商家统计使用
              </div>
            </a-form-item>

            <a-form-item label="商品库存">
              <a-input
                v-model:value="form.stock"
                placeholder="请输入价格"
                type="number"
                class="w-150px"
                addon-after="元"
              />
            </a-form-item>

            <a-form-item label="已出售数">
              <a-input
                v-model:value="form.sell"
                placeholder="请输入价格"
                type="number"
                class="w-150px"
                addon-after="件"
              />
            </a-form-item>
          </div>
          <div v-show="form.type === '1'">
            <a-form-item label="商品规格">
              <div class="specs-list">
                <div
                  class="specs-item"
                  v-for="(item, index) in form.specsList"
                  :key="item.id"
                >
                  <div class="specs-name">
                    <a-input
                      v-model:value="item.name"
                      placeholder="请填写规格"
                      maxLength="20"
                      :suffix="`${item.name.length}/20`"
                    />
                  </div>
                  <div class="specs-children-list">
                    <div class="line"></div>
                    <div
                      class="specs-children-item"
                      v-for="(cItem, cIndex) in item.childrenList"
                      :key="cItem.id"
                    >
                      <a-input
                        v-model:value="cItem.name"
                        placeholder="请填写子规格"
                        maxLength="20"
                        :suffix="`${cItem.name.length}/20`"
                      />

                      <div
                        class="specs-close"
                        @click="handleDeleteSpecsChildrenItem(item, cIndex)"
                      >
                        <i class="iconfont icon-guanbi1"></i>
                      </div>
                    </div>
                    <a-button
                      type="link"
                      @click="handleAddSpecsChildrenItem(item)"
                      >添加规格值</a-button
                    >
                  </div>
                  <div
                    class="specs-close"
                    @click="handleDeleteSpecsItem(index)"
                  >
                    <i class="iconfont icon-guanbi1"></i>
                  </div>
                </div>
                <a-button
                  type="primary"
                  @click="handleAddSpecsItem"
                  v-if="form.specsList.length < 3"
                  >添加规格</a-button
                >
                <span v-else>最多添加3个规格</span>
              </div>
              <div class="specs-table">
                <a-table
                  :dataSource="form.skuList"
                  :columns="tableColumns"
                  :pagination="false"
                  size="small"
                  rowKey="skuId"
                >
                  <template #price="{ record }">
                    <hide-input v-model="record.price" type="number" />
                  </template>

                  <template #cost="{ record }">
                    <hide-input v-model="record.cost" type="number" />
                  </template>

                  <template #stock="{ record }">
                    <hide-input v-model="record.stock" type="number" />
                  </template>
                </a-table>
              </div>
            </a-form-item>
            <a-form-item label="已出售数">
              <a-input
                v-model:value="form.sell"
                placeholder="请输入价格"
                type="number"
                class="w-150px"
                addon-after="件"
              />
            </a-form-item>
          </div>
        </a-form>
      </div>
    </div>

    <div class="mt-lg bg-white info-item">
      <div class="page-title">其他设置</div>
      <div class="page-form">
        <a-form
          :model="form"
          :label-col="{
            style: 'width:150px',
          }"
        >
          <a-form-item label="状态">
            <a-radio-group name="radioGroup" v-model:value="form.status">
              <a-radio value="0">下架</a-radio>
              <a-radio value="1">上架</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance, watch, ref } from "vue";
import UploadImage from "@/components/upload-image.vue";
import HideInput from "@/components/hide-input.vue";
import { v4 } from "uuid";

const props = defineProps({
  initForm: {
    type: Object,
    default: () => {},
  },
});
const { proxy } = getCurrentInstance();
const form = reactive({
  name: "",
  subhead: "",
  swiperImage: [],
  type: "0",
  cost: 0,
  price: 0,
  stock: 0,
  sell: 0,
  status: "1",
  specsList: [
    {
      id: v4(),
      name: "",
      childrenList: [{ name: "", id: v4() }],
    },
  ],
  skuList: [],
});
const classifyList = ref([
  {
    id: 0,
    name: "分类1",
  },
  {
    id: 1,
    name: "分类2",
  },
]);
const initTableColumns = [
  {
    title: "售卖价格",
    dataIndex: "price",
    key: "price",
    width: 150,
    slots: { customRender: "price" },
  },
  {
    title: "成本价",
    dataIndex: "cost",
    key: "cost",
    width: 150,
    slots: { customRender: "cost" },
  },
  {
    title: "库存",
    dataIndex: "stock",
    key: "stock",
    width: 150,
    slots: { customRender: "stock" },
  },
];
const tableColumns = ref(initTableColumns);

//添加规格
const handleAddSpecsItem = () => {
  form.specsList.push({
    id: v4(),
    name: "",
    childrenList: [],
  });
};

//添加规格值
const handleAddSpecsChildrenItem = (item) => {
  item.childrenList.push({ name: "", id: v4() });
};

//删除规格
const handleDeleteSpecsItem = (index) => {
  proxy.$confirm((status) => {
    if (status) {
      form.specsList.splice(index, 1);
    }
  }, "您确认删除这个规格吗?");
};

//删除规格值
const handleDeleteSpecsChildrenItem = (item, index) => {
  proxy.$confirm((status) => {
    if (status) {
      item.childrenList.splice(index, 1);
    }
  }, "您确认删除这个子规格吗?");
};

//生成规格表格
const generateSpecsTable = (tree) => {
  let ars = [];
  const skus = form.skuList;
  let treeColumns = [];
  const treeLen = tree.length;
  //将树结构解构为多维数组
  tree.forEach((item, index) => {
    let nextIndex = 0;
    if (index != treeLen - 1) {
      nextIndex = 1;
      const nextArr = tree.slice(index + 1);
      nextArr.forEach((nItem) => {
        const cLen = nItem.childrenList.length;
        nextIndex = nextIndex * (cLen ? cLen : 1);
      });
    }
    treeColumns.push({
      title: item.name,
      dataIndex: item.id,
      key: item.id,
      ellipsis: true,
      width: 150,
      customRender:
        index === treeLen - 1
          ? null
          : ({ text, index }) => {
              const obj = {
                children: text,
                props: {},
              };
              if (nextIndex != 0) {
                if (index % nextIndex === 0) {
                  obj.props.rowSpan = nextIndex;
                } else {
                  obj.props.rowSpan = 0;
                }
              }
              return obj;
            },
    });
    const iArs = [];
    item.childrenList.forEach((cItem) => {
      iArs.push({
        id: cItem.id,
        fid: item.id,
        fName: item.name,
        name: cItem.name,
      });
    });
    ars.push(iArs);
  });
  //计算规格数组
  let specs = ars.reduce((total, value) => {
    if (total?.length) {
      let tem = [];
      if (value.length) {
        total.forEach((item) => {
          value.forEach((vItem) => {
            tem.push([].concat(...item, vItem));
          });
        });
        return tem;
      } else {
        return total;
      }
    } else {
      let tem = [];
      value.forEach((item) => {
        tem.push([item]);
      });
      return tem;
    }
  }, []);

  specs = specs.map((item) => {
    let skuId = "";
    let obj = {
      skuMap: item,
      price: 0,
      cost: 0,
      stock: 0,
    };
    item.forEach((lItem) => {
      if (skuId === "") {
        skuId = lItem.id;
      } else {
        skuId += `-${lItem.id}`;
      }
      obj[lItem.fid] = lItem.name;
    });
    obj.skuId = skuId;
    const value = skus.find((sItem) => sItem.skuId === skuId);
    if (value) {
      obj.price = value.price;
      obj.cost = value.cost;
      obj.stock = value.stock;
    }
    return obj;
  });

  tableColumns.value = [].concat(treeColumns, initTableColumns);
  form.skuList = specs;
};

//返回表单
const handleGetForm = () => {
  return form;
};

//初始化
const init = (event) => {
  Object.assign(form, event);
};

watch(
  () => form.specsList,
  (value) => {
    generateSpecsTable(value);
  },
  {
    immediate: true,
    deep: true,
  }
);

defineExpose({
  handleGetForm,
  init,
});
</script>

<style lang="scss" scoped>
.goods-edit-info {
  .info-item {
    border-radius: 5px;
    overflow: hidden;
  }
  .page-title {
    height: 50px;
    @extend .d-flex;
    padding: 0px 20px;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }
  .page-form {
    margin-top: 25px;
  }
  .w-550px {
    width: 550px;
  }
  .w-150px {
    width: 150px;
  }
  .form-hint {
    color: #999;
    font-size: 12px;
  }
  .specs-list {
    .specs-item {
      padding: 20px;
      background-color: #f7f7f7;
      border-radius: 4px;
      margin-right: 20px;
      margin-bottom: 25px;
      position: relative;
      &:hover {
        > .specs-close {
          display: block;
        }
      }
      > .specs-close {
        position: absolute;
        top: 5px;
        right: 10px;
        display: none;
        cursor: pointer;
        i {
          color: #7b7b7b;
          font-size: 20px;
        }
      }
      .specs-name {
        width: 250px;
      }
      .specs-children-list {
        display: flex;
        flex-wrap: wrap;
        padding-left: 30px;
        position: relative;
        .line {
          position: absolute;
          width: 20px;
          height: 40px;
          border-left: 1px solid #ededed;
          border-bottom: 1px solid #ededed;
          top: 0;
          left: 10px;
        }
        .specs-children-item {
          margin-top: 25px;
          margin-right: 10px;
          width: 200px;
          position: relative;
          &:hover {
            .specs-close {
              display: block;
            }
          }
          > .specs-close {
            position: absolute;
            top: 0px;
            right: -5px;
            display: none;
            cursor: pointer;
            transform: translateY(-50%);
            i {
              color: #7b7b7b;
              font-size: 20px;
            }
          }
        }
        > .ant-btn {
          margin-top: 25px;
          padding: 0px 4px;
        }
      }
    }
    > .ant-btn {
      margin-left: 20px;
    }

    > span {
      padding-left: 20px;
      font-size: 13px;
    }
  }
  .specs-table {
    margin-top: 18px;
    margin-right: 20px;
    ::v-deep(.ant-table-body) {
      td {
        vertical-align: middle;
      }
    }
  }
}
</style>
