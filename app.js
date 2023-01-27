const MainMenu = {
  template: `
    <nav><ul>
    <li>Accueil</li><li>Contact</li>
    </ul>
    </nav>
    `,
};
const Posts = {
  template: `<ul>
    <li>Accueil</li><li>Contact</li>
    </ul>`,
};
const MainComponent = {
  data() {
    return {
      user: { id: 1, firstName: "Jacques", lastName: "BSG" },
    };
  },
  components: {
    Posts: Posts,
  },
  template: `
    <main>
      <h1>Vue mainComponent</h1>
      <p>Hello {{user.firstName}} {{user.lastName}}</p>
      <h2>Posts:</h2>
      <posts></posts>
    </main>
    `,
};
const User = {
  props: ["user"],
  template: `<li>{{user.name}}</li>`,
};
const Users = {
  props: ["users", "title"],
  components: { User: User },
  template: `<h2>User list:</h2>
    <h3>{{title}}</h3>
    <ul>
    <li>1 - Nom prenom - mail</li>
    <user v-for="user in users" :key="user.id" :user="user"></user>
    </ul>`,
};
const IncrementButton = {
  template: `<button @click.prevent="$emit("incr')">Increment</button>`,
  methods: {
    increment() {},
  },
};
const Counter = {
  data() {
    return {
      number: 0,
    };
  },
  components: {
    IncrementButton: IncrementButton,
  },
  methods: {
    incr() {
      number++;
    },
  },
  template: `<div>
    <p>Nombre de clicks: {{number}}</p>
    <increment-button @increment="incr">Increment</increment-button>
    </div>`,
};

const One = {
  data() {
    return {
      number: 0,
    };
  },
  template: `<div>Nombre de clics: {{number}}</div>`,
};

const Two = {
  data() {
    return {
      number: 0,
    };
  },
  template: `<div>Nombre de clics: {{number}}</div>`,
};
const Increment = {
  template: `<button @click.preventt="@emit('increment')>Increment</button>`,
};

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
  components: {
    MainMenu: MainMenu,
    MainComponent: MainComponent,
    Users: Users,
    Counter: Counter,
    One: One,
    Two: Two,
    Increment: Increment,
  },
  mounted() {
    console.log("Mounted");
    // convertCurrency();
  },
  methods: {
    async convertCurrency() {
      this.currencyRates = [];
      try {
        const response = await fetch(
          `https://api.frankfurter.app/latest?amount=${this.amount}&from=${this.from}&to=${this.to}`
        );
        const data = await response.json();
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
