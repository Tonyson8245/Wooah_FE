<template>
  <GDialog v-model="dialogState" max-width="300" persistent>
    <transition name="fade">
      <div class="wrapper">
        <div class="content text-center">
          <span>{{ dialogComment }}</span>
        </div>

        <div class="actions" v-if="!yesno">
          <button class="btn" @click="$store.commit('alertStore/ChangeState')">
            확인
          </button>
        </div>
        <div v-if="yesno" class="container-fluid row g-0">
          <div class="actions col-6">
            <button
              class="btn"
              @click="$store.commit('alertStore/ChangeResult', true)"
            >
              확인
            </button>
          </div>
          <div
            class="actions col-6 border-start"
            style="background: #e7daff; border-color: #cbc0e0 !important"
          >
            <button
              class="btn"
              @click="$store.commit('alertStore/ChangeResult', false)"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </transition>
  </GDialog>
</template>

<script>
export default {
  name: "AlertDialog",
  props: {
    yesno: Boolean,
  },
  computed: {
    dialogState() {
      return this.$store.state.alertStore.dialogState;
    },
    dialogComment() {
      return this.$store.state.alertStore.dialogComment;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";

.wrapper {
  color: #000;
  font-family: "GoyangIlsan";
  @include mobile-s {
    font-size: 12px;
  }
}
.btn {
  color: #000;
  @include mobile-s {
    font-size: 12px;
  }
}

.content {
  padding: 20px;
}

.title {
  font-size: 30px;
  font-weight: 700;
}

.actions {
  background: $pl-4;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
.actions button {
  width: 100%;
  font-size: 80%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
