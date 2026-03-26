"use client";
 
import { useState, useEffect, useRef } from "react";
 
// ─────────────────────────────────────────────────────────────
// DOMAIN DETECTION
// ─────────────────────────────────────────────────────────────
 
function getDomain(idea: string) {
  const l = idea.toLowerCase();
  if (/logistic|transport|deliver|truck|fleet|freight|cargo|dispatch|shipping/.test(l)) return "logistics";
  if (/food|restaurant|tiffin|kitchen|catering|chef|dhaba|cafe|bakery|meal/.test(l)) return "food";
  if (/real estate|property|flat|rent|pg|hostel|plot|broker|builder|interior/.test(l)) return "realestate";
  if (/coach|tutor|education|school|college|course|exam|student|learn|teach|upsc|jee|neet/.test(l)) return "education";
  if (/health|clinic|doctor|fitness|gym|medicine|therapy|wellness|diet|yoga/.test(l)) return "health";
  if (/finance|loan|insurance|invest|trading|stock|bank|credit|fintech|wallet/.test(l)) return "finance";
  if (/fashion|cloth|apparel|brand|beauty|cosmetic|jewel|makeup|salon|saree/.test(l)) return "fashion";
  if (/farm|agri|crop|kisan|mandi|seed|dairy|poultry|harvest/.test(l)) return "agriculture";
  if (/manufactur|factory|production|industrial|machinery|spare|unit/.test(l)) return "manufacturing";
  if (/shop|kirana|retail|store|wholesale|dealer|distributor|vendor/.test(l)) return "retail";
  if (/creator|youtube|instagram|content|blog|podcast|influencer/.test(l)) return "creator";
  if (/ecommerce|d2c|sell online|amazon|flipkart|meesho|shopify|dropship/.test(l)) return "ecommerce";
  if (/agency|consult|freelanc|digital marketing|hr|legal|account/.test(l)) return "agency";
  if (/app|saas|software|platform|tech|startup|founder|api|code|developer|ai tool/.test(l)) return "tech";
  return "general";
}
 
function getStage(idea: string) {
  const l = idea.toLowerCase();
  if (/scale|expand|all over india|pan india|franchise|multiple city|grow/.test(l)) return "scale";
  if (/revenue|earning|monetize|charge|paying|subscription/.test(l)) return "monetize";
  if (/launch|market|promote|get customer|spread|distribute/.test(l)) return "distribute";
  if (/build|develop|building|making|creating|coding|working on|mvp/.test(l)) return "build";
  return "validate";
}
 
// ─────────────────────────────────────────────────────────────
// STEP ENGINE
// Every step: action verb, under 10 minutes, no theory
// ─────────────────────────────────────────────────────────────
 
