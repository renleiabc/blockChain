/*
 * @Author: abc
 * @Date: 2021-08-05 17:44:23
 * @LastEditors: abc
 * @LastEditTime: 2021-08-05 17:46:39
 * @Description:
 */
export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          wholeLoading: '',
          msg: '信息',
          centrifuge: null
        };
      }
    });
  }
};
