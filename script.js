function renderHeader() {
    return `<header class="header">
            <div class="nav-container">
                <div class="logo">
                    <span class="logo-teknic">TEKNIC</span>
                    <span class="logo-euchner">EUCHNER</span>
                </div>
                
                <nav class="nav-links">
                    <a href="#about" class="nav-item">ABOUT US <span class="arrow">▼</span></a>
                    <a href="#products" class="nav-item">PRODUCTS</a>
                    <a href="#dealers" class="nav-item">DEALERS</a>
                    <a href="#news" class="nav-item">NEWS & EVENTS</a>
                    <a href="#contact" class="nav-item">CONTACT US</a>
                </nav>

                <a href="#expert" class="cta-header">TALK TO AN EXPERT</a>
            </div>
        </header>
    `;
}
function renderHeroSection() {
    return `
        <section class="hero-section" id="heroSection">
            <!-- Video element (Not autoplaying by default) -->
            <video id="bgVideo" class="bg-video" loop playsinline poster="./images/home.png">
                <source src="./images/homepagevideo.mp4" type="video/mp4">
            </video>

            <div class="hero-overlay"></div>

            <div class="hero-container">
                <div class="hero-content">
                    <div class="heading-wrapper">
                        <h1>Precision That Keeps<br>Industry Moving.</h1>
                        
                        <!-- Main Play / Pause Button -->
                        <button class="play-btn" id="playToggleBtn" aria-label="Toggle Play/Pause">
                            <svg id="playIcon" width="24" height="28" viewBox="0 0 24 28" fill="currentColor">
                                <path d="M24 14L0 27.8564L0 0.143593L24 14Z"/>
                            </svg>
                        </button>
                    </div>
                    <p>Engineered sensing, switching and control solutions for machines that demand reliability.</p>
                    <a href="#products" class="btn-primary">EXPLORE OUR PRODUCTS</a>
                </div>

                <div class="hero-side-card">
                    <img src="./images/home.png" alt="Precision Milling Machine" class="side-image">
                </div>
            </div>

            <!-- Video Control Bar (Hidden initially via 'hidden' class) -->
            <div class="video-bar hidden" id="videoBar">
                <span class="video-time" id="videoTime">0:00 / 0:00</span>
                
                <div class="progress-bar" id="progressBar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>

                <div class="video-controls">
                    <button class="control-btn" id="fullscreenBtn" title="Fullscreen">⤢</button>
                    <button class="control-speed" id="speedBtn" title="Playback Speed">1x</button>
                    <button class="control-btn" id="volumeBtn" title="Mute/Unmute">🔊</button>
                </div>
            </div>
        </section>
    `;
}

function initHeroVideo() {
    const bgVideo = document.getElementById("bgVideo");
    if (!bgVideo) return;

    const playToggleBtn = document.getElementById("playToggleBtn");
    const playIcon = document.getElementById("playIcon");
    const videoBar = document.getElementById("videoBar");
    const progressBar = document.getElementById("progressBar");
    const progressFill = document.getElementById("progressFill");
    const videoTime = document.getElementById("videoTime");
    const volumeBtn = document.getElementById("volumeBtn");
    const speedBtn = document.getElementById("speedBtn");
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    const heroSection = document.getElementById("heroSection");

    const speeds = [1, 1.25, 1.5, 2, 0.5];
    let speedIdx = 0;

    const formatTime = (sec) => {
        if (isNaN(sec) || sec < 0) return "0:00";
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    playToggleBtn?.addEventListener("click", () => {
        if (bgVideo.paused) {
            // Unmute only on explicit user click to prevent autoplay block
            bgVideo.muted = false;
            
            bgVideo.play().then(() => {
                videoBar?.classList.remove("hidden");
                if (playIcon) {
                    playIcon.innerHTML = `
                        <rect x="3" y="2" width="6" height="24" fill="currentColor"/>
                        <rect x="15" y="2" width="6" height="24" fill="currentColor"/>
                    `;
                }
            }).catch(error => {
                console.error("Playback failed:", error);
            });
        } else {
            bgVideo.pause();
            if (playIcon) {
                playIcon.innerHTML = `
                    <path d="M24 14L0 27.8564L0 0.143593L24 14Z" fill="currentColor"/>
                `;
            }
        }
    });

    bgVideo.addEventListener("timeupdate", () => {
        if (bgVideo.duration && !isNaN(bgVideo.duration)) {
            const pct = (bgVideo.currentTime / bgVideo.duration) * 100;
            if (progressFill) progressFill.style.width = `${pct}%`;
            if (videoTime) videoTime.textContent = `${formatTime(bgVideo.currentTime)} / ${formatTime(bgVideo.duration)}`;
        }
    });

    progressBar?.addEventListener("click", (e) => {
        if (!bgVideo.duration) return;
        const rect = progressBar.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        bgVideo.currentTime = pos * bgVideo.duration;
    });

    volumeBtn?.addEventListener("click", () => {
        bgVideo.muted = !bgVideo.muted;
        volumeBtn.textContent = bgVideo.muted ? "🔇" : "🔊";
    });

    speedBtn?.addEventListener("click", () => {
        speedIdx = (speedIdx + 1) % speeds.length;
        bgVideo.playbackRate = speeds[speedIdx];
        speedBtn.textContent = `${speeds[speedIdx]}x`;
    });

    fullscreenBtn?.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            heroSection?.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    });
}

