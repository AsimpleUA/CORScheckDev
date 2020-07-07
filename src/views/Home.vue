<template>
  <div class="home">
    <query-test></query-test>
    <query-story></query-story>
  </div>
</template>

<script>
import { QueryStory, QueryTest } from "@/components";

export default {
  components: {
    QueryStory, QueryTest
  }
}
</script>
