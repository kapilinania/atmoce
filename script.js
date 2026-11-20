const kitchenProducts = [
  {
    name: "Infrared-Induction",
    category: "KITCHEN APPLIANCE",
    type: "kitchen",
    description: "Explore convenient cooking with the ATMOCE induction cooktop collection.",
    image: "image/kitchen/Infrared-Induction.png"
  },
  {
    name: "Electric Cooktop",
    category: "KITCHEN APPLIANCE",
    type: "kitchen",
    description: "Discover practical cooking solutions for your modern kitchen.",
    image: "image/kitchen/Electric-Cooktop.png"
  },
  {
    name: "Mixer Grinder",
    category: "KITCHEN APPLIANCE",
    type: "kitchen",
    description: "Explore everyday kitchen convenience with mixer grinders.",
    image: "image/kitchen/Mixer-Grinder.png"
  },
  {
    name: "Blender",
    category: "KITCHEN APPLIANCE",
    type: "kitchen",
    description: "Discover blending solutions for your daily kitchen routine.",
    image: "image/kitchen/Blender.png"
  },
  {
    name: "Toaster",
    category: "KITCHEN APPLIANCE",
    type: "kitchen",
    description: "Make everyday breakfast preparation more convenient.",
    image: "image/kitchen/Toaster.png"
  },
  {
    name: "Air Fryer",
    category: "KITCHEN APPLIANCE",
    type: "kitchen",
    description: "Explore convenient cooking solutions for everyday meals.",
    image: "image/kitchen/Air-Fryer.png"
  },
  {
    name: "Electric Kettle",
    category: "KITCHEN APPLIANCE",
    type: "kitchen",
    description: "A convenient addition to your everyday kitchen.",
    image: "image/kitchen/Electric-Kettle.png"
  }
];

const homeProducts = [
  {
    name: "Air Conditioner",
    category: "HOME APPLIANCE",
    type: "home",
    description: "Explore home comfort solutions from ATMOCE.",
    image: "image/home/Air-Conditioner.png"
  },
  {
    name: "Smart TV",
    category: "HOME APPLIANCE",
    type: "home",
    description: "Discover entertainment solutions for modern living.",
    image: "image/home/Smart-TV.png"
  },
  {
    name: "Room Heater",
    category: "HOME APPLIANCE",
    type: "home",
    description: "Explore everyday comfort solutions for your home.",
    image: "image/home/Heaters.png"
  },
  {
    name: "Geyser",
    category: "HOME APPLIANCE",
    type: "home",
    description: "Discover convenient home appliance solutions.",
    image: "image/home/Geyser.png"
  },
  {
    name: "Refrigerator",
    category: "HOME APPLIANCE",
    type: "home",
    description: "Explore practical appliances for your modern home.",
    image: "image/home/Refrigerator.png"
  },
  {
    name: "Washing Machine",
    category: "HOME APPLIANCE",
    type: "home",
    description: "Discover convenient laundry solutions for everyday life.",
    image: "image/home/Washing-Machine.png"
  },
  {
    name: "Air Cooler",
    category: "HOME APPLIANCE",
    type: "home",
    description: "Explore cooling solutions for your living spaces.",
    image: "image/home/Cooler.png"
  },
  {
    name: "Pedestal Fan",
    category: "HOME APPLIANCE",
    type: "home",
    description: "Explore everyday home comfort appliances.",
    image: "image/home/Pedestal-Fan.png"
  },
  {
    name: "Electric Iron",
    category: "HOME APPLIANCE",
    type: "home",
    description: "Discover useful appliances for your daily routine.",
    image: "image/home/Iron.png"
  },
  {
    name: "Immersion Rod",
    category: "HOME APPLIANCE",
    type: "home",
    description: "Explore practical home appliance solutions.",
    image: "image/home/Immersion-Rod.png"
  },
  {
    name: "Ceiling Fan",
    category: "HOME APPLIANCE",
    type: "home",
    description: "Discover appliances designed for everyday home comfort.",
    image: "image/home/Ceiling-Fan.png"
  }
];

const allProducts = [...kitchenProducts, ...homeProducts];
const DEFAULT_FALLBACK = "image/home/Refrigerator.png";

window.handleProductImgError = function(imgEl) {
  imgEl.onerror = null;
  imgEl.src = DEFAULT_FALLBACK;
};

function formatProductLabel(name) {
  return name.replace(/[↗→›»]+/g, "").replace(/\s+/g, " ").trim();
}

function renderProducts(products, containerId, limit = null) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const listToRender = limit ? products.slice(0, limit) : products;

  container.innerHTML = listToRender.map((product) => {
    const globalIndex = allProducts.indexOf(product);
    const label = formatProductLabel(product.name);
    return `
      <article class="product-card">
        <div class="product-image">
          <img
            src="${product.image}"
            data-orig="${product.image}"
            alt="${label}"
            loading="lazy"
            decoding="async"
            onerror="handleProductImgError(this)"
          >
        </div>
        <div class="product-info">
          <span>${product.category}</span>
          <h3>${label}</h3>
          <p>${product.description}</p>
          <button class="view-product" data-index="${globalIndex}" aria-label="View details for ${label}">
            View Details
          </button>
        </div>
      </article>
    `;
  }).join("");
}

