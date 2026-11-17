import habiSpaceImg from './assets/habispace.jpg';
import groceryImg from './assets/grocery_new.jpg';
import smartBonusImg from './assets/smar_bouns.png';
import itiCert from './assets/iti_cert_2026.jpg';
import gdgCoreCert2026 from './assets/gdg_core_2026.png';
import depiCert from './assets/Depi.jpg';
import coreCert from './assets/Core.png';

export const profile = {
  name: 'Abdelrahman Mahmoud',
  short: 'APDO',
  role: 'Flutter Developer',
  location: 'Benha, Egypt',
  email: 'apdo28011@gmail.com',
  phone: '+20 115 168 4594',
  phoneHref: 'tel:+201151684594',
  whatsapp: 'https://wa.me/201151684594',
  github: 'https://github.com/apdo2005',
  linkedin: 'https://www.linkedin.com/in/apdelraman-mahmoud-799500306',
  cv: '/cv.pdf',
};

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

export const stats = [
  { value: 350, suffix: '+', label: 'Codeforces problems solved' },
  { value: 5, suffix: '+', label: 'Production-grade apps shipped' },
  { value: 4, suffix: '', label: 'Verified certifications' },
  { value: 2, suffix: '+', label: 'Years building with Flutter' },
];

export const marquee = [
  'Flutter', 'Dart', 'Clean Architecture', 'BLoC', 'Riverpod', 'Firebase',
  'Supabase', 'REST APIs', 'Dio', 'Offline-First', 'Animations', 'Problem Solving',
];

export const services = [
  {
    num: '01',
    title: 'Mobile App Development',
    desc: 'Cross-platform iOS & Android apps with Flutter — pixel-precise UI, smooth 60fps motion and production-ready code.',
    tags: ['Flutter', 'Dart', 'Material / Cupertino'],
  },
  {
    num: '02',
    title: 'Clean Architecture',
    desc: 'Domain, Data and Presentation layers kept strictly apart, so features scale fast without piling up technical debt.',
    tags: ['SOLID', 'BLoC', 'Riverpod', 'Testing'],
  },
  {
    num: '03',
    title: 'Backend Integration',
    desc: 'Firebase, Supabase and REST APIs with Dio interceptors, token refresh, realtime sync and offline caching.',
    tags: ['Firebase', 'Supabase', 'Dio', 'Realtime'],
  },
  {
    num: '04',
    title: 'Performance & Algorithms',
    desc: '350+ solved Codeforces problems give me the instinct to spot bottlenecks and write efficient, predictable logic.',
    tags: ['DSA', 'Profiling', 'Optimization'],
  },
];

export const projects = [
  {
    title: 'HabiSpace',
    category: '3D Real Estate Platform',
    year: '2026',
    desc: 'A real estate app with interactive 3D spatial visualization, built on Clean Architecture with BLoC state streams and memory-optimized 3D model handling.',
    tech: ['Flutter', '3D Engine', 'Clean Architecture', 'BLoC'],
    github: 'https://github.com/apdo2005/HabiSpace',
    image: habiSpaceImg,
    color: '#1a1f14',
  },
  {
    title: 'Grocery Store',
    category: 'E-commerce App',
    year: '2025',
    desc: 'A high-performance storefront tuned for 60fps scrolling over large catalogs, instant reactive cart math and resilient offline cart sync.',
    tech: ['Flutter', 'State Management', 'Performance', 'UX'],
    github: 'https://github.com/Elfouly282/grocery2',
    image: groceryImg,
    color: '#1f1414',
  },
  {
    title: 'Smart Bonus',
    category: 'B2B Pharma Platform',
    year: '2025',
    desc: 'A B2B portal bridging pharmacies and pharmaceutical suppliers with Supabase realtime inventory, Dio token rotation and offline order buffering.',
    tech: ['Flutter', 'Supabase', 'Dio', 'Offline-First'],
    github: 'https://github.com/apdo2005/Smart_Bonus',
    image: smartBonusImg,
    color: '#141a1f',
  },
  {
    title: 'LabLink',
    category: 'Healthcare Ecosystem',
    year: '2025',
    desc: 'Connects patients with diagnostic labs — multi-role access control, automated booking slots and secure report sharing on Firebase.',
    tech: ['Flutter', 'Firebase Auth', 'Firestore', 'Clean Arch'],
    github: 'https://github.com/Habiba04/LabLink',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=70',
    color: '#1f1a14',
  },
  {
    title: 'Spider-Man',
    category: 'Motion Showcase',
    year: '2024',
    desc: 'An interactive showcase of kinetic page transitions, custom hero animations and async REST integration through Dio.',
    tech: ['Flutter', 'Animations', 'REST API', 'Dio'],
    github: 'https://github.com/apdo2005/Spider-Man-app',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1200&auto=format&fit=crop&q=70',
    color: '#1f1416',
  },
];

export const experience = [
  {
    period: '2026',
    role: 'Software Engineering Intern',
    org: 'HumaVolve',
    desc: 'Building production Flutter features, refining clean architectures and wiring reactive API synchronization in live environments.',
  },
  {
    period: '2025 — 2026',
    role: 'Flutter Core Team Member',
    org: 'GDG on Campus · Benha University',
    desc: 'Mentored student developers, built Flutter roadmaps and led hands-on mobile workshops through the season.',
  },
  {
    period: '2026',
    role: 'Flutter Program (102 hrs)',
    org: 'Information Technology Institute (ITI)',
    desc: 'Intensive program covering Dart, Flutter architecture, Firebase, Generative AI & AI agents integration and freelancing.',
  },
  {
    period: '2024',
    role: 'Mobile Application Specialist',
    org: 'Digital Egypt Pioneers Initiative (DEPI)',
    desc: 'Graduated from the Ministry of Communications mobile track — cross-platform architecture, reactive state and a team capstone.',
  },
];

export const certificates = [
  { title: 'Cross-Platform Mobile Development with Flutter', issuer: 'ITI', date: '2026', img: itiCert },
  { title: 'Flutter Core Team Member', issuer: 'GDG on Campus Benha', date: '2025 — 2026', img: gdgCoreCert2026 },
  { title: 'Mobile Application Specialist', issuer: 'DEPI', date: '2024', img: depiCert },
  { title: 'Core Technology Member', issuer: 'GDG Benha', date: '2025', img: coreCert },
];
