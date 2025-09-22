(function ($) {
    "use strict";
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    

  fetch("/components/header.html")
  .then(res => res.text())
  .then(html => document.getElementById("header").innerHTML = html);

fetch("/components/footer.html")
  .then(res => res.text())
  .then(html => document.getElementById("footer").innerHTML = html);
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Service carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            }
        }
    });


    // Portfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('active');
        $(this).addClass('active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        loop: true,
    });
    
})(jQuery);


// Función para cargar el HTML de un archivo en un elemento
function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(error => console.error('Error cargando componente:', error));
}
// Ejecutar y parar el video
document.querySelector('.btn-play').addEventListener('click', function () {
    const videoSrc = "https://youtube.com/shorts/d2S4W5m-mnk?feature=share";
    const modalBody = document.querySelector('#videoModal .modal-body iframe');
    modalBody.setAttribute('src', videoSrc);
});

// Limpiar el `src` del iframe al cerrar el modal
$('#videoModal').on('hidden.bs.modal', function () {
    $('#videoModal iframe').attr('src', '');
});

// Al hacer clic en el botón de reproducir
document.querySelector('.btn-play').addEventListener('click', function () {
    const videoSrc = "https://youtube.com/shorts/d2S4W5m-mnk?feature=share";
    const modalBody = document.querySelector('#videoIframe');
    modalBody.setAttribute('src', videoSrc);
});

// Limpiar el src del iframe al cerrar el modal (para detener el video)
document.querySelector('#videoModal').addEventListener('hidden.bs.modal', function () {
    document.querySelector('#videoIframe').setAttribute('src', '');
});


// ---------- LÓGICA DEL CARRITO ----------
document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutBtn = document.getElementById("checkout-btn");

  if (!cartItems || !cartTotal || !checkoutBtn) return; // seguridad por si no estamos en product.html

  let cart = [];

  // Agregar producto al carrito
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = parseInt(btn.dataset.price);

      const existing = cart.find(p => p.id === id);
      if (existing) {
        existing.qty++;
      } else {
        cart.push({ id, name, price, qty: 1 });
      }
      renderCart();
    });
  });

  function renderCart() {
    cartItems.innerHTML = "";
    if (cart.length === 0) {
      cartItems.innerHTML = `<tr><td colspan="5" class="text-muted">El carrito está vacío</td></tr>`;
      cartTotal.textContent = "$0";
      return;
    }

    let total = 0;
    cart.forEach(item => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;

      cartItems.innerHTML += `
        <tr>
          <td>${item.name}</td>
          <td>$${item.price.toLocaleString()}</td>
          <td>
            <input type="number" min="1" value="${item.qty}" 
              class="form-control qty-input" data-id="${item.id}">
          </td>
          <td>$${itemTotal.toLocaleString()}</td>
          <td>
            <button class="btn btn-danger btn-sm remove-btn" data-id="${item.id}">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      `;
    });

    cartTotal.textContent = `$${total.toLocaleString()}`;
    addEvents();
  }

  function addEvents() {
    // actualizar cantidades
    document.querySelectorAll(".qty-input").forEach(input => {
      input.addEventListener("change", e => {
        const id = e.target.dataset.id;
        const item = cart.find(p => p.id === id);
        item.qty = parseInt(e.target.value) || 1;
        renderCart();
      });
    });

    // eliminar producto
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = e.target.dataset.id;
        cart = cart.filter(p => p.id !== id);
        renderCart();
      });
    });
  }

  // Enviar pedido por WhatsApp
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("El carrito está vacío");
      return;
    }

    let message = "🛒 *Pedido desde la tienda STS Innova*:\n\n";
    let total = 0;
    cart.forEach(item => {
      message += `• ${item.name} x${item.qty} = $${(item.price * item.qty).toLocaleString()}\n`;
      total += item.price * item.qty;
    });
    message += `\n*Total:* $${total.toLocaleString()}`;

    const phone = "57 3112138549"; 
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
});

