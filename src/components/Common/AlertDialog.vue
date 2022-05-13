<template>
  <GDialog v-model="dialogState" max-width="500">
    <div class="wrapper">
      <div class="content">
        <p>{{ dialogComment }}</p>
      </div>

      <div class="actions" v-if="!yesno">
        <button class="btn" @click="$store.commit('alertStore/ChangeState')">
          확인
        </button>
      </div>
      <div v-if="yesno" class="container-fluid row">
        <div class="actions col-6">
          <button class="btn" @click="$store.commit('alertStore/ChangeState')">
            확인
          </button>
        </div>
        <div class="actions col-6">
          <button class="btn" @click="$store.commit('alertStore/ChangeState')">
            취소
          </button>
        </div>
      </div>
    </div>
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
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
