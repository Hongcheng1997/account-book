<template>
  <van-nav-bar
    left-text="返回"
    right-text="账单"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
  <h1 style="text-align: center">当月消费: {{ total }}</h1>
  <van-form @submit="onSubmit" style="margintop: 20px">
    <van-cell-group inset>
      <van-field
        v-model="type"
        is-link
        readonly
        name="type"
        label="类型"
        :rules="[{ required: true, message: '请填写类型' }]"
        @click="showPicker = true"
      />
      <van-field
        v-model="account"
        type="number"
        name="account"
        label="金额"
        :rules="[{ required: true, message: '请填写金额' }]"
      />
      <van-field
        v-model="date"
        is-link
        readonly
        name="date"
        label="日期"
        @click="showCalendar = true"
      />
    </van-cell-group>
    <van-calendar v-model:show="showCalendar" @confirm="onDateConfirm" />
    <van-popup v-model:show="showPicker" position="bottom">
      <van-picker
        :columns="columns"
        @confirm="onPickerConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Toast } from "vant";
import fetch from "../fetch.js";

export default {
  setup() {
    const type = ref();
    const account = ref();
    const total = ref(0);
    const date = ref(
      `${new Date().getFullYear()}/${
        new Date().getMonth() + 1
      }/${new Date().getDate()}`
    );
    const showPicker = ref(false);
    const showCalendar = ref(false);
    const columns = ["餐饮", "出行", "购物", "娱乐", "住宿", "其他"];
    const router = useRouter();

    onMounted(async () => {
      const data = await fetch("/account/getTotalAmount", {
        params: {
          startTime: `${new Date().getFullYear()}-${
            new Date().getMonth() + 1
          }-01`,
          endTime: `${new Date().getFullYear()}-${
            new Date().getMonth() + 2
          }-01`,
        },
      });
      total.value = data.body?.total || 0;
    });

    const onSubmit = async (values) => {
      const { type, date, account } = values;
      await fetch("/account/create", {
        method: "POST",
        params: {
          type,
          date,
          account,
        },
      });
      Toast("提交成功");
    };

    const onPickerConfirm = (value) => {
      type.value = value;
      showPicker.value = false;
    };

    const onDateConfirm = (value) => {
      date.value = `${new Date().getFullYear()}/${
        value.getMonth() + 1
      }/${value.getDate()}`;
      showCalendar.value = false;
    };

    const onClickLeft = () => router.push("login");

    const onClickRight = () => router.push("account-list");

    return {
      type,
      account,
      date,
      total,
      showPicker,
      showCalendar,
      columns,
      onSubmit,
      onPickerConfirm,
      onDateConfirm,
      onClickLeft,
      onClickRight,
    };
  },
};
</script>