renderProducts(kitchenProducts, "kitchenProducts", 4);
renderProducts(homeProducts, "homeProducts", 4);

const allProductsGrid = document.getElementById("allProductsGrid");
if (allProductsGrid) {
  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get("category") || "all";

  function filterAndRender(category) {
    const filtered = category === "all"
      ? allProducts
      : allProducts.filter(p => p.type === category);

    renderProducts(filtered, "allProductsGrid");

    document.querySelectorAll(".filter-btn").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.filter === category);
    });
  }

  filterAndRender(initialCategory);

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      filterAndRender(btn.dataset.filter);
    });
  });
}

function createMegaLinks(products, containerId, mobileId, categoryParam) {
  const mega = document.getElementById(containerId);
  const mobile = document.getElementById(mobileId);

  const links = products.map(product => {
    const label = formatProductLabel(product.name);
    return `<a href="products.html?category=${categoryParam}">${label}</a>`;
  }).join("");

  if (mega) mega.innerHTML = links;
  if (mobile) mobile.innerHTML = links;
}

createMegaLinks(kitchenProducts, "kitchenMega", "mobileKitchen", "kitchen");
createMegaLinks(homeProducts, "homeMega", "mobileHome", "home");

// Corporate Enquiry Modal Logic
const enquiryModal = document.getElementById("enquiryModal");
const enquiryClose = document.getElementById("enquiryClose");
const corporateForm = document.getElementById("corporateForm");
const enquiryNote = document.getElementById("enquiryNote");

function openEnquiryModal() {
  if (!enquiryModal) return;
  closeModal();
  enquiryModal.classList.add("open");
  enquiryModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeEnquiryModal() {
  if (!enquiryModal) return;
  enquiryModal.classList.remove("open");
  enquiryModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll(".open-enquiry-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    openEnquiryModal();
  });
});

if (enquiryClose) enquiryClose.addEventListener("click", closeEnquiryModal);
if (enquiryModal) {
  enquiryModal.addEventListener("click", (e) => {
    if (e.target === enquiryModal) closeEnquiryModal();
  });
}

if (corporateForm) {
  corporateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(corporateForm);
    const subject = encodeURIComponent(`Corporate Enquiry - ${fd.get("company")} (${fd.get("category")})`);
    const body = encodeURIComponent(
      `Name: ${fd.get("name")}\nCompany: ${fd.get("company")}\nCountry: ${fd.get("country")}\nProduct Category: ${fd.get("category")}\n\nMessage:\n${fd.get("message")}`
    );
    if (enquiryNote) {
      enquiryNote.textContent = "Opening email client with your corporate enquiry...";
    }
    window.location.href = `mailto:atmoce.india@gmail.com?subject=${subject}&body=${body}`;
  });
}

// Product Modal
document.addEventListener("click", event => {
  const button = event.target.closest(".view-product");
  if (!button) return;

  const product = allProducts[Number(button.dataset.index)];
  if (!product) return;

  const label = formatProductLabel(product.name);
  const modalImg = document.getElementById("modalImage");
  modalImg.dataset.retry = "0";
  modalImg.dataset.orig = product.image;
  modalImg.onerror = function () { handleProductImgError(this); };
  modalImg.src = product.image;
  modalImg.alt = label;

  document.getElementById("modalTitle").textContent = label;
  document.getElementById("modalDescription").textContent = product.description;

  const whatsapp = document.getElementById("modalWhatsapp");
  if (whatsapp) {
    whatsapp.href = `https://wa.me/919898123322?text=${encodeURIComponent("Hello ATMOCE Support, I have a question about " + label)}`;
  }

  document.getElementById("productModal").classList.add("open");
  document.body.style.overflow = "hidden";
});

function closeModal() {
  const modal = document.getElementById("productModal");
  if (modal) modal.classList.remove("open");
  document.body.style.overflow = "";
}

const modalClose = document.getElementById("modalClose");
if (modalClose) modalClose.addEventListener("click", closeModal);

const productModal = document.getElementById("productModal");
if (productModal) {
  productModal.addEventListener("click", event => {
    if (event.target.id === "productModal") closeModal();
  });
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
    closeEnquiryModal();
  }
});

// Active Nav Link Switcher
const navLinks = document.querySelectorAll(".desktop-nav .nav-link");
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// Mobile Menu Toggle
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });
}

document.querySelectorAll(".mobile-category").forEach(button => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);
    const isOpen = target.classList.toggle("open");
    button.querySelector("span").textContent = isOpen ? "−" : "+";
  });
});

document.querySelectorAll(".mobile-menu a, .mobile-enquiry-btn").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("active");
  });
});

