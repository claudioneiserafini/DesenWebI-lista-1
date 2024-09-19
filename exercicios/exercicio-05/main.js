document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");

  // Carregar página inicial
  loadPage("home");

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const page = event.target.getAttribute("data-page");
      loadPage(page);
      history.pushState({ page }, null, `#${page}`);
    });
  });

  window.addEventListener("popstate", (event) => {
    const page = event.state ? event.state.page : "home";
    loadPage(page);
  });

  function loadPage(page) {
    if (page === "home") {
      app.innerHTML = `
        <h1>Bem-vindo!</h1>
        <p>Veja mais sobre mim, minhas habilidades e entre em contato.</p>
      `;
    } else if (page === "about") {
      app.innerHTML = `
        <h1>Sobre Mim</h1>
        <p>Sou apaixonado por tecnlogia e tenho um forte interesse em infraestrutura, computação em nuvem e segurança de sistemas. </p>
        <p>Ao longo da minha trajetória, estive envolvido em diversos projetos de pesquisa voltados para a educação, o que me permitiu aprofundar meus conhecimentos e habilidades. </p>
        <p>Estou determinado a seguir uma carreira acadêmica e de ensino, contribuindo para a formação de novas gerações na área de tecnologia.</p>
      `;
    } else if (page === "contact") {
      app.innerHTML = `
        <h1>Contato</h1>
        <form>
          <div>
            <label for="name">Nome:</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div>
            <label for="email">E-mail:</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div>
            <label for="subject">Assunto:</label>
            <input type="text" id="subject" name="subject" required>
          </div>
          <div>
            <label for="message">Mensagem:</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button type="submit"><i class="fas fa-paper-plane"></i> Enviar</button>
        </form>
      `;
    }
  }

   // Alternar tema claro/escuro
   const themeToggle = document.getElementById("theme-toggle");
   themeToggle.addEventListener("click", () => {
     const currentTheme = document.documentElement.getAttribute("data-theme");
     const newTheme = currentTheme === "dark" ? "light" : "dark";
     document.documentElement.setAttribute("data-theme", newTheme);
     localStorage.setItem("theme", newTheme);
   });
 
   // Carregar o tema salvo no localStorage
   const savedTheme = localStorage.getItem("theme") || "light";
   document.documentElement.setAttribute("data-theme", savedTheme);
 });
 