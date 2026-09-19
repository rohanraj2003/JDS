import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  Car,
  ChevronRight,
  X,
  ExternalLink,
  Sparkles,
  Utensils,
  Navigation,
  Flame,
  Award,
  Heart,
  MessageSquare,
  Compass,
  Layers,
  Box,
  Sliders,
  CheckCircle2,
  ThumbsUp,
  Map,
  Zap,
  Check,
  Send,
  Instagram
} from 'lucide-react';

// ==========================================
// CINEMATIC MOTION VARIANTS & EASING TOKENS
// ==========================================
const EASE_CINEMATIC = [0.16, 1, 0.3, 1]; // Smooth cubic bezier curve

export const heroContainerVariants = {
  initial: { scale: 1.08, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 1.6, ease: EASE_CINEMATIC, delayChildren: 0.3, staggerChildren: 0.15 }
  }
};

export const textRevealVariants = {
  initial: { y: "100%", opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
  animate: {
    y: "0%",
    opacity: 1,
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    transition: { duration: 1.2, ease: EASE_CINEMATIC }
  }
};

export const fadeInUpVariants = {
  initial: { y: 40, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE_CINEMATIC }
  }
};

export const staggerContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
  }
};

export const glareButtonVariants = {
  initial: { x: "-100%" },
  hover: { x: "200%", transition: { duration: 0.85, ease: "easeInOut" } }
};

// INSTAGRAM PROFILE DATA
const INSTAGRAM_URL = "https://www.instagram.com/jdskitchen.official/?hl=en";
const INSTAGRAM_HANDLE = "@jdskitchen.official";

const INSTAGRAM_POSTS = [
  {
    id: 1,
    caption: "The moment the dum is unsealed at 11:30 AM! Fragrant Wayanad cardamom & aged Kaima rice aroma fills our courtyard. 🪵🔥 #JDsKitchen #KozhikodeBiryani",
    likes: "1.4k",
    comments: "84",
    image: "./images/jds_beef_biryani_review.jpg",
    tag: "LIVE DUM UNSEALING"
  },
  {
    id: 2,
    caption: "Spacious timber roof courtyard dining — crafted for long family lunches with stress-free parking. 🌿🚗 #MalabarDining #Paloramala",
    likes: "980",
    comments: "52",
    image: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnomhgJF0O2WtYRUTDCw99JJHSv2tqu0tY1Xtn2k2z5mjVXNr0tlEJIwkiQBT5DhCYVD_2o4Gr3YpYOnwP9vj82-DSv3ew6RW3NePGeskuk3-lhTsO1OlpSMqeTpzgeHUWVikroOZaPilhR=s1360-w1360-h1020-rw",
    tag: "COURTYARD VIBES"
  },
  {
    id: 3,
    caption: "Arabian Chicken Mandi smoked to perfection over coconut charcoal pits! Served with house garlic toum & salsa. 🍗🔥 #ChickenMandi",
    likes: "2.1k",
    comments: "116",
    image: "./images/jds_mandi_review.jpg",
    tag: "SMOKED MANDI"
  },
  {
    id: 4,
    caption: "Dark roasted Kozhikode Beef Varattu with toasted coconut slivers & aromatic Malabar Ghee Rice! 🍛✨ #BeefRoast #NaadanFood",
    likes: "1.8k",
    comments: "94",
    image: "./images/jds_beef_varattu.jpg",
    tag: "SIGNATURE COMBO"
  },
  {
    id: 5,
    caption: "Evening Karak Chai & traditional Unnakaya snacks on Parambath Road! Perfect pitstop on long drives. ☕🫓 #EveningSnacks",
    likes: "1.2k",
    comments: "63",
    image: "./images/jds_malabar_snacks.jpg",
    tag: "EVENING CHAI"
  },
  {
    id: 6,
    caption: "Quarter Charcoal Alfaham Chicken hot off the red-hot embers! Served with fresh Kubboos flatbread. 🌶️🔥 #AlfahamGrill",
    likes: "1.5k",
    comments: "78",
    image: "./images/jds_alfaham.jpg",
    tag: "CHARCOAL GRILL"
  }
];

