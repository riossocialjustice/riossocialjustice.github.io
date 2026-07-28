(function () {
  "use strict";
  var titles = {
  "/": "Ríos: Strategic Lawyering for Social Justice",
  "/about": "About Us | Ríos",
  "/about/belen-rios": "About Belén Ríos | Ríos",
  "/contact": "Contact Us | Ríos",
  "/es": "Ríos: Innovación Legal para la Justicia Social",
  "/es/about": "Quiénes Somos | Ríos",
  "/es/about/belen-rios": "Sobre Belén Ríos | Ríos",
  "/es/contact": "Contacto | Ríos",
  "/es/team/analia-banfi": "Analía Banfi | Ríos",
  "/es/team/claudia-gomez-lopez": "Claudia Gómez López | Ríos",
  "/es/team/elisabet-periz-fernandez": "Elisabet Pèriz Fernández | Ríos",
  "/es/team/laura-dragnic-toha": "Laura Dragnic Tohá | Ríos",
  "/es/team/oscar-cabrera": "Oscar Cabrera | Ríos",
  "/es/team/paola-duran-torres": "Paola Durán Torres | Ríos",
  "/es/team/selene-soto-rodriguez": "Selene Soto Rodríguez | Ríos",
  "/es/team/silvia-serrano-guzman": "Silvia Serrano-Guzmán | Ríos",
  "/es/work": "Nuestro Trabajo | Ríos",
  "/es/work/litigation-representation": "Litigio e Incidencia Legal | Ríos",
  "/es/work/litigation-representation/amicus-curiae-ante-la-corte-constitucional-dentro-de-la-accion-publica-de-inconst": "Amicus Curiae: Caso Nro. 41-22-IN, Ecuador | Ríos",
  "/es/work/litigation-representation/amicus-curiae-arguicao-de-descumprimento-de-preceito-fundamental-989": "Amicus Curiae: ADPF 989, Brasil | Ríos",
  "/es/work/litigation-representation/case-k-m-v-guatemala": "Caso K.M. vs. Guatemala | Ríos",
  "/es/work/litigation-representation/case-of-diana-aleman": "Caso de Diana Alemán | Ríos",
  "/es/work/litigation-representation/interventions-before-international-bodies": "Intervenciones ante Organismos Internacionales | Ríos",
  "/es/work/regional-initatives": "Iniciativas Regionales | Ríos",
  "/es/work/research-education-events": "Research, Education & Events | Ríos",
  "/es/work/research-education-events/judicial-dialogues-on-health-and-the-law-in-latin-america-and-the-caribbean": "Judicial Dialogues on Health and the Law | Ríos",
  "/es/work/research-education-events/null": "Página No Disponible | Ríos",
  "/es/work/sexual-reproductive-health": "Salud Sexual y Reproductiva | Ríos",
  "/team/analia-banfi": "Analía Banfi | Ríos",
  "/team/claudia-gomez-lopez": "Claudia Gómez López | Ríos",
  "/team/elisabet-periz-fernandez": "Elisabet Pèriz Fernández | Ríos",
  "/team/laura-dragnic-toha": "Laura Dragnic Tohá | Ríos",
  "/team/oscar-cabrera": "Oscar Cabrera | Ríos",
  "/team/paola-duran-torres": "Paola Durán Torres | Ríos",
  "/team/selene-soto-rodriguez": "Selene Soto Rodríguez | Ríos",
  "/team/silvia-serrano-guzman": "Silvia Serrano-Guzmán | Ríos",
  "/work": "Our Work | Ríos",
  "/work/litigation-representation": "Litigation & Legal Advocacy | Ríos",
  "/work/litigation-representation/amicus-curiae-ante-la-corte-constitucional-dentro-de-la-accion-publica-de-inconst": "Amicus Curiae: Case No. 41-22-IN, Ecuador | Ríos",
  "/work/litigation-representation/amicus-curiae-arguicao-de-descumprimento-de-preceito-fundamental-989": "Amicus Curiae: ADPF 989, Brazil | Ríos",
  "/work/litigation-representation/case-k-m-v-guatemala": "Case K.M. v. Guatemala | Ríos",
  "/work/litigation-representation/case-of-diana-aleman": "Case of Diana Aleman | Ríos",
  "/work/litigation-representation/interventions-before-international-bodies": "Interventions Before International Bodies | Ríos",
  "/work/regional-initatives": "Regional Initiatives | Ríos",
  "/work/research-education-events": "Research, Education & Events | Ríos",
  "/work/research-education-events/judicial-dialogues-on-health-and-the-law-in-latin-america-and-the-caribbean": "Judicial Dialogues on Health and the Law | Ríos",
  "/work/research-education-events/null": "Page Not Available | Ríos",
  "/work/sexual-reproductive-health": "Sexual & Reproductive Health | Ríos"
};

  function pathKey(pathname) {
    var path = pathname.replace(/\/+$/, "");
    return path || "/";
  }

  // Record the SSR path without changing its already-correct title.
  var currentPath = pathKey(window.location.pathname);

  function syncTitle() {
    var nextPath = pathKey(window.location.pathname);
    // Also prevents Nuxt's initial same-URL replaceState from touching the title.
    if (nextPath === currentPath) return;
    currentPath = nextPath;
    var nextTitle = titles[nextPath];
    // Unknown routes deliberately retain the current title.
    if (nextTitle !== undefined) document.title = nextTitle;
  }

  ["pushState", "replaceState"].forEach(function (method) {
    var original = window.history[method];
    window.history[method] = function () {
      var result = original.apply(this, arguments);
      syncTitle();
      return result;
    };
  });

  // Handles browser Back and Forward.
  window.addEventListener("popstate", syncTitle);
})();
