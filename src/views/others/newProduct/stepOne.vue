<template>
  <el-row :gutter="10" class="stepOne">
    <el-col :offset="2" :span="20" class="top-inputs">
      <el-select
        v-model="belongsTo"
        style="width: 49.5%"
        placeholder="Name"
        @change="belongsChanging"
      >
        <el-option
          v-for="(item, index) in others"
          :key="index"
          :label="item.firstName +' ' + item.lastName"
          :value="item._id"
        />
        <el-option
          :value="'addNewItem'"
          style="padding: 0"
        >
          <el-button style="border: 1px solid transparent; width: 100%; margin: 0" icon="el-icon-plus" />
        </el-option>
      </el-select>
      <el-input v-model="name" style="width: 49.5%" placeholder="Name" @change="nameChanging" />
    </el-col>
    <el-col style="margin-top: 20px" :offset="2" :span="20">
      <div class="newType">
        <el-input
          v-model="typeObject.name"
          style="width: 90%"
          placeholder="New type"
          @keyup.native.enter="addNewType()"
        />
        <el-button @click="addNewType()">Add</el-button>
      </div>
    </el-col>
    <el-col style="margin-top: 20px" :offset="2" :span="20">
      <div class="types">
        <el-table
          :empty-text="'Type not inserted'"
          :show-header="false"
          :data="types"
          width="100%"
          border
        >
          <el-table-column type="index" align="center" />
          <el-table-column prop="type_name" label="Name" align="center">
            <template slot-scope="scope">
              <el-input
                v-if="editing.status && scope.row.id === editing.id"
                v-model="editedType"
                @keyup.native.enter="saveEdit(scope.row.type_name)"
              />
              <p v-else>{{ scope.row.type_name }}</p>
            </template>
          </el-table-column>
          <el-table-column width="50">
            <template slot-scope="scope">
              <el-button
                v-if="editing.status && scope.row.id === editing.id"
                type="text"
                icon="el-icon-check"
                @click="saveEdit(scope.row.type_name)"
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
                @click="deleteThis(scope.row.type_name)"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-col>

    <el-dialog
      title="Tips"
      :visible.sync="openNewItemAddDialog"
      width="35%"
    >
      <span>This is a message</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openNewItemAddDialog = false">Cancel</el-button>
        <el-button type="primary" @click="openNewItemAddDialog = false">Confirm</el-button>
      </span>
    </el-dialog>

  </el-row>
</template>

<script>
export default {
  data() {
    return {
      openNewItemAddDialog: false,
      belongsTo: '',
      others: [{
        firstName: 'AAA',
        lastName: 'BBB',
        _id: 0
      }],
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
    belongsChanging(v) {
      if (v === 'addNewItem') {
        this.openNewItemAddDialog = true
        this.belongsTo = ''
      }
    },
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
        this.types.push({ id: 0, type_name: nm })
      } else {
        this.types.push({
          id: this.types[this.types.length - 1].id + 1,
          type_name: nm
        })
      }
      this.typeObject.name = ''
      this.$store.commit('newProduct/SET_TYPES', this.types)
    },
    editThis(row) {
      console.log('row: ', row)
      this.editing.status = true
      this.editing.id = row.id
      this.editedType = row.type_name
    },
    saveEdit(name) {
      this.editing.status = false
      const index = this.types.findIndex(
        (item) => item.type_name.toLowerCase().trim() === name.toLowerCase().trim()
      )
      this.types[index].type_name = this.editedType + ''
      this.editedType = ''
      this.$store.commit('newProduct/SET_TYPES', this.types)
    },
    deleteThis(name) {
      const index = this.types.findIndex(
        (item) => item.type_name.toLowerCase().trim() === name.toLowerCase().trim()
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
  /* background-color: white; */
  overflow-y: auto;
  display: flex;
  flex-flow: column;
}
.newType {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.top-inputs {
  display: flex;
  justify-content: space-between;
}
</style>
