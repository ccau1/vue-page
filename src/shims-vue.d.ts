declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vue-json-pretty" {
  import { Component } from "vue/types/options";
  const VueJsonPretty: Component;
  export default VueJsonPretty;
}
