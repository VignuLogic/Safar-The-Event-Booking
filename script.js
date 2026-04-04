/*
╔═══════════════════════════════════════════════════════════════╗
║  script.js — MODULE 4: JavaScript + jQuery                    ║
║                                                               ║
║  Topics covered:                                              ║
║  ✅ Variables (let, const)                                     ║
║  ✅ Data types (string, number, boolean, array, object)        ║
║  ✅ Functions (regular + arrow)                                ║
║  ✅ DOM manipulation (find, change, add elements)              ║
║  ✅ Events (click, submit, scroll)                             ║
║  ✅ Conditionals (if/else)                                     ║
║  ✅ Loops (forEach)                                            ║
║  ✅ Arrays and Objects                                         ║
║  ✅ Form validation                                            ║
║  ✅ jQuery ($ syntax, .on, .click, .addClass, .css, AJAX)     ║
╚═══════════════════════════════════════════════════════════════╝

  HOW JS CONNECTS TO HTML:
  In index.html (at the bottom of <body>):
    <script src="script.js"></script>
  That one line loads this entire file.
*/


/* ═══════════════════════════════════════════════════
  MODULE 4 — DATA: Events Array
  ─────────────────────────────────────────────────
  An ARRAY is an ordered list of items: [ item1, item2 ]
  Each item here is an OBJECT: { key: value, key: value }

  Object = a collection of related data (like one event)
  Array  = a list of multiple objects

  const = variable that cannot be REASSIGNED
  (we never replace eventsData with a new array)
  let   = variable that CAN be reassigned
═══════════════════════════════════════════════════ */
const eventsData = [
  {
    id:       1,
    name:     "Manali Snow Trek",
    location: "Manali, Himachal Pradesh",
    category: "snow",     // STRING data type
    date:     "15 Dec 2025",
    price:    4999,       // NUMBER data type
    seats:    20,
    img:      "https://placehold.co/400x220/0f3460/ffffff?text=Manali"
  },
  {
    id:       2,
    name:     "Kutch Desert Camp",
    location: "Kutch, Gujarat",
    category: "adventure",
    date:     "20 Jan 2026",
    price:    3499,
    seats:    15,
    img:      "https://placehold.co/400x220/993C1D/ffffff?text=Kutch"
  },
  {
    id:       3,
    name:     "Valley of Flowers Trek",
    location: "Uttarakhand",
    category: "nature",
    date:     "10 Jun 2026",
    price:    6999,
    seats:    8,
    img:      "https://placehold.co/400x220/0F6E56/ffffff?text=Valley"
  },
  {
    id:       4,
    name:     "Dalhousie Snow Camp",
    location: "Dalhousie, Himachal Pradesh",
    category: "snow",
    date:     "25 Dec 2025",
    price:    5499,
    seats:    12,
    img:      "https://placehold.co/400x220/1a1a2e/E8593C?text=Dalhousie"
  },
  {
    id:       5,
    name:     "Bangalore City Trek",
    location: "Bangalore, Karnataka",
    category: "adventure",
    date:     "5 Feb 2026",
    price:    1999,
    seats:    30,
    img:      "https://placehold.co/400x220/534AB7/ffffff?text=Bangalore"
  },
  {
    id:       6,
    name:     "Coorg Nature Trail",
    location: "Coorg, Karnataka",
    category: "trekking",
    date:     "15 Mar 2026",
    price:    4299,
    seats:    18,
    img:      "https://placehold.co/400x220/27500A/ffffff?text=Coorg"
  }
];


