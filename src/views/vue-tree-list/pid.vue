<template>
  <div>
    <button @click="addNode">Add Node</button>
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
    <button @click="getNewTree">Get new tree</button>

    <hr>
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
      data: new Tree(setId([
                {
                  "isLeaf": false,
                  "name": "Node 1",
                  "children": [
                    {
                      "isLeaf": false,
                      "name": "Node 1-2",
                      "children": [
                        {
                          "isLeaf": true,
                          "name": "new leaf"
                        },
                        {
                          "isLeaf": false,
                          "name": "new node",
                          "children": [
                            {
                              "isLeaf": false,
                              "name": "new node",
                              "children": [
                                {
                                  "isLeaf": true,
                                  "name": "new leaf"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "isLeaf": false,
                  "name": "Node 2",
                  "children": [
                    {
                      "isLeaf": true,
                      "name": "new leaf"
                    },
                    {
                      "isLeaf": false,
                      "name": "new node"
                    }
                  ]
                },
                {
                  "isLeaf": false,
                  "name": "Node 3",
                  "children": [
                    {
                      "isLeaf": false,
                      "name": "new node",
                      "children": [
                        {
                          "isLeaf": true,
                          "name": "new leaf"
                        }
                      ]
                    }
                  ]
                }
              ]
          )
      )
    }
  },

  created() {
    console.log('tree:', this.data)
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
      console.log('onAddNode:', params)
    },

    onClick(params) {
      console.log(params)
    },

    addNode() {
      var node = new TreeNode({name: 'new node', isLeaf: false})
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

/**
 * 设置节点 `id`
 * fix: Tree 自动生成 `id` 取的是当前时间戳，容易造成重复的 `id` 值
 * @param list
 * @returns {*}
 */
function setId(list) {
  let id = 0

  function _dfs(list) {
    list && list.forEach(_ => {
      if (_.id === void 0) {
        _.id = ++id
      }
      if (_.children) {
        _dfs(_.children)
      }
    })
    return list
  }

  return _dfs(list)
}


</script>