// REAL LOGO BRAND COMPONENT
const RealBrandLogo = ({ className = "" }) => (
  <div className={`flex items-center gap-3.5 group cursor-pointer ${className}`}>
    <div className="relative w-11 h-11 rounded-full bg-gradient-to-tr from-[#c4832a] via-[#f2c879] to-[#c1503c] p-[2px] shadow-lg shadow-[#e3a23c]/25 group-hover:scale-105 transition-transform duration-300">
      <div className="w-full h-full bg-[#0d0805] rounded-full flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#e3a23c]/20 to-transparent" />
        <span className="font-serif font-black text-lg text-[#f5ecdc] tracking-tighter leading-none relative z-10">JD'S</span>
        <span className="font-mono text-[7px] text-[#e3a23c] font-bold tracking-widest uppercase relative z-10">KITCHEN</span>
      </div>
    </div>
    <div>
      <div className="flex items-center gap-1.5">
        <span className="font-serif font-extrabold tracking-tight text-xl text-[#f5ecdc] block leading-none group-hover:text-[#e3a23c] transition-colors">
          JD'S KITCHEN
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>
      <span className="font-mono text-[9px] text-[#e3a23c] tracking-[0.2em] uppercase font-bold block mt-0.5">
        Malabar Biryani &amp; Mandi
      </span>
    </div>
  </div>
);

// CULINARY DUM-COOKING PRELOADER COMPONENT
const CulinaryDumPreloader = ({ progress }) => {
  let statusMessage = "Igniting Timber Coals & Clay Pot...";
  if (progress > 30 && progress <= 65) {
    statusMessage = "Sealing Dum with Spiced Aged Kaima Rice...";
  } else if (progress > 65 && progress <= 90) {
    statusMessage = "Infusing Wayanad Cardamom & Pure Ghee Aroma...";
  } else if (progress > 90) {
    statusMessage = "Unsealing Dum Counter for Kozhikode...";
  }

  return (
    <div className="relative flex flex-col items-center justify-center">
      
      {/* Dum Pot SVG Animation */}
      <div className="relative w-44 h-44 mb-6 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#c1503c]/40 via-[#e3a23c]/20 to-transparent blur-xl animate-pulse" />

        <svg width="160" height="160" viewBox="0 0 160 160" className="overflow-visible relative z-10">
          <g className="opacity-80">
            <motion.path
              d="M 60 45 C 55 30, 65 20, 60 5"
              fill="none"
              stroke="#f2c879"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0, y: 10 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.8, 0], y: [-5, -20] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            />
            <motion.path
              d="M 80 40 C 75 25, 85 15, 80 0"
              fill="none"
              stroke="#e3a23c"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0, y: 10 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.9, 0], y: [-5, -25] }}
              transition={{ repeat: Infinity, duration: 1.8, delay: 0.4, ease: "easeInOut" }}
            />
            <motion.path
              d="M 100 45 C 95 30, 105 20, 100 5"
              fill="none"
              stroke="#f2c879"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0, y: 10 }}
              animate={{ pathLength: [0, 1, 0], opacity: [0, 0.8, 0], y: [-5, -20] }}
              transition={{ repeat: Infinity, duration: 2.5, delay: 0.2, ease: "easeInOut" }}
            />
          </g>

          <ellipse cx="80" cy="138" rx="55" ry="12" fill="#1f1109" stroke="#c1503c" strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx="50" cy="138" r="3" fill="#e3a23c" className="animate-ping" />
          <circle cx="80" cy="140" r="4" fill="#c1503c" className="animate-pulse" />
          <circle cx="110" cy="137" r="3" fill="#e3a23c" className="animate-ping" />

          <path d="M 35 75 Q 30 120, 80 125 Q 130 120, 125 75 Z" fill="url(#clayGradient)" stroke="#e3a23c" strokeWidth="2" />
          <path d="M 30 80 Q 20 85, 33 95" fill="none" stroke="#f2c879" strokeWidth="3" strokeLinecap="round" />
          <path d="M 130 80 Q 140 85, 127 95" fill="none" stroke="#f2c879" strokeWidth="3" strokeLinecap="round" />
          <rect x="34" y="66" width="92" height="10" rx="4" fill="#f5ecdc" stroke="#c4832a" strokeWidth="1.5" />
          <path d="M 40 66 Q 80 40, 120 66 Z" fill="url(#lidGradient)" stroke="#e3a23c" strokeWidth="2" />
          <circle cx="80" cy="46" r="6" fill="#f2c879" stroke="#140c08" strokeWidth="1.5" />

          <defs>
            <linearGradient id="clayGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4a2511" />
              <stop offset="50%" stopColor="#2b1408" />
              <stop offset="100%" stopColor="#140904" />
            </linearGradient>
            <linearGradient id="lidGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#3d1d0c" />
              <stop offset="100%" stopColor="#6e3618" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle cx="88" cy="88" r="80" fill="none" stroke="#1a110a" strokeWidth="4" />
          <circle
            cx="88"
            cy="88"
            r="80"
            fill="none"
            stroke="url(#progressGlow)"
            strokeWidth="4"
            strokeDasharray={502}
            strokeDashoffset={502 - (502 * progress) / 100}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
          <defs>
            <linearGradient id="progressGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e3a23c" />
              <stop offset="50%" stopColor="#f2c879" />
              <stop offset="100%" stopColor="#c1503c" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <RealBrandLogo className="mb-2" />

      <div className="h-6 mb-6">
        <motion.p
          key={statusMessage}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="font-sans text-xs text-[#c9b59c] font-light tracking-wide text-center"
        >
          {statusMessage}
        </motion.p>
      </div>

      <div className="w-56 h-1.5 bg-[#1f130b] rounded-full overflow-hidden mb-2 border border-[#f5ecdc]/10">
        <div
          className="h-full bg-gradient-to-r from-[#e3a23c] via-[#f2c879] to-[#c1503c] transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>
      <span className="font-mono text-[11px] text-[#e3a23c] font-bold">{progress}%</span>

    </div>
  );
};

