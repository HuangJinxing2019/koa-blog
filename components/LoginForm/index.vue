<template>
  <div class="cont" :class="{ 's--signup': !isLogin }">
    <div class="form sign-in">
      <login />
    </div>
    <div class="sub-cont">
      <div class="img">
        <div class="img__text m--up">
          <h2>New here?</h2>
          <p>Sign up and discover great amount of new opportunities!</p>
        </div>
        <div class="img__text m--in">
          <h2>One of us?</h2>
          <p>If you already has an account, just sign in. We've missed you!</p>
        </div>
        <div class="img__btn" @click="isLogin = !isLogin">
          <span class="m--up">Sign Up</span>
          <span class="m--in">Sign In</span>
        </div>
      </div>
      <div class="form sign-up">
        <register />
      </div>
    </div>
  </div>
</template>
<script>
import Register from '~/components/LoginForm/Register.vue'

export default {
  name: 'LoginForm',
  components: { Register },
  data() {
    return {
      isLogin: true,
    }
  },
}
</script>
<style lang="scss" scoped>
$contW: 900px;
$imgW: 260px;
$formW: $contW - $imgW;
$switchAT: 1.2s;

$inputW: 260px;
$btnH: 36px;

@mixin signUpActive {
  .cont.s--signup & {
    @content;
  }
}

.cont {
  overflow: hidden;
  position: relative;
  width: $contW;
  height: 550px;
  background: var(--bg-color-card-rgba);
  border-radius: 20px;
}

.form {
  position: relative;
  width: $formW;
  height: 100%;
  transition: all $switchAT ease-in-out;
  padding: 50px 150px 0;
}

.sub-cont {
  overflow: hidden;
  position: absolute;
  left: $formW;
  top: 0;
  width: $contW;
  height: 100%;
  padding-left: $imgW;
  background: var(--bg-color-card);
  transition: all $switchAT ease-in-out;
  @include signUpActive {
    transform: translate3d($formW * -1, 0, 0);
  }
}

button {
  display: block;
  margin: 0 auto;
  width: $inputW;
  height: $btnH;
  border-radius: 30px;
  color: var(--text-color-def);
  font-size: 15px;
  cursor: pointer;
}

.img {
  overflow: hidden;
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  width: $imgW;
  height: 100%;
  padding-top: 360px;

  &:before {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: $contW;
    height: 100%;
    background-image: url(~static/images/loginCardBg.png);
    background-size: cover;
    transition: transform $switchAT ease-in-out;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  @include signUpActive {
    &:before {
      transform: translate3d($formW, 0, 0);
    }
  }

  &__text {
    z-index: 2;
    position: absolute;
    left: 0;
    top: 50px;
    width: 100%;
    padding: 0 20px;
    text-align: center;
    color: var(--text-color-def);
    transition: transform $switchAT ease-in-out;
    h2 {
      margin-bottom: 10px;
      font-weight: normal;
    }

    p {
      font-size: 14px;
      line-height: 1.5;
    }

    &.m--up {
      @include signUpActive {
        transform: translateX($imgW * 2);
      }
    }

    &.m--in {
      transform: translateX($imgW * -2);

      @include signUpActive {
        transform: translateX(0);
      }
    }
  }

  &__btn {
    overflow: hidden;
    z-index: 2;
    position: relative;
    width: 100px;
    height: $btnH;
    margin: 0 auto;
    background: transparent;
    color: var(--text-color-def);
    text-transform: uppercase;
    font-size: 15px;
    cursor: pointer;

    &:after {
      content: '';
      z-index: 2;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border: 2px solid var(--border-color-def);
      border-radius: 30px;
    }

    span {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      transition: transform $switchAT;

      &.m--in {
        transform: translateY($btnH * -2);

        @include signUpActive {
          transform: translateY(0);
        }
      }

      &.m--up {
        @include signUpActive {
          transform: translateY($btnH * 2);
        }
      }
    }
  }
}

.sign-in {
  transition-timing-function: ease-out;
  opacity: 1;
  @include signUpActive {
    transition-timing-function: ease-in-out;
    transition-duration: $switchAT;
    transform: translate3d($formW, 0, 0);
    opacity: 0;
  }
}

.sign-up {
  transform: translate3d($contW * -1, 0, 0);
  opacity: 0;
  @include signUpActive {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}
</style>
