<template>
    <div>
        <Tree
            :data="tree.data"
            :key="tree.key"
            text-field-name="displayName"
            value-field-name="name"
            collapse
            @item-click="onItemClick"
        />
    </div>
</template>

<script>
import { getCitTreeAPI} from "@/api/tree";
import Tree from '@/components/Tree'

export default {
  name: 'TreeTest',
  components: {
    Tree,
  },
  data() {
    return {
      tree: {
        data: null
      }
    }
  },
  created() {
    this.getCitTree()
  },
  methods: {
    getCitTree() {
      console.time('my-tree')
      getCitTreeAPI().then(res => {
        if (res.code !== 0) return

        this.tree.data = res.data
        this.tree.key = Math.random()
        console.timeEnd('my-tree')
      })
    },
    onItemClick(node, item) {
      console.log('onItemClick>node:', node)
      console.log('onItemClick>item:', item)
    }
  }
}
</script>
