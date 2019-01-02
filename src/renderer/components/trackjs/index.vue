<template>
  <div class="track-block">
    <div class="demo-frame">
      <div class="demo-container">
        <video id="video" width="600" height="450" preload autoplay loop muted></video>
        <canvas id="canvas" width="600" height="450"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
  require('tracking')
  require('tracking/build/data/face-min')
  require('tracking/build/data/eye-min')
  require('tracking/build/data/mouth-min')
  export default {
    name: 'index',
    mounted () {
      let canvas = document.getElementById('canvas')
      let context = canvas.getContext('2d')
      let tracker = new window.tracking.ObjectTracker(['face', 'eye', 'mouth'])
      tracker.setInitialScale(4)
      tracker.setStepSize(2)
      tracker.setEdgesDensity(0.1)
      window.tracking.track('#video', tracker, { camera: true })
      tracker.on('track', function (event) {
        console.log(event)
        context.clearRect(0, 0, canvas.width, canvas.height)
        event.data.forEach(function (rect) {
          context.strokeStyle = '#a64ceb'
          context.strokeRect(rect.x, rect.y, rect.width, rect.height)
          context.font = '11px Helvetica'
          context.fillStyle = '#fff'
          context.fillText('x: ' + rect.x + 'px', rect.x + rect.width + 5, rect.y + 11)
          context.fillText('y: ' + rect.y + 'px', rect.x + rect.width + 5, rect.y + 22)
        })
      })
    }
  }
</script>

<style lang="scss">
  .track-block {
    .demo-frame {
      .demo-container {
        width: 600px;
        height: 450px;
        margin: 0 auto;
      }
      #video, #canvas {
        position: absolute;
      }
    }
  }
</style>