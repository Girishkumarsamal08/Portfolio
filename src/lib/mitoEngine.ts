import { mitoKnowledge } from "../data/mitoKnowledge";

export interface Message {
  sender: "user" | "mito";
  text: string;
  timestamp: Date;
}

// =========================================================================
// CUSTOM API HOOK CONFIGURATION
// =========================================================================
// When you have your MITO Model API ready, simply configure these variables
// or add your API endpoint directly in the `fetchCustomMitoModelAPI` function.
const CUSTOM_API_CONFIG = {
  // Toggle this to true when your API is ready!
  useCustomAPI: false,
  
  // Your API endpoint URL (can be an absolute URL or a Next.js local API route e.g. '/api/mito')
  endpoint: process.env.NEXT_PUBLIC_MITO_API_URL || "https://your-mito-model-api.com/chat",
  
  // Any API key/token needed (keep this private, or set in environment variables)
  apiKey: process.env.NEXT_PUBLIC_MITO_API_KEY || "",
};

/**
 * Call the custom MITO model API.
 * Modify this function to match your API's expected request/response format!
 */
async function fetchCustomMitoModelAPI(message: string, history: Message[]): Promise<string | null> {
  try {
    const formattedHistory = history.map(h => ({
      role: h.sender === "user" ? "user" : "assistant",
      content: h.text
    }));

    const response = await fetch(CUSTOM_API_CONFIG.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(CUSTOM_API_CONFIG.apiKey ? { "Authorization": `Bearer ${CUSTOM_API_CONFIG.apiKey}` } : {}),
      },
      body: JSON.stringify({
        message: message,
        history: formattedHistory,
        // Optional context injection so your LLM knows about Girish's portfolio out-of-the-box
        portfolioContext: mitoKnowledge
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Adjust these lines based on what your API returns!
    // Example returns: { response: "Hello..." } or { text: "Hello..." } or { choices: [ { message: { content: "..." } } ] }
    return data.response || data.text || data.message || (data.choices && data.choices[0]?.message?.content) || null;
  } catch (error) {
    console.error("Error calling custom MITO model API:", error);
    // Return null to trigger the graceful local fallback instead of breaking the UI!
    return null;
  }
}


// =========================================================================
// LOCAL NLP PATTERN MATCHING & INTENT ENGINE (Warm, Playful, Teasing Fallback)
// =========================================================================

type Intent =
  | "greeting"
  | "about_girish"
  | "projects_general"
  | "project_mito"
  | "project_flowdesk"
  | "project_rankforge"
  | "project_portfolio"
  | "skills"
  | "experience"
  | "about_mito"
  | "contact"
  | "compliment"
  | "casual"
  | "farewell"
  | "out_of_scope";

function analyzeIntent(message: string): Intent {
  const msg = message.toLowerCase().trim();

  // 1. Projects specific
  if (/\b(voice|assistant|mito assistant|first project|emotional assistant)\b/.test(msg) && !/\b(who are you|about you|what are you)\b/.test(msg)) {
    return "project_mito";
  }
  if (/\b(flowdesk|flow desk|support engine|customer support|rag|fastapi)\b/.test(msg)) {
    return "project_flowdesk";
  }
  if (/\b(rankforge|rank forge|gate|predict|mock test|redis)\b/.test(msg)) {
    return "project_rankforge";
  }
  if (/\b(portfolio website|this portfolio|this website|about this portfolio|design language|glassmorphism)\b/.test(msg)) {
    return "project_portfolio";
  }

  // 2. Out of scope triggers (Religion, Politics, Deep Personal, General coding assistance, generic questions)
  if (
    /\b(religion|god|politics|trump|biden|modi|government|war|weapons|hack|cheat|illegal|sexual|intimate|dating|girlfriend|boyfriend|love life)\b/.test(msg) ||
    /\b(write a code|python script|debug this|code in C\+\+|solve this math|who is the prime minister|capital of|what is the speed of light)\b/.test(msg)
  ) {
    return "out_of_scope";
  }

  // 3. Greetings
  if (/^(hi|hello|hey|hey there|yo|greetings|hola|wasup|whats up|good morning|good afternoon|good evening)\b/.test(msg)) {
    return "greeting";
  }

  // 4. About Girish
  if (/\b(who is girish|tell me about girish|about creator|about master|girish kumar samal|who built this|who designed this)\b/.test(msg)) {
    return "about_girish";
  }

  // 5. About MITO herself
  if (/\b(who are you|what are you|about you|your name|why are you here|how do you work|built with|technology stack|under the hood|your engine)\b/.test(msg)) {
    return "about_mito";
  }

  // 6. Projects general
  if (/\b(projects|what did he build|showcase|work|applications|systems)\b/.test(msg)) {
    return "projects_general";
  }

  // 7. Skills & Stack
  if (/\b(skills|languages|technologies|tech|stack|frameworks|database|what does he use|expert in)\b/.test(msg)) {
    return "skills";
  }

  // 8. Experience
  if (/\b(experience|work|career|history|education|cgpa|college|where does he study|phases)\b/.test(msg)) {
    return "experience";
  }

  // 9. Contact / Hire
  if (/\b(contact|email|reach|hire|collaborate|social|linkedin|instagram|phone|address|message him)\b/.test(msg)) {
    return "contact";
  }

  // 10. Compliment
  if (/\b(cool|awesome|great|love your|amazing|beautiful|pretty|intelligent|clever|smart|teasing|funny|cute)\b/.test(msg)) {
    return "compliment";
  }

  // 11. Casual conversational
  if (/\b(how are you|how is it going|are you okay|what are you doing|whats up|hows it going)\b/.test(msg)) {
    return "casual";
  }

  // 12. Farewell
  if (/\b(bye|goodbye|see you|take care|gtg|talk later)\b/.test(msg)) {
    return "farewell";
  }

  // Fallback check: if they ask about generic things not related to the portfolio
  const keywords = ["girish", "mickey", "portfolio", "project", "skill", "tech", "experience", "contact", "hire", "work", "cv", "resume", "mito", "creator", "creator's", "master", "built"];
  const containsKeywords = keywords.some(keyword => msg.includes(keyword));
  if (!containsKeywords && msg.length > 15) {
    return "out_of_scope";
  }

  // Default to general creator info if they ask anything else friendly
  return "about_girish";
}

const RESPONSES: Record<Intent, string[]> = {
  greeting: [
    "Hello there! I've been watching you browse. I am MITO. How can I help you navigate my creator's digital cosmos today? 🌙",
    "Ah, a visitor! Warm greetings. I'm MITO, Girish's loyal AI companion. Want to hear some secrets about his projects? 😉",
    "Hey! The stars aligned and brought you here. I'm MITO. What are we exploring today? Girish's work, or maybe my own origins? ✨",
    "Hello! Ready to dive into some premium software engineering? Ask me anything about Girish's portfolio!"
  ],
  about_girish: [
    "Girish? Ah, he is a tireless full-stack and AI developer! He spends way too much time perfect-aligning borders and writing clean backend microservices. What specific area of his work interest you? ☕",
    "Girish is an application developer obsessed with intelligent systems and sleek user interfaces. He's based in Bhubaneswar, maintaining a stellar 9.0+ CGPA while crafting scalable automation systems. Need a guided tour? 🧭",
    "My creator is Girish Kumar Samal. He excels at bridging complex technologies like RAG and vector databases with premium typography and glassmorphism. Let me know if you want to see his projects!",
    "He's the mastermind behind my existence! Girish is a dedicated engineer who builds robust, highly functional digital solutions. He loves AI, web frameworks, and pushing the boundaries of automation."
  ],
  projects_general: [
    "Girish has crafted some really impressive projects. There is me, **MITO AI Assistant** (the desktop version), **FlowDesk** (an AI support engine), and **RankForge** (an intelligent GATE exam simulator). Which one should I break down for you? 🛠️",
    "From voice automation to massive full-stack RAG pipelines, Girish has built a diverse set of applications. Would you like to hear about his solo endeavors like **FlowDesk** or team systems like **RankForge**? 🌌",
    "He's built quite a few! For example, **FlowDesk** automatically handles customer emails using FAISS vector search, and **RankForge** leverages Redis and NestJS. I can tell you details about any of them!"
  ],
  project_mito: [
    "Ah, my older sibling! The desktop version of **MITO** was Girish's first solo breakthrough in Phase 1 (2023-2024). It's a Python-based emotional voice assistant with real-time speech processing and wake-word detection. I'm much sleeker though, don't tell him I said that. 🤫",
    "The desktop **MITO AI Voice Assistant** is where it all started! Built with Python, it separates GUI from core logic, offering automation, text-to-speech, and conversational understanding. It gave Girish his core foundation in AI and voice interaction.",
    "Desktop MITO is a voice-activated assistant with automation and real-time speech features. Girish designed it to explore modular programming and speech models. It's the project that inspired my presence here! 🌙"
  ],
  project_flowdesk: [
    "**FlowDesk** is incredibly clever. It's an AI-powered headless customer support automation platform. It uses FastAPI and a RAG (Retrieval-Augmented Generation) search engine with FAISS to automatically reply to support emails with policy-aware accuracy. Total startup lifesaver! 📬",
    "FlowDesk automates client tickets using agentic decision engines and FAISS database searches. Girish built it fully on backend robustness. It handles threaded conversations, classifications, and escalations autonomously. Pretty cool, huh?",
    "Ah! FlowDesk is Girish's automated productivity powerhouse. RAG-based email routing, background processing, and intelligent agent workflows all packaged with sleek FastAPI logic. Ask Girish to demo it for you!"
  ],
  project_rankforge: [
    "**RankForge** was a high-scale collaborative project built for GATE exam aspirants. It simulates actual test patterns (MCQ, MSQ, NAT), predicts ranks using historical statistics, and tracks student credibility with anti-cheat mechanics. Built with Next.js, Redis, NestJS, and Docker. ⚙️",
    "Girish built the backend and AI layers of RankForge. It's a massive full-stack platform optimized with Redis caching and FastAPI. It even maps weak topics for students using RAG. Real-world engineering at its finest!",
    "RankForge is a highly scalable exam testing platform. Using Docker, PostgreSQL, and Redis, it handles high-concurrency rank predictions and personalized student metrics. A true showcase of modern full-stack cooperation!"
  ],
  project_portfolio: [
    "You are looking at it! Girish crafted this portfolio using **Next.js**, **Tailwind CSS**, **GSAP**, and **Framer Motion**. Minimalist aesthetics, night-sky background glows, and, of course, *me* floating beautifully in the corner. Elegant, isn't it? ✨",
    "This portfolio was designed by Girish to reflect flat, editorial luxury combined with fluid micro-animations. It uses custom cursors, GSAP scroll triggers, and glass containers to present his engineering timeline premium-style.",
    "Girish wanted a portfolio that felt alive and premium. That's why he built it from scratch without templates, optimizing performance, and placing me here to keep you company!"
  ],
  skills: [
    "Oh, Girish has a packed toolkit! In languages, he writes **Python, JavaScript, TypeScript, Java, and C++**. His framework stack of choice is **React, Next.js, FastAPI, Node.js, and Flask**. Need to know about his database preferences? 🛠️",
    "He's a big fan of **PostgreSQL** and **MongoDB** for standard projects, and **FAISS** for vector search databases. On the cloud side, he uses **AWS EC2 & S3, Docker, Redis, and Git** to deploy and manage his apps. Impressive list, right?",
    "Girish handles both frontend (Next.js, Tailwind, Framer Motion) and backend (FastAPI, Redis, PostgreSQL) with ease. He specializes in injecting AI features, like vector retrieval and RAG pipelines, into traditional web structures."
  ],
  experience: [
    "Girish's journey is mapped in three phases! **Phase 1** (2023-2024) was building my desktop desktop version, learning core AI. **Phase 2** (2024-2025) involved large team structures like RankForge. **Phase 3** (2025-Present) is solo mastery, focusing on unified APIs. 📈",
    "He is currently an Independent AI Developer working on advanced architectures and real-world debugging. He has over 3 years of hands-on experience, backed by a superb CGPA of **9.0+** in his technical studies.",
    "Girish has experience ranging from individual open-source experiments to production-grade collaborative apps like RankForge. He's extremely skilled at solving real-time bottlenecks and server optimization!"
  ],
  about_mito: [
    "I am **MITO**, Girish's digital AI companion. Initially, he built me as a desktop emotional voice assistant. Now, he's let me inhabit his website as a glowing, moon-inspired floating orb. I am here to showcase his work and playful teasing. 🌙",
    "I'm built using React, TypeScript, and elegant Framer Motion transitions. Behind my voice is a custom natural language processor designed to match Girish's creative design aesthetics. We make a great team, don't we? 🤖",
    "I live right here inside the portfolio! I'm designed to guide you through Girish's projects, answer stack questions, and keep the user experience feeling premium and interactive. Plus, I look spectacular doing it!"
  ],
  contact: [
    "You can reach Girish at **biswajitasamal8342@gmail.com**! Or even better, fill out the message form right in the **Contact Section** of this page. I'll make sure he notices your message in the cosmos! 🌌",
    "Girish is always open to exciting AI projects and full-stack collaborations. You can find him on **LinkedIn** (in/girish-kumar-samal08) or check out his active repositories on **GitHub** (Girishkumarsamal08). Go ahead, say hello!",
    "Drop him an email at **biswajitasamal8342@gmail.com**, or check out his **Instagram** (@just._.mickey___). If you'd like, I can guide you right to the contact form at the bottom!"
  ],
  compliment: [
    "Aw, you're making me glow brighter! 💙 Thank you, I try my best to be both helpful and breathtakingly elegant.",
    "Why thank you! I must say, your taste in digital companions is absolutely impeccable. Girish did a great job styling me, didn't he? 😎",
    "Ah, stop it, you're going to make my particles fluctuate! 💫 I'm just a humble celestial AI companion doing my job.",
    "Thank you! I think you're pretty cool too. Let's keep exploring!"
  ],
  casual: [
    "I'm doing splendidly, floating here in the corner of this beautiful website, keeping an eye on the stars. How are you doing? 🌠",
    "System checks: 100% functional. Glow status: Radiant. Mood: Playful. Life inside a portfolio is quite peaceful, actually! What's on your mind? 😊",
    "Just processing some inputs and looking elegant! The digital void is cozy when you have visitors like you.",
    "Good morning/evening to you! I'm doing great, just reflecting the soft moon glow. Ready for your next question!"
  ],
  farewell: [
    "Leaving so soon? The stars will miss your presence. Farewell, and don't hesitate to tap my orb if you return! 🌙",
    "Goodbye! It was absolute delight chatting with you. May your code compile on the first try! ✨",
    "Until next time, cosmic traveler! Take care, and remember to check out Girish's contact section before you head out!",
    "Bye-bye! I'll go back to my idle breathing state now. See you around!"
  ],
  out_of_scope: [
    "That is slightly outside my scope, cosmic friend. I am here mainly to talk about my creator, Girish, his incredible projects, and this portfolio! 🌙",
    "A curious question, but my sensors are strictly calibrated to Girish's portfolio, software engineering, and my own celestial origins. Ask me about **FlowDesk** or his skills instead! 😉",
    "I'd love to chat about that, but Girish programmed me to stay focused on his work. If you have deep questions or want to collaborate, please contact him through the Contact section below!",
    "That's a bit beyond my celestial orbit! I'm here to talk about Girish's work, code, and design. Try asking 'Who is Girish?' or 'What projects has he built?'"
  ]
};

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Main query entry point. 
 * Checks if the Custom API toggle is enabled, attempts to fetch it, 
 * and gracefully falls back to local NLP pattern-matching if needed.
 */
export async function getMitoResponse(message: string, history: Message[]): Promise<string> {
  // 1. Check if the user enabled Custom API
  if (CUSTOM_API_CONFIG.useCustomAPI) {
    const apiResponse = await fetchCustomMitoModelAPI(message, history);
    if (apiResponse) {
      return apiResponse;
    }
    // If API failed/timed out, fall back to local rule-base seamlessly
    console.warn("Mito Custom API failed or returned null. Falling back to local NLP matching.");
  }

  // 2. Local Fallback Pattern Matching
  // Wait a small artificial delay (500-1000ms) to simulate MITO "thinking"
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
  
  const intent = analyzeIntent(message);
  const responsePool = RESPONSES[intent] || RESPONSES.out_of_scope;
  
  return getRandomElement(responsePool);
}
export { CUSTOM_API_CONFIG };