function renderIntroSection() {
    return `<section class="intro-section" id="about">
            <div class="intro-container">
                
                <!-- Row 1: Header Row (Tag + Main Heading) -->
                <div class="intro-header-row">
                    <span class="intro-tag">INTRODUCTION</span>
                    <h2 class="intro-heading">
                        Engineering You Can Rely On. <span class="highlight-red">Experience You Can Trust.</span>
                    </h2>
                </div>

                <!-- Row 2: 3-Column Content Row -->
                <div class="intro-content-row">
                    
                    <!-- Column 1: Left Image -->
                    <div class="intro-img-box left-box">
                        <img src="./images/intro1.png" alt="Industrial Sensors">
                    </div>

                    <!-- Column 2: Center Image -->
                    <div class="intro-img-box center-box">
                        <img src="./images/intro2.png" alt="Manufacturing Automation">
                    </div>

                    <!-- Column 3: Text & Button Area -->
                    <div class="intro-content">
                        <p class="intro-text">
                            Since 1989, Teknic Euchner has been building its expertise around one simple principle: <strong>industrial components should perform reliably, every time they are called upon.</strong>
                        </p>
                        
                        <p class="intro-text">
                            With the engineering know-how of Euchner Germany and decades of manufacturing experience in India, we develop control gear and sensing solutions for demanding industrial applications.
                        </p>

                        <p class="intro-text">
                            From machine positioning and object detection to switching and safety-related applications, our products are built to deliver consistent performance where it matters most.
                        </p>

                        <a href="#about" class="btn-discover">DISCOVER TEKNIC EUCHNER</a>
                    </div>

                </div>

            </div>
        </section>
    `;
}

