import { useState, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════
// CITY DATA
// ═══════════════════════════════════════════
const CITIES = [
  { id: "bangalore", name: "Bangalore", emoji: "🏙️", nickname: "Namma Bengaluru", tagline: "Garden city, craft beer, filter coffee",
    theme: { bg: "#0a0a0f", orb1: "rgba(76,175,80,0.09)", orb2: "rgba(124,77,255,0.07)", orb3: "rgba(236,64,122,0.05)", particle: "rgba(76,175,80,0.2)" } },
  { id: "mumbai", name: "Mumbai", emoji: "🌊", nickname: "Aamchi Mumbai", tagline: "Sea links, street food, city that never sleeps",
    theme: { bg: "#070b14", orb1: "rgba(33,150,243,0.10)", orb2: "rgba(0,188,212,0.08)", orb3: "rgba(100,181,246,0.06)", particle: "rgba(100,181,246,0.25)" } },
  { id: "delhi", name: "Delhi", emoji: "🕌", nickname: "Dilliwalon Ki Dilli", tagline: "Heritage, rooftops, Mughlai feasts",
    theme: { bg: "#0f0a07", orb1: "rgba(255,167,38,0.09)", orb2: "rgba(212,165,116,0.08)", orb3: "rgba(255,112,67,0.06)", particle: "rgba(255,183,77,0.2)" } },
];

const VIBE_OPTIONS = [
  {
    id: "sundress",
    emoji: "🌸",
    title: "Sundress Vibes",
    subtitle: "Light, breezy & effortlessly romantic",
    tags: ["Cute Café", "Park Walk", "Golden Hour", "Bookstore Browse"],
    gradient: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 30%, #f48fb1 70%, #ec407a 100%)",
    accent: "#ec407a",
    description: "Think sun-dappled cafés, walks under old trees, sharing dessert and easy laughter. The kind of date that feels like a rom-com montage.",
    icon: "☀️",
  },
  {
    id: "finedine",
    emoji: "🥂",
    title: "Fine-Dine Vibes",
    subtitle: "Elegant, intimate & unforgettable",
    tags: ["Fine Dining", "Long Drive", "Rooftop Views", "Moonlit Walk"],
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 70%, #533483 100%)",
    accent: "#d4a574",
    description: "Dress sharp. A restaurant where they know the wine list, a drive with city lights blurring past, and a walk somewhere quiet under the stars.",
    icon: "🌙",
  },
  {
    id: "event",
    emoji: "🎭",
    title: "Something Electric",
    subtitle: "Unique, adventurous & Instagram-worthy",
    tags: ["Live Events", "Pop-ups", "Art Shows", "Concerts"],
    gradient: "linear-gradient(135deg, #ff6b35 0%, #f7c59f 25%, #efa48b 50%, #e76f51 100%)",
    accent: "#ff6b35",
    description: "Skip the predictable. Find that underground gig, the pop-up everyone's talking about, or the art show that'll give you both something to talk about for weeks.",
    icon: "⚡",
  },
];

// ═══════════════════════════════════════════
// DATING TIPS — shown on loading screen
// ═══════════════════════════════════════════
const DATING_TIPS = [
  { emoji: "💐", tip: "Stop at a flower shop on the way. Not a bouquet — just one stem. A tuberose, a lily, whatever catches your eye. Hand it to her when she gets in.", category: "prep" },
  { emoji: "🌸", tip: "Tuck a small flower into the sun visor of your car. When she pulls it down to check the mirror — surprise. Effortless.", category: "prep" },
  { emoji: "🌷", tip: "If you pass a flower vendor during the date, buy her one on the spot. It costs ₹20 and she'll remember it for months.", category: "moves" },
  { emoji: "🌻", tip: "Learn her favourite flower. Not now — during the date. Slip it into conversation: \"Sunflowers or jasmine?\" Then remember it forever.", category: "moves" },
  { emoji: "🌺", tip: "A flower in your jacket pocket instead of a pocket square. A little ridiculous, a little charming, entirely unforgettable.", category: "prep" },
  { emoji: "🪻", tip: "If the restaurant has flowers on the table, when she steps away, move one to her side. She won't mention it. She'll smile.", category: "moves" },
  { emoji: "🌹", tip: "The morning after a good date, text a photo of flowers from a shop: \"These reminded me of last night.\" Don't buy them. Just plant the seed.", category: "moves" },
  { emoji: "🚪", tip: "Open every door. The car door, the restaurant door, the café door. Don't announce it. Just do it every single time.", category: "moves" },
  { emoji: "🪑", tip: "Pull her chair out. Quietly. No fanfare. If she looks surprised — good. It means nobody's done it in a while.", category: "moves" },
  { emoji: "🚶", tip: "Walk on the road side of the sidewalk. When you cross, gently switch. She may not notice consciously, but she'll feel it.", category: "moves" },
  { emoji: "🧥", tip: "Bring a jacket you don't mind giving away. When the evening cools, drape it over her shoulders before she shivers.", category: "prep" },
  { emoji: "💳", tip: "When the bill comes, don't look at it. Hand your card. No commentary. If she insists, say \"You can get the chai after.\"", category: "moves" },
  { emoji: "📱", tip: "Phone face-down the entire evening. Don't glance at it once. In a world of half-attention, full presence is magnetic.", category: "moves" },
  { emoji: "🚗", tip: "Open the car door for her — getting in and getting out. Walk around to her side. Yes, every time.", category: "moves" },
  { emoji: "👂", tip: "When she talks about something she loves, stop everything and listen. Ask the follow-up question nobody else asks.", category: "moves" },
  { emoji: "😊", tip: "Compliment something she chose, not something she was born with. \"That colour is incredible on you\" beats \"you're pretty.\"", category: "moves" },
  { emoji: "⏰", tip: "Arrive early. Check the table, the lighting, the vibe. Be settled and calm when she walks in — not flustered and parking.", category: "prep" },
  { emoji: "🎵", tip: "Build a playlist for the drive. One song she mentioned, one she'd never expect. Music says what words can't.", category: "prep" },
  { emoji: "👃", tip: "Two sprays of cologne on your neck. She should discover it when she leans in close — not from across the parking lot.", category: "prep" },
  { emoji: "🌙", tip: "Extend the evening gently. \"There's a chai spot nearby, want to walk?\" The date after the date is where she decides about you.", category: "moves" },
  { emoji: "🏠", tip: "Walk her to her door, not just her building. Text \"reached home safe?\" twenty minutes later. Bare minimum, but most miss it.", category: "moves" },
  { emoji: "📷", tip: "Offer to take her photo at the golden-hour spot. Frame it well. Send it later. She might just make it her wallpaper.", category: "moves" },
  { emoji: "💬", tip: "Text \"Can't wait for tonight\" a few hours before. Not a paragraph. Six words. Confident. Warm.", category: "prep" },
  { emoji: "🪞", tip: "Iron your shirt. Tuck it in or don't, but make sure it's crisp. A pressed shirt is the quiet flex nobody talks about.", category: "prep" },
];

// ═══════════════════════════════════════════
// SEARCH VARIATIONS PER CITY
// ═══════════════════════════════════════════
const SEARCH_VARIATIONS = {
  bangalore: {
    sundress: [
      { focus: "hidden gem cafés and bakeries", areas: "Indiranagar, Koramangala, Jayanagar", extra: "Aesthetic interiors, Instagram-worthy. Include a quiet park nearby." },
      { focus: "brunch spots and garden cafés", areas: "Whitefield, Sadashivanagar, Malleshwaram", extra: "Outdoor seating, courtyard gardens. Include heritage walks." },
      { focus: "specialty coffee and artisan bakeries", areas: "Church Street, MG Road, Ulsoor", extra: "Third-wave coffee, European patisseries, art bookstores. Include lakeside walks." },
      { focus: "pet-friendly cafés and nature trails", areas: "HSR Layout, Bannerghatta Road, JP Nagar", extra: "Themed cafés, nearby nature like Turahalli. Include sunset viewpoints." },
      { focus: "vintage-themed quirky cafés", areas: "Basavanagudi, Chamrajpet, Rajajinagar", extra: "Old Bangalore charm, heritage areas, Bull Temple area walks." },
      { focus: "lakeside cafés and scenic brunch", areas: "Ulsoor, Sankey Tank, Hebbal Lake", extra: "Cafés near water bodies, rooftop green views, botanical garden walks." },
    ],
    finedine: [
      { focus: "modern Indian fine dining and speakeasy bars", areas: "Lavelle Road, UB City, Vittal Mallya Road", extra: "Tasting menus, chef's table. Include rooftop bars and night drives." },
      { focus: "Asian fine dining and cocktail lounges", areas: "Indiranagar, MG Road, Residency Road", extra: "Japanese, Pan-Asian. Pair with jazz bars. Include scenic drive route." },
      { focus: "European fine dining and wine bars", areas: "Koramangala, Whitefield, Sadashivanagar", extra: "Italian, French cuisine. Include wine tasting venue and scenic drive." },
      { focus: "luxury hotel dining", areas: "ITC Gardenia, Leela Palace, Ritz Carlton", extra: "Private dining rooms, champagne bars. Include luxury drive experience." },
      { focus: "rooftop restaurants with views", areas: "World Trade Center, Brigade Gateway", extra: "High-rise panoramic dining. Include pre-dinner cocktails, Sankey Tank walk." },
    ],
    event: [
      { focus: "live music gigs and comedy shows", areas: "all Bangalore", extra: "Search BookMyShow, Insider.in, The Humming Tree, BFlat. Include food near venue." },
      { focus: "art exhibitions and theatre", areas: "all Bangalore", extra: "Search Ranga Shankara, Jagriti Theatre, 1 Shanthiroad. Include nearby dinner." },
      { focus: "pop-up markets and food festivals", areas: "all Bangalore", extra: "Weekend markets, food truck parks, pottery or painting workshops." },
      { focus: "workshops and creative experiences", areas: "all Bangalore", extra: "Couples pottery, wine tasting, cocktail making, cooking classes." },
      { focus: "standup comedy and open mics", areas: "all Bangalore", extra: "Standup shows, improv nights. Include craft beer spots and late-night eats." },
    ],
  },
  mumbai: {
    sundress: [
      { focus: "seaside cafés and brunch spots", areas: "Bandra, Khar, Carter Road", extra: "Ocean-view cafés, promenade walks, Bandstand sunset. Include bookshop or gallery." },
      { focus: "art district cafés and galleries", areas: "Colaba, Kala Ghoda, Fort", extra: "Heritage cafés, art galleries, NGMA, Colaba Causeway walks. Include Gateway views." },
      { focus: "garden cafés and quiet brunch", areas: "Juhu, Versova, Andheri West", extra: "Beach-side spots, bohemian cafés, Juhu beach walk. Include sunset viewpoint." },
      { focus: "South Bombay heritage cafés", areas: "Marine Drive, Churchgate, Nariman Point", extra: "Iconic Irani cafés, Leopold, Marine Drive walks. Include Oval Maidan area." },
      { focus: "hipster cafés and indie bookshops", areas: "Lower Parel, Worli, Mahalaxmi", extra: "Converted mill cafés, Mahalaxmi Racecourse area walks, Worli Sea Face sunset." },
      { focus: "quaint cafés and nature spots", areas: "Powai, Hiranandani, Aarey", extra: "Lakeside Powai cafés, Aarey nature trails, quiet brunch spots away from city chaos." },
    ],
    finedine: [
      { focus: "rooftop fine dining and cocktail bars", areas: "Lower Parel, Worli, BKC", extra: "High-rise restaurants with skyline views. Include pre-dinner drinks and Worli Sea Face drive." },
      { focus: "Colaba fine dining and speakeasies", areas: "Colaba, Taj area, Apollo Bunder", extra: "Taj Palace restaurants, hidden speakeasies. Include Gateway of India moonlit walk." },
      { focus: "coastal and seafood fine dining", areas: "Bandra, Juhu, Versova", extra: "Upscale seafood, Konkan cuisine. Include Bandra-Worli Sea Link night drive." },
      { focus: "international fine dining", areas: "BKC, Lower Parel, Kamala Mills", extra: "Japanese, Italian, French restaurants. Include wine bars and after-dinner Sea Link drive." },
      { focus: "luxury hotel dining experiences", areas: "Taj, Oberoi, Four Seasons, St Regis", extra: "Chef's table experiences, champagne bars. Include Marine Drive night drive." },
    ],
    event: [
      { focus: "live music and comedy shows", areas: "all Mumbai", extra: "Search BookMyShow, Insider.in, antiSOCIAL, Blue Tokai events. Include dinner nearby." },
      { focus: "art exhibitions and theatre", areas: "all Mumbai", extra: "Search Prithvi Theatre, NCPA, Jehangir Art Gallery. Include nearby restaurants." },
      { focus: "rooftop events and parties", areas: "all Mumbai", extra: "Rooftop screenings, sunset parties, pop-up dinners with city views." },
      { focus: "workshops and unique experiences", areas: "all Mumbai", extra: "Pottery, painting, wine tasting, sailing experiences in Mumbai harbour." },
      { focus: "standup comedy and improv", areas: "all Mumbai", extra: "Standup at Canvas Laugh Club, NCPA. Include craft cocktail bars nearby." },
    ],
  },
  delhi: {
    sundress: [
      { focus: "heritage cafés and garden walks", areas: "Lodhi Garden, Khan Market, Jor Bagh", extra: "Cafés near Lodhi Garden, art galleries, tree-lined Khan Market walks. Include Lodhi Art District." },
      { focus: "hipster cafés and bookshops", areas: "Hauz Khas Village, SDA Market, Green Park", extra: "Lakeside Hauz Khas cafés, indie bookshops, Deer Park walk. Include sunset at the ruins." },
      { focus: "old Delhi food walks and charm", areas: "Chandni Chowk, Jama Masjid, Daryaganj", extra: "Heritage food walks, old Delhi charm, Sunday book market. Include Raj Ghat garden walk." },
      { focus: "garden cafés and brunch spots", areas: "Mehrauli, Saket, Chhatarpur", extra: "Cafés near Qutub Minar, Garden of Five Senses walk, Sanjay Van nature trail." },
      { focus: "artistic cafés and cultural spaces", areas: "Connaught Place, Janpath, Mandi House", extra: "CP's inner circle cafés, National Gallery, Agrasen ki Baoli visit. Include CP walk." },
      { focus: "quiet brunch and nature escapes", areas: "Vasant Kunj, Sainik Farms, Chattarpur", extra: "Farm-to-table cafés, Asola Bhatti wildlife area, peaceful brunch spots away from crowds." },
    ],
    finedine: [
      { focus: "Mughlai fine dining and rooftop bars", areas: "Old Delhi, Daryaganj, Karol Bagh", extra: "Legendary Mughlai restaurants, rooftop terraces with Red Fort views. Include old Delhi night drive." },
      { focus: "modern Indian fine dining", areas: "Lodhi Road, Khan Market, Mehrauli", extra: "Progressive Indian restaurants, wine bars. Include Rashtrapati Bhavan illuminated drive." },
      { focus: "international fine dining and lounges", areas: "Connaught Place, Aerocity, Vasant Vihar", extra: "European, Japanese, Italian. Include cocktail lounges and India Gate night drive." },
      { focus: "luxury hotel dining", areas: "Taj, Oberoi, ITC Maurya, Leela", extra: "Bukhara, Dum Pukht-level dining. Include Rajpath/Kartavya Path moonlit drive." },
      { focus: "rooftop restaurants with heritage views", areas: "Mehrauli, Hauz Khas, Old Delhi", extra: "Dining overlooking Qutub Minar or Hauz Khas ruins. Include moonlit walk." },
    ],
    event: [
      { focus: "live music and Sufi nights", areas: "all Delhi", extra: "Search BookMyShow, Insider.in, Piano Man Jazz Club, Habitat Centre. Include dinner nearby." },
      { focus: "art exhibitions and theatre", areas: "all Delhi", extra: "Search India Habitat Centre, NSD, National Gallery, Bikaner House. Include nearby restaurants." },
      { focus: "pop-up markets and food festivals", areas: "all Delhi", extra: "Dilli Haat, weekend pop-ups, food truck festivals, Mehrauli heritage walks." },
      { focus: "comedy shows and cultural events", areas: "all Delhi", extra: "Standup at Canvas Laugh Club, poetry nights, open mics. Include CP bar crawl." },
      { focus: "workshops and offbeat experiences", areas: "all Delhi", extra: "Pottery in Andretta, Old Delhi walks, cocktail masterclass, heritage walks." },
    ],
  },
};

// ═══════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════
const FloatingParticle = ({ delay, x, size, duration }) => (
  <div style={{ position: "absolute", left: `${x}%`, bottom: "-10px", width: `${size}px`, height: `${size}px`, borderRadius: "50%", background: "rgba(255,255,255,0.15)", animation: `floatUp ${duration}s ease-in-out ${delay}s infinite`, pointerEvents: "none" }} />
);

const PlanCard = ({ item, index, totalItems }) => {
  const colors = ["#ec407a", "#7c4dff", "#00bcd4", "#ff6b35", "#66bb6a"];
  const color = colors[index % colors.length];
  return (
    <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", animation: `slideInLeft 0.6s ease-out ${index * 0.15}s both` }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: "60px", paddingTop: "4px" }}>
        <div style={{ width: "14px", height: "14px", borderRadius: "50%", background: color, boxShadow: `0 0 20px ${color}66`, zIndex: 2, border: "3px solid #0a0a0f" }} />
        {index < totalItems - 1 && <div style={{ width: "2px", flex: 1, minHeight: "60px", background: `linear-gradient(to bottom, ${color}, ${color}33)`, marginTop: "-2px" }} />}
      </div>
      <div
        style={{ flex: 1, background: "rgba(255,255,255,0.04)", backdropFilter: "blur(10px)", borderRadius: "16px", padding: "20px 24px", border: "1px solid rgba(255,255,255,0.08)", marginBottom: "12px", transition: "all 0.3s ease" }}
        onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.borderColor = `${color}44`; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", flexWrap: "wrap", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "22px" }}>{item.emoji}</span>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "#fff", margin: 0, fontWeight: 600 }}>{item.name}</h3>
          </div>
          {item.time && <span style={{ fontSize: "12px", color, background: `${color}18`, padding: "4px 12px", borderRadius: "20px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500, whiteSpace: "nowrap" }}>{item.time}</span>}
        </div>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "14px", color: "rgba(255,255,255,0.65)", margin: 0, lineHeight: 1.7 }}>{item.description}</p>
        {item.tip && (
          <div style={{ marginTop: "12px", padding: "10px 14px", background: `${color}10`, borderRadius: "10px", borderLeft: `3px solid ${color}66` }}>
            <span style={{ fontSize: "12px", color: `${color}cc`, fontFamily: "'DM Sans', sans-serif", fontStyle: "italic" }}>💡 {item.tip}</span>
          </div>
        )}
        {item.cost && <div style={{ marginTop: "10px" }}><span style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", fontFamily: "'DM Sans', sans-serif" }}>Approx: {item.cost}</span></div>}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════
export default function DatePlannerApp() {
  const [city, setCity] = useState(CITIES[0]);
  const [stage, setStage] = useState("landing");
  const [selectedVibe, setSelectedVibe] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loadingText, setLoadingText] = useState("");
  const [currentTip, setCurrentTip] = useState(DATING_TIPS[0]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [error, setError] = useState(null);
  const [mapUrl, setMapUrl] = useState("");
  const [searchRound, setSearchRound] = useState(0);
  const [pastPlans, setPastPlans] = useState([]);
  const [refreshSpin, setRefreshSpin] = useState(false);

  // Rotate loading messages
  useEffect(() => {
    if (stage !== "loading") return;
    const msgs = [
      `Scouring ${city.nickname} for the best spots...`,
      "Checking what's open and trending right now...",
      "Finding hidden gems most people miss...",
      "Reading reviews and ratings...",
      "Mapping out the perfect route...",
      "Polishing the details...",
      "Almost there...",
    ];
    let i = 0;
    setLoadingText(msgs[0]);
    const interval = setInterval(() => { i = (i + 1) % msgs.length; setLoadingText(msgs[i]); }, 2000);
    return () => clearInterval(interval);
  }, [stage, city]);

  // Rotate dating tips
  useEffect(() => {
    if (stage !== "loading") return;
    const shuffled = [...DATING_TIPS].sort(() => Math.random() - 0.5);
    let i = 0;
    setCurrentTip(shuffled[0]);
    const interval = setInterval(() => { i = (i + 1) % shuffled.length; setCurrentTip(shuffled[i]); }, 4500);
    return () => clearInterval(interval);
  }, [stage]);

  const buildMapUrl = (places) => {
    if (!places || places.length === 0) return "";
    return `https://www.google.com/maps/dir/${places.filter((p) => p.name).map((p) => encodeURIComponent(p.name + ", " + city.name)).join("/")}`;
  };

  const buildPrompt = useCallback((vibeId, round, excludePlaces = []) => {
    const cityVariations = SEARCH_VARIATIONS[city.id]?.[vibeId] || [];
    const variation = cityVariations[round % Math.max(cityVariations.length, 1)] || { focus: "best date spots", areas: city.name, extra: "" };
    const exc = excludePlaces.length > 0 ? ` AVOID: ${excludePlaces.join(", ")}.` : "";
    const base = {
      sundress: `Search for "${variation.focus} ${variation.areas} ${city.name}" and plan a casual romantic daytime date. ${variation.extra}${exc} Give 4 stops: café/brunch, scenic walk, activity, golden-hour spot. Real ${city.name} places only.`,
      finedine: `Search for "${variation.focus} ${variation.areas} ${city.name}" and plan an elegant date night. ${variation.extra}${exc} Give 4 stops: cocktails, fine dining, scenic drive, nightcap. Real ${city.name} places only.`,
      event: `Search for "${variation.focus} ${city.name} February 2026" and plan a date around it. ${variation.extra}${exc} Give 4 stops: dinner, main event, post-event hangout, late-night spot. Real current events in ${city.name} only.`,
    };
    return base[vibeId];
  }, [city]);

  const callAPI = useCallback(async (prompt) => {
    const response = await fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 3000,
        system: `You are a date planner for ${city.name}, India. After searching, respond with ONLY a JSON object. No preamble, no markdown fences, no explanation. Start with { and end with }.`,
        tools: [{ type: "web_search_20250305", name: "web_search" }],
        messages: [{
          role: "user",
          content: `${prompt}\n\nReply with ONLY this JSON (no other text):\n{\n  "title": "creative plan name",\n  "summary": "one romantic sentence",\n  "stops": [\n    {"emoji": "☕", "name": "Real Place Name, Area", "time": "4:00 PM", "description": "2 vivid sentences", "tip": "insider tip", "cost": "₹800-1200"}\n  ],\n  "total_budget": "₹X-Y",\n  "what_to_wear": "style tip",\n  "playlist_mood": "spotify search term"\n}\nExactly 4 stops with real ${city.name} places and specific area names.`,
        }],
      }),
    });
    if (!response.ok) throw new Error(`API ${response.status}`);
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    let fullText = "";
    if (data.content && Array.isArray(data.content)) {
      for (const block of data.content) { if (block.type === "text" && block.text) fullText += block.text + "\n"; }
    }
    fullText = fullText.trim();
    if (!fullText) throw new Error("Empty");

    const cleaned = fullText.replace(/```json/gi, "").replace(/```/g, "").trim();
    try { const d = JSON.parse(cleaned); if (d.stops) return d; } catch {}

    // Extract all JSON objects, find the one with "stops"
    const candidates = [];
    let idx = 0;
    while (idx < cleaned.length) {
      if (cleaned[idx] === "{") {
        let depth = 0, inStr = false, esc = false, start = idx;
        for (let j = idx; j < cleaned.length; j++) {
          const ch = cleaned[j];
          if (esc) { esc = false; continue; }
          if (ch === "\\") { esc = true; continue; }
          if (ch === '"') { inStr = !inStr; continue; }
          if (inStr) continue;
          if (ch === "{") depth++;
          if (ch === "}") depth--;
          if (depth === 0) { candidates.push(cleaned.substring(start, j + 1)); idx = j + 1; break; }
          if (j === cleaned.length - 1) idx = j + 1;
        }
      } else { idx++; }
    }
    candidates.sort((a, b) => b.length - a.length);
    for (const c of candidates) {
      if (!c.includes("stops")) continue;
      try { const o = JSON.parse(c); if (o.stops?.length > 0) return o; } catch {}
      try { const o = JSON.parse(c.replace(/[\x00-\x1F\x7F]/g, " ").replace(/,\s*}/g, "}").replace(/,\s*]/g, "]")); if (o.stops?.length > 0) return o; } catch {}
    }

    // Regex fallback
    const stopsMatch = cleaned.match(/"stops"\s*:\s*\[([\s\S]*)\]/);
    if (stopsMatch) {
      const stops = [];
      const re = /\{[^{}]*?"name"\s*:\s*"([^"]+)"[^{}]*?\}/g;
      let m;
      while ((m = re.exec(stopsMatch[1])) !== null) {
        try { stops.push(JSON.parse(m[0])); } catch {
          const g = (key) => { const x = m[0].match(new RegExp(`"${key}"\\s*:\\s*"([^"]*)"`)); return x?.[1] || ""; };
          if (g("name")) stops.push({ emoji: g("emoji") || "📍", name: g("name"), time: g("time"), description: g("description") || "A great spot.", tip: g("tip"), cost: g("cost") });
        }
      }
      if (stops.length >= 2) {
        const g = (key) => { const x = cleaned.match(new RegExp(`"${key}"\\s*:\\s*"([^"]*)"`)); return x?.[1] || ""; };
        return { title: g("title") || `Your ${city.name} Date Plan`, summary: g("summary") || "A curated date across the city's best.", stops, total_budget: g("total_budget"), what_to_wear: g("what_to_wear"), playlist_mood: g("playlist_mood") };
      }
    }
    throw new Error("Parse failed");
  }, [city]);

  const doSearch = useCallback(async (vibe, round, excludePlaces = []) => {
    setStage("loading"); setError(null);
    const prompt = buildPrompt(vibe.id, round, excludePlaces);
    for (let attempt = 0; attempt <= 2; attempt++) {
      try {
        const parsed = await callAPI(prompt);
        if (!parsed?.stops?.length) throw new Error("No stops");
        setPlan(parsed);
        setPastPlans((prev) => [...prev, ...(parsed.stops.map((s) => s.name))]);
        setMapUrl(buildMapUrl(parsed.stops));
        setStage("result");
        return;
      } catch (err) {
        if (attempt === 2) { setError(err.message); setStage("error"); }
      }
    }
  }, [buildPrompt, callAPI]);

  const handleVibeSelect = (vibe) => { setSelectedVibe(vibe); setSearchRound(0); setPastPlans([]); doSearch(vibe, 0, []); };
  const handleRefresh = () => { if (!selectedVibe) return; setRefreshSpin(true); setTimeout(() => setRefreshSpin(false), 600); const n = searchRound + 1; setSearchRound(n); doSearch(selectedVibe, n, pastPlans); };
  const resetApp = () => { setStage("landing"); setSelectedVibe(null); setPlan(null); setError(null); setMapUrl(""); setSearchRound(0); setPastPlans([]); };

  return (
    <div style={{ minHeight: "100vh", background: city.theme.bg, fontFamily: "'DM Sans', sans-serif", overflow: "hidden", position: "relative", transition: "background 0.8s ease" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes floatUp { 0% { transform: translateY(0) scale(1); opacity: 0; } 10% { opacity: 0.6; } 90% { opacity: 0.1; } 100% { transform: translateY(-100vh) scale(0.3); opacity: 0; } }
        @keyframes gentlePulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes heartbeat { 0%, 100% { transform: scale(1); } 25% { transform: scale(1.1); } 50% { transform: scale(1); } 75% { transform: scale(1.05); } }
        @keyframes gradientMove { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes refreshRotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .vibe-card { cursor: pointer; transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); position: relative; overflow: hidden; }
        .vibe-card:hover { transform: translateY(-6px) scale(1.01); }
        .vibe-card::before { content: ''; position: absolute; inset: 0; border-radius: inherit; opacity: 0; transition: opacity 0.4s ease; background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.08) 0%, transparent 60%); }
        .vibe-card:hover::before { opacity: 1; }
        .refresh-btn { cursor: pointer; transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); position: relative; overflow: hidden; }
        .refresh-btn:hover { transform: translateY(-3px); box-shadow: 0 8px 30px rgba(124,77,255,0.3); }
        .refresh-btn:active { transform: translateY(-1px) scale(0.98); }
        .city-pill { cursor: pointer; transition: all 0.35s cubic-bezier(0.23, 1, 0.32, 1); user-select: none; white-space: nowrap; }
        .city-pill:hover { transform: translateY(-2px); }
        ::-webkit-scrollbar { width: 6px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 3px; }
      `}</style>

      {/* Ambient BG — themed per city */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none", transition: "all 0.8s ease" }}>
        <div style={{ position: "absolute", width: "650px", height: "650px", borderRadius: "50%", background: `radial-gradient(circle, ${city.theme.orb1} 0%, transparent 70%)`, top: "-200px", right: "-100px", animation: "gentlePulse 8s ease-in-out infinite", transition: "background 0.8s ease" }} />
        <div style={{ position: "absolute", width: "550px", height: "550px", borderRadius: "50%", background: `radial-gradient(circle, ${city.theme.orb2} 0%, transparent 70%)`, bottom: "-150px", left: "-100px", animation: "gentlePulse 10s ease-in-out 2s infinite", transition: "background 0.8s ease" }} />
        <div style={{ position: "absolute", width: "450px", height: "450px", borderRadius: "50%", background: `radial-gradient(circle, ${city.theme.orb3} 0%, transparent 70%)`, top: "40%", left: "50%", animation: "gentlePulse 12s ease-in-out 4s infinite", transition: "background 0.8s ease" }} />
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={`${city.id}-${i}`} style={{ position: "absolute", left: `${(i * 8.3 + 4) % 100}%`, bottom: "-10px", width: `${2 + (i % 3) * 2}px`, height: `${2 + (i % 3) * 2}px`, borderRadius: "50%", background: city.theme.particle, animation: `floatUp ${12 + (i % 5) * 3}s ease-in-out ${i * 1.3}s infinite`, pointerEvents: "none", transition: "background 0.8s ease" }} />
        ))}
      </div>

      {/* ═══ LANDING ═══ */}
      {stage === "landing" && (
        <div style={{ position: "relative", zIndex: 1, maxWidth: "900px", margin: "0 auto", padding: "32px 20px", animation: "fadeIn 0.8s ease-out" }}>

          {/* ★ CITY SELECTOR ★ */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "36px", animation: "slideUp 0.6s ease-out" }}>
            <div style={{ display: "flex", gap: "6px", padding: "5px", borderRadius: "16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", overflow: "auto" }}>
              {CITIES.map((c) => (
                <div
                  key={c.id}
                  className="city-pill"
                  onClick={() => setCity(c)}
                  style={{
                    padding: "10px 22px",
                    borderRadius: "12px",
                    background: city.id === c.id ? "linear-gradient(135deg, rgba(124,77,255,0.25) 0%, rgba(236,64,122,0.2) 100%)" : "transparent",
                    border: city.id === c.id ? "1px solid rgba(124,77,255,0.35)" : "1px solid transparent",
                    display: "flex", alignItems: "center", gap: "8px",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{c.emoji}</span>
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: 600, color: city.id === c.id ? "#fff" : "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif", transition: "color 0.3s" }}>{c.name}</div>
                    <div style={{ fontSize: "10px", color: city.id === c.id ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)", transition: "color 0.3s", marginTop: "1px" }}>{c.tagline}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "44px", animation: "slideUp 0.8s ease-out 0.1s both" }}>
            <div style={{ fontSize: "12px", letterSpacing: "5px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "16px", fontWeight: 500 }}>
              {city.name} Date Planner
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(34px, 6vw, 56px)", fontWeight: 500, color: "#fff", lineHeight: 1.15, marginBottom: "16px" }}>
              What kind of date<br />
              <span style={{ fontStyle: "italic", background: "linear-gradient(135deg, #ec407a, #d4a574, #7c4dff)", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientMove 4s ease infinite" }}>
                would she like?
              </span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px", maxWidth: "400px", margin: "0 auto", lineHeight: 1.7 }}>
              Pick the vibe. We'll deep-search all of {city.name} and plan every detail.
            </p>
          </div>

          {/* Vibe Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {VIBE_OPTIONS.map((vibe, i) => (
              <div
                key={vibe.id} className="vibe-card"
                onClick={() => handleVibeSelect(vibe)}
                onMouseEnter={() => setHoveredCard(vibe.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: hoveredCard === vibe.id ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.025)",
                  border: `1px solid ${hoveredCard === vibe.id ? `${vibe.accent}44` : "rgba(255,255,255,0.06)"}`,
                  borderRadius: "20px", padding: "24px 28px",
                  animation: `slideUp 0.7s ease-out ${0.25 + i * 0.12}s both`,
                }}
                onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%"); e.currentTarget.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%"); }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: "18px" }}>
                  <div style={{ width: "56px", height: "56px", borderRadius: "14px", background: hoveredCard === vibe.id ? vibe.gradient : "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", flexShrink: 0, transition: "all 0.5s ease", border: `1px solid ${hoveredCard === vibe.id ? "transparent" : "rgba(255,255,255,0.06)"}` }}>
                    {vibe.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", fontWeight: 600, color: hoveredCard === vibe.id ? "#fff" : "rgba(255,255,255,0.85)", transition: "color 0.3s" }}>{vibe.title}</h2>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={hoveredCard === vibe.id ? vibe.accent : "rgba(255,255,255,0.2)"} strokeWidth="2" style={{ transition: "all 0.3s", transform: hoveredCard === vibe.id ? "translateX(4px)" : "translateX(0)" }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", marginBottom: "12px", lineHeight: 1.6 }}>{vibe.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {vibe.tags.map((tag) => (
                        <span key={tag} style={{ fontSize: "10px", padding: "3px 10px", borderRadius: "20px", background: hoveredCard === vibe.id ? `${vibe.accent}18` : "rgba(255,255,255,0.04)", color: hoveredCard === vibe.id ? vibe.accent : "rgba(255,255,255,0.35)", border: `1px solid ${hoveredCard === vibe.id ? `${vibe.accent}25` : "rgba(255,255,255,0.06)"}`, transition: "all 0.3s", fontWeight: 500 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "36px", animation: "slideUp 1s ease-out 0.6s both" }}>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", letterSpacing: "1px" }}>♥ Live web search • Real places • Reshuffle for fresh options</p>
          </div>
        </div>
      )}

      {/* ═══ LOADING ═══ */}
      {stage === "loading" && (
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "40px 20px", animation: "fadeIn 0.5s ease-out" }}>
          <div style={{ position: "relative", width: "80px", height: "80px", marginBottom: "32px" }}>
            <div style={{ width: "80px", height: "80px", border: "2px solid rgba(255,255,255,0.05)", borderTopColor: selectedVibe?.accent || "#ec407a", borderRadius: "50%", animation: "spin 1.2s linear infinite" }} />
            <div style={{ position: "absolute", inset: "12px", border: "2px solid rgba(255,255,255,0.03)", borderBottomColor: selectedVibe?.accent || "#ec407a", borderRadius: "50%", animation: "spin 1.8s linear infinite reverse", opacity: 0.6 }} />
            <div style={{ position: "absolute", inset: "50%", transform: "translate(-50%, -50%)", fontSize: "24px", animation: "heartbeat 1.5s ease-in-out infinite" }}>{selectedVibe?.icon}</div>
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#fff", marginBottom: "12px", textAlign: "center" }}>
            {searchRound > 0 ? "Finding fresh spots..." : `Planning in ${city.name}...`}
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", textAlign: "center", minHeight: "20px" }} key={loadingText}>{loadingText}</p>

          {searchRound > 0 && (
            <div style={{ marginTop: "10px", padding: "5px 14px", borderRadius: "20px", background: "rgba(124,77,255,0.1)", border: "1px solid rgba(124,77,255,0.2)" }}>
              <span style={{ fontSize: "10px", color: "rgba(124,77,255,0.8)" }}>🔍 Round #{searchRound + 1} — skipping {pastPlans.length} seen places</span>
            </div>
          )}

          {/* ★ DATING TIP CARD ★ */}
          <div
            key={currentTip.tip}
            style={{
              marginTop: "40px",
              maxWidth: "400px",
              width: "100%",
              padding: "20px 24px",
              borderRadius: "16px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              animation: "fadeInUp 0.5s ease-out",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <span style={{ fontSize: "28px", lineHeight: 1, flexShrink: 0, marginTop: "2px" }}>{currentTip.emoji}</span>
              <div>
                <div style={{ fontSize: "9px", letterSpacing: "2px", textTransform: "uppercase", color: currentTip.category === "prep" ? "rgba(124,77,255,0.7)" : "rgba(236,64,122,0.7)", marginBottom: "6px", fontWeight: 600 }}>
                  {currentTip.category === "prep" ? "🎯 PRE-DATE PREP" : "♟️ POWER MOVE"}
                </div>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", lineHeight: 1.65, margin: 0 }}>{currentTip.tip}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "32px", width: "180px", height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
            <div style={{ width: "40%", height: "100%", background: `linear-gradient(90deg, transparent, ${selectedVibe?.accent || "#ec407a"}, transparent)`, borderRadius: "2px", animation: "shimmer 1.5s ease-in-out infinite", backgroundSize: "200% 100%" }} />
          </div>
        </div>
      )}

      {/* ═══ ERROR ═══ */}
      {stage === "error" && (
        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "40px 20px", animation: "fadeIn 0.5s ease-out" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>😔</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", color: "#fff", marginBottom: "12px" }}>Search hit a bump</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", textAlign: "center", maxWidth: "400px", marginBottom: "8px", lineHeight: 1.6 }}>Couldn't fetch the plan this time. Let's try again.</p>
          <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <button onClick={() => doSearch(selectedVibe, searchRound, pastPlans)} style={{ background: `linear-gradient(135deg, ${selectedVibe?.accent || "#ec407a"}cc, ${selectedVibe?.accent || "#ec407a"})`, border: "none", borderRadius: "14px", padding: "14px 28px", color: "#fff", cursor: "pointer", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>🔄 Try Again</button>
            <button onClick={() => { const n = searchRound + 1; setSearchRound(n); doSearch(selectedVibe, n, pastPlans); }} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "14px", padding: "14px 28px", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>🎲 Different Angle</button>
            <button onClick={resetApp} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "14px 28px", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "14px", fontFamily: "'DM Sans', sans-serif" }}>← Back</button>
          </div>
        </div>
      )}

      {/* ═══ RESULT ═══ */}
      {stage === "result" && plan && (
        <div style={{ position: "relative", zIndex: 1, maxWidth: "750px", margin: "0 auto", padding: "30px 20px 60px", animation: "fadeIn 0.6s ease-out" }}>
          {/* Top bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", animation: "slideUp 0.5s ease-out", flexWrap: "wrap", gap: "12px" }}>
            <button onClick={resetApp} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "10px 20px", color: "rgba(255,255,255,0.6)", cursor: "pointer", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: "8px", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>← Change vibe</button>
            <button className="refresh-btn" onClick={handleRefresh} style={{ background: "linear-gradient(135deg, #7c4dff 0%, #ec407a 50%, #ff6b35 100%)", backgroundSize: "200% 200%", animation: "gradientMove 4s ease infinite", border: "none", borderRadius: "14px", padding: "12px 24px", color: "#fff", cursor: "pointer", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, display: "flex", alignItems: "center", gap: "10px", zIndex: 1 }}>
              <span style={{ display: "inline-block", fontSize: "18px", animation: refreshSpin ? "refreshRotate 0.6s ease-in-out" : "none" }}>🎲</span> Reshuffle
            </button>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "16px", animation: "fadeIn 0.4s ease-out" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "20px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <span style={{ fontSize: "13px" }}>{city.emoji}</span>
              <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{city.name}</span>
            </div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "20px", background: `${selectedVibe?.accent}15`, border: `1px solid ${selectedVibe?.accent}30` }}>
              <span style={{ fontSize: "13px" }}>{selectedVibe?.emoji}</span>
              <span style={{ fontSize: "11px", color: selectedVibe?.accent, fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase" }}>{selectedVibe?.title}</span>
            </div>
            {searchRound > 0 && (
              <div style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "5px 12px", borderRadius: "20px", background: "rgba(124,77,255,0.1)", border: "1px solid rgba(124,77,255,0.2)" }}>
                <span style={{ fontSize: "10px", color: "#b388ff", fontWeight: 600 }}>🔍 #{searchRound + 1} • {pastPlans.length} explored</span>
              </div>
            )}
          </div>

          {/* Plan Header */}
          <div style={{ marginBottom: "32px", animation: "slideUp 0.6s ease-out 0.1s both" }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 500, color: "#fff", lineHeight: 1.2, marginBottom: "10px" }}>{plan.title}</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "15px", lineHeight: 1.7, maxWidth: "560px" }}>{plan.summary}</p>
          </div>

          {/* Info Pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "32px", animation: "slideUp 0.6s ease-out 0.2s both" }}>
            {plan.total_budget && <div style={{ padding: "8px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "8px" }}><span>💰</span><span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{plan.total_budget}</span></div>}
            {plan.what_to_wear && <div style={{ padding: "8px 16px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "8px" }}><span>👔</span><span style={{ fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>{plan.what_to_wear}</span></div>}
            {plan.playlist_mood && <a href={`https://open.spotify.com/search/${encodeURIComponent(plan.playlist_mood)}`} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 16px", borderRadius: "12px", background: "rgba(30,215,96,0.08)", border: "1px solid rgba(30,215,96,0.2)", display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", transition: "all 0.3s" }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(30,215,96,0.15)"} onMouseLeave={(e) => e.currentTarget.style.background = "rgba(30,215,96,0.08)"}><span>🎵</span><span style={{ fontSize: "13px", color: "rgba(30,215,96,0.8)" }}>Find playlist</span></a>}
          </div>

          {/* Map */}
          {mapUrl && (
            <div style={{ marginBottom: "32px", animation: "slideUp 0.6s ease-out 0.3s both" }}>
              <a href={mapUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", padding: "16px 24px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(66,133,244,0.1) 0%, rgba(52,168,83,0.1) 100%)", border: "1px solid rgba(66,133,244,0.2)", textDecoration: "none", transition: "all 0.3s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(66,133,244,0.18) 0%, rgba(52,168,83,0.18) 100%)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(66,133,244,0.1) 0%, rgba(52,168,83,0.1) 100%)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <span style={{ fontSize: "22px" }}>🗺️</span>
                <div>
                  <div style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>View full route on Google Maps</div>
                  <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>All {plan.stops?.length} stops mapped</div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" /></svg>
              </a>
            </div>
          )}

          {/* Timeline */}
          <div style={{ animation: "slideUp 0.6s ease-out 0.35s both" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", color: "rgba(255,255,255,0.5)", marginBottom: "24px", fontWeight: 400, fontStyle: "italic" }}>The Game Plan</h3>
            {plan.stops?.map((stop, i) => <PlanCard key={`${searchRound}-${i}`} item={stop} index={i} totalItems={plan.stops.length} />)}
          </div>

          {/* Bottom CTA */}
          <div style={{ marginTop: "40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", animation: "slideUp 0.6s ease-out 0.5s both" }}>
            <div style={{ width: "100%", maxWidth: "480px", padding: "22px", borderRadius: "20px", background: "linear-gradient(135deg, rgba(124,77,255,0.06) 0%, rgba(236,64,122,0.06) 50%, rgba(255,107,53,0.06) 100%)", border: "1px solid rgba(124,77,255,0.12)", textAlign: "center" }}>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", marginBottom: "14px", lineHeight: 1.6 }}>
                Not quite right? Every reshuffle does a <span style={{ color: "#b388ff", fontWeight: 600 }}>fresh deep search</span> across different neighborhoods.
              </p>
              <button className="refresh-btn" onClick={handleRefresh} style={{ background: "linear-gradient(135deg, rgba(124,77,255,0.2) 0%, rgba(236,64,122,0.2) 100%)", border: "1px solid rgba(124,77,255,0.35)", borderRadius: "14px", padding: "14px 28px", color: "#fff", cursor: "pointer", fontSize: "14px", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "10px", position: "relative" }}>
                <span style={{ fontSize: "18px", display: "inline-block", animation: refreshSpin ? "refreshRotate 0.6s ease-in-out" : "none" }}>🎲</span> Reshuffle — search again
              </button>
            </div>
            <p style={{ color: "rgba(255,255,255,0.12)", fontSize: "11px", marginTop: "6px" }}>Screenshot the plan you like & send it to the boys for approval 😎</p>
          </div>
        </div>
      )}
    </div>
  );
}
