export default {
  methods: {
    // area value is changing

    areaIsChanging(newArea, currentRow) {
      this.currentProduct = this.tableDataComputed.find((item) => item.code === currentRow.code)
      // set new area to its object
      if (newArea) {
        newArea = parseFloat(newArea)
        this.currentProduct.packTotalArea = this.truncateToDecimals(newArea, 4)
        // get total item number it may decimal number
        // let totalNumberOfItems = (newArea / this.currentProduct.itemArea).toFixed(4)
        let totalNumberOfItems = this.truncateToDecimals(newArea / this.currentProduct.itemArea, 4)
        // get error rate
        // const errorRate = parseFloat((totalNumberOfItems - parseInt(totalNumberOfItems)).toFixed(4))
        const errorRate = this.truncateToDecimals(parseFloat(totalNumberOfItems - parseInt(totalNumberOfItems)), 4)
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
          this.currentProduct.weight = this.truncateToDecimals(this.currentProduct.item_num * this.currentProduct.one_item_weight, 2)
          this.calcPrice()
          this.calculateTotalPrice()
          this.checkPropotion()
        } else {
        // if wrong are then set to empty field
          if (newArea === 0) {
            this.currentProduct.item_num = 0
            this.currentProduct.pack_num = 0
            this.currentProduct.over_pack_num = 0
            this.currentProduct.sum = 0
            this.calculateTotalPrice()
            this.currentProduct.weight = 0
          } else {
            this.currentProduct.item_num = ''
            this.currentProduct.pack_num = ''
            this.currentProduct.over_pack_num = ''
            this.currentProduct.sum = 0
            this.calculateTotalPrice()
            this.currentProduct.weight = ''
          }
        }
      } else {
        this.currentProduct.packTotalArea = newArea
      }
    },

    item_numIsChanging(newItemNum, currentRow) { // total item num is inserting
      this.currentProduct = this.tableDataComputed.find((item) => item.code === currentRow.code)
      if (newItemNum) {
        this.currentProduct.item_num = parseInt(newItemNum)
        this.currentProduct.packTotalArea = this.truncateToDecimals(parseFloat(this.currentProduct.item_num * this.currentProduct.itemArea), 4)
        this.currentProduct.pack_num = parseInt(this.currentProduct.item_num / this.currentProduct.pack_content_num)
        this.currentProduct.over_pack_num = parseInt(this.currentProduct.item_num % this.currentProduct.pack_content_num)
        this.calcPrice()
        this.currentProduct.weight = (this.currentProduct.item_num * this.currentProduct.one_item_weight).toFixed(2)
        this.checkPropotion()
        this.calculateTotalPrice()
      } else {
        // this.currentProduct.item_num = ''
        this.currentProduct.over_pack_num = ''
        this.currentProduct.item_num = ''
        this.currentProduct.pack_num = ''
        this.currentProduct.packTotalArea = ''
        this.currentProduct.sum = 0
        this.calculateTotalPrice()
        this.currentProduct.weight = ''
      }
    },
    pack_numIsChanging(newPacketNum, currentRow) { // packet_num is inserting
      this.currentProduct = this.tableDataComputed.find((item) => item.code === currentRow.code)
      if (newPacketNum) {
        this.currentProduct.pack_num = parseInt(newPacketNum)
        this.currentProduct.item_num =
          parseInt(this.currentProduct.pack_num * this.currentProduct.pack_content_num +
            this.currentProduct.over_pack_num)
        this.currentProduct.over_pack_num = this.currentProduct.over_pack_num === '' ? 0 : this.currentProduct.over_pack_num
        this.currentProduct.packTotalArea = parseFloat((this.currentProduct.item_num * this.currentProduct.itemArea).toFixed(4))
        this.calcPrice()
        this.currentProduct.weight = (this.currentProduct.item_num * this.currentProduct.one_item_weight).toFixed(2)
        this.checkPropotion()
        this.calculateTotalPrice()
      } else {
        this.currentProduct.pack_num = newPacketNum
        this.currentProduct.item_num = ''
        this.currentProduct.item_num = ''
        this.currentProduct.packTotalArea = ''
        this.currentProduct.sum = 0
        this.calculateTotalPrice()
        this.currentProduct.weight = ''
      }
    },
    over_pack_numIsChanging(newOverPacketNum, currentRow) { // over_packet items num calculation
      this.currentProduct = this.tableDataComputed.find((item) => item.code === currentRow.code)
      if (newOverPacketNum) {
        this.currentProduct.over_pack_num = parseInt(newOverPacketNum) > this.currentProduct.pack_content_num ? this.currentProduct.pack_content_num : parseInt(newOverPacketNum)
        // calc item num
        this.currentProduct.item_num =
          parseInt(this.currentProduct.pack_num * this.currentProduct.pack_content_num +
            this.currentProduct.over_pack_num)
        // calc area
        this.currentProduct.packTotalArea = parseFloat((this.currentProduct.item_num * this.currentProduct.itemArea).toFixed(4))
        this.currentProduct.weight = (this.currentProduct.item_num * this.currentProduct.one_item_weight).toFixed(2)
        this.calcPrice()
        this.checkPropotion()
        this.calculateTotalPrice()
      } else {
        this.currentProduct.over_pack_num = newOverPacketNum
        this.currentProduct.item_num = ''
        this.currentProduct.packTotalArea = ''
        this.currentProduct.sum = 0
        this.calculateTotalPrice()
        this.currentProduct.weight = ''
      }
    },
    basePriceIsChanging(basePrice_changed, currentRow) { // area value is changing
      this.currentProduct = this.tableDataComputed.find((item) => item.code === currentRow.code)
      if (basePrice_changed) {
        this.currentProduct.basePrice_changed = parseFloat(basePrice_changed) // set new area to its object
        this.currentProduct.sum = parseFloat((this.currentProduct.basePrice_changed * this.currentProduct.packTotalArea).toFixed(4))
        this.calculateTotalPrice()
      } else {
        this.currentProduct.basePrice_changed = basePrice_changed
        this.currentProduct.sum = 0
      }
    },

    calculateBasePrices(changedTotalPrice) {
      if (changedTotalPrice) {
        changedTotalPrice = changedTotalPrice === '' ? 0 : parseFloat(changedTotalPrice + '')
        const sumOfAllPrices = this.tableDataComputed.reduce(function(a, b) {
          return a + (b.sum === '' ? 0 : parseFloat(b.sum))
        }, 0)
        const sumPriceProprtions = []
        this.tableDataComputed.forEach(item => {
          sumPriceProprtions.push(
            // parseFloat((item.sum / sumOfAllPrices).toFixed(4))
            item.sum / sumOfAllPrices
          )
        })
        for (let i = 0; i < sumPriceProprtions.length; i++) {
          const currentProduct = this.tableDataComputed[i]
          // currentProduct.sum = this.truncateToDecimals(changedTotalPrice * sumPriceProprtions[i], 4)
          currentProduct.sum = changedTotalPrice * sumPriceProprtions[i]
          if (currentProduct.byItemNum && currentProduct.item_num) {
            // currentProduct.basePrice_changed = parseFloat((currentProduct.sum / currentProduct.item_num).toFixed(4))
            currentProduct.basePrice_changed = currentProduct.sum / currentProduct.item_num
          } else if (!currentProduct.byItemNum && currentProduct.packTotalArea) {
            // currentProduct.basePrice_changed = parseFloat((currentProduct.sum / currentProduct.packTotalArea).toFixed(4))
            currentProduct.basePrice_changed = parseFloat((currentProduct.sum / currentProduct.packTotalArea).toFixed(4))
          } else {
            if (currentProduct.byItemNum !== 0 && currentProduct.packTotalArea !== 0) {
              this.$notify({
                message: 'Number of item is unknown! or Area is unknown!',
                type: 'error',
                duration: 2300
              })
            }
          }
        }
      }
    },

    calcPrice() { // this.currentProduct.sum
      const item_num = this.currentProduct.item_num === '' ? 0 : parseFloat(this.currentProduct.item_num)
      const area = this.currentProduct.packTotalArea === '' ? 0 : parseFloat(this.currentProduct.packTotalArea)
      this.currentProduct.sum = this.currentProduct.basePrice_changed * (this.currentProduct.byItemNum ? item_num : area)
      this.currentProduct.sum_kassa = this.currentProduct.basePrice * (this.currentProduct.byItemNum ? item_num : area)
    },

    calcPriceByItemNumChanged(val, currentRow) {
      this.currentProduct = this.tableDataComputed.find((item) => item.code === currentRow.code)
      this.currentProduct.byItemNum = val
      this.calcPrice()
      this.calculateTotalPrice()
    },
    truncateToDecimals(num, dec = 2) {
      const calcDec = Math.pow(10, dec)
      return Math.trunc(num * calcDec) / calcDec
    },
    calculateTotalPrice() {
      this.$emit('calculateTotalPrice', this.truncateToDecimals(this.tableDataComputed.reduce(function(a, b) {
        return a + (b.sum === '' ? 0 : parseFloat(b.sum))
      }, 0), 4))
    },
    checkPropotion() {
      const totalArea = this.tableDataComputed.reduce(function(a, b) {
        return a + (b.packTotalArea === '' ? 0 : parseFloat(b.packTotalArea))
      }, 0)
      let brokenPropotionObj = {
        name: '',
        bad_percentage: 0.0,
        good_percentage: 0.0
      }
      this.brokenPropotionArr = []
      this.tableDataComputed.forEach(product => {
        brokenPropotionObj.name = product.spec
        brokenPropotionObj.good_percentage = product.propotion
        brokenPropotionObj.bad_percentage = totalArea === 0 ? 0 : this.truncateToDecimals(product.packTotalArea === '' ? 0.0 : parseFloat(product.packTotalArea) / totalArea * 100.0)
        this.brokenPropotionArr.push(brokenPropotionObj)
        brokenPropotionObj = {
          name: '',
          bad_percentage: 0.0,
          good_percentage: 0.0
        }
      })
      const h = this.$createElement
      if (this.currentNotification) {
        this.currentNotification.close()
      }
      this.currentNotification = this.$notify({
        type: 'error',
        title: 'Proportion error',
        dangerouslyUseHTMLString: true,
        message: h('table', { class: 'notificationTable' }, [
          h(
            'tr',
            null,
            [
              h('th', { style: { 'width': '35%' }}, 'Name'),
              h('th', { style: { 'width': '35%' }}, 'Should be'),
              h('th', { style: { 'width': '30%' }}, 'Now')
            ]

          ),
          ...(() => {
            const elems = []
            this.brokenPropotionArr.forEach(elem => {
              elems.push(h(
                'tr',
                null,
                (() => {
                  return [h('td', null, elem.name), h('td', null, elem.good_percentage), h('td', null, elem.bad_percentage)]
                })()
              ))
            })
            return elems
          })()
        ]),
        duration: 0
      })
    }
  }
}
