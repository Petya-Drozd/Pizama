
document.addEventListener("DOMContentLoaded", () => {
  let newYear = new Date('May 16 2022 18:27:00');

    let daysVal = document.querySelector('.time-count__days  .time-count__val');
    let hoursVal = document.querySelector('.time-count__hours .time-count__val');
    let minutesVal = document.querySelector('.time-count__minutes .time-count__val');
    let secondsVal = document.querySelector('.time-count__seconds .time-count__val');


    function howLong() {
      let allValues = document.querySelectorAll('.time-count__val');
      let nowDate = new Date();
      let dateUntil = (newYear - nowDate);
	  if (dateUntil < 0) {
		return;
	}


		let days = Math.floor(dateUntil / 1000 / 60 / 60 / 24);
		let hours = Math.floor(dateUntil / 1000 / 60 / 60) % 24;
		let minutes = Math.floor(dateUntil / 1000 / 60) % 60;
		let seconds = Math.floor(dateUntil / 1000) % 60;

    function nolik (block, elem) {
      if (elem < 10) {
        return block.textContent = "0" + elem;
      }else {
        return block.textContent = elem;
      }
    }

    nolik(daysVal, days );
    nolik(hoursVal, hours );
    nolik(minutesVal, minutes );
    nolik(secondsVal, seconds );

  }
  howLong();
  setInterval(howLong, 1000);
});


////////////////////////////////
////////////////////////////////
////////////////////////////////
  let swiper = 0;

let sliderElement = document.querySelector('.slider');
let sliderWrapper = document.querySelector('.slider-wrapper');
let sliderItem = document.querySelectorAll('.products-item');
let swipeHand = document.querySelector('.products__swipe_image');
let sliderNav = document.querySelector('.slider-nav');
function f1() {
  if (window.innerWidth > 524) {
    swiper = null;
    swipeHand.style.display = 'none';
    sliderElement.classList.remove('swiper');
    sliderWrapper.classList.remove('swiper-wrapper');
    sliderWrapper.classList.add('d-flex');
    sliderItem.forEach( item => {
      item.classList.remove('swiper-slide');
      item.classList.add('flex-item');
    });

  } else if (window.innerWidth < 524) {
    swipeHand.style.display = 'flex';
    sliderNav.style.display = 'block';
    sliderElement.classList.add('swiper');
    sliderWrapper.classList.add('swiper-wrapper');
    sliderWrapper.classList.remove('d-flex');
    sliderItem.forEach( item => {
      item.classList.add('swiper-slide');
      item.classList.remove('flex-item');
    });
    swiper = new Swiper('.swiper', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      direction: 'horizontal',
      loop: false,
      slidesPerView: 1,
      spaceBetween:30,
      slidesPerColumn:2,
    });
  }

}
f1();
window.addEventListener('resize', () => {
  f1();

})

///////////////////////////
///////////////////////////
/////////////////////////// modal
///////////////////////////
let modal = document.querySelector('.modal');
let modalBackground = document.querySelector('.modal__background');
let modalClose = document.querySelector('.cart__close');
let iconCart = document.querySelector('.icon-cart');
document.querySelectorAll('.item__button').forEach((item) => {
  item.addEventListener('click', (e) => {
    let target = e.target;
    modal.classList.add('active');
    checkClassActive(modal);
  })
});
iconCart.addEventListener('click', () => {
  modal.classList.add('active');
  checkClassActive(modal);
})
function checkClassActive(element) {
  if (element.classList.contains('active')) {
    document.querySelector('body').style.overflow = 'hidden';
  iconCart.style.display = 'none';
  } else {
    document.querySelector('body').style.overflow = 'auto';
  iconCart.style.display = 'block';
  }
};

modal.addEventListener('click', (e) => {

  let target = e.target;
  if (target == modalBackground || target == modalClose) {
    modal.classList.remove('active');
    checkClassActive(modal);
  }
});
///////////////////////////
///////////////////////////
/////////////////////////// cart
///////////////////////////

const productsBtn = document.querySelectorAll('.item__button');
const cartProductsList = document.querySelector('.cart-products');
const cartQuantity = iconCart.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.cart__price');
let randomId = 0;
let price = 0;


const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};

const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};

const printQuantity = () => {
	let productsListLength = cartProductsList.children.length;
	cartQuantity.textContent = productsListLength;
	productsListLength > 0 ? iconCart.children[0].classList.add('active') : iconCart.children[0].classList.remove('active');
};

const printFullPrice = () => {
	fullPrice.textContent = `Suma: ${normalPrice(price)} ZL`;
};

