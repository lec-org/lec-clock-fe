<template>
  <div class="wrapper">
    <div class="left">
      <div class="left-top">
        <img src="/login/block2.png" alt="lec" />
        <span class="white">
          <i>LEC STUDIO</i>
        </span>
        <span class="blue">
          <i>ALL IN ONE</i>
        </span>
      </div>

      <div class="left-bottom" ref="modelRef"></div>
    </div>

    <div class="right">
      <h1 class="title">乐程聚合平台</h1>
      <img src="/login/block1.png" alt="lec" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import lec3d from '@trickle/lec3d'
import { ref, onMounted } from 'vue'

const modelRef = ref()

onMounted(() => {
  const { scene, camera, mountTo, addControls } = lec3d.init({
    axesHelperConfigs: {
      length: 10000
    }
  })
  camera.position.set(-30, 0, 100)

  const controls = addControls()
  const defaultY = -10

  lec3d.loadGLTF({
    modelPath: 'models/languages/scene.gltf',
    options: {
      scale: 8,
      position: {
        x: -25,
        y: defaultY,
        z: 0
      }
    },
    callback: (_: unknown, model: any) => {
      let deltaValue = 0.001
      const shakingAnimation = () => {
        model.position.y += deltaValue
        model.position.x += deltaValue
        model.rotation.y += 0.1 * deltaValue
        model.rotation.z += 0.1 * deltaValue
        model.rotation.x += 0.2 * deltaValue

        if (
          model.position.y >= defaultY + 0.5 ||
          model.position.y <= defaultY - 0.5
        ) {
          deltaValue = -deltaValue
        }
        requestAnimationFrame(shakingAnimation)
      }
      shakingAnimation()
      scene.add(model)
    }
  })

  mountTo(modelRef.value)
})
</script>

<style lang="scss" scoped>
.wrapper {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  min-width: 1120px;
  z-index: -10;

  .left {
    height: 100vh;
    width: 100vw;
    min-width: 600px;

    &-top {
      z-index: -1;
      font-size: 72px;
      font-weight: 900;

      .white {
        position: absolute;
        top: 32px;
        left: 32px;
        color: #fff;
      }

      .blue {
        position: absolute;
        left: 550px;
        top: 32px;
        color: #336add;
      }
    }

    &-bottom {
      position: absolute;
      left: 0;
      top: 0;
      min-width: 600px;
      width: 90%;
      height: 100vh;
    }
  }

  .right {
    z-index: -2;
    position: absolute;
    right: 0;
    top: 0px;
    img {
      height: 100vh;
      min-height: 900px;
    }
    .title {
      position: absolute;
      top: 48px;
      left: 100px;
      font-size: 72px;
      width: 100%;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