const STEPS = {
  logistics: {
    validate: [
      "Call one local manufacturer or trader right now. Ask: what is your biggest transport headache? Write their exact words.",
      "Calculate your cost for one delivery: fuel + driver time + loading. Write the number. Compare to what competitors charge.",
      "Message one business owner who ships goods regularly. Ask: who do you use for transport and what do you hate about them?",
      "Visit the nearest industrial area today. Talk to one trader face to face. Ask only: do you need reliable transport?",
    ],
    build: [
      "Get one confirmed paid booking today. Not a lead — actual payment confirmed.",
      "Write your delivery process on paper: booking to drop-off. Find the slowest step. Fix only that.",
      "Create a WhatsApp group with your first 3 clients. Post your rate card right now.",
    ],
    distribute: [
      "Post in one local business WhatsApp group: Reliable transport in [city], fixed rates, on-time guarantee. DM for rates.",
      "Call your best client right now. Ask: do you know one more business that needs transport?",
      "List your service on IndiaMART today. Add vehicle type, routes covered, and contact number.",
    ],
    monetize: [
      "List every cost for your last 5 deliveries. Add 25%. That is your new minimum rate. Quote it from today.",
      "Call one regular client right now. Offer a monthly contract: fixed volume, fixed price. Propose it.",
    ],
    scale: [
      "Write your best route as a step-by-step checklist. Every detail. This is what your next driver follows.",
      "Call 3 contacts in the city you want to expand to. Ask: do you know a reliable local transport partner there?",
    ],
    stuck: "Call one customer right now. Ask: what specifically went wrong last time? Write one word. Fix that.",
  },
 
  food: {
    validate: [
      "Cook your best dish. Give it to 5 people outside your family. Ask each: would you pay this price every week?",
      "Walk into 3 nearby offices. Ask the receptionist: do people here order lunch and from where?",
      "Post in one local WhatsApp group: homemade food, first order free for nearby residents. Count responses.",
    ],
    build: [
      "Get 10 paid orders this week. Not interest — money paid. Start with people you already know.",
      "Set up a single WhatsApp number as your order channel right now. Share it with 20 people today.",
      "Write your kitchen process from buying to delivery. Find the slowest step. Fix only that.",
    ],
    distribute: [
      "Register on Swiggy or Zomato today if not already listed.",
      "Walk into 3 offices within 2 km. Offer a free team lunch trial this week.",
      "Post one photo of your best dish being made on Instagram. Add location, price, WhatsApp number.",
    ],
    monetize: [
      "Calculate food cost on your top 3 dishes: raw materials only. If any item is above 35%, raise the price now.",
      "Message your 10 most regular customers. Offer a weekly subscription: 5 meals prepaid. Do it right now.",
    ],
    scale: [
      "Write every step of your kitchen operation so someone else can run it for 3 days. Start now.",
      "Find one kitchen in another area willing to make your recipes under your brand. Call them today.",
    ],
    stuck: "Call your last 5 customers. Ask which one dish they would order every week. That dish is your business.",
  },
 
  realestate: {
    validate: [
      "Visit 3 properties in your target area today. Talk to owners. Ask: are you thinking of selling or renting?",
      "Post in one local Facebook group: free property advice in [area], no pressure. Count who responds.",
      "Calculate your earning from one deal at your target commission. Write how many deals you need per month.",
    ],
    build: [
      "Close one deal this month. Any deal — rental, sale, referral. Real money from one transaction.",
      "Build a list of 20 properties you know: address, size, price, owner contact. Start now.",
      "Send a PDF with 5 available properties to 3 WhatsApp groups today.",
    ],
    distribute: [
      "List one property on MagicBricks or 99acres now. Real photos. Real price.",
      "Walk into 5 housing societies today. Ask the security: does anyone here want to sell or rent?",
      "Text 10 people: I help people buy and sell property in [area]. Do you know anyone looking?",
    ],
    monetize: [
      "On your next deal, ask for full commission before handing over keys. Make this your policy from today.",
      "Call every client you closed this year. Ask: are you happy? Do you know anyone else looking?",
    ],
    scale: [
      "Pick one 2 km radius. List every available property there. Become the only name people know in that zone.",
      "Hire one junior on commission-only basis today. You split the fee. Zero salary risk.",
    ],
    stuck: "Call one property owner in your area right now. Just introduce yourself. Ask one question.",
  },
 
  education: {
    validate: [
      "Teach 3 students for free this week. At the end, ask each: would your parents pay this amount per month?",
      "Talk to 5 parents in your target area today. Ask only: what do you worry most about with your child's education?",
      "Visit the top coaching center in your subject nearby. Note their fees and batch size. That is your benchmark.",
    ],
    build: [
      "Run one complete batch of 5 students this month. From enrollment to first result.",
      "Record one lesson on your phone right now. Watch it back. Fix the one thing that looks weakest.",
      "Call 10 past students today. Ask: what did you learn from me that actually helped?",
    ],
    distribute: [
      "Post one real student result on your WhatsApp status today. Score, improvement, testimonial — anything real.",
      "Contact one school or college today. Offer a free 1-hour session for their students.",
      "Put up one physical poster near a school or exam center in your area today.",
    ],
    monetize: [
      "Switch to advance payment only for your next enrollment. Full month or full course, paid before class 1.",
      "Create one premium batch: smaller size, higher fee. Offer it to your 5 most serious students now.",
    ],
    scale: [
      "Record your 10 best lessons starting today. First one goes on camera in the next 30 minutes.",
      "Call one more teacher. Offer revenue-share. They teach, you handle enrollment. Propose it today.",
    ],
    stuck: "Message one student who stopped coming. Ask: what made you stop? One message. Send it now.",
  },
 
  health: {
    validate: [
      "Talk to 5 people in your area about the health problem you solve. Ask only how they currently handle it.",
      "Visit one established clinic or gym nearby. Count clients per hour. Note what they pay.",
      "Post in one local group: free consultation this week for anyone struggling with [problem].",
    ],
    build: [
      "See your first 5 paying clients this week. Consultation, session, test — anything with payment.",
      "Write one clear service package: what is included, duration, outcome, price. Put it in a WhatsApp message.",
      "Ask your first 10 clients to leave a Google review today. Send them the direct link.",
    ],
    distribute: [
      "Add your clinic or service to Google Maps today. Real photos. Phone number. Hours.",
      "Partner with one pharmacy nearby today. They refer patients to you. Go talk to them.",
      "Post one health tip on Instagram or a local group. End with your phone number.",
    ],
    monetize: [
      "Introduce one monthly membership today. Message your 10 most regular clients with the offer.",
      "List every service from last month. Find the one that earned most per hour. Promote only that this week.",
    ],
    scale: [
      "Hire one assistant or junior this week. They handle routine tasks. You handle complex cases.",
      "Write the delivery process for your most popular service. Every step. Someone else can follow it.",
    ],
    stuck: "Call one client who stopped coming. Ask: what would have made you continue? One question.",
  },
 
  finance: {
    validate: [
      "Talk to 5 people today. Ask: if you could fix one financial problem right now, what would it be?",
      "Calculate the revenue per client you need to survive. Write the exact number of clients required.",
      "Call one CA or advisor already serving your target client. Ask: what do their clients complain about most?",
    ],
    build: [
      "Close one real transaction this week. One policy, one SIP, one loan referral — real money moving.",
      "Create a one-page financial health checklist for your target client. Share it with 10 people today.",
      "Complete all required registrations or certifications this week. Compliance is your product.",
    ],
    distribute: [
      "Post one financial tip on LinkedIn or WhatsApp today. Useful advice, not a pitch.",
      "Partner with one HR manager at a company. Offer a free financial literacy session for employees.",
      "Ask each of your 5 current clients for one referral today.",
    ],
    monetize: [
      "Propose a retainer to your top 3 clients today. Fixed monthly fee for ongoing review. Call them now.",
      "Find which product earns you most per hour. Make that your primary recommendation this month.",
    ],
    scale: [
      "Train one junior advisor using your exact client script. They handle first meetings. You close.",
      "Create a referral program today: every client who refers someone gets one free review session.",
    ],
    stuck: "Call one person in your network right now. Ask: are you happy with how your money is managed? Listen.",
  },
 
  fashion: {
    validate: [
      "Make 5 samples of your best design. Ask 10 target customers to try them. Count who offers to buy.",
      "Post 3 photos of your product on a real person on Instagram today. Write the price. Count DMs.",
      "Set up a pre-order today. If nobody pre-orders in a week, the design needs to change.",
    ],
    build: [
      "Get your first 20 paid orders any way possible. Instagram, WhatsApp, local market.",
      "Film one reel of your product being worn today. Authentic beats polished. Post it.",
      "Create your sizing guide today with exact measurements. Reduces returns immediately.",
    ],
    distribute: [
      "DM one micro-influencer in your city today. Send a free piece for one honest post.",
      "Set up a Meesho or Glowroad reseller listing today.",
      "Register for one local pop-up or exhibition this month. Do it now.",
    ],
    monetize: [
      "Find your highest-margin product. Make it the hero in all communication this month.",
      "Launch a pre-order for your next collection today. Take money before production.",
    ],
    scale: [
      "Find one contract manufacturer who can produce your designs at scale. One visit. One sample order.",
      "Write your content schedule: 3 posts per week, same 3 formats. Hire a student to post them.",
    ],
    stuck: "Post your best product on your personal WhatsApp status with a price right now. See who asks.",
  },
 
  agriculture: {
    validate: [
      "Visit one local mandi this week. Ask 3 commission agents: what causes farmers the most loss here?",
      "Visit one farmer in your area today. Ask only: what do you struggle with most — inputs, price, or payment?",
      "Find one institutional buyer of your crop. Call them. Ask about their sourcing problem.",
    ],
    build: [
      "Close one real transaction this week. Buy from one farmer, sell to one buyer. Any quantity.",
      "Solve one physical problem this week: a collection point, a payment delay, or a quality issue.",
      "Partner with one input dealer in your target village today. They have the farmer trust already.",
    ],
    distribute: [
      "Go to the nearest KVK or agriculture office today. Tell them what you do. They have farmer networks.",
      "Attend one mandi auction this week. Show up before dawn. Relationships are built there.",
      "Find one successful FPO in your target crop. Ask for a 30-minute meeting this week.",
    ],
    monetize: [
      "Lock in one forward purchase agreement with a buyer today. Fixed quantity, fixed price, 60 days.",
      "Add one value step — grading, cleaning, packaging — that increases per-unit margin. Start this week.",
    ],
    scale: [
      "Write your current area operation as a process a coordinator can run without you. Start now.",
      "Call one bank or NBFC today about linking farmer credit to your platform.",
    ],
    stuck: "Go to the field. Visit one farmer today. Everything unclear becomes clear in one real conversation.",
  },
 
  manufacturing: {
    validate: [
      "Visit 3 potential buyers this week. Ask each: what do you pay per unit and what is your monthly volume?",
      "Get one sample order today. At cost or below. A real purchase order is proof the product sells.",
      "Calculate per-unit cost: raw material + labor + overhead + rejection rate. Compare to market price.",
    ],
    build: [
      "Run one complete production cycle today. Document every problem that comes up.",
      "Find one quality issue in your last batch. Trace it to root cause. Fix only that.",
      "Get your product tested or certified this week if buyers require documentation.",
    ],
    distribute: [
      "List your product on IndiaMART today. Specifications, MOQ, price range, contact number.",
      "Register for one industry trade show in your sector this month. Do it now.",
      "Call 5 distributors in your product category today. Ask who they currently buy from.",
    ],
    monetize: [
      "Call your top 2 raw material suppliers. Ask for a 5% volume discount on monthly orders.",
      "Set a minimum order quantity that makes each order profitable. Implement today.",
    ],
    scale: [
      "Run your current machines on 2 shifts. Hire one more operator for the evening shift today.",
      "Find one contract manufacturer who can make your product as overflow. One call.",
    ],
    stuck: "Call your biggest buyer right now. Ask: what would make you double your monthly order?",
  },
 
  retail: {
    validate: [
      "Stand near your target location for 2 hours. Count people walking by. Ask 3: where do they shop for this?",
      "List your top 10 products by sales. Calculate margin on each. Remove anything below 15%.",
      "Walk into your nearest competitor as a customer. Buy something small. List 3 things they do better.",
    ],
    build: [
      "Make sure your top 3 products are always in stock. Never run out of what sells. Check right now.",
      "Reorganize your display today. Best-selling items at eye level. Do this before tonight.",
      "Start a customer phone number list today. Paper register works. Every buyer goes on it.",
    ],
    distribute: [
      "Add your shop to Google Maps today. Real photos. Phone number. Hours.",
      "Send one WhatsApp to your customer list: new stock arrived, limited quantity. Send now.",
      "Offer one neighboring business a referral deal today. They send customers, you give a commission.",
    ],
    monetize: [
      "Find one product sitting over 60 days. Bundle it with a fast mover at one combined price. Clear it.",
      "Call your top supplier. Ask for 30-day payment terms instead of 15. Most say yes.",
    ],
    scale: [
      "Make sure this shop runs without you for one week. Train one person. Write the process.",
      "Contact one new distributor for a category you do not carry. Add it in the next 30 days.",
    ],
    stuck: "Ask the next 3 customers who walk in: is there anything you could not find here? Write the answers.",
  },
 
  creator: {
    validate: [
      "Look at your last 10 posts. Find the one with the most real engagement. Create only that type this month.",
      "Post one piece of content in the next 90 minutes. Unpolished is fine. Publish it.",
      "DM 5 people who engage with your content. Ask: what do you actually find useful in what I make?",
    ],
    build: [
      "Create and publish one piece of content before you do anything else today. 90 minutes. Go.",
      "Batch create 4 pieces of content today in one 3-hour block. Schedule them across this week.",
      "Pick your single best-performing format. Create only that for the next 30 days.",
    ],
    distribute: [
      "Put all creation energy on your best-performing platform this week. Every other platform pauses.",
      "Leave a real, useful comment on 10 posts from large creators in your niche right now.",
      "Message one creator at your exact size for a collab this week. One message. Send it.",
    ],
    monetize: [
      "Create one paid offer today. Template, guide, consultation. Set a price. Add the link to your bio.",
      "Message your 20 most engaged followers today. Tell them you are launching something. Ask if interested.",
    ],
    scale: [
      "Hire one video editor or assistant this week. You create. They produce. Doubles output.",
      "Write your content process in a Google Doc today. Every step. Hand it to an assistant.",
    ],
    stuck: "Film a 60-second video right now about what you are building and why. Post it before watching it back.",
  },
 
  ecommerce: {
    validate: [
      "List your product on one marketplace today. Any listing. See if anyone clicks before you optimize.",
      "Calculate unit economics: product + packaging + shipping + platform fee + returns. Under 20% margin? Reprice now.",
      "Post in 3 buyer groups today. Offer first 5 orders a discount. Count how many ask for the link.",
    ],
    build: [
      "Get 10 real orders any way possible. Tell people personally. 10 orders teaches you everything.",
      "Take 5 product photos today. Natural light. Clean background. Replace all existing photos.",
      "Set up an abandoned cart message today. Cart added but no purchase = message in 2 hours.",
    ],
    distribute: [
      "Message 20 people today with the product link. Individual messages, not broadcast. Track who buys.",
      "DM 5 micro-influencers under 50,000 followers. Free product for one honest post.",
      "Run a ₹500 ad on Instagram today. One product, one image, one audience. Learn from the data.",
    ],
    monetize: [
      "Create one bundle today. Two best products, 10% off combined. Add to main page.",
      "Email every past customer today. Recommend one product based on what they bought.",
    ],
    scale: [
      "Contact one 3PL warehouse today if you ship over 50 orders per month. Self-fulfillment does not scale.",
      "Double ad spend on your single best-performing creative from last month. Only that creative.",
    ],
    stuck: "Message 5 people who would genuinely want this product. Send the link. See who clicks.",
  },
 
  agency: {
    validate: [
      "Write 3 cold outreach messages today, each specific to one business problem you can see publicly. Send all 3.",
      "Find 5 businesses near you that clearly need what you do. Walk in or call. Offer a free audit.",
      "Ask one past client: what would you have paid someone to fix that you could not find anyone to do?",
    ],
    build: [
      "Overdeliver on one project this week. Then ask for a testimonial and one referral immediately after.",
      "Write one case study today: one client, one problem, one result with a number. Post it on LinkedIn.",
      "Convert your most common service into one fixed-price package. Scope, timeline, deliverable, price.",
    ],
    distribute: [
      "Post one specific result on LinkedIn today. A metric, a transformation. Not what you offer — what happened.",
      "Partner with one complementary service this week. Design + dev. Marketing + content. Refer each other.",
      "Call 5 past clients today. Tell them you have capacity. Ask if they have anything.",
    ],
    monetize: [
      "Raise your rate by 25% for the next new inquiry only. Quote it and see what happens.",
      "Propose a monthly retainer to your 3 best clients today. Fixed payment, fixed deliverables. Call them.",
    ],
    scale: [
      "Hire one junior on project basis this week. Give them your most repeatable task.",
      "Write a process document for your highest-margin service today. Every step. Someone else can deliver it.",
    ],
    stuck: "Call one prospect you have not followed up with in 2 weeks. Ask: are you still looking for help?",
  },
 
  tech: {
    validate: [
      "Message 10 target users today. Ask only: how do you currently handle this problem? Watch what they say.",
      "Write your single riskiest assumption in one sentence. Design one test that disproves it in 48 hours.",
      "Find 3 competing products. Read every 1-star review. Write down the top complaint. That is your angle.",
    ],
    build: [
      "Open your product. Do one full user flow right now. Find the most confusing step. Fix it today.",
      "Message 3 users: can I watch you use this for 10 minutes? Do not explain — just observe.",
      "Write the one thing your product must do perfectly. Kill every feature that does not serve that. Today.",
    ],
    distribute: [
      "Post in one community where your user complains about the problem you solve. Post the problem, not the product.",
      "Email your 10 most active users today. Ask: who else do you know with this exact problem?",
      "Write one article targeting the exact search phrase someone types when they have your problem. Publish today.",
    ],
    monetize: [
      "Add a payment button to your most-used feature today. Set a price. Tell your users.",
      "Email your 20 most active users: paid plan launching next week at [price]. Reply to lock in a discount.",
    ],
    scale: [
      "Find your single best acquisition channel. Put 80% of effort there this month. Cut everything else.",
      "Add one referral prompt to your product today — immediately after the user gets value. Ship it.",
    ],
    stuck: "Close the laptop. Text one real user right now: can I call you for 10 minutes? Do it now.",
  },
 
  general: {
    validate: [
      "Call 5 people who match your target customer. Ask only: how do you handle this problem right now?",
      "Write your most important assumption in one sentence. Design one test that disproves it in 48 hours.",
      "Find one person who would be your perfect first customer. Contact them right now.",
    ],
    build: [
      "Get one paying customer this week. Any amount. Real money from a stranger proves the model.",
      "Deliver your service once, manually and imperfectly. Learn what actually breaks. Fix only that.",
      "Write what your customer experiences in the first 10 minutes. Make those 10 minutes excellent.",
    ],
    distribute: [
      "Go to one place where your customer already spends time today. Talk to 5 people.",
      "Tell 10 people in your network exactly what you are building. Ask: do you know someone who needs this?",
      "Post once where your customer spends the most time. Write about the problem, not your product.",
    ],
    monetize: [
      "Set a price today. Share it with 5 people. Adjust based on who says yes without hesitating.",
      "Ask your most engaged user to pay you something today. The discomfort of asking is why revenue is low.",
    ],
    scale: [
      "Write your full delivery process. Every step. Find the one step only you can do. Delegate everything else.",
      "Identify your single best source of customers. Put all effort on that one source this month.",
    ],
    stuck: "Pick up your phone. Call or message one real person who might need this. Have the conversation now.",
  },
};
 
