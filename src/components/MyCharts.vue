<template>
  <main class="dashboard">
    <h2>Gráficos</h2>
    <div>
      <canvas id="vendasMes"></canvas> 
      <nav>
        <button onclick="generatePDF()" style="border-radius: 10px; width: 110px; font-size: 15px" class="col col-sm-2"
                                title="Gerar Relatório">Gerar Relatório</button>
     </nav>
    </div>  
  </main>
</template>

<style scoped>
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

.product {
  display: grid;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
  padding: 30px 0;
}

.product:first-of-type {
  padding-top: 0;
}

.product:last-of-type {
  border: none;
}

.product a {
  text-decoration: underline;
  color: #c2185b;
}

.product .title {
  font-size: 24px;
  color: #c2185b;
  font-weight: 700;
  margin: 7px 0;
}
</style>


<script  src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>
<script>
                                  
                    
                            function generatePDF() {
                                const element2 = document.getElementById('vendasMes')
                                const opt = {
                                    margin:       0.2,
                                    filename:     'Catalogo Nakata.pdf',
                                    image:        { type: 'jpeg', quality: 90},
                                    html2canvas:  { scale: 5 },
                                    jsPDF:        { unit: 'in', format: 'a3', orientation: 'portrait'}
                                }
                                html2pdf()
                                    .from(element)
                                    .set(opt)
                                    .save();
                            }
  </script>
<script>

import Chart from "chart.js/auto";

export default {
  name: "MyCharts",
  data() {
    return {
      idUser: this.$store.state.user.id,
    };
  },
  methods: {},
  created() {
    if (!this.$store.state.login) {
      this.$router.push("/");
    }
  },
  mounted() {
    fetch("http://localhost:2000/chart")
      .then((result) => result.json())
      .then((object) => {
        const body = object.body;
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

        new Chart(document.getElementById("vendasMes"), config);
      });

  },
};
</script>
