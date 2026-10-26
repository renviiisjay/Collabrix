/**
 * Collabrix - Realistic Initial Seed Data
 */
const INITIAL_DATA = {
  currentUser: {
    name: "Alex Vance",
    handle: "@alexvance",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    role: "Full-Stack AI Architect",
    bio: "Passionate about building decentralized autonomous agents and spatial UI interfaces. Looking for hackers to build next-gen Web3 and Neurotech tools.",
    location: "Neo Tokyo / Remote",
    rating: "4.98",
    projectsCompleted: 14,
    skills: ["React / Next.js", "Python", "PyTorch", "Rust", "WebSockets", "Three.js", "Solidity"],
    interests: ["Generative AI", "Cybernetics", "Open Source", "Hackathons", "Quantum Sim"],
    stats: {
      collaborations: 18,
      teamsLed: 4,
      hackathonWins: 3,
      reputationScore: 980
    }
  },
  people: [
    {
      id: "p1",
      name: "Dr. Elena Rostova",
      handle: "@elena_quantum",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
      role: "Quantum Computing Researcher",
      bio: "Postdoc at MIT working on NISQ quantum algorithms and variational quantum eigensolvers. Seeking ML engineers for hybrid simulations.",
      location: "Boston, USA",
      category: "research",
      status: "Available for Hackathons",
      skills: ["Qiskit", "Python", "C++", "Linear Algebra", "TensorFlow"],
      interests: ["Quantum Computing", "Deep Learning", "Cryptanalysis"],
      reputation: 96,
      projectsCount: 8
    },
    {
      id: "p2",
      name: "Marcus Chen",
      handle: "@marcus_neuro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      role: "BCI & Hardware Engineer",
      bio: "Prototyping non-invasive EEG headsets for realtime synthetic telepathy. Need firmware and low-latency DSP programmers.",
      location: "San Francisco, USA",
      category: "hardware",
      status: "Building a Team",
      skills: ["Embedded C", "FPGA", "Signal Processing", "PCB Design", "Rust"],
      interests: ["Neurotechnology", "Biohacking", "Cybernetics"],
      reputation: 92,
      projectsCount: 11
    },
    {
      id: "p3",
      name: "Aria Sterling",
      handle: "@ariasterling",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      role: "Cyberpunk 3D / Creative Technologist",
      bio: "Building spatial web experiences and immersive XR worlds. Searching for WebGPU and audio spatialization coders for ETHGlobal.",
      location: "London, UK",
      category: "design",
      status: "Seeking Hackathon Team",
      skills: ["Three.js", "Blender", "GLSL Shaders", "WebGPU", "Figma"],
      interests: ["Spatial Computing", "Generative Art", "XR/VR"],
      reputation: 99,
      projectsCount: 19
    },
    {
      id: "p4",
      name: "Kaelen Voss",
      handle: "@kvoss_sec",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      role: "Zero-Knowledge & Cryptography Dev",
      bio: "Writing Circom circuits for privacy-preserving verifiable compute. Looking to co-found a decentralized AI audit protocol.",
      location: "Berlin, Germany",
      category: "web3",
      status: "Available for Projects",
      skills: ["Circom", "Rust", "Solidity", "ZK-SNARKs", "Go"],
      interests: ["Cryptography", "Web3", "Privacy"],
      reputation: 94,
      projectsCount: 6
    },
    {
      id: "p5",
      name: "Zara Thorne",
      handle: "@zarathorne",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
      role: "Autonomous AI Agent Architect",
      bio: "Architecting multi-agent swarm environments that execute complex financial analytics and autonomous research.",
      location: "Singapore",
      category: "ai",
      status: "Recruiting for Startup",
      skills: ["Python", "LangChain", "LlamaIndex", "FastAPI", "VectorDBs"],
      interests: ["Agentic AI", "Swarm Intelligence", "Fintech"],
      reputation: 97,
      projectsCount: 15
    },
    {
      id: "p6",
      name: "Tariq Mansoor",
      handle: "@tariq_dev",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
      role: "Distributed Systems & Cloud Dev",
      bio: "Obsessed with high-throughput Raft consensus clusters and edge computing pipelines. Ready to join international hackathons.",
      location: "Dubai, UAE",
      category: "dev",
      status: "Available for Events",
      skills: ["Kubernetes", "Golang", "gRPC", "Kafka", "Docker"],
      interests: ["Distributed Systems", "Cloud Native", "DevOps"],
      reputation: 91,
      projectsCount: 10
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "OmniSynapse: Multi-Modal BCI Interface",
      tagline: "Translating EEG brainwave patterns into realtime robotic control with local LLMs.",
      category: "ai",
      stage: "Active Prototyping",
      spotsTotal: 4,
      spotsFilled: 2,
      bannerColor: "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(138, 43, 226, 0.4))",
      rolesNeeded: ["Low-Latency DSP Dev", "UI/Three.js Designer"],
      tags: ["Python", "C++", "PyTorch", "Three.js", "WebSockets"],
      lead: {
        name: "Marcus Chen",
        handle: "@marcus_neuro",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
      },
      stars: 42,
      joined: false
    },
    {
      id: "proj2",
      title: "HyperLedger Zero: ZK-Identity Protocol",
      tagline: "Verifiable reputation without leaking identity or credentials across multichain networks.",
      category: "web3",
      stage: "Hackathon Entry",
      spotsTotal: 5,
      spotsFilled: 3,
      bannerColor: "linear-gradient(135deg, rgba(255, 0, 127, 0.2), rgba(176, 38, 255, 0.4))",
      rolesNeeded: ["Rust Core Dev", "Front-end Web3 Dev"],
      tags: ["Rust", "Circom", "Next.js", "Wasm"],
      lead: {
        name: "Kaelen Voss",
        handle: "@kvoss_sec",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
      },
      stars: 68,
      joined: true
    },
    {
      id: "proj3",
      title: "SolarisXR: Cybernetic Spatial Collaboration",
      tagline: "A WebXR holographic whiteboard where teams inspect 3D models and code in virtual reality.",
      category: "design",
      stage: "Research & Design",
      spotsTotal: 3,
      spotsFilled: 1,
      bannerColor: "linear-gradient(135deg, rgba(0, 255, 170, 0.2), rgba(0, 240, 255, 0.35))",
      rolesNeeded: ["Shader Artist", "Backend Rust Dev"],
      tags: ["WebGPU", "Three.js", "WebXR", "GLSL"],
      lead: {
        name: "Aria Sterling",
        handle: "@ariasterling",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
      },
      stars: 89,
      joined: false
    },
    {
      id: "proj4",
      title: "BioSwarm: Distributed Pathogen DNA Sequencing",
      tagline: "Citizen science grid computing platform analyzing environmental genomic samples.",
      category: "research",
      stage: "Alpha Release",
      spotsTotal: 6,
      spotsFilled: 5,
      bannerColor: "linear-gradient(135deg, rgba(255, 170, 0, 0.2), rgba(255, 0, 127, 0.35))",
      rolesNeeded: ["Bioinformatician", "DevOps Engineer"],
      tags: ["BioPython", "Docker", "Go", "React"],
      lead: {
        name: "Dr. Elena Rostova",
        handle: "@elena_quantum",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80"
      },
      stars: 55,
      joined: false
    }
  ],
  events: [
    {
      id: "ev1",
      title: "CyberGenesis Hackathon 2026",
      organizer: "Quantum Guild & DevPost",
      date: "Nov 14 - 17, 2026",
      status: "Registration Open",
      prizePool: "$75,000 USD",
      category: "hackathon",
      teamsFormed: 142,
      banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
      description: "Build cutting-edge agentic workflows, holographic interfaces, and decentralized intelligence systems in 72 hours.",
      tags: ["AI Agents", "WebGPU", "ZK Proofs", "Global"],
      registered: true
    },
    {
      id: "ev2",
      title: "Global Neurotech & BCI Summit",
      organizer: "NeuroForge Alliance",
      date: "Dec 05, 2026",
      status: "Call for Teams",
      prizePool: "$40,000 Grants",
      category: "conference",
      teamsFormed: 64,
      banner: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80",
      description: "Meet researchers, test open-source EEG headsets, and collaborate on brain-machine interface standards.",
      tags: ["Neuroscience", "Hardware", "Bio-Sensors"],
      registered: false
    },
    {
      id: "ev3",
      title: "ETH Future Synthetics Global",
      organizer: "Ethereum Foundation & MetaCartel",
      date: "Jan 22 - 25, 2027",
      status: "Upcoming",
      prizePool: "$120,000 USD",
      category: "hackathon",
      teamsFormed: 210,
      banner: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80",
      description: "The world's premier Web3 builder event exploring Autonomous Agents, ERC-4337 Account Abstraction, and DePIN.",
      tags: ["Solidity", "Smart Contracts", "DeFi", "AI"],
      registered: false
    }
  ],
  teams: [
    {
      id: "team1",
      name: "Synthetix Swarm Core",
      purpose: "Building Autonomous Agentic DAO Governance",
      membersCount: 4,
      maxMembers: 5,
      openRole: "Lead Rust Architect",
      avatarColor: "var(--neon-cyan)",
      tags: ["AI Swarms", "Rust", "DAO"],
      status: "Recruiting",
      members: [
        { name: "Alex Vance", role: "AI Architect", lead: true },
        { name: "Zara Thorne", role: "Swarm Engineer" },
        { name: "Kaelen Voss", role: "Cryptographer" },
        { name: "Aria Sterling", role: "UI Designer" }
      ],
      userIsMember: true
    },
    {
      id: "team2",
      name: "Quantum Leap Labs",
      purpose: "Quantum Annealing for Logistic Routing",
      membersCount: 3,
      maxMembers: 4,
      openRole: "Optimization Mathetician",
      avatarColor: "var(--neon-violet)",
      tags: ["Quantum", "Qiskit", "C++"],
      status: "Recruiting",
      members: [
        { name: "Dr. Elena Rostova", role: "Quantum Lead", lead: true },
        { name: "Tariq Mansoor", role: "Distributed Dev" },
        { name: "Marcus Chen", role: "Systems Dev" }
      ],
      userIsMember: false
    },
    {
      id: "team3",
      name: "Voxel Drift VR",
      purpose: "Spatial Audio & VR Metaverse Engine",
      membersCount: 2,
      maxMembers: 4,
      openRole: "Audio DSP Engineer",
      avatarColor: "var(--neon-pink)",
      tags: ["WebXR", "Spatial Audio", "GLSL"],
      status: "Recruiting",
      members: [
        { name: "Aria Sterling", role: "Spatial Designer", lead: true },
        { name: "Liam Drake", role: "Shader Dev" }
      ],
      userIsMember: false
    }
  ],
  notifications: [
    { id: 1, text: "Dr. Elena Rostova accepted your connection request", time: "10m ago", icon: "user-check", type: "cyan" },
    { id: 2, text: "New applicant for HyperLedger Zero: Front-end Web3 Dev", time: "1h ago", icon: "users", type: "pink" },
    { id: 3, text: "CyberGenesis Hackathon team matching begins in 48 hours", time: "4h ago", icon: "calendar", type: "violet" }
  ]
};

// Local storage management
function getCollabrixData() {
  const stored = localStorage.getItem('collabrix_state');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch(e) {
      console.error("Failed to parse storage, using initial data", e);
    }
  }
  localStorage.setItem('collabrix_state', JSON.stringify(INITIAL_DATA));
  return INITIAL_DATA;
}

function saveCollabrixData(data) {
  localStorage.setItem('collabrix_state', JSON.stringify(data));
}
