<template>
    <g>
        <g v-for="(zone, i) in zones" :id="zone.id">
            <path :id="zone.id" :d="d(zone.points)" fill="none" stroke="gray"/>
            <text :x="c(zone.points).x" :y="c(zone.points).y" text-anchor="middle">{{zone.name}}</text>
        </g>
        <g v-for="(tag, i) in tags" :id="'tag_'+tag.id">
            <circle :id="tag.id" :cx="tag.x" :cy="tag.y" r="5" dy="-1em" fill="blue" stroke="none"/>
            <text :x="tag.x" :y="tag.y" dy="-1em" text-anchor="middle">{{tag.name}}</text>
        </g>
    </g>
</template>
<script>
export default {
  name: 'Map',
  props: ['zones'],
  methods: {
    d: function (points) {
      let d = ''
      for (let point of points) {
        d += d === '' ? 'M' : 'L'
        d += point.x + ' ' + point.y
      }
      d += 'Z'
      return d
    },
    c: function (points) {
      let x = points[0].x
      let y = points[0].y
      return {x: x, y: y}
    }
  }
}
</script>