// 3D EMBER PARTICLE CANVAS SYSTEM
const EmberParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const numParticles = 65;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000,
      size: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.7 + 0.3,
      color: Math.random() > 0.4 ? '#e3a23c' : Math.random() > 0.5 ? '#f2c879' : '#c1503c'
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += Math.sin(p.y * 0.01) * 0.5;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }

        const perspective = 800 / (800 + p.z);
        const drawX = (p.x - canvas.width / 2) * perspective + canvas.width / 2;
        const drawY = (p.y - canvas.height / 2) * perspective + canvas.height / 2;
        const drawSize = p.size * perspective * 1.5;

        ctx.beginPath();
        ctx.arc(drawX, drawY, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity * (1 - p.z / 1000);
        ctx.shadowBlur = 12 * perspective;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />;
};

// INTERACTIVE 3D CARD TILT WRAPPER
const ThreeDCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className={`relative transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
};

// 3D TASTE RADAR CHART
const TasteRadarChart = ({ profile }) => {
  const values = [profile.spice, profile.ghee, profile.aroma, profile.smoky, profile.tenderness];
  const size = 260;
  const center = size / 2;
  const radius = 90;

  const getCoordinates = (index, val) => {
    const angle = (Math.PI * 2 / 5) * index - Math.PI / 2;
    const r = (val / 5) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  const points = values.map((v, i) => {
    const { x, y } = getCoordinates(i, v);
    return `${x},${y}`;
  }).join(" ");

  const webRings = [1, 2, 3, 4, 5].map((lvl) => {
    return [0, 1, 2, 3, 4].map((i) => {
      const { x, y } = getCoordinates(i, lvl);
      return `${x},${y}`;
    }).join(" ");
  });

  return (
    <div className="relative w-[260px] h-[260px] mx-auto flex items-center justify-center">
      <svg width={size} height={size} className="overflow-visible">
        {webRings.map((ring, idx) => (
          <polygon key={idx} points={ring} fill="none" stroke="#f5ecdc" strokeOpacity={0.08 + idx * 0.03} strokeWidth="1" />
        ))}
        {[0, 1, 2, 3, 4].map((i) => {
          const { x, y } = getCoordinates(i, 5);
          return <line key={i} x1={center} y1={center} x2={x} y2={y} stroke="#f5ecdc" strokeOpacity="0.15" strokeDasharray="3 3" />;
        })}
        <polygon points={points} fill="rgba(227,162,60,0.5)" stroke="#e3a23c" strokeWidth="2.5" />
      </svg>
    </div>
  );
};

// IMAGE COMPONENT WITH FALLBACKS
const ImageWithFallback = ({ src, fallbackSrc, alt, className }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-amber-950/30 ${className}`}>
      {!isLoaded && <div className="absolute inset-0 bg-amber-950/40 animate-pulse z-10" />}
      <img
        src={imgSrc}
        alt={alt}
        onError={() => setImgSrc(fallbackSrc || "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='%231f1610'/></svg>")}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/TTVe3f8395hx39yf9";
const REAL_JDS_COURTYARD_PHOTO = "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWnomhgJF0O2WtYRUTDCw99JJHSv2tqu0tY1Xtn2k2z5mjVXNr0tlEJIwkiQBT5DhCYVD_2o4Gr3YpYOnwP9vj82-DSv3ew6RW3NePGeskuk3-lhTsO1OlpSMqeTpzgeHUWVikroOZaPilhR=s1360-w1360-h1020-rw";

