<template>
  <div class="p-3">
    <div>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h4>Tags</h4>
          <p>It's pretty easy to find a designer willing.</p>
        </div>
      </div>
      <hr class="mt-3" />
    </div>
    <div class="row">
      <div class="col-lg-3 col-md-3 col-sm-12 col-12">
        <b-list-group class="m-4">
          <b-list-group-item
            button
            v-bind:class="{ 'active' : isSelected(0) }"
            v-on:click="selected = 0"
          >All tags</b-list-group-item>
          <b-list-group-item
            button
            v-bind:class="{ 'active' : isSelected(1) }"
            v-on:click="selected = 1"
          >Course tags</b-list-group-item>
          <b-list-group-item
            button
            v-bind:class="{ 'active' : isSelected(2) }"
            v-on:click="selected = 2"
          >Subject tags</b-list-group-item>
          <b-list-group-item
            button
            v-bind:class="{ 'active' : isSelected(3) }"
            v-on:click="selected = 3"
          >Laungage tags</b-list-group-item>
          <b-list-group-item
            button
            v-bind:class="{ 'active' : isSelected(4) }"
            v-on:click="selected = 4"
          >Others tags</b-list-group-item>
        </b-list-group>
      </div>
      <div class="col-lg-9 col-md-8 col-sm-12 col-12">
        <!-- <component class="m-3" v-bind:is="(selected===0)? 'InfoPage': (selected===1)? 'DetailForm': 'ContentForm'"></component> -->
        <div class="m-4" v-if="selected===0 || selected===1">
          <b-card header-tag="header" footer-tag="footer">
            <template v-slot:header>
              <div class="d-flex align-items-center">
                <i class="fa fa-tags handle"></i>
                <span class="text flex-grow-1 m-2">Course Tag</span>
                <i class="fa fa-times close" @click="removeAt(idx)"></i>
              </div>
            </template>
            <TagForm :data="tagList['course']" :category="'course'" />
          </b-card>
        </div>
        <div class="m-4" v-if="selected===0 || selected===2">
          <b-card header-tag="header" footer-tag="footer">
            <template v-slot:header>
              <div class="d-flex align-items-center">
                <i class="fa fa-tags handle"></i>
                <span class="text flex-grow-1 m-2">Subject Tag</span>
                <i class="fa fa-times close" @click="removeAt(idx)"></i>
              </div>
            </template>
            <TagForm :data="tagList['subject']" :category="'subject'" />
          </b-card>
        </div>
        <div class="m-4" v-if="selected===0 || selected===3">
          <b-card header-tag="header" footer-tag="footer">
            <template v-slot:header>
              <div class="d-flex align-items-center">
                <i class="fa fa-tags handle"></i>
                <span class="text flex-grow-1 m-2">Language Tag</span>
                <i class="fa fa-times close" @click="removeAt(idx)"></i>
              </div>
            </template>
            <TagForm :data="tagList['language']" :category="'language'" />
          </b-card>
        </div>
        <div class="m-4" v-if="selected===0 || selected===4">
          <b-card header-tag="header" footer-tag="footer">
            <template v-slot:header>
              <div class="d-flex align-items-center">
                <i class="fa fa-tags handle"></i>
                <span class="text flex-grow-1 m-2">Other Tag</span>
                <i class="fa fa-times close" @click="removeAt(idx)"></i>
              </div>
            </template>
            <TagForm :data="tagList['other']" :category="'other'" />
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TagForm from "../../../components/tag/TagForm";

export default {
  name: "HeroWorld",
  data() {
    return {
      selected: 0
    };
  },
  components: {
    TagForm
  },
  methods: {
    navigateTo(name) {
      this.$router.push({ name: name });
    },
    isSelected(i) {
      return i === this.selected;
    }
  },
  computed: {
    tagList() {
      return this.$store.state.tags;
    }
  },
  created: function() {
    this.$store.dispatch("bindTags");
  }
};
</script>