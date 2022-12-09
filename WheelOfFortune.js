
class WheelOfFortune{
  constructor() {
    this.wrap = null;
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
  get wheel_disc(){
    if(!this.wrap) return null;
    return this.wrap.querySelector('.wof-wheel-disc');
  }

  spin(){
    if(!this.wrap) return null;
    this.wrap.dataset.spin='inf'  
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
  spinAndStop(deg){
    if(!this.wrap) return null;
    if(deg == undefined){
      this.wrap.dataset.spin='inf'  
    }else{
      this.wrap.dataset.spin='inf'
      this.wheel_rotate = deg;
      setTimeout(()=>{
        this.wrap.dataset.spin='stop'
      },10)
    }
  }
  spinAndStopNow(deg){
    if(!this.wrap) return null;
    if(deg == undefined){
      this.wrap.dataset.spin='inf'  
    }else{
      this.wrap.dataset.spin='inf'
      this.wheel_rotate = deg;
      setTimeout(()=>{
        this.wrap.dataset.spin='now'
      },10)
    }
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

      if(wheel_rotate > line_1_rotate && wheel_rotate <= line_2_rotate ){
        currentSection = section;
      }
    });
    return currentSection;
  }
}

export default WheelOfFortune ;