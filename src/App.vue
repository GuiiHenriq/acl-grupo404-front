<template>
  <div id="app">
    <Header />

    <section class="container">
      <transition mode="out-in">
        <router-view />
      </transition>
    </section>

    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  created() {
    if(window.localStorage.user) {
      let dataLocalStorage = localStorage.getItem('user');
      let objData = JSON.parse(dataLocalStorage);

      this.$store.commit("UPDATE_USUARIO", objData);
      this.$store.commit("UPDATE_LOGIN", true);
    }
  }
};
</script>

<style>
/* =========== RESET CSS =========== */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
html, body, div, section, main, aside, header, footer, form, input {
  box-sizing: border-box;
}
button, input[type="submit"] {
  background: none;
  border: 0;
}
a {
  text-decoration: none;
  color: inherit;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
body, input, textarea {
  font-family: 'Roboto', sans-serif;
}

/* =========== STYLE GLOBAL =========== */
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>