/* ═══════════════════════════════════════════════════
  FUNCTION: createEventCard
  ─────────────────────────────────────────────────
  A FUNCTION is a reusable block of code.
  We pass in an "event" object, it returns HTML string.

  Template literals (backtick strings) allow:
    `Hello ${variable}` ← embeds variable inside string
    Multi-line strings without \n
═══════════════════════════════════════════════════ */
function createEventCard(event) {
  /*
    ₹${event.price.toLocaleString('en-IN')}
    toLocaleString formats numbers: 4999 → "4,999"
    'en-IN' = Indian number format
  */
  return `
    <div class="col-12 col-md-6 col-lg-4" data-category="${event.category}">
      <article class="event-card">
        <div class="event-img-wrap">
          <img src="${event.img}" alt="${event.name}" class="event-img" />
          <span class="event-badge ${event.category}">${event.category.toUpperCase()}</span>
        </div>
        <div class="event-body">
          <h3 class="event-name">${event.name}</h3>
          <p class="event-location">📍 ${event.location}</p>
          <p class="event-date">📅 ${event.date}</p>
          <div class="event-footer">
            <span class="event-price">₹${event.price.toLocaleString('en-IN')}</span>
            <span class="event-seats">${event.seats} seats left</span>
          </div>
        </div>
      </article>
    </div>
  `;
}


/* ═══════════════════════════════════════════════════
  FUNCTION: renderEvents
  ─────────────────────────────────────────────────
  Puts event cards into the HTML grid.
  Uses DOM manipulation: finding elements and changing innerHTML
═══════════════════════════════════════════════════ */
function renderEvents(events, containerId) {
  /*
    document.getElementById()
    DOM MANIPULATION — JavaScript finds an HTML element by its id
    Returns the element object (or null if not found)
  */
  const container = document.getElementById(containerId);

  // Guard clause: if container doesn't exist, stop
  if (!container) return;

  /*
    .map() — array method
    Loops through each item, transforms it, returns new array
    events.map(event => createEventCard(event))
    → For each event object, call createEventCard, collect results

    .join('') — joins array of strings into one big string
    ['<div>1</div>', '<div>2</div>'] → '<div>1</div><div>2</div>'
  */
  const cardsHTML = events.map(event => createEventCard(event)).join('');

  /*
    innerHTML — sets the HTML content INSIDE an element
    This injects all our card HTML into the grid div
  */
  container.innerHTML = cardsHTML;
}


/* ═══════════════════════════════════════════════════
  TAB SWITCHING SYSTEM
  ─────────────────────────────────────────────────
  When a nav link is clicked:
  1. Remove "active" from all tabs and nav links
  2. Add "active" to clicked link and matching tab
═══════════════════════════════════════════════════ */
function switchTab(tabName) {
  /*
    document.querySelectorAll() — finds ALL elements matching CSS selector
    Returns a NodeList (like an array of elements)

    querySelectorAll('.tab-content') = all elements with class tab-content
    querySelectorAll('.nav-link')    = all nav links
  */
  const allTabs  = document.querySelectorAll('.tab-content');
  const allLinks = document.querySelectorAll('.nav-link');

  /*
    forEach() — loop through each item in the NodeList
    Arrow function: (tab) => { ... }
    Same as: function(tab) { ... }
  */
  allTabs.forEach(tab => {
    /*
      classList — the list of CSS classes on an element
      .remove('active') → removes the "active" class
      This hides all tabs (CSS: .tab-content { display: none })
    */
    tab.classList.remove('active');
  });

  allLinks.forEach(link => {
    link.classList.remove('active');
  });

  /*
    document.getElementById('tab-' + tabName)
    String concatenation: 'tab-' + 'home' = 'tab-home'
    Finds <section id="tab-home">
  */
  const targetTab  = document.getElementById('tab-' + tabName);
  /*
    document.querySelector() — finds FIRST element matching selector
    [data-tab="home"] = element with attribute data-tab="home"
  */
  const targetLink = document.querySelector('[data-tab="' + tabName + '"]');

  /*
    Conditional: if the element exists, add "active" class
    This shows the tab (CSS: .tab-content.active { display: block })
  */
  if (targetTab)  targetTab.classList.add('active');
  if (targetLink) targetLink.classList.add('active');

  // Scroll main content to top when switching tabs
  const mainContent = document.getElementById('main-content');
  if (mainContent) mainContent.scrollTop = 0;
}