// ─────────────────────────────────────────────────────────────
// CORE ANALYSIS — returns understanding, bottleneck, steps, stuck
// ─────────────────────────────────────────────────────────────
 
const BOTTLENECKS = {
  validate: {
    logistics: "No confirmed client willing to pay before you invest in the operation.",
    food: "No proof customers will pay your price consistently, not just once.",
    realestate: "No confirmed deal showing your margin covers your time.",
    education: "No proof students will pay fees and stay past the first month.",
    health: "No confirmed paying clients. Infrastructure before demand is backwards.",
    finance: "No client has trusted you with actual money yet.",
    fashion: "No proof the market pays your price without a discount.",
    agriculture: "No confirmed buyer at a price that leaves you and the farmer profitable.",
    manufacturing: "No purchase order before you invest in production.",
    retail: "No proof daily sales will cover rent and operating costs.",
    creator: "No clear topic or format that outperforms everything else you make.",
    ecommerce: "No proof the unit economics work at your current price.",
    agency: "No repeat client. One-time clients do not validate a service business.",
    tech: "No proof users have this problem badly enough to pay to fix it.",
    general: "No real person has paid real money for this yet.",
  },
  build: {
    logistics: "Building systems before you have one anchor client with guaranteed volume.",
    food: "Perfecting the menu before finding 10 people who order every week.",
    realestate: "Building a platform before proving you can close deals manually.",
    education: "Creating content before proving students complete what you already give them.",
    health: "Setting up infrastructure before having a steady flow of paying patients.",
    finance: "Building features when the barrier is compliance, trust, and relationships — not technology.",
    fashion: "Buying inventory before knowing which design, size, or color actually sells.",
    agriculture: "Building digital features when the core problems are physical.",
    manufacturing: "Setting up production capacity before confirming real demand.",
    retail: "Stocking inventory based on what you think will sell, not what customers are asking for.",
    creator: "Producing content before finding which platform your audience actually uses.",
    ecommerce: "Perfecting the store before confirming the market pays your price.",
    agency: "Building decks and processes instead of landing the next client.",
    tech: "Building features you want, not the one thing users are blocked by right now.",
    general: "Building before confirming anyone cares enough to change their behavior.",
  },
  distribute: {
    logistics: "Pitching everyone instead of owning one route or one client type completely.",
    food: "Relying on Zomato and word of mouth without owning any direct customer relationship.",
    realestate: "Waiting for leads instead of being in places where buyers and sellers already look.",
    education: "Marketing to everyone instead of dominating one exam or one skill completely.",
    health: "Waiting for word of mouth while target clients do not know you exist.",
    finance: "Talking to everyone about money instead of owning one client type deeply.",
    fashion: "Not showing the product on a real person. Static shots do not sell fashion.",
    agriculture: "Trying to reach farmers digitally when the real channel is the local dealer or mandi.",
    manufacturing: "Waiting for buyers to find you instead of going where buyers look for suppliers.",
    retail: "Waiting for customers to walk in while competitors are already everywhere they look.",
    creator: "Spreading across 5 platforms at 20% effort instead of owning one platform at 100%.",
    ecommerce: "Running paid ads before finding your first 10 organic customers.",
    agency: "Marketing capabilities instead of showing real results already delivered.",
    tech: "Launching to everyone instead of finding the first 10 users who would miss you.",
    general: "Not visible in the places where customers already look for this solution.",
  },
  monetize: {
    logistics: "Pricing too low. You are absorbing losses on every trip without knowing it.",
    food: "Food cost above 35%. You are barely breaking even at any realistic volume.",
    realestate: "Leaving referral and follow-on commission on the table after every deal.",
    education: "Dropout rate above 40%. Acquiring new students to replace people who leave.",
    health: "Charging below market rate. Low price attracts price-sensitive clients who leave anyway.",
    finance: "Revenue per client too thin to sustain operations.",
    fashion: "Return rate eating margin before you even see it.",
    agriculture: "Margin squeezed from both ends. Need to control more of the chain.",
    manufacturing: "Real cost per unit is higher than you think when rejection and rework are included.",
    retail: "Slow-moving stock eating working capital while margin on fast movers shrinks.",
    creator: "Followers who consume but never buy. Trust or offer is missing.",
    ecommerce: "Customer acquisition cost or return rate erasing margin silently.",
    agency: "Undercharging because you fear losing clients to cheaper, worse competitors.",
    tech: "Users expect the product for free. You trained them.",
    general: "Interest does not equal revenue. The two are not connected automatically.",
  },
  scale: {
    logistics: "Adding routes before the first one is profitable and fully documented.",
    food: "Adding outlets before the first one runs without you for 3 days straight.",
    realestate: "Covering multiple areas without completely dominating even one locality.",
    education: "Adding courses before the first course has a track record of real results.",
    health: "Planning a second location before the first is profitable without your daily presence.",
    finance: "Adding products before serving existing clients deeply with what you already offer.",
    fashion: "Adding designs before the hero product has consistent sell-through without discounting.",
    agriculture: "Expanding regions before one district is fully documented and systematic.",
    manufacturing: "Adding machines before current equipment runs at above 80% utilization.",
    retail: "Opening a second shop before the first has a documented process and consistent profit.",
    creator: "Adding channels before maximizing the one that already works.",
    ecommerce: "Adding products before the hero product has above 25% repeat purchase rate.",
    agency: "Doing everything yourself instead of systematizing your most-requested service.",
    tech: "Acquiring users before understanding why 40% of existing users stopped.",
    general: "Expanding before the core model is proven and documented.",
  },
};
 
