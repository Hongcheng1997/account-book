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
      :title="item.type"
      :value="item.account"
      :label="formatDate(item.date)"
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
      list.value = data.body;
      finished.value = true;
    };

    const formatDate = (date) => {
      const currentTime = new Date(date);
      return `${currentTime.getMonth() + 1}/${currentTime.getDate()}`;
    };

    const onClickLeft = () => router.go(-1);

    return {
      list,
      onLoad,
      loading,
      finished,
      onClickLeft,
      formatDate,
    };
  },
};
</script>
