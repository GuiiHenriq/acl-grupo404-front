<template>
  <div>
    <section class="loading" v-show="showLoad">
      <div class="loader">Loading...</div>
    </section>

    <h2>Gráficos</h2>

    <div class="charts">
      <canvas id="salesMonth"></canvas>

      <div class="button">
        <button @click.prevent="savePDF">GERAR RELATÓRIO</button>
     </div>
    </div>  
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import html2pdf from "html2pdf.js";
import { apiToken } from '@/services.js';

export default {
  name: "MyCharts",
  data() {
    return {
      showLoad: false,
      idUser: this.$store.state.user.id,
      tokenUser: this.$store.state.user.token,
    };
  },
  methods: {
    salesCharts: async function() {
      this.showLoad = true;

      try {
        apiToken.get(`/chart`, this.tokenUser).then((r) => {
          console.log(r.data.body)
          const body = r.data.body;
          const data = {
            labels: body.meses,
            datasets: [
              {
                label: "Venda Mensal",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: body.data,
              },
            ],
          };

          const config = {
            type: "line",
            data,
            options: {},
          };

          new Chart(document.getElementById("salesMonth"), config);
        });
      } catch(error) {
        alert('Falha ao localizar dados...');
      } finally {
        this.showLoad = false;
      }
    },
    savePDF() {
      const element = document.getElementById('salesMonth');

      let opt = {
        margin:       0.5,
        filename:     'Grafico de Vendas - Mes.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      return html2pdf().set(opt).from(element).save();
    }
  },
  created() {
    if (!this.$store.state.login) {
      this.$router.push("/");
    }

    this.salesCharts();
  },
};
</script>
<style scoped>
@import '../assets/styles/loader.scss';

.content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content h2 {
  font-weight: 700;
  color: #c2185b;
  margin-bottom: 30px;
  text-transform: uppercase;
  font-size: 24px;
}

.charts .button button {
  width: 100%;
  margin-top: 20px;
}
</style>