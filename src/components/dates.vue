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
      :title="item.date"
      :value="`¥${parseInt(item.sum)}`"
      value-class="item-value"
      @click="toDetails(item)"
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
      const data = await fetch("/account/getDateList");
      list.value = data?.body?.list;
      finished.value = true;
    };

    const toDetails = (item) => {
      const date = item.date.split('-')
      const lastDay = new Date(date[0], +date[1], 0).getDate()
      router.push(`account-list?startTime=${date[0]}-${date[1]}-01&endTime=$${date[0]}-${date[1]}-${lastDay}`)
    };

    const onClickLeft = () => router.go(-1);

    return {
      list,
      onLoad,
      loading,
      finished,
      toDetails,
      onClickLeft,
    };
  },
};
</script>

<style>
.item-value {
  color: #cc342c;
  height: 40px;
  line-height: 40px;
}
</style>