const UNDERSTAND = {
  logistics: "You are building in logistics or transport. Reliability is your entire product.",
  food: "You are building a food business. Repeat customers are everything here.",
  realestate: "You are in real estate. Trust takes time. Deals come from relationships.",
  education: "You are in education. Results create referrals. Referrals are your only real marketing.",
  health: "You are in health. People pay when they are in pain or afraid.",
  finance: "You are in finance. Trust is your product. Once earned, clients almost never leave.",
  fashion: "You are in fashion. People buy how something makes them feel, not just how it looks.",
  agriculture: "You are in agriculture. Physical presence and local trust matter more than any platform.",
  manufacturing: "You are in manufacturing. One anchor buyer with regular orders transforms everything.",
  retail: "You are in retail. Daily footfall, repeat customers, and margin management decide everything.",
  creator: "You are a creator. Attention first. Monetization second. Niche beats broad always.",
  ecommerce: "You are in ecommerce. Margins and repeat purchase rate decide if you survive.",
  agency: "You are building an agency. Reputation and referrals grow it. Ads do not.",
  tech: "You are building a tech product. Real user signal beats clean code every time.",
  general: "You are building something. Talk to real people, move real money, fix one thing at a time.",
};
 
function getAnalysis(idea: string) {
  const domain = getDomain(idea);
  const stage = getStage(idea);
  const domainSteps = STEPS[domain] || STEPS.general;
  const stageSteps = domainSteps[stage] || domainSteps.validate;
  const bottleneck = (BOTTLENECKS[stage] || BOTTLENECKS.validate)[domain] || BOTTLENECKS[stage]?.general || "";
  const understanding = UNDERSTAND[domain] || UNDERSTAND.general;
  const stuck = domainSteps.stuck || STEPS.general.stuck;
  return { understanding, bottleneck, steps: stageSteps, stuck, domain, stage };
}
 