const REAL_GOOGLE_REVIEWS = [
  {
    id: 1,
    name: "Sanoop Balan",
    reviewerBadge: "Local Guide · 304 reviews",
    stars: 5,
    when: "4 months ago",
    photoTag: "Timber Courtyard & Parking",
    photo: REAL_JDS_COURTYARD_PHOTO,
    comment: "Ample parking on-site is a huge relief compared to cramped roadside spots nearby. The timber roof courtyard is very well maintained with clean, spacious restrooms for families."
  },
  {
    id: 2,
    name: "Nafiz Kenzie",
    reviewerBadge: "Google Reviewer · 6 reviews",
    stars: 5,
    when: "4 weeks ago",
    photoTag: "Malabar Beef Dum Biryani",
    photo: "./images/jds_beef_biryani_review.jpg",
    comment: "Ordered the beef biryani — meat was extremely tender and flavorful, rice was perfectly cooked with rich Malabar dum spices. Easily one of the best beef biryanis around!"
  },
  {
    id: 3,
    name: "Gineesh Kannan",
    reviewerBadge: "Local Guide · 129 reviews",
    stars: 5,
    when: "8 months ago",
    photoTag: "Arabian Chicken Mandi",
    photo: "./images/jds_mandi_review.jpg",
    comment: "Lagoon chicken biryani and Kozhi Nirachath are awesome! Ample parking space and a great outdoor tea and snack counter if you're on a long drive."
  },
  {
    id: 4,
    name: "Vishnu Chandra",
    reviewerBadge: "Local Guide · 630 reviews",
    stars: 4,
    when: "7 months ago",
    photoTag: "Evening Malabar Tea & Snacks",
    photo: "./images/jds_malabar_snacks.jpg",
    comment: "Wide variety of evening snacks and naadan food! Biryani is really nice and the porotta with beef roast is great for dinner."
  },
  {
    id: 5,
    name: "Ridaal",
    reviewerBadge: "Local Guide · 13 reviews",
    stars: 5,
    when: "1 year ago",
    photoTag: "Ghee Rice & Beef Varattu",
    photo: "./images/jds_beef_varattu.jpg",
    comment: "Best biryani spot around. Beef and chicken biryani are generous portions, and the beef varattu stew is just as impressive."
  },
  {
    id: 6,
    name: "Muhammed Sinan",
    reviewerBadge: "Google Reviewer · 11 reviews",
    stars: 5,
    when: "2 years ago",
    photoTag: "Charcoal Alfaham Chicken",
    photo: "./images/jds_alfaham.jpg",
    comment: "Very nice ambience and friendly staff. The biryani and ghee rice combo is a must-try item, alongside their evening Malabar tea snacks."
  }
];

const TOP_MAPS_SUGGESTED_DISHES = [
  {
    id: 1,
    name: "Kozhikode Malabar Beef Dum Biryani",
    price: 180,
    rating: "5.0 ★",
    reviewerName: "Nafiz Kenzie",
    reviewerBadge: "Verified Diner · 4 weeks ago",
    quote: "Ordered the beef biryani — meat was tender and flavourful, with perfectly cooked, richly spiced rice. One of the best beef biryanis around!",
    image: "./images/jds_beef_biryani_review.jpg",
    fallback: "./images/jds_biryani_hero_1786025415940.jpg",
    highlight: "REVIEWED AS #1 BIRYANI",
    profile: { spice: 4, ghee: 5, aroma: 5, smoky: 3, tenderness: 5, dumTime: "4.5 Hours Dum Cooking", riceType: "Aged Kaima Short-Grain Rice" }
  },
  {
    id: 2,
    name: "Lagoon Chicken Biryani & Mandi",
    price: 220,
    rating: "5.0 ★",
    reviewerName: "Gineesh Kannan",
    reviewerBadge: "Local Guide · 129 reviews",
    quote: "Lagoon chicken biryani is top-notch and the Kozhi Nirachath is awesome! Great outdoor tea counter for long drives.",
    image: "./images/jds_mandi_review.jpg",
    fallback: "./images/jds_mandi_dish_1786025430741.jpg",
    highlight: "TOP NOTCH SIGNATURE",
    profile: { spice: 3, ghee: 4, aroma: 5, smoky: 4, tenderness: 5, dumTime: "Smoldering Timber Pit", riceType: "Long-Grain Malabar Rice" }
  },
  {
    id: 3,
    name: "Ghee Rice & Beef Varattu Combo",
    price: 210,
    rating: "5.0 ★",
    reviewerName: "Muhammed Sinan",
    reviewerBadge: "Verified Diner · 11 reviews",
    quote: "The ambience is very nice and staff friendly. The ghee rice & beef roast combo is a must-try alongside the evening snacks!",
    image: "./images/jds_beef_varattu.jpg",
    fallback: "./images/jds_courtyard_1786025445110.jpg",
    highlight: "MUST-TRY COMBO",
    profile: { spice: 5, ghee: 5, aroma: 4, smoky: 4, tenderness: 4, dumTime: "Slow Wok Roasted", riceType: "Pure Malabar Ghee Rice" }
  }
];

