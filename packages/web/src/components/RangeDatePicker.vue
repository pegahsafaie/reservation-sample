<template>

  <v-row>
    <v-col cols="12" sm="12">
      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        transition="scale-transition"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateRangeText"
            outlined
            required
            readonly
            v-bind="attrs"
            v-on="on"
          >
           <template #label>
              <span class="red--text"><strong v-if="required">* </strong></span>{{label}}
            </template>
          </v-text-field>
        </template>
        <v-date-picker
          v-model="dates"
          no-title
          scrollable
          range
        >
          <v-spacer></v-spacer>
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="emit"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

    </v-col>
  </v-row>    
</template>

<script>
  export default {
    name: 'RangeDatePicker',
    props: {
      label: String,
      outlined: Boolean,
      required: Boolean,
      value: Array,
    },
    data: function() {
      return {
        dates: this.value ? this.value.map(this.parseDate) : [],
        dateRangeText: null,
        menu: false,
      }
    },
    methods: {
      emit() {
        /* defining 'dateRangeText' as computed property makes the user confused,
          because without pressing 'ok' button his value get updated,
          you might suggest removing the ok button but it is not a good idea because the user want be able to change
          the selected dates several times before pressing ok
        */
        this.dateRangeText = this.dates ? this.dates.map(this.formatDate).join('-') : null;
        this.$refs.menu.save(this.dates);
        this.$emit('input', this.dates);
      },
      formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
    }
  }
</script>
