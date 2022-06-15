<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="fit-content"
    >
      <v-card>
        <v-card-title>Détails commande</v-card-title>
        <v-card-text>
          <v-row justify="center" align="center">
            <v-col class="d-flex justify-center align-center">
              <v-icon>mdi-food</v-icon>
            </v-col>
            <v-col cols="12">
              <h2 class="text-center">
                {{ order.date }}
              </h2>
            </v-col>
            <v-col cols="12">
              <p>{{ order.id }}</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'ProductModal',
  props: {
    order: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean
    }
  },
  data () {
    return {

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

  }

}
</script>