const MENU_ITEMS = [
  {
    id: 1,
    name: "Malabar Beef Dum Biryani",
    category: "Biryani & Mandi",
    price: 180,
    tag: "TODAY'S SPECIAL",
    description: "Slow dum-cooked Malabar spices with tender beef chunk, aged short-grain Kaima rice, ghee-roasted cashews & raisins.",
    image: "./images/jds_beef_biryani_review.jpg",
    fallback: "./images/jds_biryani_hero_1786025415940.jpg",
    profile: { spice: 4, ghee: 5, aroma: 5, smoky: 3, tenderness: 5, dumTime: "4.5 Hours Dum", riceType: "Aged Kaima Rice" }
  },
  {
    id: 2,
    name: "Special Arabian Chicken Mandi",
    category: "Biryani & Mandi",
    price: 220,
    tag: "HOUSE FAVORITE",
    description: "Fragrant Arabian-style rice cooked over smoldering timber with succulent marinated chicken, garlic toum & spicy tomato salsa.",
    image: "./images/jds_mandi_review.jpg",
    fallback: "./images/jds_mandi_dish_1786025430741.jpg",
    profile: { spice: 2, ghee: 3, aroma: 4, smoky: 5, tenderness: 5, dumTime: "Smoldering Timber Pit", riceType: "Arabian Basmati" }
  },
  {
    id: 3,
    name: "Charcoal Alfaham Chicken",
    category: "Grill & Combos",
    price: 160,
    tag: "SMOKY DELIGHT",
    description: "Quarter chicken marinated in Arabian red spices, flame-grilled over coconut charcoal, served with Kubboos & pickled veggies.",
    image: "./images/jds_alfaham.jpg",
    fallback: "./images/jds_courtyard_1786025445110.jpg",
    profile: { spice: 4, ghee: 2, aroma: 4, smoky: 5, tenderness: 4, dumTime: "Flame Charcoal Grilled", riceType: "Kubboos Flatbread" }
  },
  {
    id: 4,
    name: "Ghee Rice & Beef Varattu Combo",
    category: "Grill & Combos",
    price: 210,
    tag: "AUTHENTIC CLASSIC",
    description: "Pure aromatic ghee rice paired with traditional Kozhikode dark roasted spicy beef roast and coconut slivers.",
    image: "./images/jds_beef_varattu.jpg",
    fallback: "./images/jds_biryani_hero_1786025415940.jpg",
    profile: { spice: 5, ghee: 5, aroma: 4, smoky: 4, tenderness: 4, dumTime: "Slow Wok Roasted", riceType: "Malabar Ghee Rice" }
  }
];

const ROUTE_PILLS = [
  { name: "From Kozhikode Railway Station", dist: "18 km", time: "28 mins", url: "https://www.google.com/maps/dir/Kozhikode+Railway+Station/JD's+Kitchen+Parambath+Kozhikode" },
  { name: "From Calicut Airport (CCJ)", dist: "32 km", time: "45 mins", url: "https://www.google.com/maps/dir/Calicut+International+Airport/JD's+Kitchen+Parambath+Kozhikode" },
  { name: "From Cyberpark / Hilite City", dist: "14 km", time: "22 mins", url: "https://www.google.com/maps/dir/Cyberpark+Kozhikode/JD's+Kitchen+Parambath+Kozhikode" }
];