// ─────────────────────────────────────────────────────────────
// LOCAL STORAGE
// ─────────────────────────────────────────────────────────────
 
const KEY = "mm_exec_v1";
const load = () => { try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch { return null; } };
const save = (d) => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {} };
const clear = () => { try { localStorage.removeItem(KEY); } catch {} };
 
// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
 
// ─────────────────────────────────────────────────────────────
// BEHAVIOR MEMORY
// ─────────────────────────────────────────────────────────────
 
const KEY = "mm_exec_v2";
const BEH_KEY = "mm_behavior_v1";
 
const load = () => { try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : null; } catch { return null; } };
const save = (d: object) => { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch {} };
const clear = () => { try { localStorage.removeItem(KEY); } catch {} };
 
interface UserBehavior {
  stuckCount: number;
  completedSteps: number;
  avoidedActions: string[];
  avgCompletionTime: number;
  lastActionTime: number;
  realitySlapped: boolean;
}
 
const loadBehavior = (): UserBehavior => {
  try {
    const r = localStorage.getItem(BEH_KEY);
    return r ? JSON.parse(r) : { stuckCount: 0, completedSteps: 0, avoidedActions: [], avgCompletionTime: 0, lastActionTime: Date.now(), realitySlapped: false };
  } catch { return { stuckCount: 0, completedSteps: 0, avoidedActions: [], avgCompletionTime: 0, lastActionTime: Date.now(), realitySlapped: false }; }
};
 
const saveBehavior = (b: UserBehavior) => { try { localStorage.setItem(BEH_KEY, JSON.stringify(b)); } catch {} };
 
// ─────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────
 