/* ═══════════════════════════════════════════════════
  EVENT LISTENERS — Tab Navigation
  ─────────────────────────────────────────────────
  addEventListener('click', handler)
  Runs handler function when the element is clicked
═══════════════════════════════════════════════════ */

/*
  We use EVENT DELEGATION:
  Instead of adding a listener to every single link,
  we listen on the PARENT (document) and check what was clicked.
  More efficient for many elements.
*/
document.addEventListener('click', function(e) {
  /*
    e = the event object (info about the click)
    e.target = the exact element that was clicked

    .closest('[data-tab]') — walks UP the DOM tree
    to find the nearest ancestor with a data-tab attribute
    (works even if user clicks the icon inside the link)
  */
  const tabLink = e.target.closest('[data-tab]');

  if (tabLink) {
    /*
      e.preventDefault() — stops the default browser action
      For <a href="#">, default = jump to top of page
      We prevent that and handle navigation ourselves
    */
    e.preventDefault();

    /*
      .getAttribute('data-tab')
      Reads the value of an HTML attribute
      <a data-tab="explore"> → returns "explore"
    */
    const tabName = tabLink.getAttribute('data-tab');
    switchTab(tabName);

    // Close mobile sidebar if open
    closeMobileSidebar();
  }
});


/* ═══════════════════════════════════════════════════
  MOBILE SIDEBAR — Hamburger Menu
═══════════════════════════════════════════════════ */

/*
  document.getElementById() — finds element by id
  Stores reference in a variable for reuse
*/
const mobileBtn = document.getElementById('mobile-menu-btn');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('overlay');

function openMobileSidebar() {
  sidebar.classList.add('open');   // shows sidebar (CSS: transform: translateX(0))
  overlay.classList.add('show');   // shows dark overlay
}

function closeMobileSidebar() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
}

/*
  Check if element exists before adding listener
  (mobileBtn is null on desktop — display:none doesn't remove from DOM)
*/
if (mobileBtn) {
  mobileBtn.addEventListener('click', function() {
    /*
      BOOLEAN check: sidebar.classList.contains('open')
      contains() returns true or false
      If open → close it. If closed → open it.
    */
    if (sidebar.classList.contains('open')) {
      closeMobileSidebar();
    } else {
      openMobileSidebar();
    }
  });
}

// Close sidebar when overlay is clicked
if (overlay) {
  overlay.addEventListener('click', closeMobileSidebar);
}


/* ═══════════════════════════════════════════════════
  MODULE 4 — jQuery: Image Slider
  ─────────────────────────────────────────────────
  jQuery simplifies DOM manipulation.
  $ is the jQuery function.

  Plain JS:   document.getElementById('slider-track')
  jQuery:     $('#slider-track')

  We use jQuery for the slider because the syllabus
  specifically requires jQuery usage.
═══════════════════════════════════════════════════ */

