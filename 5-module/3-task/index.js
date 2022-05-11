function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const step = carouselInner.children[0].offsetWidth;
  const rightBorder = -step * carouselInner.children.length;

  const scrollCarousel = (step) => {
    const endPoint = Number(carouselInner.style.transform.replace(/[^-\d]/g, '')) + step;
    if (endPoint <= 0 && endPoint > rightBorder) {
      carouselInner.style.transform = `translateX(${endPoint}px)`;
    }
    arrowLeft.style.display = (endPoint === 0) ? 'none' : '';
    arrowRight.style.display = (endPoint + step === rightBorder) ? 'none' : '';
  };


  arrowLeft.style.display = 'none';
  arrowRight.addEventListener('click', () => { 
    scrollCarousel(-step);
  });
  arrowLeft.addEventListener('click', () => { 
    scrollCarousel(step);
  });
}
