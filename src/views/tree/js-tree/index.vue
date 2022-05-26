<template>
    <div>
        <div style="border: 1px solid #ccc;">
          <VueJsTree
            :data="tree.data"
            :key="tree.key"
            collapse
            text-field-name="displayName"
            value-field-name="name"
          />
        </div>
    </div>
</template>

<script>
import { getCitTreeAPI} from "@/api/tree";
import VueJsTree from 'vue-jstree'

export default {
  name: 'TreeTest',
  components: {
    VueJsTree,
  },
  data() {
    return {
      tree: {
        key: Math.random(),
        data: null
      }
    }
  },
  created() {
    this.getCitTree()
  },
  methods: {
    getCitTree() {
      console.time('js-tree')
      getCitTreeAPI().then(res => {
        console.log(res)
        if (res.code !== 0) return

        this.tree.data = res.data
        this.tree.key = Math.random()
        console.timeEnd('js-tree')
      })
    }
  }
}
</script>