/*
  $(document).ready(function() { ... })
  "Wait until the page is fully loaded, THEN run this code"
  Older jQuery way (still valid and required for syllabus)

  Modern shorthand: $(function() { ... })
*/
$(document).ready(function() {

  /*
    jQuery variables — convention: start with $
    to remember it's a jQuery object, not a plain element
  */
  var $track    = $('#slider-track');  // the slider container
  var slideW    = 316;  // slide width (300px) + gap (16px)
  var position  = 0;    // current slide position (starts at 0)
  var maxSlides;        // maximum slides that can be shown

  /*
    jQuery .click() — attaches a click event handler
    Equivalent to addEventListener('click', ...) in plain JS
  */
  $('#next-btn').click(function() {
    /*
      .children('.slide').length
      jQuery: count how many .slide elements are inside #slider-track
    */
    var totalSlides  = $track.children('.slide').length;
    var visibleSlides = Math.floor($track.parent().width() / slideW);
    maxSlides = (totalSlides - visibleSlides) * slideW;

    /*
      if/else — runs different code based on a condition
      condition: is current position less than max?
    */
    if (position < maxSlides) {
      position += slideW;  // move right by one slide width
    } else {
      position = 0;        // loop back to start
    }

    /*
      jQuery .css() — changes a CSS property value
      Equivalent to: element.style.transform = '...'
      template literal: `translateX(-${position}px)` = translateX(-316px)
    */
    $track.css('transform', `translateX(-${position}px)`);
  });

  // Previous button
  $('#prev-btn').click(function() {
    if (position > 0) {
      position -= slideW;
    } else {
      // At start → jump to end
      var totalSlides   = $track.children('.slide').length;
      var visibleSlides = Math.floor($track.parent().width() / slideW);
      position = (totalSlides - visibleSlides) * slideW;
    }
    $track.css('transform', `translateX(-${position}px)`);
  });


  /* ═════════════════════════════════════════════
    MODULE 4 — jQuery AJAX (Bonus: simulated)
    ─────────────────────────────────────────────
    AJAX = Asynchronous JavaScript And XML
    Fetches data from a server WITHOUT refreshing the page.

    In a real app this would call your Node.js API:
    $.ajax({ url: 'http://localhost:5000/api/events', ... })

    Here we simulate it with a setTimeout (fake delay).
  ═════════════════════════════════════════════ */

  // Simulate AJAX call to load events
  function loadEventsViaAjax(callback) {
    /*
      $.ajax() — jQuery's AJAX method
      In production this hits your real API.
      We simulate with setTimeout (fake 300ms network delay)
    */
    console.log('[AJAX] Fetching events from API...');  // visible in browser DevTools console

    setTimeout(function() {
      console.log('[AJAX] Events received!');
      /*
        callback = a function passed as argument, called when done
        This is the CALLBACK PATTERN — common in async JavaScript
      */
      callback(eventsData);
    }, 300);
  }

  // Load events into home page preview (first 3)
  loadEventsViaAjax(function(events) {
    // .slice(0, 3) → returns first 3 items of the array
    renderEvents(events.slice(0, 3), 'home-events-grid');

    // Load ALL events into explore tab
    renderEvents(events, 'explore-events-grid');
  });


  /* ═════════════════════════════════════════════
    EXPLORE TAB — Filter Buttons
    ─────────────────────────────────────────────
    When a filter button is clicked, show only cards
    matching that category. Hide the rest.
  ═════════════════════════════════════════════ */
  $(document).on('click', '.filter-btn', function() {
    /*
      $(this) — jQuery wrapper for the clicked element
      .data('filter') reads the data-filter="" attribute
    */
    var filter = $(this).data('filter');

    // Update active button style
    $('.filter-btn').removeClass('active');
    $(this).addClass('active');

    /*
      Filter event cards:
      [data-category] → selects elements with that attribute
      If filter is 'all', show everything.
      Otherwise, check if card's data-category matches filter.
    */
    $('#explore-events-grid').children('[data-category]').each(function() {
      var cardCategory = $(this).data('category');

      if (filter === 'all' || cardCategory === filter) {
        /*
          .show() — sets display: block (makes visible)
          .hide() — sets display: none (hides element)
          jQuery built-in methods for visibility
        */
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

}); // END $(document).ready()


/* ═══════════════════════════════════════════════════
  MODULE 4 — Form Validation
  ─────────────────────────────────────────────────
  Validates the contact form before allowing submission.
  Shows custom error messages instead of browser popups.
═══════════════════════════════════════════════════ */

/*
  Get the form element by its id
*/
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  /*
    'submit' event fires when user clicks submit button
    or presses Enter inside a form field
  */
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault(); // stop the page from refreshing

    // Track if form is valid — starts as true
    let isValid = true;

    /* ── Helper function to show errors ── */
    function showError(fieldId, errorId, message) {
      /*
        Template literal: `#${fieldId}` = '#inp-name'
        querySelector finds element matching CSS selector
      */
      const field = document.querySelector(`#${fieldId}`);
      const error = document.getElementById(errorId);

      if (error) error.textContent = message; // set error text
      if (field)  field.style.borderColor = '#ff6b6b'; // red border
    }

    /* ── Helper function to clear errors ── */
    function clearError(fieldId, errorId) {
      const field = document.querySelector(`#${fieldId}`);
      const error = document.getElementById(errorId);

      if (error) error.textContent = '';       // clear error text
      if (field)  field.style.borderColor = ''; // reset border
    }

    /* ── Validate: Full Name ── */
    /*
      .value — reads what user typed into an input field
      .trim() — removes spaces from start and end
      '   hello   '.trim() = 'hello'
    */
    const name = document.getElementById('inp-name').value.trim();
    clearError('inp-name', 'err-name');

    if (name === '') {
      // String comparison: '' = empty string = no text entered
      showError('inp-name', 'err-name', 'Please enter your full name.');
      isValid = false; // form is now invalid
    } else if (name.length < 3) {
      // .length = number of characters in the string
      showError('inp-name', 'err-name', 'Name must be at least 3 characters.');
      isValid = false;
    }

    /* ── Validate: Email ── */
    const email = document.getElementById('inp-email').value.trim();
    clearError('inp-email', 'err-email');

    if (email === '') {
      showError('inp-email', 'err-email', 'Please enter your email address.');
      isValid = false;
    } else {
      /*
        REGEX (Regular Expression) — a pattern to match text
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        Checks: something @ something . something
        .test(email) → returns true if email matches pattern
      */
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showError('inp-email', 'err-email', 'Please enter a valid email address.');
        isValid = false;
      }
    }

    /* ── Validate: Mobile ── */
    const mobile = document.getElementById('inp-mobile').value.trim();
    clearError('inp-mobile', 'err-mobile');

    if (mobile === '') {
      showError('inp-mobile', 'err-mobile', 'Please enter your mobile number.');
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      /*
        /^[0-9]{10}$/ — regex: exactly 10 digits (0-9)
        ^ = start  $ = end  [0-9] = any digit  {10} = exactly 10
      */
      showError('inp-mobile', 'err-mobile', 'Please enter a valid 10-digit mobile number.');
      isValid = false;
    }

    /* ── Validate: Terms Checkbox ── */
    const terms = document.getElementById('chk-terms');
    clearError('chk-terms', 'err-terms');

    /*
      .checked — boolean property of a checkbox
      true = ticked, false = not ticked
    */
    if (!terms.checked) {
      showError('chk-terms', 'err-terms', 'Please agree to the Terms & Conditions.');
      isValid = false;
    }

    /* ── If all valid, show success ── */
    if (isValid) {
      const successMsg = document.getElementById('success-msg');
      const submitBtn  = document.getElementById('submit-btn');

      // Show success message
      successMsg.classList.remove('d-none');

      // Disable button to prevent double submit
      submitBtn.disabled    = true;
      submitBtn.textContent = 'Sent! ✅';
      submitBtn.style.opacity = '0.6';

      // Reset form after 3 seconds
      /*
        setTimeout(function, delay)
        Runs the function after delay milliseconds
        3000ms = 3 seconds
      */
      setTimeout(function() {
        contactForm.reset(); // clears all form fields
        successMsg.classList.add('d-none'); // hide success message
        submitBtn.disabled    = false;
        submitBtn.textContent = 'Send Message 🚀';
        submitBtn.style.opacity = '1';
      }, 3000);
    }
  });
}


/* ═══════════════════════════════════════════════════
  ACTIVE NAV HIGHLIGHT on page load
  ─────────────────────────────────────────────────
  When page first loads, make "Home" tab active.
  Also render events into the grids.
═══════════════════════════════════════════════════ */
window.addEventListener('load', function() {
  /*
    window.load fires after EVERYTHING is loaded
    (HTML, CSS, images, scripts)
    Vs. DOMContentLoaded which fires after just HTML
  */
  switchTab('home');
  console.log('SAFAR website loaded! 🧭');
});