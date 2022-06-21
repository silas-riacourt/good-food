<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      persistent
      width="fit-content"
    >
      <v-card>
        <v-card-title>
          <v-icon left>
            mdi-food
          </v-icon> Mode de commande
        </v-card-title>
        <v-card-text>
          <v-row justify="space-between" no-gutters>
            <v-radio-group v-model="orderType">
              <v-radio
                color="warning"
                label="Sur place"
                value="place"
              >
                <template #label>
                  <div>Sur place <strong><v-icon color="warning" right>mdi-table-chair</v-icon></strong></div>
                </template>
              </v-radio>
              <v-radio
                color="warning"
                label="Click and collect"
                value="clickandcollect"
              >
                <template #label>
                  <div>Click and collect <strong><v-icon color="warning" right>mdi-human-male-board</v-icon></strong></div>
                </template>
              </v-radio>
              <v-radio
                color="warning"
                label="Livraison"
                value="delivery"
              >
                <template #label>
                  <div>Livraison <strong><v-icon color="warning" right>mdi-moped</v-icon></strong></div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-row>
        </v-card-text>
        <v-card-actions class="pb-4">
          <v-spacer />
          <v-btn
            color="warning"

            :disabled="orderType == null || orderType == ''"
            block
            @click="validate()"
          >
            Valider
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'OrderTypeModal',
  props: {

    show: {
      type: Boolean
    }
  },
  data () {
    return {
      orderType: ''
    }
  },
  computed: {

    dialog: {
      get () {
        return this.show
      },
      set (value) {
        if (!value) {
          this.$emit('close')
        }
      }
    }
  },
  methods: {
    validate () {
      this.$emit('close')
      this.$emit('select-type', this.orderType)
      this.$store.commit('cart/setOrderType', this.orderType)
    }
  }

}
</script>
