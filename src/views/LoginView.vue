<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-10 col-md-6 col-xl-2">
          <form @submit.prevent="postLogin">
            <h2 class="text-center mb-4">使用者登入</h2>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="email"
                v-model.trim="user.username"
              />
              <label for="floatingInput">信箱</label>
            </div>
            <div class="form-floating mb-3">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="password"
                v-model.trim="user.password"
              />
              <label for="floatingPassword">密碼</label>
            </div>
            <button type="submit" class="btn btn-primary w-100">登入</button>
          </form>
        </div>
      </div>
      <p class="mt-5 pt-5 h5 text-center text-secondary">六角學院 2023 Vue 直播班-第三週主線任務</p>
    </div>
  </div>
</template>

<script>
import Swel from 'sweetalert2'
const { VITE_API } = import.meta.env

const swel2 = {
  showConfirmButton: false,
  timer: 1500
}

export default {
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    // 使用者登入
    postLogin() {
      const userVal = Object.values(this.user)
      if (userVal.includes('')) {
        return
      }

      this.$http
        .post(`${VITE_API}v2/admin/signin`, this.user)
        .then((res) => {
          const { token, expired, message } = res.data
          document.cookie = `week2homework=${token}; expires=${new Date(expired)};`
          Swel.fire({
            ...swel2,
            icon: 'success',
            title: message
          })
          this.$router.push('/productList')
        })
        .catch((err) => {
          const { message } = err.response.data
          Swel.fire({
            ...swel2,
            icon: 'error',
            title: message
          })
        })
    }
  }
}
</script>