export default function MicroMind() {
  const [view, setView] = useState("input");
  const [idea, setIdea] = useState("");
  const [analysis, setAnalysis] = useState<{
    understanding: string;
    bottleneck: string;
    steps: string[];
    stuck: string | null;
    domain: string;
    stage: string;
  } | null>(null);
  const [stepIdx, setStepIdx] = useState(0);
  const [completed, setCompleted] = useState<string[]>([]);
  const [isStuck, setIsStuck] = useState(false);
  const [isMicro, setIsMicro] = useState(false);
  const [animOut, setAnimOut] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [stuckLoading, setStuckLoading] = useState(false);
  const [behavior, setBehavior] = useState<UserBehavior>(loadBehavior());
  const [realitySlap, setRealitySlap] = useState(false);
  const [stepStartTime, setStepStartTime] = useState(Date.now());
  const textRef = useRef<HTMLTextAreaElement>(null);
 
  // Boot: restore session
  useEffect(() => {
    const s = load();
    if (s?.analysis && s?.view === "exec") {
      setIdea(s.idea || "");
      setAnalysis(s.analysis);
      setStepIdx(s.stepIdx || 0);
      setCompleted(s.completed || []);
      setView("exec");
    }
    setBehavior(loadBehavior());
  }, []);
 
  // Persist
  useEffect(() => {
    if (analysis && view === "exec") {
      save({ idea, analysis, stepIdx, completed, view });
    }
  }, [idea, analysis, stepIdx, completed, view]);
 
  // Update behavior helper
  function updateBehavior(updates: Partial<UserBehavior>) {
    setBehavior(prev => {
      const next = { ...prev, ...updates };
      saveBehavior(next);
      return next;
    });
  }
 
  // ── HYBRID API CALL ──────────────────────────────────────────
  // Tries API first. Falls back to internal engine if API fails or is vague.
  async function callAnalyzeAPI(ideaText: string): Promise<{ understanding: string; bottleneck: string; nextStep: string } | null> {
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea: ideaText }),
      });
      if (!res.ok) return null;
      const data = await res.json() as { understanding: string; bottleneck: string; nextStep: string };
      // Validate response is not vague (under 15 chars = vague)
      if (!data.nextStep || data.nextStep.length < 15) return null;
      return data;
    } catch { return null; }
  }
 
  // Hybrid: try API, fall back to internal engine
  async function getNextStep(ideaText: string): Promise<{ understanding: string; bottleneck: string; nextStep: string }> {
    const apiResult = await callAnalyzeAPI(ideaText);
    if (apiResult) return apiResult;
    // Fallback to internal engine
    const domain = getDomain(ideaText);
    const stage = getStage(ideaText);
    const domainSteps = STEPS[domain as keyof typeof STEPS] || STEPS.general;
    const stageSteps = (domainSteps as Record<string, string[]>)[stage] || (domainSteps as Record<string, string[]>).validate;
    const fallbackStep = stageSteps[Math.floor(Math.random() * stageSteps.length)];
    const bottleneckMap = BOTTLENECKS[stage as keyof typeof BOTTLENECKS] || BOTTLENECKS.validate;
    return {
      understanding: UNDERSTAND[domain as keyof typeof UNDERSTAND] || UNDERSTAND.general,
      bottleneck: (bottleneckMap as Record<string, string>)[domain] || (bottleneckMap as Record<string, string>).general || "",
      nextStep: fallbackStep,
    };
  }
 
  async function start() {
    if (idea.trim().length < 8) return;
    setView("thinking");
    setApiError(null);
    setRealitySlap(false);
    try {
      const data = await getNextStep(idea.trim());
      const a = {
        understanding: data.understanding,
        bottleneck: data.bottleneck,
        steps: [data.nextStep],
        stuck: null,
        domain: getDomain(idea),
        stage: getStage(idea),
      };
      setAnalysis(a);
      setStepIdx(0);
      setCompleted([]);
      setIsStuck(false);
      setIsMicro(false);
      setStepStartTime(Date.now());
      setView("exec");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Could not connect. Try again.");
      setView("input");
    }
  }
 
  async function markDone() {
    if (!analysis) return;
    const step = isStuck ? (analysis.stuck || analysis.steps[0]) : (analysis.steps[stepIdx] || analysis.steps[0]);
 
    // Track completion time for behavior memory
    const timeTaken = Math.round((Date.now() - stepStartTime) / 1000);
    const newCompleted = behavior.completedSteps + 1;
    const newAvg = Math.round((behavior.avgCompletionTime * behavior.completedSteps + timeTaken) / newCompleted);
    updateBehavior({
      completedSteps: newCompleted,
      avgCompletionTime: newAvg,
      lastActionTime: Date.now(),
      stuckCount: 0, // reset stuck count on completion
      realitySlapped: false,
    });
 
    setAnimOut(true);
    const newCompleted2 = [...completed, step];
    setCompleted(newCompleted2);
    setIsStuck(false);
    setIsMicro(false);
    setRealitySlap(false);
 
    // Get next step via hybrid engine
    try {
      const completedContext = newCompleted2.length > 0
        ? ` I already did: ${newCompleted2.slice(-2).join(". ")}.`
        : "";
      const data = await getNextStep(idea + completedContext);
      setAnalysis(prev => prev ? ({
        ...prev,
        understanding: data.understanding,
        bottleneck: data.bottleneck,
        steps: [data.nextStep],
        stuck: null,
      }) : prev);
      setStepIdx(0);
    } catch {
      setAnalysis(prev => prev ? ({
        ...prev,
        steps: ["Refresh to get your next step."],
        stuck: null,
      }) : prev);
      setStepIdx(0);
    }
    setStepStartTime(Date.now());
    setTimeout(() => setAnimOut(false), 220);
  }
 
  async function goStuck() {
    if (stuckLoading || !analysis) return;
 
    const newStuckCount = behavior.stuckCount + 1;
    updateBehavior({ stuckCount: newStuckCount, avoidedActions: [...behavior.avoidedActions, analysis.steps[stepIdx] || ""] });
 
    // REALITY SLAP — after 3 stuck clicks
    if (newStuckCount >= 3 && !behavior.realitySlapped) {
      updateBehavior({ realitySlapped: true });
      setRealitySlap(true);
      return;
    }
 
    setStuckLoading(true);
    setAnimOut(true);
    setIsMicro(true);
 
    try {
      const currentStep = analysis.steps[stepIdx] || analysis.steps[0];
      // Ask for MICRO version — under 2 minutes, zero thinking
      const microIdea = idea + ` My current step is: "${currentStep}". I am stuck. Give me a micro version that takes under 2 minutes, requires zero thinking, and is physically actionable right now. Make it stupidly simple.`;
      const data = await getNextStep(microIdea);
      // Also try to simplify using internal engine as backup
      const microStep = data.nextStep.length > 15 ? data.nextStep : (() => {
        const domain = getDomain(idea);
        const stuckStepData = STEPS[domain as keyof typeof STEPS] || STEPS.general;
        return (stuckStepData as Record<string, string>).stuck || "Pick up your phone. Send one message to one person. Just one.";
      })();
      setAnalysis(prev => prev ? ({ ...prev, stuck: microStep }) : prev);
    } catch {
      const domain = getDomain(idea);
      const stuckData = STEPS[domain as keyof typeof STEPS] || STEPS.general;
      const fallbackStuck = (stuckData as Record<string, string>).stuck || "Pick up your phone. Send one message right now.";
      setAnalysis(prev => prev ? ({ ...prev, stuck: fallbackStuck }) : prev);
    }
 
    setIsStuck(true);
    setTimeout(() => { setStuckLoading(false); setAnimOut(false); }, 220);
    setStepStartTime(Date.now());
  }
 
  function dismissRealitySlap() {
    setRealitySlap(false);
    goStuck();
  }
 
  function reset() {
    clear();
    setIdea(""); setAnalysis(null);
    setStepIdx(0); setCompleted([]);
    setIsStuck(false); setIsMicro(false);
    setView("input"); setApiError(null);
    setRealitySlap(false);
  }
 
  const currentStep = analysis
    ? isStuck && analysis.stuck ? analysis.stuck : (analysis.steps[stepIdx] || analysis.steps[0])
    : "";
 
  const words = idea.trim().split(/\s+/).filter(Boolean).length;
  const canStart = words >= 3;
 
  // Adaptive step difficulty based on behavior
  const isHighStuck = behavior.stuckCount >= 2;
 
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');
 
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
        :root {
          --bg:       #F8F9FB;
          --white:    #FFFFFF;
          --border:   #E2E5EA;
          --border2:  #CDD1D8;
          --p:        #4F46E5;
          --p-hover:  #4338CA;
          --p-light:  #EEF2FF;
          --tx:       #0F1117;
          --tx2:      #4B5263;
          --tx3:      #8B92A0;
          --green:    #059669;
          --green-bg: #ECFDF5;
          --green-bd: #6EE7B7;
          --amber:    #D97706;
          --amber-bg: #FFFBEB;
          --amber-bd: #FCD34D;
          --red:      #DC2626;
          --red-bg:   #FEF2F2;
          --red-bd:   #FCA5A5;
          --sans:     'Inter', system-ui, sans-serif;
          --serif:    'Instrument Serif', Georgia, serif;
        }
 
        body {
          background: var(--bg);
          color: var(--tx);
          font-family: var(--sans);
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
        }
 
        .shell {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 24px 16px 60px;
        }
 
        .page { width: 100%; max-width: 480px; }
 
        /* NAV */
        .nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 24px;
          background: var(--white);
          border-bottom: 1px solid var(--border);
          z-index: 20;
        }
 
        .nav.focus-mode { display: none; }
 
        .brand { display: flex; align-items: center; gap: 8px; }
 
        .brand-mark {
          width: 26px; height: 26px;
          background: var(--p);
          border-radius: 7px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--serif);
          font-size: 13px; color: #fff; font-style: italic;
        }
 
        .brand-name { font-size: 14px; font-weight: 600; color: var(--tx); letter-spacing: -.3px; }
 
        .nav-btn {
          font-size: 12px; font-weight: 500; color: var(--tx3);
          background: none; border: 1px solid var(--border); border-radius: 7px;
          padding: 5px 12px; cursor: pointer; font-family: var(--sans); transition: all .15s;
        }
        .nav-btn:hover { color: var(--tx); border-color: var(--border2); }
 
        /* ANIMATIONS */
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes blink  { 0%,100% { opacity:1; } 50% { opacity:.3; } }
        @keyframes stepIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slap   { 0%,100% { transform:translateX(0); } 20%,60% { transform:translateX(-4px); } 40%,80% { transform:translateX(4px); } }
 
        .u0 { animation: fadeUp .32s ease forwards; }
        .u1 { animation: fadeUp .32s .05s ease both; }
        .u2 { animation: fadeUp .32s .10s ease both; }
        .u3 { animation: fadeUp .32s .15s ease both; }
        .u4 { animation: fadeUp .32s .20s ease both; }
        .step-in  { animation: stepIn .25s ease forwards; }
        .step-out { opacity:0; transform:translateY(-5px); transition: all .18s; }
 
        /* INPUT VIEW */
        .input-view { text-align: center; padding-top: 60px; }
 
        .headline {
          font-family: var(--serif);
          font-size: clamp(30px, 7vw, 44px);
          font-weight: 400; line-height: 1.15;
          letter-spacing: -.5px; color: var(--tx); margin-bottom: 10px;
        }
        .headline em { font-style: italic; color: var(--p); }
 
        .subtext { font-size: 15px; color: var(--tx2); font-weight: 400; margin-bottom: 32px; line-height: 1.5; }
 
        .input-wrap { position: relative; margin-bottom: 10px; }
 
        .idea-input {
          width: 100%; min-height: 100px; padding: 16px;
          background: var(--white); border: 2px solid var(--border2); border-radius: 12px;
          color: var(--tx); font-family: var(--sans); font-size: 15px; font-weight: 400;
          line-height: 1.6; resize: none; outline: none; caret-color: var(--p);
          transition: border-color .15s, box-shadow .15s;
        }
        .idea-input::placeholder { color: var(--tx3); }
        .idea-input:focus { border-color: var(--p); box-shadow: 0 0 0 3px rgba(79,70,229,.1); }
 
        .word-count { position: absolute; bottom:10px; right:13px; font-size:11px; color:var(--tx3); pointer-events:none; }
 
        .go-btn {
          width: 100%; padding: 14px 20px; background: var(--p); border: none; border-radius: 12px;
          color: #fff; font-family: var(--sans); font-size: 15px; font-weight: 600;
          cursor: pointer; letter-spacing: -.1px; transition: all .15s;
        }
        .go-btn:hover:not(:disabled) { background: var(--p-hover); transform: translateY(-1px); box-shadow: 0 4px 14px rgba(79,70,229,.28); }
        .go-btn:disabled { opacity: .35; cursor: not-allowed; }
 
        .micro-text { margin-top: 12px; font-size: 12px; color: var(--tx3); text-align: center; }
        .micro-text span { display: block; margin-top: 2px; font-size: 11px; opacity: .7; }
        .error-text { margin-top: 10px; font-size: 12px; color: var(--red); text-align: center; }
 
        /* BEHAVIOR INDICATOR */
        .behavior-bar {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 12px; background: var(--white); border: 1px solid var(--border);
          border-radius: 8px; margin-bottom: 10px; font-size: 11px; color: var(--tx3);
        }
        .beh-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green); }
        .beh-dot.warn { background: var(--amber); }
        .beh-dot.alert { background: var(--red); animation: blink 1s ease infinite; }
 
        /* THINKING */
        .thinking-view {
          text-align: center; display: flex; flex-direction: column;
          align-items: center; gap: 14px; padding-top: 60px;
        }
        .dots { display: flex; gap: 5px; }
        .dot { width: 6px; height: 6px; background: var(--p); border-radius: 50%; animation: blink 1s ease infinite; }
        .dot:nth-child(2) { animation-delay: .16s; }
        .dot:nth-child(3) { animation-delay: .32s; }
        .thinking-label { font-size: 15px; color: var(--tx2); font-weight: 500; }
 
        /* EXEC VIEW */
        .exec-view { padding-top: 72px; }
        .focus-exec { padding-top: 24px; }
 
        .ctx-bar {
          background: var(--white); border: 1px solid var(--border); border-radius: 10px;
          padding: 10px 14px; margin-bottom: 12px;
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
        }
        .ctx-idea { font-size: 12px; color: var(--tx3); flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .ctx-tag { font-size: 10px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--p); flex-shrink: 0; }
 
        .info-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px; }
        .info-card { background: var(--white); border: 1px solid var(--border); border-radius: 10px; padding: 12px 14px; }
        .info-label { font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: var(--tx3); margin-bottom: 4px; }
        .info-text { font-size: 12px; color: var(--tx2); line-height: 1.5; }
        .info-card.block { border-color: #FCD34D; background: var(--amber-bg); }
        .info-card.block .info-label { color: var(--amber); }
        .info-card.block .info-text  { color: #92400E; }
 
        /* STEP CARD */
        .step-wrap {
          background: var(--white); border: 1.5px solid var(--border); border-radius: 14px;
          padding: 28px 24px 22px; margin-bottom: 12px; text-align: center; position: relative;
        }
        .step-wrap::before {
          content: ''; position: absolute; top: 0; left: 24px; right: 24px;
          height: 3px; background: var(--p); border-radius: 0 0 3px 3px;
        }
        .step-wrap.stuck-mode::before { background: var(--amber); }
        .step-wrap.stuck-mode { border-color: var(--amber-bd); background: var(--amber-bg); }
        .step-wrap.micro-mode::before { background: var(--green); }
        .step-wrap.micro-mode { border-color: var(--green-bd); }
 
        .step-label {
          font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase;
          color: var(--p); margin-bottom: 14px;
          display: flex; align-items: center; justify-content: center; gap: 6px;
        }
        .step-label.stuck-label { color: var(--amber); }
        .step-label.micro-label { color: var(--green); }
        .step-dot { width: 5px; height: 5px; background: currentColor; border-radius: 50%; animation: blink 1.4s ease infinite; }
 
        .step-text {
          font-family: var(--serif);
          font-size: clamp(20px, 4vw, 26px);
          line-height: 1.45; color: var(--tx); letter-spacing: -.2px; margin-bottom: 16px;
        }
 
        .step-footer { font-size: 11px; color: var(--tx3); font-style: italic; }
 
        /* BUTTONS */
        .btn-row { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 16px; }
 
        .btn-done {
          padding: 13px 16px; background: var(--green-bg); border: 1.5px solid var(--green-bd);
          border-radius: 10px; color: var(--green); font-family: var(--sans);
          font-size: 13px; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 6px; transition: all .15s;
        }
        .btn-done:hover { background: #D1FAE5; transform: translateY(-1px); }
 
        .btn-stuck {
          padding: 13px 16px; background: var(--amber-bg); border: 1.5px solid var(--amber-bd);
          border-radius: 10px; color: var(--amber); font-family: var(--sans);
          font-size: 13px; font-weight: 600; cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 6px; transition: all .15s;
        }
        .btn-stuck:hover:not(:disabled) { background: #FEF3C7; transform: translateY(-1px); }
        .btn-stuck:disabled { opacity: .4; cursor: not-allowed; }
 
        /* REALITY SLAP */
        .reality-slap {
          background: var(--tx); border-radius: 14px; padding: 28px 24px; text-align: center;
          margin-bottom: 12px; animation: slap .4s ease;
        }
        .slap-headline {
          font-family: var(--serif); font-size: 22px; color: #fff;
          line-height: 1.35; margin-bottom: 10px;
        }
        .slap-sub { font-size: 13px; color: rgba(255,255,255,.6); margin-bottom: 20px; line-height: 1.5; }
        .slap-btn {
          width: 100%; padding: 13px; background: var(--red); border: none; border-radius: 10px;
          color: #fff; font-family: var(--sans); font-size: 14px; font-weight: 600;
          cursor: pointer; transition: all .15s;
        }
        .slap-btn:hover { background: #B91C1C; }
 
        /* MICRO MODE BADGE */
        .micro-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: var(--green-bg); border: 1px solid var(--green-bd);
          border-radius: 100px; padding: 3px 10px;
          font-size: 10px; font-weight: 700; color: var(--green);
          letter-spacing: .06em; text-transform: uppercase; margin-bottom: 8px;
        }
 
        /* COMPLETED */
        .done-section { margin-top: 4px; }
        .done-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .done-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: .1em; color: var(--tx3); }
        .done-count { font-size: 11px; color: var(--tx3); }
 
        .done-item {
          display: flex; align-items: flex-start; gap: 8px;
          padding: 8px 12px; background: var(--white); border: 1px solid var(--border);
          border-radius: 8px; margin-bottom: 5px; animation: fadeIn .2s ease;
        }
        .done-dot { width: 5px; height: 5px; background: var(--green); border-radius: 50%; flex-shrink: 0; margin-top: 5px; opacity: .6; }
        .done-text { font-size: 12px; color: var(--tx3); line-height: 1.45; text-decoration: line-through; text-decoration-color: var(--border2); opacity: .6; }
 
        @media (max-width: 480px) {
          .info-row { grid-template-columns: 1fr; }
          .step-text { font-size: 20px; }
          .headline  { font-size: 28px; }
        }
      `}</style>
 
      <div className="shell">
 
        {/* NAV — hidden in focus mode during execution */}
        <nav className={`nav ${view === "exec" ? "focus-mode" : ""}`}>
          <div className="brand">
            <div className="brand-mark">M</div>
            <span className="brand-name">MicroMind</span>
          </div>
        </nav>
 
        {/* Minimal exec nav */}
        {view === "exec" && (
          <nav className="nav" style={{display:"flex"}}>
            <div className="brand">
              <div className="brand-mark">M</div>
              <span className="brand-name">MicroMind</span>
            </div>
            <button className="nav-btn" onClick={reset}>← New Idea</button>
          </nav>
        )}
 
        {/* INPUT */}
        {view === "input" && (
          <div className="page input-view">
            <h1 className="headline u0">
              Stuck? Tell me<br /><em>your idea.</em>
            </h1>
            <p className="subtext u1">
              You'll get one clear step. No advice. Just action.
            </p>
            {behavior.completedSteps > 0 && (
              <div className="behavior-bar u1">
                <div className={`beh-dot ${behavior.stuckCount >= 3 ? "alert" : behavior.stuckCount >= 2 ? "warn" : ""}`} />
                <span>{behavior.completedSteps} real action{behavior.completedSteps !== 1 ? "s" : ""} taken across all sessions</span>
              </div>
            )}
            <div className="input-wrap u2">
              <textarea
                ref={textRef}
                className="idea-input"
                placeholder="I want to..."
                value={idea}
                onChange={e => setIdea(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey) && canStart) start(); }}
                rows={4}
              />
              {idea.length > 0 && <span className="word-count">{words}w</span>}
            </div>
            <button className="go-btn u3" onClick={start} disabled={!canStart}>
              Tell me what to do →
            </button>
            {!apiError && (
              <div className="micro-text u4">
                Don't overthink. Just start.
                <span>Takes less than 10 seconds.</span>
              </div>
            )}
            {apiError && <p className="error-text u4">⚠ {apiError}</p>}
          </div>
        )}
 
        {/* THINKING */}
        {view === "thinking" && (
          <div className="page thinking-view">
            <div className="dots">
              <div className="dot" /><div className="dot" /><div className="dot" />
            </div>
            <p className="thinking-label">Thinking...</p>
          </div>
        )}
 
        {/* EXEC */}
        {view === "exec" && analysis && (
          <div className="page exec-view">
 
            {/* REALITY SLAP — overrides everything */}
            {realitySlap ? (
              <div className="reality-slap u0">
                <div className="slap-headline">
                  You're avoiding the hard part.
                </div>
                <p className="slap-sub">
                  This is exactly why you're stuck. Every skip brings you closer to giving up on your idea.
                </p>
                <button className="slap-btn" onClick={dismissRealitySlap}>
                  OK. Give me the simplest possible step.
                </button>
              </div>
            ) : (
              <>
                <div className="ctx-bar u0">
                  <span className="ctx-idea">{idea.length > 70 ? idea.substring(0, 70) + "..." : idea}</span>
                  <span className="ctx-tag">{analysis.stage}</span>
                </div>
 
                <div className="info-row">
                  <div className="info-card u1">
                    <div className="info-label">Situation</div>
                    <div className="info-text">{analysis.understanding.substring(0, 120)}{analysis.understanding.length > 120 ? "..." : ""}</div>
                  </div>
                  <div className="info-card block u2">
                    <div className="info-label">Blocking you</div>
                    <div className="info-text">{analysis.bottleneck.substring(0, 120)}{analysis.bottleneck.length > 120 ? "..." : ""}</div>
                  </div>
                </div>
 
                <div className={`step-wrap ${isMicro ? "micro-mode" : isStuck ? "stuck-mode" : ""} ${animOut ? "step-out" : "step-in"} u3`}>
                  {isMicro && (
                    <div style={{textAlign:"center", marginBottom:"8px"}}>
                      <span className="micro-badge">⚡ Micro Step — under 2 min</span>
                    </div>
                  )}
                  <div className={`step-label ${isMicro ? "micro-label" : isStuck ? "stuck-label" : ""}`}>
                    <span className="step-dot" />
                    {isMicro ? "Smallest possible action" : isStuck ? "Simpler step" : "Your next step"}
                    {completed.length > 0 && (
                      <span style={{marginLeft:"8px", fontWeight:400, opacity:.6}}>· {completed.length} done</span>
                    )}
                  </div>
                  <div className="step-text">{currentStep}</div>
                  <div className="step-footer">
                    {isMicro ? "This takes under 2 minutes. No thinking required." : "If you skip this, nothing changes."}
                  </div>
                </div>
 
                <div className="btn-row u4">
                  <button className="btn-done" onClick={markDone}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Done — Next Step
                  </button>
                  <button className="btn-stuck" onClick={goStuck} disabled={stuckLoading}>
                    {stuckLoading ? "..." : (
                      <>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                        </svg>
                        {isHighStuck ? "Too hard?" : "I'm Stuck"}
                      </>
                    )}
                  </button>
                </div>
 
                {completed.length > 0 && (
                  <div className="done-section">
                    <div className="done-header">
                      <span className="done-label">Real actions taken</span>
                      <span className="done-count">{completed.length}</span>
                    </div>
                    {[...completed].reverse().map((step, i) => (
                      <div className="done-item" key={i}>
                        <div className="done-dot" />
                        <div className="done-text">{step}</div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
 
          </div>
        )}
 
      </div>
    </>
  );
}