
class WheelOfFortune{
  constructor() {
    this._wrap = null;
    this.is_spinning = false
    this.debug = false;
    this._onspinstart = null;
    this._onspinend = null;
    this.onspinstart = ()=>{};
    this.onspinend = ()=>{};
    this.spin_type = '';
  }
  set wrap(wrap){
    this._wrap = wrap;
    this.wheel_disc.addEventListener('animationend',(event) => {
      if(this.onspinend) this.onspinend(this);
      // if(this.onspinstop && this.wrap.dataset.spin=='stop'){ this.onspinstop(this); }  
      this.wheel_rotate_pre = this.wheel_rotate
      if(this.debug) console.log('onanimationend',this.wrap.dataset.spin)
    });
  }
  
  get wrap(){
    return this._wrap;
  }
  get wheel_rotate(){
    if(!this.wrap) return null;
    let deg = parseInt(getComputedStyle( this.wrap).getPropertyValue('--wheel-rotate'));
    deg = deg % 360;
    return deg;
  }
  set wheel_rotate(deg){
    if(!this.wrap) return null;
    deg = deg % 360;
    this.wrap.style.setProperty('--wheel-rotate',deg+'deg');
  }
  get wheel_rotate_pre(){
    if(!this.wrap) return null;
    let deg = parseInt(getComputedStyle( this.wrap).getPropertyValue('--wheel-rotate-pre'));
    deg = deg % 360;
    return deg;
  }
  set wheel_rotate_pre(deg){
    if(!this.wrap) return null;
    deg = deg % 360;
    this.wrap.style.setProperty('--wheel-rotate-pre',deg+'deg');
  }

  get wheel_disc(){
    if(!this.wrap) return null;
    return this.wrap.querySelector('.wof-wheel-disc');
  }

  get onspinstart(){
    return this._onspinstart
  }
  set onspinstart(onspinstart){
    this._onspinstart = () =>{
      this.is_spinning = true;
      this.wrap.classList.add('spinning');
      onspinstart(this);
      if(this.debug) console.log('onspinstart',this.wrap.dataset.spin)
    }
  }
  get onspinend(){
    return this._onspinend
  }
  set onspinend(onspinend){
    this._onspinend = () =>{
      this.is_spinning = false;
      this.wrap.classList.remove('spinning');
      onspinend(this);
      if(this.debug) console.log('onspinend',this.wrap.dataset.spin)
    }
  }

  spinReset(){
    if(!this.wrap) return null;
    this.wrap.dataset.spin=''  
  }
  pause(b){
    if(!this.wrap) return null;
    if(b) this.wrap.classList.add('pause');
    else this.wrap.classList.remove('pause');
  }

  spin(spin_type,deg){
    if(this.debug) console.log('spin',spin_type,deg)

    if(!this.wrap) return null;
    if(!spin_type) spin_type = 'inf';
    this.is_spinning = true;
    this.spin_type = spin_type;
    this.wrap.dataset.spin='pre'
    if(isNaN(deg)){
      this.wrap.dataset.spin='inf';
      if(this.onspinstart) this.onspinstart(this);
    }else{
      void this.wheel_disc.offsetWidth;
      // setTimeout(()=>{
        if(this.onspinstart) this.onspinstart(this);
        this.wheel_rotate = deg;
        this.wrap.dataset.spin = spin_type
      // },1000)
    }
  }
  spinInf(){
    return this.spin('inf');
  }
  spinAndStop(deg){
    return this.spin('stop',deg);
  }
  spinAndStopNow(deg){
    return this.spin('now',deg);
  }
  spinAndStopRandom(){
    let deg = Math.floor(Math.random()*360)
    return this.spinAndStop(deg)
  }
  get sections(){
    let sections = [];
    this.wrap.querySelectorAll('.wof-wheel-disc-section').forEach(element => {
      const st = getComputedStyle(element)
      let section = {
        element:element,
        line_1_rotate:parseInt(st.getPropertyValue('--section-line-1-rotate'),10),
        line_2_rotate:parseInt(st.getPropertyValue('--section-line-2-rotate'),10),
        label:element.querySelector('.wof-wheel-disc-section-label').innerText
      }
      if(section.line_1_rotate > section.line_2_rotate){
        line_1_rotate = line_1_rotate - 360;
      }
      sections.push(section)
    });
    return sections;
  }
  get currentSection(){
    let wheel_rotate = this.wheel_rotate;
    let sections = this.sections;
    let currentSection = null;
    sections.forEach(section => {
      let line_1_rotate = section.line_1_rotate;
      let line_2_rotate = section.line_2_rotate;

      if( (wheel_rotate > line_1_rotate && wheel_rotate <= line_2_rotate)
      || (wheel_rotate > line_1_rotate-360 && wheel_rotate <= line_2_rotate-360)
      || (wheel_rotate > line_1_rotate+360 && wheel_rotate <= line_2_rotate+360)
        ){
        currentSection = section;
      }
    });
    return currentSection;
  }

  setSectionData(data){
    this.wheel_disc.innerHTML = '';
    let def_section = document.createElement('div');
    def_section.className='wof-wheel-disc-section';
    let def_section_label = document.createElement('div');
    def_section_label.className='wof-wheel-disc-section-label';
    def_section.appendChild(def_section_label);
    let line_1_rotate = 0;
    let bgImageSections = [];
    data.forEach(d => {
      let section = def_section.cloneNode(true);
      section.querySelector('.wof-wheel-disc-section-label').textContent = d.label
      section.style.setProperty('--section-line-1-rotate',line_1_rotate+'deg')
      section.style.setProperty('--section-line-2-rotate',d.rotate+'deg')
      this.wheel_disc.appendChild(section);
      bgImageSections.unshift( `${d.color} calc(360deg - ${d.rotate}deg) calc(360deg - ${line_1_rotate}deg)` )
      line_1_rotate = d.rotate;
    });
    let bgImage = 'conic-gradient( '+bgImageSections.join(" , ")+' )';
    if(this.debug) console.log(bgImage);
    this.wheel_disc.style.backgroundImage = bgImage;




    // background-image: conic-gradient(
    //   red calc(360deg - 360deg) calc(360deg - 300deg),
    //   purple calc(360deg - 300deg) calc(360deg - 280deg),
    //   blue calc(360deg - 280deg) calc(360deg - 260deg),
    //   yellow calc(360deg - 260deg) calc(360deg - 180deg),
    //   green calc(360deg - 180deg) calc(360deg - 90deg),
    //   red 0deg 60deg
    // );

  }
}

export default WheelOfFortune ;