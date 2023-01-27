const Result = {
  template: `<form>
    <input
    </form>`,
};

const options = {
  data() {
    return {
      amount: 1,
      from: "EUR",
      to: "RON",
      currencies: [],
      currencyRates: [],
    };
  },

  //   created= avant que le dom est chargé
  //   mounted = une fois que le dom est chargé = accés au data
  async created() {
    try {
      //   const response = await fetch(
      //     "https://api.frankfurter.app/latest?amount=10&from=GBP&to=USD"
      //   );
      const response = await fetch("https://api.frankfurter.app/currencies");
      const data = await response.json();
      this.currencies = data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
  components: {},
  mounted() {
    console.log("Mounted");
    this.convertCurrency();
  },
  methods: {
    async convertCurrency() {
      this.currencyRates = [];
      console.log(this.to);
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${this.amount}&from=${
            this.from
          }${this.to == "all" ? "" : `&to=${this.to}`}`
        );
        const data = await response.json();
        // this.currencyRates = Object.entries(data);
        this.currencyRates = data;
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    },
    updateAmount(event) {
      this.amount = event.target.value;
    },
    updateFrom(event) {
      this.from = event.target.value;
    },
    updateTo(event) {
      this.to = event.target.value;
    },
  },
};

const app = Vue.createApp(options).mount("#app");
