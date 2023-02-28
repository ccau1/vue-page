<template>
  <div class="wrapper">
    <select @change="setWidthHeight" class="simulation-device-select">
      <option
        :value="'375px_667px'"
        :selected="width === '375px' && height === '667px'"
      >
        iPhone SE
      </option>
      <option
        :value="'414px_896px'"
        :selected="width === '414px' && height === '896px'"
      >
        iPhone XR
      </option>
      <option
        :value="'390px_844px'"
        :selected="width === '390px' && height === '844px'"
      >
        iPhone 12 Pro
      </option>
      <option
        :value="'100%_100%'"
        :selected="width === '100%' && height === '100%'"
      >
        Full
      </option>
    </select>
    <div class="device-wrapper" :style="{ height: deviceStyles.height }">
      <div class="device-background" :style="deviceStyles"></div>
      <div class="device-inner-wrapper" :style="{ width: deviceStyles.width }">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  data() {
    return {
      width: '100%',
      height: '100%',
    };
  },
  computed: {
    deviceStyles() {
      return {
        width: this.$data.width,
        height: this.$data.height,
      };
    },
  },
  methods: {
    setWidthHeight(ev: Event) {
      const [w, h] = (ev.target as HTMLSelectElement).value.split('_');
      this.$data.width = w;
      this.$data.height = h;
    },
  },
});
</script>

<style scoped>
.wrapper {
  height: 100%;
  overflow: hidden;
  background-color: #eaedf5;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.device-wrapper {
  height: 100%;
  width: 100%;
  padding: 30px 30px 30px 30px;
  overflow-y: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.device-inner-wrapper {
  min-height: 100px;
  height: 100%;
  border-radius: 8px;
  position: relative;
}
.device-background {
  background-color: #fff;
  border-radius: 8px;
  margin: -30px auto 0 auto;
  position: absolute;
}
.simulation-device-select {
  padding: 5px 10px;
  border-radius: 4px;
}
</style>
