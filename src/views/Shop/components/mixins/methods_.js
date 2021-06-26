export default {
  methods: {
    // area value is changing
    areaIsChanging(newArea, currentRow) {
      this.currentProduct = this.tableData.find((item) => item.code === currentRow.code)
      // set new area to its object
      this.currentProduct.packTotalArea = newArea
      // get total item number it may decimal number
      let totalNumberOfItems = (newArea / this.currentProduct.itemArea).toFixed(4)
      // get error rate
      const errorRate = parseFloat((totalNumberOfItems - parseInt(totalNumberOfItems)).toFixed(4))
      totalNumberOfItems = Math.ceil(totalNumberOfItems)
      // if error is less than or equal to 0.0001 is the right number of item otherwise it is bad area
      if (errorRate <= 0.0001 && !!newArea) {
        // then set total item number also
        this.currentProduct.item_num = totalNumberOfItems
        // then set number of complete packets
        this.currentProduct.pack_num = parseInt(totalNumberOfItems / this.currentProduct.pack_content_num)
        // then set bumber of over full packet numbers
        this.currentProduct.over_pack_num = parseInt(totalNumberOfItems % this.currentProduct.pack_content_num)
        // calculate price of product according to basePrice
        this.currentProduct.sum = parseInt(this.currentProduct.basePrice * newArea)
        // set weight
        this.currentProduct.weight = this.currentProduct.item_num * this.currentProduct.one_item_weight
        this.currentProduct.sum =  (this.currentProduct.basePrice * this.currentProduct.packTotalArea).toFixed(0)
      } else {
        // if wrong are then set to empty field
        this.currentProduct.item_num = ''
        this.currentProduct.pack_num = ''
        this.currentProduct.over_pack_num = ''
        this.currentProduct.sum = ''
        this.currentProduct.weight = ''
      }
    },

    item_numIsChanging(newItemNum, currentRow) { // total item num is inserting
      this.currentProduct = this.tableData.find((item) => item.code === currentRow.code)
      if (newItemNum) {
        this.currentProduct.item_num = parseInt(newItemNum)
        this.areaIsChanging(this.currentProduct.item_num * this.currentProduct.itemArea, this.currentProduct)
        this.currentProduct.sum =  (this.currentProduct.basePrice * this.currentProduct.packTotalArea).toFixed(0)
      } else {
        this.currentProduct.item_num = newItemNum
        this.currentProduct.sum =  ''

      }
    },

    pack_numIsChanging(newPacketNum, currentRow) { // packet_num is inserting
      this.currentProduct = this.tableData.find((item) => item.code === currentRow.code)
      if (newPacketNum) {
        this.currentProduct.pack_num = parseInt(newPacketNum)
        this.currentProduct.item_num =
                    parseInt(this.currentProduct.pack_num * this.currentProduct.pack_content_num +
                    this.currentProduct.over_pack_num)
        console.log(typeof this.currentProduct.item_num)
        this.currentProduct.packTotalArea = parseFloat((this.currentProduct.item_num * this.currentProduct.itemArea).toFixed(4))
        this.currentProduct.sum =  (this.currentProduct.basePrice * this.currentProduct.packTotalArea).toFixed(0)
      } else {
        this.currentProduct.pack_num = newPacketNum
        this.currentProduct.item_num = ''
        this.currentProduct.packTotalArea = ''
        this.currentProduct.sum =  ''
      }
    },
    over_pack_numIsChanging(newOverPacketNum, currentRow) { // over_packet items num calculation
      this.currentProduct = this.tableData.find((item) => item.code === currentRow.code)
      if (newOverPacketNum) {
        this.currentProduct.over_pack_num = parseInt(newOverPacketNum) > this.currentProduct.pack_content_num ? this.currentProduct.pack_content_num : parseInt(newOverPacketNum)
        // calc item num
        this.currentProduct.item_num =
                    parseInt(this.currentProduct.pack_num * this.currentProduct.pack_content_num +
                    this.currentProduct.over_pack_num)
        // calc area
        this.currentProduct.packTotalArea = parseFloat((this.currentProduct.item_num * this.currentProduct.itemArea).toFixed(4))
        this.currentProduct.sum =  (this.currentProduct.basePrice * this.currentProduct.packTotalArea).toFixed(0)

      } else {
        this.currentProduct.over_pack_num = newOverPacketNum
        this.currentProduct.item_num = ''
        this.currentProduct.packTotalArea = ''
        this.currentProduct.sum = ''
      }
    },
    basePriceIsChanging(basePrice, currentRow) { // area value is changing
      this.currentProduct = this.tableData.find((item) => item.code === currentRow.code)
      if(basePrice) {
        this.currentProduct.basePrice = parseFloat(basePrice) // set new area to its object
        this.currentProduct.sum =  (this.currentProduct.basePrice * this.currentProduct.packTotalArea).toFixed(0)
      } else {
        this.currentProduct.sum = 0
      }
    }
  }
}
