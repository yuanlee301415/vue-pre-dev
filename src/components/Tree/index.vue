<template>
  <div :class="classes" role="tree" onselectstart="return false">
    <ul class="tree-container-ul tree-children" role="group">
      <tree-item v-for="(child, index) in data"
                 :key="index"
                 :data="child"
                 :text-field-name="textFieldName"
                 :value-field-name="valueFieldName"
                 :children-field-name="childrenFieldName"
                 :height="sizeHeight"
                 :parent-item="data"
                 :on-item-click="onItemClick"
                 :on-item-toggle="onItemToggle"
                 :klass="index === data.length-1?'tree-last':''">
        <template slot-scope="_">
          <slot :vm="_.vm" :model="_.model">
            <i class="tree-themeicon" role="presentation" v-if="!_.model.loading"></i>
            <span v-html="_.model[textFieldName]"></span>
          </slot>
        </template>
      </tree-item>
    </ul>
  </div>
</template>
<script>
import TreeItem from './TreeItem.vue'

let ITEM_ID = 0
let ITEM_HEIGHT_SMALL = 18
let ITEM_HEIGHT_DEFAULT = 24
let ITEM_HEIGHT_LARGE = 32

function Model(item, textFieldName, valueFieldName, childrenFieldName, collapse) {
  this.id = item.id || ITEM_ID++
  this[textFieldName] = item[textFieldName] || ''
  this[valueFieldName] = item[valueFieldName] || item[textFieldName]
  this.opened = item.opened || collapse
  this.selected = item.selected || false
  this.disabled = item.disabled || false
  this.loading = item.loading || false
  this[childrenFieldName] = item[childrenFieldName] || []
}

export default {
  name: 'VJstree',
  props: {
    data: {type: Array},
    size: {type: String, validator: value => ['large', 'small'].indexOf(value) > -1},
    collapse: {type: Boolean, default: false},
    textFieldName: {type: String, default: 'text'},
    valueFieldName: {type: String, default: 'value'},
    childrenFieldName: {type: String, default: 'children'},
    loadingText: {type: String, default: 'Loading...'},
    klass: String
  },
  data() {
    return {

    }
  },
  computed: {
    classes() {
      return [
        {'tree': true},
        {'tree-default': !this.size},
        {[`tree-default-${this.size}`]: !!this.size},
        {[this.klass]: !!this.klass}
      ]
    },
    sizeHeight() {
      switch (this.size) {
        case 'large':
          return ITEM_HEIGHT_LARGE
        case 'small':
          return ITEM_HEIGHT_SMALL
        default:
          return ITEM_HEIGHT_DEFAULT
      }
    }
  },
  methods: {
    initializeData(items) {
      // console.log('initializeData>items:', items)
      if (items && items.length > 0) {
        for (let i in items) {
          items[i] = this.initializeDataItem(items[i])
          // console.log('items[i]:', items[i])
          this.initializeData(items[i][this.childrenFieldName])
        }
      }
    },
    initializeDataItem(item) {
      return Object.assign(new Model(item, this.textFieldName, this.valueFieldName, this.childrenFieldName, this.collapse), item)
    },
    handleRecursionNodeChilds(node, func) {
      if (func(node) !== false) {
        if (node.$children && node.$children.length > 0) {
          for (let childNode of node.$children) {
            if (!childNode.disabled) {
              this.handleRecursionNodeChilds(childNode, func)
            }
          }
        }
      }
    },
    onItemClick(oriNode, oriItem, e) {
      this.handleSingleSelectItems(oriNode, oriItem)
      this.$emit('item-click', oriNode, oriItem, e)
    },
    handleSingleSelectItems(oriNode) {
      this.handleRecursionNodeChilds(this, node => {
        if (node.model) node.model.selected = false
      })
      oriNode.model.selected = true
    },
    onItemToggle(oriNode, oriItem, e) {
      this.$emit('item-toggle', oriNode, oriItem, e)
    },
  },
  created() {
    this.initializeData(this.data)
    console.warn('Tree>rerender:', {
      data: this.data,
      time: new Date()
    })
  },
  components: {
    TreeItem
  }
}
</script>
<style scoped>
@import "styles.css";
</style>