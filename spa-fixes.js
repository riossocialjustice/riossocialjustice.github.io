(function () {
  "use strict";
  var alts = {
  "1761477623-home-1.jpg": {
    "en": "Columns and coffered ceiling inside a courthouse",
    "es": "Columnas y techo artesonado en el interior de un tribunal"
  },
  "1761477623-home-2.jpg": {
    "en": "Aerial view of rivers branching through a green delta",
    "es": "Vista aérea de ríos que se ramifican en un delta verde"
  },
  "1761477623-home-3.jpg": {
    "en": "A judge's gavel and handcuffs on a wooden table",
    "es": "Un mazo de juez y unas esposas sobre una mesa de madera"
  },
  "1761477623-home-4.jpg": {
    "en": "View over the rooftops of La Paz, Bolivia",
    "es": "Vista sobre los tejados de La Paz, Bolivia"
  },
  "1761477623-home-5.jpg": {
    "en": "Audience members listening at a public event",
    "es": "Asistentes escuchando en un evento público"
  },
  "1763550746-about-2.jpg": {
    "en": "Belén Ríos",
    "es": "Belén Ríos"
  },
  "1763550764-headshot-2.jpg": {
    "en": "Analía Banfi",
    "es": "Analía Banfi"
  },
  "1763550764-headshot-3.jpg": {
    "en": "Claudia Gómez López",
    "es": "Claudia Gómez López"
  },
  "1763550764-headshot-5.jpeg": {
    "en": "Laura Dragnic Tohá",
    "es": "Laura Dragnic Tohá"
  },
  "1763550764-headshot-8.jpg": {
    "en": "Selene Soto Rodríguez",
    "es": "Selene Soto Rodríguez"
  },
  "1763550764-headshot-9-jpg.avif": {
    "en": "Silvia Serrano-Guzmán",
    "es": "Silvia Serrano-Guzmán"
  },
  "1764087557-oac_pic1.jpeg": {
    "en": "Oscar Cabrera",
    "es": "Oscar Cabrera"
  },
  "1764087575-epf_pic.jpeg": {
    "en": "Elisabet Pèriz Fernández",
    "es": "Elisabet Pèriz Fernández"
  },
  "1764087575-paola-duran_picture.jpeg": {
    "en": "Paola Durán Torres",
    "es": "Paola Durán Torres"
  },
  "1775475962-rios-about-hero.jpg": {
    "en": "Speakers at a panel discussion during a conference",
    "es": "Panelistas durante una conferencia"
  },
  "1778494439-ourwork_banner2.jpg": {
    "en": "Statue of Lady Justice holding scales",
    "es": "Estatua de la Justicia sosteniendo una balanza"
  },
  "1778494468-contact_rios1.jpg": {
    "en": "Pedestrians walking along a busy street",
    "es": "Peatones caminando por una calle concurrida"
  },
  "1778494494-ourwork_sex_repro_rights.jpg": {
    "en": "Demonstrators in red robes and white bonnets march past the Legislative Palace in Montevideo",
    "es": "Manifestantes con túnicas rojas y cofias blancas marchan frente al Palacio Legislativo en Montevideo"
  }
};
  var colors = {
  "#0086a4": "#00819E",
  "#b2a351": "#83773A",
  "#f37030": "#CE4C0C"
};
  var colorRe = /#(?:f37030|b2a351|0086a4)\b/gi;

  function lang() {
    var p = window.location.pathname;
    return p === "/es" || p === "/es/" || p.indexOf("/es/") === 0 ? "es" : "en";
  }

  function fileKey(src) {
    if (!src) return null;
    var path = src.split("?")[0];
    return path.slice(path.lastIndexOf("/") + 1);
  }

  function fixAlt(img) {
    // Never touch an existing alt (including alt=""): only fill true gaps.
    if (img.hasAttribute("alt")) return;
    var entry = alts[fileKey(img.getAttribute("src"))];
    if (entry) img.setAttribute("alt", entry[lang()]);
  }

  function fixStyle(el) {
    var s = el.getAttribute("style");
    // Cheap early exit: GSAP rewrites transform styles every animation
    // frame, and none of those contain a hex color.
    if (!s || s.indexOf("#") === -1) return;
    var t = s.replace(colorRe, function (m) {
      return colors[m.toLowerCase()];
    });
    if (t !== s) el.setAttribute("style", t);
  }

  function sweep(root) {
    if (root.tagName === "IMG") fixAlt(root);
    if (root.getAttribute) fixStyle(root);
    if (!root.querySelectorAll) return;
    var imgs = root.querySelectorAll("img:not([alt])");
    for (var i = 0; i < imgs.length; i++) fixAlt(imgs[i]);
    var styled = root.querySelectorAll("[style]");
    for (var j = 0; j < styled.length; j++) fixStyle(styled[j]);
  }

  new MutationObserver(function (muts) {
    for (var i = 0; i < muts.length; i++) {
      var m = muts[i];
      if (m.type === "attributes") {
        if (m.attributeName === "src") fixAlt(m.target);
        else fixStyle(m.target);
      } else {
        for (var j = 0; j < m.addedNodes.length; j++) {
          if (m.addedNodes[j].nodeType === 1) sweep(m.addedNodes[j]);
        }
      }
    }
  }).observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "style"]
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      sweep(document.documentElement);
    });
  } else {
    sweep(document.documentElement);
  }
})();
