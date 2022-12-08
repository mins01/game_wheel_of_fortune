
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
  get wheel_disc_el(){
    if(!this.wrap) return null;
    return this.wrap.querySelector('.wof-wheel-disc-el');
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
}

export default WheelOfFortune ;