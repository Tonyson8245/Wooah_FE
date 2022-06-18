<template>
  <div class="filter__btn">
    <h5 class="filter_title">{{ FilterCategory }}</h5>
    <div :class="FilterSelected[0]" class="row filter__outer">
      <ColorPaltte
        class="col-3"
        v-for="(color, i) in colors"
        :key="color"
        :color="color"
        :tempFilterfull="tempFilterfull"
        :SetFilterColor="SetFilter.color[i]"
        :FilterCategory="FilterCategory"
        @CheckFilter="InsertTempFilter($event)"
      />
    </div>
    <!-- 필터카테고리가 보내지는 이유는 저값이 ""이 될때 초기화 시키기 위해 -->
    <div :class="FilterSelected[1]" class="row filter__outer">
      <ShapePalette
        class="col-3"
        v-for="(shape, i) in shapes"
        :key="shape"
        :shape="shape"
        :tempFilterfull="tempFilterfull"
        :SetFilterShape="SetFilter.shape[i]"
        :FilterCategory="FilterCategory"
        @CheckFilter="InsertTempFilter($event)"
      />
    </div>
    <div
      :class="FilterSelected[2]"
      class="row filter__outer"
      style="padding: 5% 0 10% 0"
    >
      <OptionPalette
        class="col-4"
        v-for="(option, i) in options"
        :key="option"
        :option="option"
        :tempFilterfull="tempFilterfull"
        :SetFilterOption="SetFilter.option[i]"
        :FilterCategory="FilterCategory"
        @CheckFilter="InsertTempFilter($event)"
      />
    </div>
    <div
      :class="FilterSelected[3]"
      class="row filter__outer"
      style="padding: 20% 0 10% 0"
    >
      <HandfootPalette
        class="col-6"
        v-for="(limbs, i) in handfoot"
        :key="limbs"
        :limbs="limbs"
        :SetFilterLimbs="SetFilter.handfoot[i]"
        :FilterCategory="FilterCategory"
        :tempFilter="tempFilter"
        :index="i"
        @CheckFilter="InsertTempFilter($event)"
      />
    </div>
    <button
      class="btn btn-secondary btn-sm filter__outer_button"
      @click="ClickApply"
    >
      확인
    </button>
  </div>
</template>

<script>
import handfoot from "../../assets/dummy/handfoot.js";
import color from "../../assets/dummy/color.js";
import shape from "../../assets/dummy/shape.js";
import option from "../../assets/dummy/option.js";
import ColorPaltte from "./ColorPaleltte.vue";
import ShapePalette from "./ShapePalette.vue";
import OptionPalette from "./OptionPalette.vue";
import HandfootPalette from "./HandfootPalette.vue";

export default {
  name: "FilterView",
  props: {
    FilterCategory: String,
    SetFilter: Object,
  },
  data() {
    return {
      colors: color,
      shapes: shape,
      options: option,
      handfoot: handfoot,
      FilterShowed: "",
      FilterCondition: "",
      FilterSelected: "",
      tempFilterfull: false, // filter가득참 // false 가 안가득찬것
      tempFilter: [], // 임시 필터 컬러/쉐입/옵션 3개 이상 확인하는 부분
      handfoorfilter: [],
    };
  },
  components: {
    ColorPaltte,
    ShapePalette,
    OptionPalette,
    HandfootPalette,
  },
  watch: {
    FilterCategory(state) {
      if (state == "") {
        this.FilterSelected = ["d-none", "d-none", "d-none", "d-none"];
      } else {
        switch (state) {
          case "컬러":
            this.FilterSelected = ["visible", "d-none", "d-none", "d-none"];
            break;
          case "쉐입":
            this.FilterSelected = ["d-none", "visible", "d-none", "d-none"];
            break;
          case "옵션":
            this.FilterSelected = ["d-none", "d-none", "visible", "d-none"];
            break;
          case "손발":
            this.FilterSelected = ["d-none", "d-none", "d-none", "visible"];
            break;
        }
        this.tempFilter = this.UpdateTempFilter(this.SetFilter, state);
      }
      if (this.tempFilter.length >= 3) this.tempFilterfull = true;
      else this.tempFilterfull = false;
    },
  },
  methods: {
    ClickApply() {
      this.$emit("ClickApply", this.tempFilter);
      this.tempFilter = [];
      this.tempFilterfull = false;
    },
    InsertTempFilter(data) {
      let index = this.tempFilter.indexOf(data);

      if (index != "-1") {
        this.tempFilter.splice(index, 1);
        // 안에 이미 동일한 데이터가 있음. 삭제
      } else {
        if (this.FilterCategory == "손발" && this.tempFilter.length >= 1) {
          this.tempFilter[0] = data; // 중복 안되니깐 push가 아니라 바꿔주기만 하면됨
        } else if (this.tempFilter.length >= 3) {
          this.$store.commit("alertStore/ChangeState");
          this.$store.commit(
            "alertStore/ChangeComment",
            "최대 3개까지 설정 가능합니다."
          );
        } else this.tempFilter.push(data);
      }

      if (this.tempFilter.length >= 3) this.tempFilterfull = true;
      else this.tempFilterfull = false;
    }, //tempFilter 에 클릭된 내용 저장해둠
    UpdateTempFilter(SetFilter, category) {
      let arr = [];
      switch (category) {
        case "컬러":
          for (let i in SetFilter.color) {
            if (SetFilter.color[i] == true) arr.push(parseInt(i));
          }
          break;
        case "쉐입":
          for (let i in SetFilter.shape) {
            if (SetFilter.shape[i] == true) arr.push(parseInt(i));
          }
          break;
        case "옵션":
          for (let i in SetFilter.option) {
            if (SetFilter.option[i] == true) arr.push(parseInt(i));
          }
          break;
        case "손발":
          for (let i in SetFilter.handfoot) {
            if (SetFilter.handfoot[i] == true) arr.push(parseInt(i));
          }
          break;
      }
      return arr;
    }, //Tempfilter 업데이트 // 다시 필터창 켜질때
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/style.scss";
.filter__btn {
  background-color: $pl-4;
  width: 350px;
  height: $filter-height-desktop;
  position: relative;
  border-radius: 15px;
  border: $pl-4 solid 0.5px;
  z-index: 4;
  text-align: center;
  padding: 2% 2% 2% 2%;
  flex-wrap: wrap;
  @include tablet {
    width: 350px;
    height: $filter-height-tablet;
  }
  @include mobile-s {
    width: 300px;
    height: $filter-height-mobile;
  }
}
.filter__outer {
  height: 80%;
}

.filter__outer_button {
  width: 95%;
  background: $pl-2;
  border-radius: 15px;
  border: solid 1px $pl-4;

  height: auto;
}
.filter__outer_button:hover,
.filter__outer_button:focus,
.filter__outer_button:active,
.filter__outer_button.active,
.open > .dropdown-toggle.filter__outer_button :hover {
  background: $pl-3;
  border: solid 1px $pl-3;
}
.filter_title {
  font-family: "GoyangIlsan";
  font-weight: bold;
  display: inline-block;
}
</style>
