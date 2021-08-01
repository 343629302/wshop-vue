import { Modal } from 'ant-design-vue';

//全局确认弹窗
const confirm = (callback, content = '', title = '确认删除') => {
  Modal.confirm({
    title: title,
    content: content,
    onOk() {
      callback(true);
    },
    onCancel() {
      callback(false);
    },
  });
};

export default {
  install: (app) => {
    app.config.globalProperties.$confirm = confirm;
  },
};
