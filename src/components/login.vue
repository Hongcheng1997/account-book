<template>
  <van-nav-bar title="登陆" />
  <van-notice-bar left-icon="volume-o" text="首次登陆自动注册" />
  <van-form @submit="onSubmit" style="margin-top: 20px">
    <van-cell-group inset>
      <van-field
        v-model="username"
        name="userName"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px">
      <van-button round block type="primary" native-type="submit">
        登陆
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import fetch from "../fetch.js";
import { Toast } from "vant";

export default {
  setup() {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo") || "{}");
    const username = ref(userInfo.userName || "");
    const password = ref(userInfo.password || "");
    const router = useRouter();
    const onSubmit = async (values) => {
      const { userName, password } = values;
      const res = await fetch("/user/login", {
        method: "POST",
        params: {
          userName,
          password,
        },
      });
      if (res.success) {
        router.push("/");
        sessionStorage.setItem(
          "userInfo",
          JSON.stringify({ userName, password })
        );
      } else {
        Toast(res.message);
      }
    };

    return {
      username,
      password,
      onSubmit,
    };
  },
};
</script>
