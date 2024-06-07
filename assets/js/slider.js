class slider{
  constructor(parent, data){
    this.arrowWrapper = document.createElement('div');
    this.listWrapper = document.createElement('div');
    this.nextArrow = document.createElement('img');
    this.prevArrow = document.createElement('img');
    this.parent = parent;
    this.cards = parent.children;
    this.maxCards = parent.children.length;
    this.translateVal = 0;
    this.currentSlide = 1;
    this.data = data;

    this.validation();

    this.parent.parentNode.insertBefore(this.listWrapper, parent);
    this.listWrapper.appendChild(parent);
    this.listWrapper.parentNode.insertBefore(this.arrowWrapper, this.listWrapper);
    this.arrowWrapper.appendChild(this.listWrapper);
    
    this.styles();
    this.initEventHandlers();
    console.log(this);
  }
  validation(){
    function setOption(option, defaultValue, validType, validator = null){
      if(!option)
        return defaultValue;
      else if(typeof option === validType && (validator ? validator(option) : true))
        return option;
      else throw new Error(`Invalid value for option: ${option}`);
    }
    const {type, arrows, perPage, perMove, scrollable, snap, gap, breakpoints} = this.data;

    this.data.type = setOption(type, 'normal', 'string', val => ['normal', 'loop'].includes(val));
    this.data.arrows = setOption(arrows, false, 'boolean');
    this.data.perPage = setOption(perPage, 3, 'number', val => val > 0);
    this.data.perMove = setOption(perMove, 1, 'number', val => val > 0);
    this.data.scrollable = setOption(scrollable, false, 'boolean');
    this.data.snap = setOption(snap, 'start', 'string', val => ['start', 'center', 'end'].includes(val));
    this.data.gap = setOption(gap, 10, 'number', val => val > 0);
    
    if(type === 'loop' && perMove >= this.cards.length)
      throw new Error(`PerMove must be less than the number of cards when type = 'loop'`)
    for(const bpVal in breakpoints){
      if(!(!isNaN(parseInt(bpVal)) && bpVal > 0))
        throw new Error('All breakpoint values must be a positive number.');

      const bPerPage = breakpoints[bpVal].perPage;
      const bPerMove = breakpoints[bpVal].perMove;
      const bGap = breakpoints[bpVal].gap;

      if(typeof bPerPage !== 'undefined' && !(typeof bPerPage === 'number' && bPerPage > 0))
        throw new Error(`Invalid value for perPage: '${bPerPage}'. perPage must be a positive number.`);
      if(typeof bPerMove !== 'undefined' && !(typeof bPerMove === 'number' && bPerMove > 0))
        throw new Error(`Invalid value for perMove: '${bPerMove}'. perMove must be a positive number.`);
      if(typeof bGap !== 'undefined' && !(typeof bGap === 'number' && bGap > 0))
        throw new Error(`Invalid value for gap: '${bGap}'. gap must be a positive number.`);
    }
    if(typeof breakpoints !== 'undefined' && breakpoints){
      breakpoints[10000] = {
        perPage: this.data.perPage,
        perMove: this.data.perMove,
        gap: this.data.gap,
      }
    }
  }
  styles(){
    const {arrowWrapper, listWrapper, nextArrow, prevArrow, parent, cards, maxCards, cardWidth, currentSlide, data} = this;
    const {type, arrows, perPage, perMove, scrollable, snap, gap, breakpoints} = data;

    Object.assign(arrowWrapper.style, {
      position: 'relative',
      marginInline: (arrows) ? '20px' : '',
      height: 'fit-content',
    });
    Object.assign(listWrapper.style, {
      overflow: 'hidden',
      marginInline: '1px',
    });
    Object.assign(parent.style, {
      display: 'flex',
      userSelect: 'none',
      gap: `${gap}px`,
    });
    
    if(arrows){
      nextArrow.src = `./assets/images/svg/chevron-right.svg`;
      prevArrow.src = `./assets/images/svg/chevron-left.svg`;
      nextArrow.alt = 'nextArrow';
      prevArrow.alt = 'prevArrow';
      nextArrow.dataset.sliderArrow = 'nextArrow';
      prevArrow.dataset.sliderArrow = 'prevArrow';
      arrowWrapper.appendChild(nextArrow);
      arrowWrapper.appendChild(prevArrow);
      
      Object.assign(nextArrow.style, {
        userSelect: 'none',
        position: 'absolute',
        bottom: '50%',
        right: '0',
        width: '20px',
        transform: 'translate(100%, 50%)',
        cursor: 'pointer',
      });
      Object.assign(prevArrow.style, {
        userSelect: 'none',
        position: 'absolute',
        bottom: '50%',
        left: '0',
        width: '20px',
        transform: 'translate(-100%, 50%)',
        cursor: 'pointer',
      });
      for(const card of cards){
        Object.assign(card.style, {
          aspectRatio: '3 / 2',
        });
      }
      
      if(type === 'normal')
        prevArrow.style.display = 'none';
    }
    if(type === 'normal'){
      for(const card of cards){
        Object.assign(card.style, {
          minWidth: `calc((100% - ${gap * (perPage - 1)}px) / ${perPage})`,
        });
      }
    }
    if(type === 'loop'){
      const fragment = document.createDocumentFragment();
      
      for(const card of cards){
        card.dataset.nthChild = Array.from(cards).indexOf(card) + 1;
        Object.assign(card.style, {
          minWidth: `calc((100% - ${gap * (perPage - 1)}px) / ${perPage})`,
        });
      }
      for(let i = 0; i < 2; i++)
      for(const card of cards){
        const newCard = card.cloneNode(true);
        fragment.appendChild(newCard);
      }
      parent.appendChild(fragment);
    }
  }
  initEventHandlers(){
    const {arrowWrapper, listWrapper, nextArrow, prevArrow, parent, cards, maxCards, cardWidth, currentSlide, data} = this;
    const {type, arrows, perPage, perMove, scrollable, snap, gap, breakpoints} = data;
    let isDragging = false;
    let dragStart, dragVal, valStart;
    let lastMouseX, velocity = 0, acceleration = 0.25;

    const updateSliderTranslate = (ms) => {
      const {translateStart, translateVal, cardWidth, currentSlide, endCard} = this;

      if(type === 'normal'){
        parent.style.transform = `translateX(-${translateVal}px)`;
        if(arrows){
          nextArrow.style.display = (currentSlide === endCard) ? 'none' : 'block';
          prevArrow.style.display = (currentSlide === 1) ? 'none' : 'block';
        }
      }
      else if(type === 'loop'){
        const totalTranslate = translateStart + translateVal;

        parent.style.transform = `translateX(-${totalTranslate}px)`;
        if(totalTranslate <= cardWidth * (maxCards - perPage)){
          this.translateVal = totalTranslate;
          setTimeout(() => {
            parent.style.transform = `translateX(-${totalTranslate + translateStart}px)`;
          }, ms || 400)
        }
        else if(totalTranslate >= translateStart * 2){
          this.translateVal = 0;
          setTimeout(() => {
            parent.style.transform = `translateX(-${totalTranslate - translateStart}px)`;
          }, ms || 400)
        }
      }
      parent.style.transition = `transform ${(ms / 1000) || 0.4}s`;
      setTimeout(() => {
        parent.style.transition = '';
      }, ms || 400);
    }
    const pressStart = (e) => {
      isDragging = true;
      const event = (e.type === 'touchstart') ? e.touches[0] : e;
      dragStart = event.pageX;
      lastMouseX = event.pageX;
      valStart = this.translateVal;
    }
    const pressMove = (e) => {
      if(!isDragging) return;
      const {translateStart, cardWidth, data} = this;
      const {perPage} = data;
      const dragEnd = cardWidth * (cards.length - perPage);
      const event = (e.type === 'touchmove') ? e.touches[0] : e;
      const deltaX = event.pageX - lastMouseX;
      velocity += deltaX * acceleration;
      lastMouseX = event.pageX;

      dragVal = valStart - (event.pageX - dragStart) - velocity;
      if(type === 'normal'){
        if(dragVal > dragEnd){
          parent.style.transform = `translateX(-${dragEnd}px)`;
          this.translateVal = dragEnd;
          velocity = 0;
        }
        else if(dragVal < 0){
          parent.style.transform = `translateX(0)`;
          this.translateVal = 0;
          velocity = 0;
        }
        else{
          parent.style.transform = `translateX(-${dragVal}px)`;
          this.translateVal = dragVal;
        }
      }
      else if(type === 'loop'){
        parent.style.transform = `translateX(-${dragVal + translateStart}px)`;
        this.translateVal = dragVal;
      }
    }
    const pressEnd = () => {
      const {translateStart, cardWidth, endCard} = this;
      velocity = 0;

      if(isDragging){
        let translatedNum = [];
        if(type === 'normal'){
          for(let i = 0; i < endCard; i++)
            translatedNum.push(Math.abs(i * cardWidth - dragVal));
          let closestCard = translatedNum.indexOf(Math.min(...translatedNum));
          this.currentSlide = closestCard + 1;
          this.translateVal = closestCard * cardWidth;
        }
        else if(type === 'loop'){
          for(let i = 0; i < cards.length; i++){
            translatedNum.push(Math.abs(i * cardWidth - (dragVal + translateStart)));
          }
          let closestCard = translatedNum.indexOf(Math.min(...translatedNum));
          this.currentSlide = (closestCard % maxCards) + 1;
          this.translateVal = (closestCard * cardWidth) - translateStart;
        }
        updateSliderTranslate();
      }
      isDragging = false;
    }
    const btnPressed = (btn) => {
      const {translateStart, translateVal, cardWidth, currentSlide, endCard, data} = this;
      const {perMove} = data;
  
      if(btn === 'nextArrow'){
        this.translateVal += cardWidth * perMove;
        this.currentSlide += perMove;
      }
      else if(btn === 'prevArrow'){
        this.translateVal -= cardWidth * perMove;
        this.currentSlide -= perMove;
      }
      if(type === 'normal'){
        if(this.currentSlide > endCard){
          this.translateVal = cardWidth * (endCard - 1);
          this.currentSlide = endCard;
        }
        else if(this.currentSlide < 1){ 
          this.translateVal = 0;
          this.currentSlide = 1;
        }
      }
      else if(type === 'loop'){
        let currentCard = ((translateVal + translateStart) / cardWidth) + 1;
        this.translateVal = (cardWidth * (currentCard - 1)) - translateStart;
        if(this.currentSlide < 1){
          this.currentSlide += maxCards;
        }
        else if(this.currentSlide > maxCards){
          this.currentSlide -= maxCards;
        }
      }
      updateSliderTranslate();
    }
    const scrollUpdatePosition = (e) => {
      const {translateStart, translateVal, cardWidth, currentSlide, endCard} = this;
      e.preventDefault();
      if(type === 'normal'){
        if(e.wheelDelta < 0){
          if(currentSlide < endCard)
            this.currentSlide++;
        }
        else{
          if(currentSlide > 1)
            this.currentSlide--;
        }
        this.translateVal = cardWidth * (this.currentSlide - 1);
      }
      else if(type === 'loop'){
        let currentCard = ((translateVal + translateStart) / cardWidth) + 1;
        if(e.wheelDelta < 0)
          currentCard++;
        else
          currentCard--;
        this.currentSlide = currentCard % maxCards || maxCards;
        this.translateVal = (cardWidth * (currentCard - 1)) - translateStart;
      }
      updateSliderTranslate(150);
    }
    parent.addEventListener('touchstart', pressStart);
    parent.addEventListener('touchmove', pressMove);
    document.addEventListener('touchend', pressEnd);
    if(arrows){
      nextArrow.addEventListener('click', () => {btnPressed('nextArrow')});
      prevArrow.addEventListener('click', () => {btnPressed('prevArrow')});
    }
    if(scrollable){
      parent.addEventListener('wheel', scrollUpdatePosition);
    }

    const updateSliderConfig = () => {
      this.cardWidth = this.cards[0].getBoundingClientRect().width + this.data.gap;
      this.translateVal = this.cardWidth * (this.currentSlide - 1);
      if(type === 'normal'){
        parent.style.transform = `translateX(-${this.translateVal}px)`;
        this.endCard = cards.length - (this.data.perPage - 1);
        
        if(this.currentSlide > this.endCard)
          this.currentSlide = this.endCard;
        if(arrows){
          nextArrow.style.display = (this.currentSlide === this.endCard) ? 'none' : 'block';
          prevArrow.style.display = (this.currentSlide === 1) ? 'none' : 'block';
        }
      }
      else if(type === 'loop'){
        this.translateStart = (this.cards.length / 3) * this.cardWidth;
        const totalTranslate = this.translateStart + this.translateVal;

        parent.style.transform = `translateX(-${totalTranslate}px)`;
      }
    }
    const breakpointsHandler = () => {
      const viewportWidth = window.innerWidth;
      let closestBpVal = null;

      for(const bpVal in breakpoints){
        const bpValue = parseInt(bpVal);
        if(bpValue >= viewportWidth && (closestBpVal === null || bpValue < closestBpVal)){
          closestBpVal = bpValue;
        }
      }

      if(closestBpVal !== null){
        const bPerPage = breakpoints[closestBpVal].perPage
        const bPerMove = breakpoints[closestBpVal].perMove
        const bGap = breakpoints[closestBpVal].gap

        this.data.perPage = bPerPage || this.data.perPage;
        this.data.gap = bGap || this.data.gap;
        this.data.perMove = bPerMove || this.data.perMove;
        
        if(type === 'normal' && arrows){
          nextArrow.style.display = (this.currentSlide === this.endCard) ? 'none' : 'block';
          prevArrow.style.display = (this.currentSlide === 1) ? 'none' : 'block';
        }
        
        const {perPage, gap} = this.data;
        parent.style.gap = `${gap}px`;
        for(const card of cards){
          card.style.minWidth = `calc((100% - ${gap * (perPage - 1)}px) / ${perPage})`;
        }
      }
    }
    window.addEventListener('resize', () => {
      breakpointsHandler();
      updateSliderConfig();
    });
    setTimeout(() => {
      breakpointsHandler();
      updateSliderConfig();
    }, 1);
  }
}

const headerSlider = document.querySelector('.header-gallery');
new slider(headerSlider, {
  arrows: true,
  perPage: 1,
  gap: 0,
});