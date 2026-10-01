// ===== JALDOOT WATER CONDITIONER - Main JavaScript =====

document.addEventListener("DOMContentLoaded", function () {
  // ===== NAVBAR =====
  initNavbar();
  // ===== MOBILE MENU =====
  initMobileMenu();
  // ===== SCROLL ANIMATIONS =====
  initScrollAnimations();
  // ===== BACK TO TOP =====
  initBackToTop();
  // ===== COUNTERS =====
  initCounters();
  // ===== TABS =====
  initTabs();
  // ===== ACCORDIONS =====
  initAccordions();
  // ===== HERO BUBBLES =====
  initHeroBubbles();
  // ===== CONTACT FORM =====
  initContactForm();
  // ===== ACTIVE NAV LINK =====
  setActiveNavLink();
});

// ===== NAVBAR SCROLL EFFECT =====
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
}

// ===== MOBILE MENU =====
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");
  const body = document.body;

  // Pages that inline their own MOBILE MENU block set data-menu-bound first;
  // bail out here so one tap never toggles the panel open and straight back
  // shut again.
  if (!hamburger || !mobileMenu || hamburger.dataset.menuBound) return;
  hamburger.dataset.menuBound = "1";

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");
    mobileMenu.classList.toggle("open");
    body.style.overflow = mobileMenu.classList.contains("open") ? "hidden" : "";
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("open");
      body.style.overflow = "";
    });
  });

  // Close on outside click
  document.addEventListener("click", function (e) {
    if (
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target) &&
      mobileMenu.classList.contains("open")
    ) {
      hamburger.classList.remove("active");
      mobileMenu.classList.remove("open");
      body.style.overflow = "";
    }
  });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const elements = document.querySelectorAll(
    ".fade-in-up, .fade-in-left, .fade-in-right, .scale-in",
  );

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  elements.forEach(function (el) {
    observer.observe(el);
  });
}

// ===== BACK TO TOP =====
function initBackToTop() {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;

  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 500) {
        backToTopBtn.classList.add("visible");
      } else {
        backToTopBtn.classList.remove("visible");
      }
    },
    { passive: true },
  );

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ===== COUNTER ANIMATION =====
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach(function (counter) {
    observer.observe(counter);
  });
}

function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-count"), 10);
  const suffix = element.getAttribute("data-suffix") || "";
  const prefix = element.getAttribute("data-prefix") || "";
  const duration = 2000;
  const start = 0;
  const startTime = performance.now();

  function updateCount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOut * (target - start) + start);

    element.textContent = prefix + current.toLocaleString() + suffix;

    if (progress < 1) {
      requestAnimationFrame(updateCount);
    } else {
      element.textContent = prefix + target.toLocaleString() + suffix;
    }
  }

  requestAnimationFrame(updateCount);
}

// ===== TABS =====
function initTabs() {
  const tabGroups = document.querySelectorAll("[data-tab-group]");

  tabGroups.forEach(function (group) {
    const groupName = group.getAttribute("data-tab-group");
    const buttons = group.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(
      '[data-tab-content="' + groupName + '"]',
    );

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab");

        // Update buttons
        buttons.forEach(function (b) {
          b.classList.remove("active");
        });
        this.classList.add("active");

        // Update content
        contents.forEach(function (content) {
          content.classList.remove("active");
          if (content.getAttribute("data-tab-id") === tabId) {
            content.classList.add("active");
          }
        });
      });
    });
  });
}

// ===== ACCORDIONS =====
function initAccordions() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach(function (header) {
    header.addEventListener("click", function () {
      const item = this.closest(".accordion-item");
      const isOpen = item.classList.contains("open");

      // Close siblings
      const siblings = item.parentElement.querySelectorAll(".accordion-item");
      siblings.forEach(function (sib) {
        sib.classList.remove("open");
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add("open");
      }
    });
  });
}

// ===== HERO BUBBLES =====
function initHeroBubbles() {
  const container = document.getElementById("heroBubbles");
  if (!container) return;

  function createBubble() {
    const bubble = document.createElement("div");
    bubble.classList.add("bubble");

    const size = Math.random() * 30 + 10;
    bubble.style.width = size + "px";
    bubble.style.height = size + "px";
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.animationDuration = Math.random() * 8 + 6 + "s";
    bubble.style.animationDelay = Math.random() * 2 + "s";

    container.appendChild(bubble);

    setTimeout(function () {
      if (bubble.parentNode) {
        bubble.parentNode.removeChild(bubble);
      }
    }, 15000);
  }

  // Create initial bubbles
  for (let i = 0; i < 15; i++) {
    setTimeout(createBubble, i * 400);
  }

  // Continue creating
  setInterval(createBubble, 1500);
}

// ===== CONTACT FORM =====
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const data = {};
    formData.forEach(function (value, key) {
      data[key] = value;
    });

    // Basic validation
    let isValid = true;
    const requiredFields = form.querySelectorAll("[required]");
    requiredFields.forEach(function (field) {
      if (!field.value.trim()) {
        isValid = false;
        field.style.borderColor = "#EF4444";
        setTimeout(function () {
          field.style.borderColor = "";
        }, 3000);
      }
    });

    // Email validation
    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailField.value)) {
        isValid = false;
        emailField.style.borderColor = "#EF4444";
        setTimeout(function () {
          emailField.style.borderColor = "";
        }, 3000);
      }
    }

    if (isValid) {
      // Show success message
      const submitBtn = form.querySelector('[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML =
        '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg><span>Message Sent!</span>';
      submitBtn.style.background = "linear-gradient(135deg, #4DB74A, #3DA83A)";

      setTimeout(function () {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = "";
        form.reset();
      }, 3000);
    }
  });
}

// ===== SET ACTIVE NAV LINK =====
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link");

  navLinks.forEach(function (link) {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.addEventListener("click", function (e) {
  const anchor = e.target.closest('a[href^="#"]');
  if (anchor) {
    e.preventDefault();
    const targetId = anchor.getAttribute("href").substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  }
});