window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (header) header.classList.toggle("scrolled", window.scrollY > 30);
});

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth Scroll Reveal Animation
(function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".stat-box, .section-heading, .category-card, .highlight-box, .product-card, .about-section, .support-inner"
  );

  if (!targets.length) return;

  targets.forEach((el, idx) => {
    el.classList.add("reveal-up");
    el.style.transitionDelay = `${Math.min((idx % 4) * 70, 210)}ms`;
  });

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
})();

// Inspect, Right-Click & Copy Protection
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});

document.addEventListener("keydown", function (e) {
  const key = e.key.toLowerCase();
  if (e.key === "F12") {
    e.preventDefault();
    return false;
  }
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && (key === "i" || key === "j" || key === "c")) {
    e.preventDefault();
    return false;
  }
  if ((e.ctrlKey || e.metaKey) && (key === "u" || key === "s" || key === "c")) {
    e.preventDefault();
    return false;
  }
});

document.addEventListener("copy", function (e) {
  e.preventDefault();
});

document.addEventListener("cut", function (e) {
  e.preventDefault();
});
// =========================================================
// SMOOTH WELCOME POPUP: 2s START · SHIMMER · 6s SMOOTH EXIT
// =========================================================
(function initWelcomePopup() {
  const welcomePopup = document.getElementById("welcomePopup");
  const welcomeClose = document.getElementById("welcomeClose");
  const welcomePopupLink = document.getElementById("welcomePopupLink");

  if (!welcomePopup) return;

  let autoCloseTimer = null;
  let exitCleanupTimer = null;
  let isClosing = false;

  function openWelcomePopup() {
    isClosing = false;
    welcomePopup.classList.remove("closing");
    // Double requestAnimationFrame ensures silky-smooth CSS transition start
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        welcomePopup.classList.add("open");
        welcomePopup.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      });
    });

    // 6 second baad smooth exit shuru hoga
    autoCloseTimer = setTimeout(() => {
      closeWelcomePopup();
    }, 6000);
  }

  function closeWelcomePopup() {
    if (isClosing || !welcomePopup.classList.contains("open")) return;
    isClosing = true;

    if (autoCloseTimer) {
      clearTimeout(autoCloseTimer);
      autoCloseTimer = null;
    }

    // Pehle smooth exit animation chalegi
    welcomePopup.classList.add("closing");

    exitCleanupTimer = setTimeout(() => {
      welcomePopup.classList.remove("open", "closing");
      welcomePopup.setAttribute("aria-hidden", "true");
      isClosing = false;

      if (!document.querySelector(".product-modal.open, .enquiry-modal.open")) {
        document.body.style.overflow = "";
      }
    }, 500);
  }

  // Page load hone ke 2 second baad smooth entry
  window.addEventListener("load", () => {
    setTimeout(openWelcomePopup, 2000);
  });

  if (welcomeClose) {
    welcomeClose.addEventListener("click", closeWelcomePopup);
  }

  if (welcomePopupLink) {
    welcomePopupLink.addEventListener("click", closeWelcomePopup);
  }

  welcomePopup.addEventListener("click", (e) => {
    if (e.target === welcomePopup) {
      closeWelcomePopup();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && welcomePopup.classList.contains("open")) {
      closeWelcomePopup();
    }
  });
})();

// Progressive entrance animations: elements remain visible if JS observers are unsupported.
(function initShowcaseMotion() {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px 45px 0px' });
  function watch() {
    document.querySelectorAll('.section-heading, .spotlight-card, .category-card, .highlight-box, .product-card, .about-image, .about-content, .feature-content').forEach((el) => {
      if (el.dataset.motionReady) return;
      el.dataset.motionReady = 'true';
      el.classList.add('reveal-on-scroll');
      observer.observe(el);
    });
  }
  watch();
  const grid = document.getElementById('allProductsGrid');
  if (grid) new MutationObserver(watch).observe(grid, { childList: true });
})();

// Premium interaction: pointer-reactive hero, scroll progress, magnetic buttons.
(function () {
 const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 const hero = document.querySelector('.hero-visual');
 if (hero && !reduce && window.matchMedia('(pointer:fine)').matches) {
   let raf = 0;
   hero.addEventListener('pointermove', e => {
     if (raf) cancelAnimationFrame(raf);
     raf = requestAnimationFrame(() => {
       const r=hero.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
       hero.style.setProperty('--mouse-x', `${x*22}px`);
       hero.style.setProperty('--mouse-y', `${y*18}px`);
     });
   });
   hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--mouse-x','0px');hero.style.setProperty('--mouse-y','0px')});
 }
 const bar=document.createElement('div');bar.className='scroll-progress';bar.setAttribute('aria-hidden','true');document.body.appendChild(bar);
 let ticking=false;
 window.addEventListener('scroll',()=>{
  if(ticking)return;ticking=true;
  requestAnimationFrame(()=>{let max=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${max>0?scrollY/max:0})`;ticking=false;});
 },{passive:true});
})();
