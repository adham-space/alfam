export default {
  methods: {
    // area value is changing
    areaIsChanging(newArea, currentRow) {
      this.currentProduct = this.tableData.find((item) => item.code === currentRow.code)
      // set new area to its object
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
        console.log('total items:', this.currentProduct.item_num, totalNumberOfItems)
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
        this.currentProduct.item_num = ''
        this.currentProduct.pack_num = ''
        this.currentProduct.over_pack_num = ''
        this.currentProduct.sum = 0
        this.calculateTotalPrice()
        this.currentProduct.weight = ''
      }
    },

    item_numIsChanging(newItemNum, currentRow) { // total item num is inserting
      this.currentProduct = this.tableData.find((item) => item.code === currentRow.code)
      console.log('newItemNum:', newItemNum)
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
      this.currentProduct = this.tableData.find((item) => item.code === currentRow.code)
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
      this.currentProduct = this.tableData.find((item) => item.code === currentRow.code)
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
      this.currentProduct = this.tableData.find((item) => item.code === currentRow.code)
      if (basePrice_changed) {
        this.currentProduct.basePrice_changed = parseFloat(basePrice_changed) // set new area to its object
        this.currentProduct.sum = (this.currentProduct.basePrice_changed * this.currentProduct.packTotalArea).toFixed(0)
        this.calculateTotalPrice()
      } else {
        this.currentProduct.sum = 0
      }
    },

    calculateBasePrices(changedTotalPrice) {
      console.log('changed total price:A ', changedTotalPrice)

      if (changedTotalPrice) {
        changedTotalPrice = changedTotalPrice === '' ? 0 : parseFloat(changedTotalPrice + '')

        console.log('changed total price: ', changedTotalPrice)
        const sumOfAllPrices = this.tableData.reduce(function(a, b) {
          return a + (b.sum === '' ? 0 : parseFloat(b.sum))
        }, 0)
        const sumPriceProprtions = []
        this.tableData.forEach(item => {
          sumPriceProprtions.push(
            parseFloat((item.sum / sumOfAllPrices).toFixed(4))
          )
        })
        console.log(sumPriceProprtions)
        for (let i = 0; i < sumPriceProprtions.length; i++) {
          const currentProduct = this.tableData[i]
          currentProduct.sum = this.truncateToDecimals(changedTotalPrice * sumPriceProprtions[i], 4)
          // currentProduct.sum = parseFloat((currentProduct.sum).toFixed(2))
          if (currentProduct.byItemNum && currentProduct.item_num) {
            currentProduct.basePrice_changed = parseFloat((currentProduct.sum / currentProduct.item_num).toFixed(4))

             // error detect and fix
             let getBasePriceError = this.truncateToDecimals(currentProduct.basePrice_changed - parseInt(currentProduct.basePrice_changed), 4)
             // if(getBasePriceError > 0.1 && getBasePriceError < 0.9) {
               
             // } else 
            console.log('-------------a\\/')

             console.log('getBasePriceError:', getBasePriceError)
             if(getBasePriceError <= 0.1000 && getBasePriceError <= 0.5000) {
               console.log('getBasePriceError <= 0.1 && getBasePriceError <= 0.5:', getBasePriceError <= 0.1000 && getBasePriceError <= 0.5000)
               currentProduct.basePrice_changed = Math.floor(currentProduct.basePrice_changed)
             } else if(getBasePriceError > 0.5000 && getBasePriceError > 0.9000) {
               console.log('getBasePriceError < 0.5 && getBasePriceError >= 0.9:', getBasePriceError < 0.5000 && getBasePriceError > 0.9000)
               currentProduct.basePrice_changed = Math.ceil(currentProduct.basePrice_changed)
             }
            console.log('-------------b/\\')
            currentProduct.basePrice_changed = parseFloat((currentProduct.basePrice_changed).toFixed(1))

             // error detect and fix

          // currentProduct.basePrice_changed = parseFloat((currentProduct.basePrice_changed).toFixed(2))
          } else if (!currentProduct.byItemNum && currentProduct.packTotalArea) {
            currentProduct.basePrice_changed = parseFloat((currentProduct.sum / currentProduct.packTotalArea).toFixed(4))
            
            // error detect and fix
            let getBasePriceError = this.truncateToDecimals(currentProduct.basePrice_changed - parseInt(currentProduct.basePrice_changed), 4)
            // if(getBasePriceError > 0.1 && getBasePriceError < 0.9) {
              
            // } else 
            console.log('-------------a\\/')


            console.log('getBasePriceError:', getBasePriceError)
            if(getBasePriceError < 0.1000 && getBasePriceError <= 0.5000) {
              console.log('getBasePriceError <= 0.1 && getBasePriceError <= 0.5:', getBasePriceError <= 0.1 && getBasePriceError <= 0.5)
              currentProduct.basePrice_changed = Math.floor(currentProduct.basePrice_changed)
            } else if(getBasePriceError > 0.500 && getBasePriceError > 0.9000) {
              console.log('getBasePriceError > 0.5 && getBasePriceError >= 0.9:', getBasePriceError > 0.5 && getBasePriceError >= 0.9)
              currentProduct.basePrice_changed = Math.ceil(currentProduct.basePrice_changed)
            }
            console.log('-------------b/\\')
            currentProduct.basePrice_changed = currentProduct.basePrice_changed = parseFloat((currentProduct.basePrice_changed).toFixed(1))

            // error detect and fix

          } else {
            this.$notify({
              message: 'Number of item is unknown! or Area is unknown!',
              type: 'error',
              duration: 2300
            })
          }
        }
      }
    },

    calcPrice() { // this.currentProduct.sum
      const item_num = this.currentProduct.item_num === '' ? 0 : parseFloat(this.currentProduct.item_num)
      const area = this.currentProduct.packTotalArea === '' ? 0 : parseFloat(this.currentProduct.packTotalArea)
      this.currentProduct.sum = this.truncateToDecimals(
        this.currentProduct.basePrice_changed *
            (this.currentProduct.byItemNum ? item_num : area)
        , 2)
    },

    calcPriceByItemNumChanged(val, currentRow) {
      this.currentProduct = this.tableData.find((item) => item.code === currentRow.code)
      this.currentProduct.byItemNum = val
      this.calcPrice()
      this.calculateTotalPrice()
    },
    truncateToDecimals(num, dec = 2) {
      const calcDec = Math.pow(10, dec)
      return Math.trunc(num * calcDec) / calcDec
    },
    calculateTotalPrice() {
      this.$emit('calculateTotalPrice', this.truncateToDecimals(this.tableData.reduce(function(a, b) {
        return a + (b.sum === '' ? 0 : parseFloat(b.sum))
      }, 0), 2))
    },
    checkPropotion() {
      const totalArea = this.tableData.reduce(function(a, b) {
        return a + (b.packTotalArea === '' ? 0 : parseFloat(b.packTotalArea))
      }, 0)
      let brokenPropotionObj = {
        name: '',
        bad_percentage: 0.0,
        good_percentage: 0.0
      }
      this.brokenPropotionArr = []
      this.tableData.forEach(product => {
        brokenPropotionObj.name = product.spec
        brokenPropotionObj.good_percentage = product.propotion
        brokenPropotionObj.bad_percentage = this.truncateToDecimals(product.packTotalArea === '' ? 0.0 : parseFloat(product.packTotalArea) / totalArea * 100.0)
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
