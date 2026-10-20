/*====================================
    EXTRA MOTION LAYER
    Adds animation on top of the existing
    scripts. Nothing is replaced.
=====================================*/
(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches;

/* safety net so the hero is never left hidden */
addEventListener("load",()=>document.body.classList.add("loaded"));

/* tech marquee: repeat the list so the loop is seamless */
const tr=$(".marquee .track");
if(tr)tr.innerHTML=tr.innerHTML.repeat(4);

/* phones: search sits under the sticky top bar instead of inside it */
const tb=$(".topbar"),se=$(".search"),mq=matchMedia("(max-width:992px)");
if(tb&&se){
    const place=()=>mq.matches?tb.after(se):tb.insertBefore(se,$(".profile"));
    place();mq.addEventListener("change",place);
}

if(rm)return;

if(!window.gsap||!window.ScrollTrigger)return;
gsap.registerPlugin(ScrollTrigger);

/* about text lights up word by word while scrolling */
const ap=$("#about .glass-card p");
if(ap){
    ap.innerHTML=ap.textContent.trim().split(/\s+/).map(w=>'<span class="w">'+w+"</span>").join(" ");
    gsap.to("#about .w",{opacity:1,stagger:.1,ease:"none",scrollTrigger:{trigger:ap,start:"top 88%",end:"bottom 60%",scrub:true}});
}

/* stats count up when they scroll into view */
$$(".counter").forEach(c=>{
    const t=+c.dataset.target,o={n:0};
    ScrollTrigger.create({trigger:c,start:"top 92%",once:true,onEnter:()=>gsap.fromTo(o,{n:0},{n:t,duration:2.2,ease:"power3.out",onUpdate:()=>c.textContent=Math.round(o.n).toLocaleString("en-US")})});
});

/* experience line draws as you scroll */
gsap.fromTo(".timeline",{"--tl":0},{"--tl":1,ease:"none",scrollTrigger:{trigger:".timeline",start:"top 80%",end:"bottom 60%",scrub:true}});

/* the card in the middle of the screen glows (works on touch too) */
$$(".project,.service,.skill,.stat-card,.testimonial-card").forEach(e=>ScrollTrigger.create({trigger:e,start:"top 68%",end:"bottom 32%",toggleClass:{targets:e,className:"inview"}}));

/* hero text drifts away on desktop */
gsap.matchMedia().add("(min-width:993px)",()=>{
    gsap.to(".hero-left",{yPercent:-10,opacity:.3,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
});

/* globe bullet points slide in one by one */
gsap.from(".globe-points li",{x:-40,opacity:0,stagger:.14,duration:.8,ease:"power3.out",scrollTrigger:{trigger:".globe-points",start:"top 88%",once:true}});

addEventListener("load",()=>setTimeout(()=>ScrollTrigger.refresh(),3000));
})();
