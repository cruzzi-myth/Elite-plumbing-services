(function() {
  'use strict';

  // nav scroll shadow
  var nav = document.getElementById('navbar');
  var lastY = 0;
  window.addEventListener('scroll', function() {
    var y = window.scrollY;
    nav.style.boxShadow = y > 60 ? '0 4px 24px rgba(0,0,0,.14)' : '';
    lastY = y;
  }, { passive: true });

  // hamburger
  var burger = document.getElementById('hamburger');
  var links = document.getElementById('navLinks');
  burger.addEventListener('click', function() {
    var open = links.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('.nav-links a').forEach(function(a) {
    a.addEventListener('click', function() { links.classList.remove('open'); });
  });

  // reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  var io = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  reveals.forEach(function(el) { io.observe(el); });

  // phone formatter
  var phoneInput = document.getElementById('phoneInput');
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      var v = this.value.replace(/\D/g, '').slice(0, 10);
      if (v.length >= 7) v = '(' + v.slice(0,3) + ') ' + v.slice(3,6) + '-' + v.slice(6);
      else if (v.length >= 4) v = '(' + v.slice(0,3) + ') ' + v.slice(3);
      else if (v.length >= 1) v = '(' + v;
      this.value = v;
    });
  }

  // date dropdown — next 30 days, skip Sundays
  var sel = document.getElementById('dateSelect');
  if (sel) {
    var now = new Date();
    var added = 0;
    var i = 1;
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    while (added < 28) {
      var d = new Date(now);
      d.setDate(now.getDate() + i);
      if (d.getDay() !== 0) {
        var opt = document.createElement('option');
        opt.value = d.toISOString().slice(0,10);
        opt.textContent = days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate();
        sel.appendChild(opt);
        added++;
      }
      i++;
    }
  }

  // location search
  var locForm = document.getElementById('locationForm');
  if (locForm) {
    locForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var q = document.getElementById('locationInput').value.trim();
      if (!q) return;
      showNotification('Searching for plumbers near "' + q + '"...');
      setTimeout(function() {
        showNotification('3 licensed pros found near ' + q + ' — scroll down to book!');
      }, 1400);
    });
  }

  // contact form
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      form.style.display = 'none';
      success.style.display = 'block';
      showNotification('Appointment request sent! We\'ll call within 1 hour.');
    });
  }

  // notification
  function showNotification(msg) {
    var n = document.getElementById('notification');
    n.textContent = msg;
    n.classList.add('show');
    clearTimeout(n._t);
    n._t = setTimeout(function() { n.classList.remove('show'); }, 4000);
  }

  // smooth anchor offset for sticky bars
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener('click', function(e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var offset = 120;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // hero card ripple
  document.querySelectorAll('.hcard').forEach(function(card) {
    card.addEventListener('click', function() {
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

})();
