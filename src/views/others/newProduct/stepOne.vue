<template>
  <el-row :gutter="10" class="stepOne">
    <el-col :md="{ offset: 6, span: 12 }">
      <el-input v-model="name" placeholder="Name" @change="nameChanging" />
    </el-col>
    <el-col style="margin-top: 20px" :md="{ offset: 6, span: 12 }">
      <div class="newType">
        <el-input
          v-model="typeObject.name"
          style="width: 70%"
          placeholder="New type"
          @keyup.native.enter="addNewType()"
        />
        <el-button @click="addNewType()">Add</el-button>
      </div>
    </el-col>
    <el-col style="margin-top: 20px" :md="{ offset: 6, span: 12 }">
      <div class="types">
        <el-table
          :empty-text="'Type not inserted'"
          :show-header="false"
          :data="types"
          width="100%"
          border
        >
          <el-table-column type="index" align="center" />
          <el-table-column prop="name" label="Name" align="center">
            <template slot-scope="scope">
              <el-input
                v-if="editing.status && scope.row.id === editing.id"
                v-model="editedType"
                @keyup.native.enter="saveEdit(scope.row.name)"
              />
              <p v-else>{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column width="50">
            <template slot-scope="scope">
              <el-button
                v-if="editing.status && scope.row.id === editing.id"
                type="text"
                icon="el-icon-check"
                @click="saveEdit(scope.row.name)"
              />
              <el-button
                v-else
                type="text"
                icon="el-icon-edit"
                @click="editThis(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column width="50" align="center">
            <template slot-scope="scope">
              <el-button
                :style="{ color: editing.status ? 'gray' : 'red' }"
                type="text"
                icon="el-icon-delete"
                :disabled="editing.status"
                @click="deleteThis(scope.row.name)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      types: [],
      editing: {
        status: false,
        id: null
      },
      typeObject: {
        name: ''
      },
      editedType: ''
    }
  },
  methods: {
    reset() {
      this.name = ''
      this.types = []
      this.editing = {
        status: false,
        id: null
      }
      this.typeObject = {
        name: ''
      }
      this.editedType = ''
    },
    nameChanging(e) {
      console.log(e)
      this.$store.commit('newProduct/SET_NAME', e)
    },
    addNewType() {
      const nm = this.typeObject.name + ''
      if (this.types.length === 0) {
        this.types.push({ id: 0, name: nm })
      } else {
        this.types.push({
          id: this.types[this.types.length - 1].id + 1,
          name: nm
        })
      }
      this.typeObject.name = ''
      this.$store.commit('newProduct/SET_TYPES', this.types)
    },
    editThis(row) {
      console.log('row: ', row)
      this.editing.status = true
      this.editing.id = row.id
      this.editedType = row.name
    },
    saveEdit(name) {
      this.editing.status = false
      const index = this.types.findIndex(
        (item) => item.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
      this.types[index].name = this.editedType + ''
      this.editedType = ''
      this.$store.commit('newProduct/SET_TYPES', this.types)
    },
    deleteThis(name) {
      const index = this.types.findIndex(
        (item) => item.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
      this.types.splice(index, 1)
      this.$store.commit('newProduct/SET_TYPES', this.types)
    }
  }
}
</script>

<style>
.stepOne {
  /* border: 1px solid red; */
  height: 100%;
  overflow-y: auto;
}
.newType {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