function renderJourneySection() {
    return `
        <section class="journey-section">
            <div class="journey-overlay"></div>
            <div class="journey-container">
                <!-- Section Header -->
                <div class="journey-header">
                    <span class="journey-tag">OUR JOURNEY</span>
                    <h2>Decades of Engineering.<br>Built for Industry.</h2>
                </div> 

                <!-- Glassmorphism Stats Cards Grid -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">⚙️</div>
                        <h3>35+ Years</h3>
                        <p>Of industrial manufacturing experience</p>
                    </div>

                    <div class="stat-divider"></div>

                    <div class="stat-card">
                        <div class="stat-icon">🏢</div>
                        <h3>1989</h3>
                        <p>Year Teknic Euchner was established</p>
                    </div>

                    <div class="stat-divider"></div>

                    <div class="stat-card">
                        <div class="stat-icon">📦</div>
                        <h3>Multiple Product Categories</h3>
                        <p>Solutions across sensing, switching and machine control</p>
                    </div>

                    <div class="stat-divider"></div>

                    <div class="stat-card">
                        <div class="stat-icon">🗺️</div>
                        <h3>Pan-India Dealer Network</h3>
                        <p>Product access and support across India</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}
let productsData = [
    {
        title: "INDUCTIVE PROXIMITY<br>SWITCHES",
        subtitle: "Reliable non-contact detection for automated machines.",
        img: "./images/product1.png",
        alt: "Inductive Proximity Switches",
        desc: "Inductive proximity switches enable precise, contactless object detection for control and positioning."
    },
    {
        title: "SINGLE LIMIT<br>SWITCHES",
        subtitle: "Precision switching for dependable machine control.",
        img: "./images/product2.png",
        alt: "Single Limit Switches",
        desc: "Robust, corrosion-resistant limit switches built for demanding industrial environments."
    },
    {
        title: "PRECISION SINGLE &<br>MULTIPLE LIMIT SWITCHES",
        subtitle: "Engineered for accurate machine positioning.",
        img: "./images/product3.png",
        alt: "Multiple Limit Switches",
        desc: "Reliable control and positioning solutions built for industrial machinery."
    },
    {
        title: "PHOTOELECTRIC<br>SENSORS",
        subtitle: "Detect with precision. Respond with confidence.",
        img: "./images/product4.png",
        alt: "Photoelectric Sensors",
        desc: "Light-based sensors for reliable object detection and industrial automation."
    },
    {
        title: "NK LIMIT<br>SWITCHES",
        subtitle: "Compact. Robust. Built for dependable switching.",
        img: "./images/product5.png",
        alt: "NK Limit Switches",
        desc: "Flexible, robust limit switches designed for demanding industrial and safety applications."
    },
    {
        title: "CABLE<br>CONNECTORS",
        subtitle: "Reliable connections for industrial sensing and control.",
        img: "./images/product6.png",
        alt: "Cable Connectors",
        desc: "Sensor and actuator cables built for demanding installations and energy-chain applications."
    }
];

function renderProductsSection() {
    const cardsMarkup = productsData.map(product => `
        <div class="product-card">
            <div class="card-top">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-subtitle">${product.subtitle}</p>
            </div>
            <div class="card-image">
                <img src="${product.img}" alt="${product.alt}">
            </div>
            <div class="card-bottom">
                <p class="product-desc">${product.desc}</p>
                <a href="#products" class="btn-card-explore">EXPLORE <span class="arrow-box">&rarr;</span></a>
            </div>
        </div>
    `).join('');

    return `
        <section class="products-section" id="products">
            <div class="products-container">
                <div class="products-header">
                    <div class="header-left">
                        <span class="section-tag">OUR PRODUCTS</span>
                        <h2>The Right Control Gear<br>for Every Application.</h2>
                    </div>
                    <div class="header-right">
                        <p>Industrial machines depend on components that can sense movement, detect position, control processes and respond when it matters.</p>
                        <p>Teknic Euchner offers a focused range of industrial products engineered for reliable operation across demanding applications.</p>
                        <a href="#products" class="btn-explore-main">EXPLORE OUR PRODUCTS</a>
                    </div>
                </div>

                <div class="product-cards-grid">
                    ${cardsMarkup}
                </div>
            </div>
        </section>
    `;
}

const whyUsFeaturesData = [
    {
        title: "Engineering<br>Expertise",
        desc: "Built on decades of experience and strengthened by Euchner Germany's engineering heritage."
    },
    {
        title: "Reliable<br>Performance",
        desc: "Products designed to deliver consistent operation in demanding industrial environments."
    },
    {
        title: "Robust<br>Construction",
        desc: "Quality materials, precision manufacturing and application-focused design for long-term performance."
    },
    {
        title: "Industry-Focused<br>Solutions",
        desc: "Products developed around the practical requirements of machines, automation systems and industrial equipment."
    },
    {
        title: "Quality as a<br>Standard",
        desc: "Our commitment to quality extends from product development and manufacturing to customer service."
    }
];
function renderWhyUsSection() {
    const featuresMarkup = whyUsFeaturesData.map(feature => `
        <div class="feature-item">
            <h3 class="feature-title">${feature.title}</h3>
            <p class="feature-desc">${feature.desc}</p>
        </div>
    `).join('');

    return `
        <section class="why-us-section">
            <div class="why-us-container">
                
                <!-- Left Side: Header & Image -->
                <div class="why-us-left">
                    <span class="section-tag">WHY TEKNIC EUCHNER</span>
                    <h2>Built Around What Industry<br>Needs.</h2>
                    <p class="why-us-desc">
                        Industrial environments leave little room for uncertainty. That's why our approach combines engineering expertise, robust materials and manufacturing experience to create products designed for dependable performance.
                    </p>
                    <div class="why-us-img-box">
                        <img src="./images/why.png" alt="Robotic Arm Automation">
                    </div>
                </div>

                <!-- Right Side: Feature List Grid -->
                <div class="why-us-right">
                    ${featuresMarkup}
                </div>

            </div>
        </section>
    `;
}
const applicationsData = [
    {
        title: "Machine Tools",
        desc: "Precision sensing and positioning for machine-tool applications.",
        img: "./images/machine.png",
        alt: "Machine Tools"
    },
    {
        title: "Industrial Automation",
        desc: "Reliable detection and switching for automated processes.",
        img: "./images/industry.png",
        alt: "Industrial Automation"
    },
    {
        title: "Manufacturing Equipment",
        desc: "Components designed for demanding production environments.",
        img: "./images/manufacture.png",
        alt: "Manufacturing Equipment"
    },
    {
        title: "Material Handling",
        desc: "Sensing and switching solutions for movement, positioning and control.",
        img: "./images/material.png",
        alt: "Material Handling"
    },
    {
        title: "Safety Applications",
        desc: "Products designed to support machine safety and reliable control.",
        img: "./images/safety.png",
        alt: "Safety Applications"
    },
    {
        title: "Custom Industrial Applications",
        desc: "Solutions selected around the specific requirements of your equipment.",
        img: "./images/custom.png",
        alt: "Custom Industrial Applications"
    }
];

function renderApplicationsSection() {
    const cardsMarkup = applicationsData.map(app => `
        <div class="app-card">
            <div class="app-image-container">
                <img src="${app.img}" alt="${app.alt}">
            </div>
            <h3 class="app-title">${app.title}</h3>
            <p class="app-desc">${app.desc}</p>
        </div>
    `).join('');

    return `
        <section class="applications-section">
            <div class="applications-container">
                
                <!-- Header -->
                <div class="applications-header">
                    <div class="header-left">
                        <span class="section-tag">OUR APPLICATIONS</span>
                        <h2>Designed for Machines. Trusted Across<br>Industries.</h2>
                    </div>
                    <div class="header-right">
                        <p>Our products support the machines and systems that keep modern manufacturing moving.</p>
                    </div>
                </div>

                <!-- 3x2 Applications Grid -->
                <div class="applications-grid">
                    ${cardsMarkup}
                </div>

            </div>
        </section>
    `;
}
function renderQualitySection() {
    return `
        <section class="quality-section">
            <div class="quality-overlay"></div>
            <div class="quality-container">
                
                <!-- Left Side: Title & Monospace Statement List -->
                <div class="quality-left">
                    <h2>Quality Isn't an Inspection.<br>It's a Commitment.</h2>
                    <div class="quality-statements">
                        <p>IT'S ABOUT CONSISTENT PERFORMANCE.</p>
                        <p>IT'S ABOUT DEPENDABLE OPERATION.</p>
                        <p>IT'S ABOUT BUILDING COMPONENTS THAT CUSTOMERS<br>CAN SPECIFY WITH CONFIDENCE.</p>
                    </div>
                </div>

                <!-- Right Side: Description & Button -->
                <div class="quality-right">
                    <p class="quality-desc-top">
                        For industrial components, quality is about more than meeting a specification.
                    </p>
                    <div class="quality-right-bottom">
                        <p class="quality-desc-bottom">
                            At Teknic Euchner, quality is built into our approach to product development, manufacturing and customer service.
                        </p>
                        <a href="#quality-policy" class="btn-quality">VIEW OUR QUALITY POLICY</a>
                    </div>
                </div>

            </div>
        </section>
    `;
}
function renderDealerSection() {
    return `
        <section class="dealer-section">
            <div class="dealer-container">
                
                <!-- Left Content Block -->
                <div class="dealer-left">
                    <h2>Looking for Teknic<br>Euchner Products?</h2>
                    <p>Find an authorised dealer near you and get connected with the right product for your application.</p>
                    <a href="#find-dealer" class="btn-dealer">FIND A DEALER</a>
                </div>

                <!-- Right Globe Image -->
                <div class="dealer-right">
                    <img src="./images/globe.png" alt="Globe Graphic" class="globe-img" />
                </div>

            </div>
        </section>
    `;
}

function renderCTASection() {
    return `
        <section class="cta-section">
            <div class="cta-banner">
                
                <!-- Left Content -->
                <div class="cta-left">
                    <h2>Let's Find the Right Solution<br>for Your Application.</h2>
                    <p>Whether you're designing a new machine, upgrading an existing system or looking for a reliable replacement, our team can help you identify the right control gear for your requirements.</p>
                    <div class="cta-buttons">
                        <a href="#contact" class="btn-cta-outline">TALK TO OUR TEAM</a>
                        <a href="#products" class="btn-cta-filled">EXPLORE OUR PRODUCTS</a>
                    </div>
                </div>

                <!-- Right Product Card Display -->
                <div class="cta-right">
                    <div class="cta-image-wrapper">
                        <img src="./images/product5.png" alt="Teknic Control Gear Component">
                    </div>
                </div>

            </div>
        </section>
    `;
}
const footerLinksData = [
    {
        title: "COMPANY",
        links: [
            { text: "About", url: "#" },
            { text: "Leadership", url: "#" },
            { text: "Clients", url: "#" },
            { text: "Pricing", url: "#" }
        ]
    },
    {
        title: "EQUIPMENT",
        links: [
            { text: "Forklifts", url: "#" },
            { text: "Loader Systems", url: "#" },
            { text: "Industrial Cranes", url: "#" },
            { text: "Pallet Handling", url: "#" }
        ]
    },
    {
        title: "INFO",
        links: [
            { text: "Leasing", url: "#" },
            { text: "Industries", url: "#" },
            { text: "Projects", url: "#" },
            { text: "FAQ", url: "#" }
        ]
    },
    {
        title: "SERVICES",
        links: [
            { text: "Engineering & Design", url: "#" },
            { text: "Maintenance & Support", url: "#" },
            { text: "Custom Engineering", url: "#" },
            { text: "System Design", url: "#" }
        ]
    }
];
function renderFooterSection() {
    const columnsMarkup = footerLinksData.map(col => `
        <div class="footer-col">
            <h4>${col.title}</h4>
            <ul>
                ${col.links.map(link => `<li><a href="${link.url}">${link.text}</a></li>`).join('')}
            </ul>
        </div>
    `).join('');

    return `
            <footer class="footer-section" id="contact">
            <div class="footer-container">
                
<div class="footer-brand-title">
    <h1>
        TEKNIC<br>
        <span class="logo-line2">EUCHNER</span>
    </h1>
</div>
                <!-- Content Grid with Vertical Dividers -->
                <div class="footer-content">
                    
                    <!-- Left Description Column -->
                    <div class="footer-left">
                        <h2>Discover our range of<br>industrial equipment.</h2>
                        <p>Crafting durable machinery for reliable<br>performance in tough environments.</p>
                    </div>

                    <!-- Middle Links Grid -->
                    <div class="footer-links-grid">
                        ${columnsMarkup}
                    </div>

                    <!-- Right Contact & Socials Column -->
                    <div class="footer-right">
                        <address class="footer-address">
                            584 4th St, San Francisco,<br>
                            CA 94107, United States<br><br>
                            <a href="mailto:info@example.com">info@example.com</a><br>
                            <a href="tel:+15551234567">+1 (555) 123-4567</a>
                        </address>

                        <div class="footer-socials">
                            <a href="#" aria-label="Facebook">f</a>
                            <a href="#" aria-label="LinkedIn">in</a>
                            <a href="#" aria-label="Instagram">o</a>
                        </div>
                    </div>

                </div>

                <!-- Copyright Line -->
                <div class="footer-bottom">
                    <p>&bull; 2026 TEKNIC EUCHNER. All Rights Reserved</p>
                </div>

            </div>
        </footer>
    `;
}
document.addEventListener('DOMContentLoaded', () => {
    const appRoot = document.getElementById('app-root');
    
    if (appRoot) {
        appRoot.innerHTML = `
            ${renderHeader()}
            ${renderHeroSection()}
            ${renderIntroSection()}
            ${renderJourneySection()}
            ${renderProductsSection()}
            ${renderWhyUsSection()}
            ${renderApplicationsSection()}
            ${renderQualitySection()}
            ${renderDealerSection()}
            ${renderCTASection()}
            ${renderFooterSection()}
        `;
    }

    initHeroVideo();
    const zoomController = new PageZoomController();
    zoomController.init();
});
class PageZoomController {
    constructor() {
        this.scale = 1.0;
        this.minScale = 0.6;
        this.maxScale = 1.4;
        this.step = 0.1;
        this.appRoot = document.getElementById('app-root');
        this.display = document.getElementById('zoomLevelDisplay');
    }
    init() {
        document.getElementById('zoomInBtn')?.addEventListener('click', () => this.zoomIn());
        document.getElementById('zoomOutBtn')?.addEventListener('click', () => this.zoomOut());
        document.getElementById('zoomResetBtn')?.addEventListener('click', () => this.resetZoom());
    }
    zoomIn() {
        if (this.scale < this.maxScale) {
            this.scale = parseFloat((this.scale + this.step).toFixed(2));
            this.applyScale();
        }
    }
    zoomOut() {
        if (this.scale > this.minScale) {
            this.scale = parseFloat((this.scale - this.step).toFixed(2));
            this.applyScale();
        }
    }
    resetZoom() {
        this.scale = 1.0;
        this.applyScale();
    }
    applyScale() {
        if (this.appRoot) {
            this.appRoot.style.transform = `scale(${this.scale})`;
            this.appRoot.style.transformOrigin = 'top center';
        }
        if (this.display) {
            this.display.textContent = `${Math.round(this.scale * 100)}%`;
        }
    }
}
