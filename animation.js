/*=========================================
    GSAP INITIAL SETTINGS
=========================================*/

gsap.registerPlugin(ScrollTrigger);

/*=========================================
    PAGE LOADER ANIMATION
=========================================*/

window.addEventListener("load", () => {

    gsap.from("body",{
        opacity:0,
        duration:1
    });

});

/*=========================================
    SIDEBAR
=========================================*/

gsap.from(".sidebar",{

    x:-250,
    opacity:0,
    duration:1.2,
    ease:"power3.out"

});

/*=========================================
    TOPBAR
=========================================*/

gsap.from(".topbar",{

    y:-80,
    opacity:0,
    duration:1,
    delay:.4

});

/*=========================================
    HERO IMAGE
=========================================*/

gsap.from(".hero-right img",{

    scale:.6,
    opacity:0,
    duration:1.4,
    delay:.8,
    ease:"back.out(1.7)"

});

/*=========================================
    HERO TEXT
=========================================*/

gsap.from(".hero h4",{

    x:-50,
    opacity:0,
    duration:.7,
    delay:.7

});

gsap.from(".hero h1",{

    x:-80,
    opacity:0,
    duration:1,
    delay:.9

});

gsap.from(".hero h3",{

    x:-80,
    opacity:0,
    duration:1,
    delay:1.1

});

gsap.from(".hero p",{

    y:40,
    opacity:0,
    duration:1,
    delay:1.3

});

gsap.from(".buttons",{

    y:40,
    opacity:0,
    duration:1,
    delay:1.5

});

/*=========================================
    PROFILE IMAGE
=========================================*/

gsap.to(".profile-circle",{

    y:-15,
    duration:2,
    repeat:-1,
    yoyo:true,
    ease:"sine.inOut"

});

/*=========================================
    STATS
=========================================*/

gsap.from(".stat-card",{

    opacity:0,
    y:80,
    duration:1,
    stagger:.2,
    scrollTrigger:{

        trigger:".stats",

        start:"top 80%"

    }

});

/*=========================================
    PROJECTS
=========================================*/

gsap.from(".project",{

    opacity:0,
    scale:.8,
    duration:1,
    stagger:.3,

    scrollTrigger:{

        trigger:".projects",

        start:"top 80%"

    }

});

/*=========================================
    SERVICES
=========================================*/

gsap.from(".service",{

    opacity:0,
    y:60,
    duration:1,
    stagger:.25,

    scrollTrigger:{

        trigger:".services",

        start:"top 80%"

    }

});

/*=========================================
    SKILLS
=========================================*/

gsap.from(".skill",{

    opacity:0,
    rotateY:180,
    duration:1,
    stagger:.15,

    scrollTrigger:{

        trigger:".skills",

        start:"top 80%"

    }

});

/*=========================================
    TIMELINE
=========================================*/

gsap.from(".timeline-item",{

    opacity:0,
    x:-80,
    duration:1,
    stagger:.25,

    scrollTrigger:{

        trigger:".timeline",

        start:"top 80%"

    }

});

/*=========================================
    CONTACT
=========================================*/

gsap.from(".contact-box",{

    opacity:0,
    y:70,
    duration:1.2,

    scrollTrigger:{

        trigger:"#contact",

        start:"top 80%"

    }

});

/*=========================================
    FOOTER
=========================================*/

gsap.from("footer",{

    opacity:0,
    y:80,
    duration:1,

    scrollTrigger:{

        trigger:"footer",

        start:"top 90%"

    }

});