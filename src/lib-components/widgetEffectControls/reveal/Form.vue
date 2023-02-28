<template>
  <div>
    <div class="field-wrapper row">
      <label for="origin">Origin</label>
      <select id="origin" @change="(ev) => onChange('origin', ev.target.value)">
        <option value="left" :selected="properties.origin === 'left'">
          left
        </option>
        <option value="right" :selected="properties.origin === 'right'">
          right
        </option>
        <option value="top" :selected="properties.origin === 'top'">top</option>
        <option value="bottom" :selected="properties.origin === 'bottom'">
          bottom
        </option>
      </select>
    </div>
    <div class="field-wrapper">
      <label for="delay">Delay (ms)</label>
      <input
        id="delay"
        type="number"
        :value="properties.delay"
        @change="(ev) => onChange('delay', parseFloat(ev.target.value))"
      />
    </div>
    <div class="field-wrapper">
      <label for="duration">Duration (ms)</label>
      <input
        id="duration"
        type="number"
        :value="properties.duration"
        @change="(ev) => onChange('duration', parseFloat(ev.target.value))"
      />
    </div>
    <div class="field-wrapper">
      <label for="distance">Distance</label>
      <div class="field-row">
        <input
          id="distance"
          type="number"
          :value="properties.distance.replace(/%|px/, '')"
          @change="
            (ev) =>
              onChange(
                'distance',
                ev.target.value + properties.distance.replace(/^\d+/, '')
              )
          "
        />
        <select
          @change="
            (ev) =>
              onChange(
                'distance',
                properties.distance.replace(/%|px/, '') + ev.target.value
              )
          "
        >
          <option value="%" :selected="/%$/.test(properties.distance)">
            %
          </option>
          <option value="px" :selected="/px$/.test(properties.distance)">
            px
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    effect: Object,
    properties: Object,
    widgetItem: Object,
  },
  methods: {
    onChange(key: string, value: string | number) {
      this.$emit('onPropertiesChange', {
        ...this.$props.properties,
        [key]: value,
      });
    },
  },
});
</script>

<style scoped>
.field-wrapper {
  padding: 5px 0 15px 0;
}
.field-wrapper.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.field-wrapper > label {
  display: block;
  margin-bottom: 3px;
  font-size: 9pt;
}
.field-wrapper.row > label {
  margin-right: 5px;
}
.field-wrapper select {
  padding: 5px;
  border-width: 0 0 1px 0;
}
.field-wrapper input {
  padding: 5px;
  border-width: 0 0 1px 0;
}
.field-row {
  display: flex;
  flex-direction: row;
}
.flex-1 {
  flex: 1;
}
</style>
