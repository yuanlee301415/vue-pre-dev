<template>
  <div>
    <button @click="addNode">新增节点</button>
    <button @click="addLeaf">新增叶子节点</button>

    <div style="border: 1px solid gray;margin: 10px 0;padding: 10px;">
      <vue-tree-list
          @click="onClick"
          @change-name="onChangeName"
          @delete-node="onDel"
          @add-node="onAddNode"
          :model="data"
          default-tree-node-name="new node"
          default-leaf-node-name="new leaf"
      >
        <template v-slot:leafNameDisplay="slotProps">
        <span>
          {{ slotProps.model.name }}
        </span>
        </template>
      </vue-tree-list>
    </div>

    <hr>
    <button @click="getNewTree">Submit</button>
    <pre>{{ newTree }}</pre>
  </div>
</template>

<script>
import {VueTreeList, Tree, TreeNode} from 'vue-tree-list'

export default {
  components: {
    VueTreeList
  },
  data() {
    return {
      newTree: {},
      data: new Tree([])
    }
  },
  methods: {
    onDel(node) {
      console.log(node)
      node.remove()
    },

    onChangeName(params) {
      console.log(params)
    },

    onAddNode(params) {
      console.log(params)
    },

    onClick(params) {
      console.log(params)
    },

    addNode() {
      var node = new TreeNode({name: 'new node', isLeaf: false})
      if (!this.data.children) this.data.children = []
      this.data.addChildren(node)
    },

    addLeaf() {
      var node = new TreeNode({name: 'new node', isLeaf: true})
      if (!this.data.children) this.data.children = []
      this.data.addChildren(node)
    },

    getNewTree() {
      var vm = this

      function _dfs(oldNode) {
        var newNode = {}

        for (var k in oldNode) {
          if (k !== 'children' && k !== 'parent') {
            newNode[k] = oldNode[k]
          }
        }

        if (oldNode.children && oldNode.children.length > 0) {
          newNode.children = []
          for (var i = 0, len = oldNode.children.length; i < len; i++) {
            newNode.children.push(_dfs(oldNode.children[i]))
          }
        }
        return newNode
      }

      vm.newTree = _dfs(vm.data)
    }
  }
}
</script>
