<template>
    <svg id="svg" width="800" height="600" viewBox="-100, 0, 2400, 1600">
      <defs>
        <pattern x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse" id="twill" viewBox="0 0 20 20">
          <g>
            <rect x="0" y="0" width="20" height="20" fill="#333" stroke="none" style=""></rect>
            <line x1="0" x2="20" y1="20" y2="0" stroke="#444" style="stroke-width: 1;"></line>
          </g>
        </pattern>
        <pattern x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse" id="tiles" viewBox="0 0 50 50">
          <rect x="0" y="0" width="50" height="50" stroke="#808080" style="stroke-width: 1;" fill="#f5deb3"></rect>
        </pattern>
        <g id="chair">
          <rect x="0" y="0" width="10" height="50" style="stroke-width: 1;" fill="#000000" stroke="#808080"></rect>
          <rect x="15" y="0" width="50" height="50" fill="#000000" stroke="#808080" style="stroke-width: 1;"></rect>
          <rect x="70" y="0" width="10" height="50" fill="#000000" stroke="#808080" style="stroke-width: 1;"></rect>
          <rect x="10" y="50" width="60" height="10" fill="#000000" stroke="#808080" style="stroke-width: 1;"></rect>
        </g>
      </defs>
      <g v-for="(zone, i) in zones" :id="zone.id">
          <path :id="zone.id" :d="d(zone.polygon.points)" :fill="fill(zone.type)" stroke="gray"/>
          <text :x="c(zone.polygon.points).x" :y="c(zone.polygon.points).y" font-size="24" text-anchor="middle">{{zone.name}}</text>
      </g>
      <g v-for="(widget, i) in widgets" :id="'Widget_'+widget.id">
          <use href="#chair" :x="widget.x" :y="widget.y"/>
      </g>
    </svg>
</template>
<script>
const ZoneType = {
  GROUND: 0
}
export default {
  name: 'Map',
  data () {
    return {
      zones: [],
      widgets: [{id: 1, symbol: 'chair', x: 100, y: 500}],
      tags: []
    }
  },
  created () {
    this.fetchZones()
    this.fetchTags()
  },
  methods: {
    fetchZones: function () {
      this.$http.get('/static/zones.json').then(response => {
        this.zones = response.data
      })
    },
    fetchTags: function () {

    },
    fill: function (t) {
      let f = false
      switch (t) {
        case ZoneType.GROUND:
          f = 'green'
          break
        case 1:
          f = 'url(#twill)'
          break
        case 2:
          f = 'url(#tiles)'
          break
        default:
          f = 'white'
      }
      return f
    },
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
      let n = points.length
      let first = points[0]
      let last = points[n - 1]
      if (first.x !== last.x || first.y !== last.y) {
        points.push(first)
      }
      let twiceArea = 0
      let x = 0
      let y = 0
      let p1
      let p2
      let f
      for (let i = 0, j = n - 1; i < n; j = i++) {
        p1 = points[i]
        p2 = points[j]
        f = p1.x * p2.y - p2.x * p1.y
        twiceArea += f
        x += (p1.x + p2.x) * f
        y += (p1.y + p2.y) * f
      }
      f = twiceArea * 3
      return {x: x / f, y: y / f}
    }
  }
}
</script>