export default function JDsKitchen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedFlavorDish, setSelectedFlavorDish] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(ROUTE_PILLS[0]);
  const [orderForm, setOrderForm] = useState({ name: "", phone: "", item: "Malabar Beef Dum Biryani", qty: 1 });

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const heroY = useTransform(smoothProgress, [0, 0.25], [0, 140]);
  const heroScale = useTransform(smoothProgress, [0, 0.25], [1, 1.08]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0.2]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 25);
    return () => clearInterval(timer);
  }, []);

  const filteredMenuItems = activeCategory === "All"
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const scrollToContactOrder = (itemName = null) => {
    if (itemName) {
      setOrderForm((prev) => ({ ...prev, item: itemName }));
    }
    const el = document.getElementById('contact-order');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const text = `Hello JD's Kitchen, I would like to order:\nName: ${orderForm.name}\nPhone: ${orderForm.phone}\nItem: ${orderForm.item} (Qty: ${orderForm.qty})`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#0d0805] text-[#f5ecdc] font-sans antialiased selection:bg-[#e3a23c] selection:text-[#140c08] relative overflow-x-hidden">
      
      {/* 3D EMBER CANVAS SYSTEM */}
      <EmberParticleCanvas />

      {/* PERSISTENT CINEMATIC PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#e3a23c] via-[#f2c879] to-[#c1503c] z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* CULINARY DUM-COOKING PRELOADER */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: EASE_CINEMATIC } }}
            className="fixed inset-0 z-50 bg-[#0d0805] flex flex-col items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: EASE_CINEMATIC }}
            >
              <CulinaryDumPreloader progress={progress} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER WITH REAL LOGO & INSTAGRAM ICON */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE_CINEMATIC }}
        className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl bg-[#0d0805]/85 border-b border-[#f5ecdc]/10 px-6 py-4"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="#top">
            <RealBrandLogo />
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#c9b59c]">
            <a href="#maps-choice" className="hover:text-[#e3a23c] transition-colors">Top Suggested</a>
            <a href="#about" className="hover:text-[#e3a23c] transition-colors">Story</a>
            <a href="#menu" className="hover:text-[#e3a23c] transition-colors">Menu</a>
            <a href="#instagram" className="hover:text-[#e3a23c] transition-colors flex items-center gap-1.5 text-[#e3a23c]">
              <Instagram className="w-4 h-4" /> Instagram Feed
            </a>
            <button onClick={() => scrollToContactOrder()} className="hover:text-[#e3a23c] transition-colors">Contact &amp; Order</button>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              title="Visit JD's Kitchen Official Instagram"
              className="p-2.5 rounded-full bg-[#1a110a] border border-[#f5ecdc]/15 text-[#e3a23c] hover:bg-[#e3a23c] hover:text-[#140c08] transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>

            <button
              onClick={() => scrollToContactOrder()}
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-[#e3a23c] to-[#c4832a] text-[#140c08] font-semibold text-xs tracking-wider uppercase shadow-lg hover:scale-105 transition-all"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Utensils className="w-3.5 h-3.5" /> Order Now
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* HERO SECTION */}
      <section id="top" className="relative pt-32 pb-24 md:pt-44 md:pb-36 min-h-screen flex items-center overflow-hidden">
        <motion.div
          style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          <ImageWithFallback
            src="./images/jds_beef_biryani_review.jpg"
            fallbackSrc="./images/jds_courtyard_1786025445110.jpg"
            alt="JD's Kitchen Malabar Biryani Hero"
            className="w-full h-full object-cover filter brightness-[0.38] contrast-[1.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0805] via-[#0d0805]/60 to-transparent" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <motion.div variants={heroContainerVariants} initial="initial" animate="animate" className="max-w-4xl">
            <motion.div variants={fadeInUpVariants} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>OPEN DAILY • Dum Counter Active (11:30 AM Onwards)</span>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h1
                variants={textRevealVariants}
                className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#f5ecdc] leading-[1.05]"
              >
                Malabar biryani, <br />
                <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#f2c879] via-[#e3a23c] to-[#c4832a]">
                  cooked the way Kozhikode remembers.
                </span>
              </motion.h1>
            </div>

            <motion.p
              variants={fadeInUpVariants}
              className="text-lg md:text-2xl text-[#c9b59c] font-light max-w-2xl leading-relaxed mb-10"
            >
              A dum-cooked biryani & mandi counter under our open-air timber-roofed courtyard in Parambath, Paloramala. Served with authentic Malabar warmth.
            </motion.p>

            <motion.div variants={fadeInUpVariants} className="flex flex-wrap items-center gap-4 mb-14">
              <a
                href="#maps-choice"
                className="relative group overflow-hidden px-8 py-4 rounded-full bg-gradient-to-r from-[#e3a23c] to-[#c4832a] text-[#140c08] font-bold text-sm tracking-wider uppercase transition-all shadow-xl hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Top Suggested Dishes <ChevronRight className="w-4 h-4" />
                </span>
              </a>

              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 rounded-full bg-[#0d0805]/80 border border-[#f5ecdc]/20 text-[#f5ecdc] font-semibold text-sm tracking-wider uppercase hover:border-[#e3a23c] flex items-center gap-2 backdrop-blur-md"
              >
                <Instagram className="w-4 h-4 text-[#e3a23c]" /> Follow {INSTAGRAM_HANDLE} ↗
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TOP MAPS SUGGESTED DISHES */}
      <section id="maps-choice" className="py-24 md:py-36 bg-[#120a06] relative z-10 border-y border-[#f5ecdc]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#e3a23c] flex items-center justify-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4" /> Real Google Maps Diners' Suggestions
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#f5ecdc] mb-4">
              Top Suggested Dishes by Kozhikode Diners
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOP_MAPS_SUGGESTED_DISHES.map((dish) => (
              <ThreeDCard key={dish.id} className="h-full">
                <div className="h-full rounded-3xl overflow-hidden bg-[#1a110a]/90 border border-[#f5ecdc]/15 shadow-2xl p-6 flex flex-col justify-between group hover:border-[#e3a23c] transition-all">
                  <div>
                    <div className="relative h-56 rounded-2xl overflow-hidden mb-6">
                      <ImageWithFallback src={dish.image} fallbackSrc={dish.fallback} alt={dish.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0d0805]/90 border border-[#e3a23c]/40 text-[#e3a23c] font-mono text-[10px] uppercase font-bold">
                        {dish.highlight}
                      </div>
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#e3a23c] text-[#140c08] font-serif font-bold text-sm">
                        ₹{dish.price}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs text-[#e3a23c] flex items-center gap-1 font-bold">
                          <Star className="w-3.5 h-3.5 fill-[#e3a23c]" /> {dish.rating}
                        </span>
                        <button onClick={() => setSelectedFlavorDish(dish)} className="px-2.5 py-1 rounded-full bg-[#0d0805] border border-[#e3a23c]/40 text-[#e3a23c] text-[10px] font-mono uppercase flex items-center gap-1">
                          <Sliders className="w-3 h-3" /> 3D Taste Radar
                        </button>
                      </div>
                      <h3 className="font-serif font-bold text-xl text-[#f5ecdc] mb-3 group-hover:text-[#e3a23c] transition-colors">{dish.name}</h3>
                      <p className="text-xs text-[#c9b59c] font-light leading-relaxed italic mb-6 bg-[#0d0805]/60 p-4 rounded-xl border border-[#f5ecdc]/5">
                        "{dish.quote}"
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-[#f5ecdc]/10">
                    <button onClick={() => scrollToContactOrder(dish.name)} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#e3a23c] to-[#c4832a] text-[#140c08] font-bold text-xs uppercase shadow-lg">
                      Order Suggested Dish ↓
                    </button>
                  </div>
                </div>
              </ThreeDCard>
            ))}
          </div>
        </div>
      </section>

      {/* NEW INSTAGRAM FEED & POSTS SECTION */}
      <section id="instagram" className="py-24 md:py-36 bg-[#0d0805] relative z-10 border-b border-[#f5ecdc]/10">
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-900/60 to-pink-900/60 border border-pink-500/30 text-pink-400 font-mono text-xs uppercase tracking-wider mb-4 hover:scale-105 transition-transform"
            >
              <Instagram className="w-4 h-4" /> Official Instagram Feed • {INSTAGRAM_HANDLE}
            </a>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#f5ecdc] mb-4">
              Behind the Scenes at JD's Kitchen
            </h2>
            <p className="text-[#c9b59c] font-light text-base">
              Explore real moments, daily dum reveals, timber courtyard vibes &amp; customer stories shared on our official Instagram page!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INSTAGRAM_POSTS.map((post) => (
              <ThreeDCard key={post.id}>
                <div className="rounded-3xl overflow-hidden bg-[#1a110a] border border-[#f5ecdc]/15 shadow-2xl flex flex-col justify-between group hover:border-pink-500/50 transition-all">
                  <div>
                    <div className="relative h-64 overflow-hidden">
                      <ImageWithFallback src={post.image} fallbackSrc="./images/jds_biryani_hero_1786025415940.jpg" alt="Instagram Post" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0d0805]/90 border border-pink-500/40 text-pink-400 font-mono text-[10px] font-bold uppercase flex items-center gap-1.5">
                        <Instagram className="w-3 h-3" /> {post.tag}
                      </div>
                      <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="absolute top-3 right-3 p-2 rounded-full bg-[#0d0805]/80 text-[#f5ecdc] hover:text-[#e3a23c]">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-6 h-6 rounded-full bg-[#e3a23c] text-[#140c08] font-serif font-bold text-[10px] flex items-center justify-center">JD</div>
                        <span className="font-mono text-xs text-[#e3a23c] font-bold">{INSTAGRAM_HANDLE}</span>
                      </div>
                      <p className="text-xs text-[#c9b59c] font-light leading-relaxed mb-4">
                        {post.caption}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-[#f5ecdc]/10 flex items-center justify-between font-mono text-xs text-[#c9b59c]">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-pink-400"><Heart className="w-3.5 h-3.5 fill-pink-400" /> {post.likes}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {post.comments}</span>
                    </div>
                    <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="text-[#e3a23c] hover:underline font-bold text-[11px]">
                      View Post ↗
                    </a>
                  </div>
                </div>
              </ThreeDCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-700 via-pink-600 to-amber-500 text-[#f5ecdc] font-bold text-xs uppercase tracking-wider shadow-xl hover:scale-105 transition-transform"
            >
              <Instagram className="w-4 h-4" /> Follow @jdskitchen.official on Instagram ↗
            </a>
          </div>

        </div>
      </section>

      {/* STORY & HERITAGE */}
      <section id="about" className="py-24 md:py-36 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#e3a23c] block mb-3">Why Regulars Keep Coming Back</span>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#f5ecdc] mb-6">The subtle details Kozhikode genuinely talks about.</h2>
              <p className="text-[#c9b59c] text-base md:text-lg font-light mb-8">Located along Parambath Road in Paloramala, Kozhikode, JD's Kitchen preservation of authentic slow dum-cooking and spacious courtyard dining sets us apart.</p>
            </div>
            <div className="lg:col-span-6">
              <ThreeDCard>
                <div className="relative rounded-3xl overflow-hidden border border-[#f5ecdc]/15 shadow-2xl">
                  <ImageWithFallback src={REAL_JDS_COURTYARD_PHOTO} fallbackSrc="./images/jds_courtyard_1786025445110.jpg" alt="Courtyard Real Photo" className="w-full h-[500px] object-cover" />
                </div>
              </ThreeDCard>
            </div>
          </div>
        </div>
      </section>

      {/* REVIEWS GRID */}
      <section id="reviews" className="py-24 md:py-36 bg-[#120a06] border-t border-[#f5ecdc]/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#f5ecdc] mb-4">Real Customer Reviews &amp; Photos</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REAL_GOOGLE_REVIEWS.map((rev) => (
              <div key={rev.id} className="p-6 rounded-3xl bg-[#1a110a] border border-[#f5ecdc]/10 flex flex-col justify-between">
                <div>
                  <div className="relative h-48 rounded-2xl overflow-hidden mb-5">
                    <ImageWithFallback src={rev.photo} fallbackSrc="./images/jds_courtyard_1786025445110.jpg" alt={rev.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-xs text-[#c9b59c] font-light leading-relaxed italic mb-4">"{rev.comment}"</p>
                </div>
                <div className="pt-4 border-t border-[#f5ecdc]/10 flex items-center justify-between">
                  <span className="font-serif font-bold text-sm text-[#f5ecdc]">{rev.name}</span>
                  <span className="font-mono text-[10px] text-[#e3a23c] uppercase">{rev.reviewerBadge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FULL MENU */}
      <section id="menu" className="py-24 md:py-36 relative z-10 border-t border-[#f5ecdc]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-[#f5ecdc]">Our Full Signature Menu</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredMenuItems.map((item) => (
              <div key={item.id} className="rounded-3xl overflow-hidden bg-[#1a110a]/80 border border-[#f5ecdc]/10 p-6">
                <h3 className="font-serif font-bold text-xl text-[#f5ecdc] mb-2">{item.name}</h3>
                <p className="text-sm text-[#c9b59c] mb-4">{item.description}</p>
                <button onClick={() => scrollToContactOrder(item.name)} className="w-full py-3 rounded-xl bg-[#0d0805] border border-[#f5ecdc]/20 text-[#f5ecdc] text-xs uppercase">
                  Order Item ↓
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT & DIRECT ORDER */}
      <section id="contact-order" className="py-24 md:py-36 relative z-10 bg-[#0d0805] border-t border-[#f5ecdc]/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-[#1a110a] border border-[#e3a23c]/30 shadow-2xl space-y-6">
                <h3 className="font-serif text-2xl font-bold text-[#f5ecdc]">Direct WhatsApp Order</h3>
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <input type="text" required value={orderForm.name} onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#0d0805] border border-[#f5ecdc]/20 text-sm text-[#f5ecdc]" placeholder="Your Name" />
                  <input type="tel" required value={orderForm.phone} onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-[#0d0805] border border-[#f5ecdc]/20 text-sm text-[#f5ecdc]" placeholder="Phone Number" />
                  <button type="submit" className="w-full py-4 rounded-xl bg-[#e3a23c] text-[#140c08] font-bold text-xs uppercase">
                    Send Order to WhatsApp ➔
                  </button>
                </form>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="h-[520px] rounded-3xl overflow-hidden border border-[#f5ecdc]/20 shadow-2xl bg-[#120a06]">
                <iframe title="Google Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.8!2d75.7591583!3d11.3539638!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65f84d39af2d7%3A0x474484ee5ed2bbe9!2sJD&#39;s%20Kitchen!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER WITH INSTAGRAM ICON & LINK */}
      <footer className="py-16 bg-[#090503] border-t border-[#f5ecdc]/10 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <RealBrandLogo className="justify-center mb-4" />
          <p className="font-mono text-xs uppercase text-[#e3a23c] tracking-[0.2em] mb-6">Parambath • Paloramala • Kozhikode</p>
          <div className="flex items-center justify-center gap-4 mb-8">
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a110a] border border-[#f5ecdc]/15 text-[#e3a23c] text-xs font-mono hover:bg-[#e3a23c] hover:text-[#140c08] transition-all">
              <Instagram className="w-4 h-4" /> {INSTAGRAM_HANDLE}
            </a>
          </div>
          <p className="text-xs text-[#c9b59c]/60">© {new Date().getFullYear()} JD's Kitchen. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}