const generateCartProduct = (img, title, price, id) => {
	return `
  <li class="cart-products__item" data-id="${id}">
    <div class="cart-products__image">
      <img src="${img}" alt="Zdiecie towaru">
    </div>
    <div class="cart-products__info info-cart">
      <p class="info-cart__title">${title}</p>
      <p class="info-cart__choice">Wybierz Rozmiar</p>
      <select class="info-cart__size">
        <option>S</option>
        <option>M</option>
        <option>L</option>
      </select>
    </div>
    <div class="cart-products__count products-count">
      <p class="products-count__title">Ilość</p>
      <div class="products-count__wrap">
        <div class="products-count__plus">+</div>
        <p class="products-count__number">1</p>
        <div class="products-count__minus">-</div>
      </div>
    </div>
    <div class="cart-products__wrap_price">
      <div class="cart-products__price_title">Cena</div>
      <div class="cart-products__price">${price}</div>
    </div>
    <div class="cart-products__delete">
      <button class="delete" href="#">x</button>
    </div>
  </li>
	`;
};

const deleteProducts = (productParent) => {
	let id = productParent.dataset.id;
	document.querySelector(`.item[data-id="${id}"]`).querySelector('.item__button').disabled = false;
	document.querySelector(`.item[data-id="${id}"]`).querySelector('.item__button').textContent = 'Zamowic';

	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-products__price').textContent));
	minusFullPrice(currentPrice);
	printFullPrice();
	productParent.remove();

	printQuantity();
  updateStorage();
  if (cartProductsList.children.length == 0) {
    modal.classList.remove('active');
    checkClassActive(modal);
  }
  isProducts();
};
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
////////////////////////////////////
const countSumm = () => {
  document.querySelectorAll('.cart-products__item').forEach((item) => {
    price += parseInt(priceWithoutSpaces(item.querySelector('.cart-products__price').textContent));

  });

}



productsBtn.forEach(el => {
	el.closest('.item').setAttribute('data-id', ++randomId);

	el.addEventListener('click', (e) => {
		let self = e.currentTarget;
		let parent = self.closest('.item');
		let id = parent.dataset.id;
		let img = parent.querySelector('.item__image img').getAttribute('src');
		let title = parent.querySelector('.item__title').textContent;
		let priceString = priceWithoutSpaces(parent.querySelector('.price').textContent);
		let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.price').textContent));

		plusFullPrice(priceNumber);

		printFullPrice();

		cartProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));
		printQuantity();

    updateStorage();
		self.disabled = true;
    self.textContent = 'W koszu'
	});
});



const initialState = () => {
  if (localStorage.getItem('products') !== null) {
    cartProductsList.innerHTML = localStorage.getItem('products');
    printQuantity();
    countSumm();
    printFullPrice();

    document.querySelectorAll('.cart-products__item').forEach((item) => {
      let id = item.dataset.id;
      document.querySelector(`.item[data-id="${id}"]`).querySelector('.item__button').disabled = true;
      document.querySelector(`.item[data-id="${id}"]`).querySelector('.item__button').textContent = 'W koszu';
    });

  }
};

initialState();

const updateStorage = () => {
  let parent = cartProductsList;
  let html = parent.innerHTML;
  html = html.trim();
  if (html.length) {
    localStorage.setItem('products', html);
  } else {
    localStorage.removeItem('products');
  }
};

// функция для удаления проддукта из корзины при нажатыи на крестик
// let plusCount = document.querySelector('.products-count__plus');

cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('delete')) {
    let s = +e.target.closest('.cart-products__item').querySelector('.products-count__number').textContent;

    for (let i = 1; i < s; i++) {

      minusFullPrice(+e.target.closest('.cart-products__item').querySelector('.cart-products__price').textContent);
    }
      printFullPrice();
    deleteProducts(e.target.closest('.cart-products__item'));
	}
});


///////////////////


cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('products-count__plus')) {
    (e.target.closest('.cart-products__item').querySelector('.products-count__number').textContent++);
    plusFullPrice(+e.target.closest('.cart-products__item').querySelector('.cart-products__price').textContent);
    printFullPrice();
	} else if (e.target.classList.contains('products-count__minus')) {

    if (e.target.closest('.cart-products__item').querySelector('.products-count__number').textContent > 1) {
      e.target.closest('.cart-products__item').querySelector('.products-count__number').textContent--;
      minusFullPrice(+e.target.closest('.cart-products__item').querySelector('.cart-products__price').textContent);
      printFullPrice();
    } else {
      deleteProducts(e.target.closest('.cart-products__item'));

  }
  }
});

function isProducts () {
  let cartProducts = document.querySelector('.cart-products').children.length;

  if (cartProducts > 0) {
    return;
  }else {
    iconCart.style.display = 'none';
  }
}
isProducts();
