<template>
  <van-sticky>
    <van-nav-bar
      title="账单"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </van-sticky>
  <van-list
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell
      v-for="(item, key) in list"
      :key="key"
      center
      :title="getTitle(item)"
      :value="`¥${item.account}`"
      :label="formatDate(item.date)"
      value-class="item-value"
    />
  </van-list>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import fetch from "../fetch.js";

export default {
  setup() {
    const list = ref([]);
    const loading = ref(false);
    const finished = ref(false);
    const router = useRouter();

    const onLoad = async () => {
      const data = await fetch("/account/list");
      list.value = data?.body;
      finished.value = true;
    };

    const formatDate = (date) => {
      const currentTime = new Date(date);
      return `${currentTime.getFullYear()}-${
        currentTime.getMonth() + 1
      }-${currentTime.getDate()}`;
    };

    const getTitle = (item) => {
      const remark = item.remark;
      return remark ? `${item.type}(${remark})` : item.type;
    };

    const onClickLeft = () => router.go(-1);

    return {
      list,
      onLoad,
      loading,
      finished,
      onClickLeft,
      formatDate,
      getTitle,
    };
  },
};
</script>

<style>
.item-value {
  color: #cc342c;
}
</style>
