<template>
  <div id="app">
    <infinite-scroll
      @infinite-scroll="loadDataFromServer"
      :message="message"
      :noResult="noResult"
    >
      <div>
        <div
          v-for="repo in trendingRepos"
          :key="repo.id"
          style="margin-bottom: 20px"
        >
          <div>
            <img :src="repo.owner.avatar_url" alt="" style="height: 50px" />
          </div>
          <div>{{ repo.name }}</div>
        </div>
      </div>
    </infinite-scroll>
  </div>
</template>

<script>
import InfiniteScroll from "infinite-loading-vue3";
import axios from "axios";

export default {
  name: "TrendingRepos",

  components: {
    InfiniteScroll,
  },

  data() {
    return {
      trendingRepos: [],
      page: 1,
      noResult: false,
      message: "",
    };
  },

  methods: {
    async loadDataFromServer() {
      try {
        const result = await axios.get(
          `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${this.page}`
        );
        if (result.data.items.length) {
          this.trendingRepos.push(...result.data.items);
          this.page++;
        } else {
          this.noResult = true;
          this.message = "No result found";
        }
      } catch (err) {
        this.noResult = true;
        this.message = "Error loading data";
      }
    },
  },

  mounted() {
    this.loadDataFromServer();
  },
};
</script>
