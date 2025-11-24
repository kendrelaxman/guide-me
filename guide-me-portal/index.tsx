import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu,
  X,
  Zap,
  Box,
  Palette,
  Check,
  ChevronDown,
  Github,
  Twitter,
  Mail,
  ArrowRight,
  Play,
  Code
} from 'lucide-react';

// --- Components ---

const Button = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button'
}: {
  children: React.ReactNode,
  variant?: 'primary' | 'secondary' | 'outline' | 'text',
  className?: string,
  onClick?: () => void,
  type?: 'button' | 'submit' | 'reset'
}) => {
  const baseStyles = "px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/20",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300",
    outline: "bg-transparent border border-slate-600 text-slate-900 hover:border-slate-900",
    text: "bg-transparent text-slate-600 hover:text-slate-900"
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const Logo = ({ onClick }: { onClick?: () => void }) => (
  <div className="flex items-center gap-2 cursor-pointer" onClick={onClick}>
    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
      G
    </div>
    <span className="text-xl font-bold text-slate-900">Guide Me</span>
  </div>
);

// --- Mock Dashboard for Hero Image ---
const DashboardPreview = () => {
  return (
    <div className="relative rounded-xl bg-white shadow-2xl border border-slate-200 overflow-hidden aspect-[4/3] w-full max-w-2xl mx-auto transform transition-transform hover:scale-[1.01] duration-500">
      {/* Top Bar */}
      <div className="h-8 bg-slate-50 border-b border-slate-200 flex items-center px-3 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
        </div>
        <div className="flex-1 text-center text-xs text-slate-400 bg-white mx-4 rounded py-0.5 border border-slate-100">
          dashboard.guideme.io
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-48 bg-slate-50 border-r border-slate-100 p-4 flex flex-col gap-3">
          <div className="h-6 w-24 bg-slate-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-blue-50 rounded-md border border-blue-100"></div>
          <div className="h-4 w-3/4 bg-slate-200 rounded-md"></div>
          <div className="h-4 w-5/6 bg-slate-200 rounded-md"></div>
          <div className="h-4 w-2/3 bg-slate-200 rounded-md"></div>

          <div className="mt-auto h-12 w-full bg-indigo-50 rounded-lg border border-indigo-100 p-2 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-200"></div>
            <div className="h-3 w-16 bg-indigo-200 rounded"></div>
          </div>
        </div>

        {/* Dashboard Area */}
        <div className="flex-1 p-6 bg-white relative">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="h-6 w-48 bg-slate-800 rounded mb-2"></div>
              <div className="h-3 w-32 bg-slate-300 rounded"></div>
            </div>
            <div id="new-project-btn" className="h-9 w-28 bg-blue-600 rounded-md shadow-sm"></div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="h-24 bg-slate-50 border border-slate-100 rounded-lg"></div>
            <div className="h-24 bg-slate-50 border border-slate-100 rounded-lg"></div>
            <div className="h-24 bg-slate-50 border border-slate-100 rounded-lg"></div>
          </div>

          <div className="h-48 bg-slate-50 border border-slate-100 rounded-lg w-full"></div>

          {/* Floating Guidance Tooltip */}
          <div className="absolute top-20 right-48 z-20 animate-bounce-slight">
            <div className="relative">
              <div className="bg-slate-900 text-white text-sm px-4 py-3 rounded-lg shadow-xl max-w-xs w-64">
                <div className="font-semibold mb-1 flex items-center gap-2">
                  <span className="bg-blue-500 text-[10px] py-0.5 px-1.5 rounded uppercase">New</span>
                  Create Project
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  Start here by creating your first analytics project. It only takes a few seconds!
                </p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-slate-400">Step 1 of 4</span>
                  <button className="text-xs font-bold text-blue-400 hover:text-blue-300">Next &rarr;</button>
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute -right-2 top-[-6px] w-4 h-4 bg-slate-900 transform rotate-45"></div>
            </div>
            {/* Pulse effect on target */}
            <div className="absolute top-[-40px] right-[-140px] w-28 h-9 border-2 border-blue-500 rounded-md animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Page Components ---

const Home = ({ onNavigate }: { onNavigate: (page: string) => void }) => (
  <>
    {/* Hero Section */}
    <section className="pt-20 pb-32 overflow-hidden bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 leading-tight">
            The Easiest Way to Onboard Users to Your <span className="text-blue-600">Web App.</span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
            Guide Me is a lightweight JavaScript library for creating powerful product tours.
            Increase adoption and reduce support tickets in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button onClick={() => onNavigate('pricing')} className="w-full sm:w-auto h-12 px-8 text-lg">
              Get Started Now
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto h-12 px-8 text-lg" onClick={() => window.open('http://localhost:5173', '_blank')}>
              <Play size={18} className="fill-current" /> View Live Demo
            </Button>
          </div>
        </div>

        <DashboardPreview />

        {/* Social Proof */}
        <div className="mt-20 pt-10 border-t border-slate-200">
          <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
            Trusted by product teams at
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['Acme Corp', 'GlobalBank', 'SaaS Inc', 'TechFlow', 'StartUp'].map((company) => (
              <div key={company} className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <div className="w-6 h-6 bg-slate-800 rounded-full"></div> {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Features Grid */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Why developers choose Guide Me</h2>
          <p className="text-lg text-slate-600">Built for performance and developer experience.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {[
            {
              icon: <Zap className="w-8 h-8 text-yellow-500" />,
              title: "Blazing Fast",
              desc: "Less than 12kb gzipped. No heavy dependencies. Loads instantly and doesn't slow down your application."
            },
            {
              icon: <Box className="w-8 h-8 text-blue-500" />,
              title: "Zero Dependencies",
              desc: "Pure TypeScript. No jQuery, no Popper.js, nothing. Just drop it in and it works with any framework."
            },
            {
              icon: <Palette className="w-8 h-8 text-purple-500" />,
              title: "Fully Styled",
              desc: "Beautiful out of the box, but easily customizable with CSS variables to match your brand identity."
            }
          ].map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="mb-4 p-3 bg-white rounded-xl inline-block shadow-sm border border-slate-100">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Code Section */}
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-6 border border-blue-800">
            <Code size={14} />
            <span>Developer Friendly</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Integrated in minutes, not days.</h2>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed">
            Our API is designed to be intuitive. Define your steps, attach them to elements, and start the tour.
            Works with React, Vue, Angular, or vanilla JS.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              "TypeScript definitions included",
              "Framework agnostic",
              "Event driven architecture"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white">
                  <Check size={14} strokeWidth={3} />
                </div>
                {item}
              </li>
            ))}
          </ul>
          <Button className="bg-white !text-blue-600 hover:bg-slate-100" onClick={() => window.open('https://github.com', '_blank')}>
            Read Documentation
          </Button>
        </div>

        <div className="flex-1 w-full max-w-xl">
          <div className="rounded-xl bg-[#1e222a] shadow-2xl border border-slate-700 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-[#282c34] border-b border-slate-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="ml-2 text-xs text-slate-400 font-mono">main.js</span>
            </div>
            <div className="p-6 font-mono text-sm overflow-x-auto">
              <pre><code><span className="token-keyword">import</span> <span className="code-syntax">{` { GuideMe } `}</span><span className="token-keyword">from</span> <span className="token-string">'guide-me'</span><span className="code-syntax">;</span>

                <span className="token-comment">// Initialize the tour</span>
                <span className="token-keyword">const</span> <span className="code-syntax">tour = </span><span className="token-keyword">new</span> <span className="token-function">GuideMe</span><span className="code-syntax">({`{`}</span>
                <span className="code-syntax">steps: [</span>
                <span className="code-syntax">{`{`}</span>
                <span className="code-syntax">element: </span><span className="token-string">'#new-project'</span><span className="code-syntax">,</span>
                <span className="code-syntax">title: </span><span className="token-string">'Create Project'</span><span className="code-syntax">,</span>
                <span className="code-syntax">description: </span><span className="token-string">'Start here.'</span>
                <span className="code-syntax">{`}`}</span><span className="code-syntax">,</span>
                <span className="code-syntax">{`{`}</span>
                <span className="code-syntax">element: </span><span className="token-string">'#settings'</span><span className="code-syntax">,</span>
                <span className="code-syntax">title: </span><span className="token-string">'Configuration'</span><span className="code-syntax">,</span>
                <span className="code-syntax">description: </span><span className="token-string">'Adjust defaults.'</span>
                <span className="code-syntax">{`}`}</span>
                <span className="code-syntax">]</span>
                <span className="code-syntax">{`});`}</span>

                <span className="token-comment">// Start it automatically or on click</span>
                <span className="token-function">tour.start</span><span className="code-syntax">();</span></code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-blue-600 text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to improve your user activation?</h2>
        <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
          Join 10,000+ developers who use Guide Me to build better onboarding experiences.
        </p>
        <Button
          className="bg-white !text-blue-600 hover:bg-blue-50 px-10 py-4 h-auto text-lg shadow-xl"
          onClick={() => onNavigate('pricing')}
        >
          See Pricing & Licenses
        </Button>
      </div>
    </section>
  </>
);

const Pricing = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [loading, setLoading] = useState(false);

  const handleBuy = async (plan: string) => {
    const email = prompt("Enter your email to purchase:");
    if (!email) return;

    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan })
      });
      const data = await response.json();
      if (data.success) {
        alert(`Purchase Successful!\nLicense Key: ${data.licenseKey}`);
      } else {
        alert('Purchase failed. Please try again.');
      }
    } catch (error) {
      alert('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Licensing</h1>
          <p className="text-xl text-slate-600">
            A JavaScript library for product tours to use in your app. Pay once, use forever.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
          {/* Hobbyist */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Hobbyist</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-slate-900">$49</span>
              <span className="text-slate-500">/one-time</span>
            </div>
            <p className="text-slate-600 mb-8 text-sm">Perfect for side projects and indie developers.</p>
            <Button variant="secondary" className="w-full mb-8" onClick={() => handleBuy('hobbyist')}>Buy Now</Button>
            <ul className="space-y-4 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Check size={16} className="text-green-500" /> 1 Domain
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Check size={16} className="text-green-500" /> Standard Support
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Check size={16} className="text-green-500" /> 1 Year Updates
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Check size={16} className="text-green-500" /> All Core Features
              </li>
            </ul>
          </div>

          {/* Professional */}
          <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-slate-900 flex flex-col relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Professional</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-slate-900">$149</span>
              <span className="text-slate-500">/one-time</span>
            </div>
            <p className="text-slate-600 mb-8 text-sm">For growing businesses and serious apps.</p>
            <Button variant="primary" className="w-full mb-8" onClick={() => handleBuy('professional')}>Buy Now</Button>
            <ul className="space-y-4 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Check size={16} className="text-green-500" /> 5 Domains
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Check size={16} className="text-green-500" /> Priority Support
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Check size={16} className="text-green-500" /> Lifetime Updates
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Check size={16} className="text-green-500" /> Source Code Access
              </li>
            </ul>
          </div>

          {/* Agency */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Agency / SaaS</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-slate-900">$399</span>
              <span className="text-slate-500">/one-time</span>
            </div>
            <p className="text-slate-600 mb-8 text-sm">For teams managing multiple client projects.</p>
            <Button variant="secondary" className="w-full mb-8" onClick={() => handleBuy('agency')}>Buy Now</Button>
            <ul className="space-y-4 flex-1">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Check size={16} className="text-green-500" /> Unlimited Domains
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Check size={16} className="text-green-500" /> Dedicated Support
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Check size={16} className="text-green-500" /> Lifetime Updates
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <Check size={16} className="text-green-500" /> White Label License
              </li>
            </ul>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-slate-500 mt-2">Everything you need to know about the product and billing.</p>
          </div>

          <div className="space-y-8">
            {[
              {
                q: "What is a domain definition?",
                a: "A domain is defined as a single production URL (e.g., app.yourcompany.com). You can use the license on an unlimited number of subdomains for development and staging purposes (e.g., localhost, dev.yourcompany.com)."
              },
              {
                q: "Is it a monthly subscription?",
                a: "No! Guide Me is a one-time purchase. You pay once and own the license forever. Optional support plans are available for renewal annually, but the software is yours to keep."
              },
              {
                q: "How do I get the files?",
                a: "Immediately after purchase, you'll receive an email with a download link and your license key. You can also access them anytime from your account dashboard."
              },
              {
                q: "Can I use it for client projects?",
                a: "Yes, the Agency license is specifically designed for this purpose. The Professional license allows up to 5 domains which can also be client projects."
              }
            ].map((faq, i) => (
              <div key={i} className="border-b border-slate-200 pb-8 last:border-0">
                <h4 className="text-lg font-bold text-slate-900 mb-2">Q. {faq.q}</h4>
                <p className="text-slate-600 leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Pre-Sales',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', subject: 'Pre-Sales', message: '' });
      }
    } catch (error) {
      alert('Failed to send message.');
    }
  };

  return (
    <div className="bg-white min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Get in touch</h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              If you need to contact us for pre-sales questions or support, please use the form or the details below.
              We usually respond within 24 hours.
            </p>

            <div className="space-y-8">
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Email</h3>
                <a href="mailto:support@guideme.js" className="text-xl font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-2">
                  <Mail size={20} /> support@guideme.js
                </a>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Twitter</h3>
                <a href="#" className="text-xl font-semibold text-slate-900 hover:text-blue-600 flex items-center gap-2">
                  <Twitter size={20} /> @GuideMeJS
                </a>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Address</h3>
                <p className="text-xl font-semibold text-slate-900">
                  123 Dev Street, Suite 100<br />
                  San Francisco, CA 94103
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                <div className="relative">
                  <select
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none bg-white"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option>Pre-Sales</option>
                    <option>Support</option>
                    <option>Partnership</option>
                    <option>Other</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <Button type="submit" variant="primary" className="w-full py-4 text-lg">
                Send Message
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-slate-50 pt-16 pb-8 border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div className="col-span-2">
          <Logo />
          <p className="mt-4 text-sm text-slate-500 max-w-xs">
            The definitive library for creating step-by-step product tours and onboarding guides for modern web applications.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" className="text-slate-400 hover:text-slate-900"><Github size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-blue-400"><Twitter size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-4">Product</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><a href="#" className="hover:text-blue-600">Features</a></li>
            <li><a href="#" className="hover:text-blue-600">Integrations</a></li>
            <li><a href="#" className="hover:text-blue-600">Showcase</a></li>
            <li><a href="#" className="hover:text-blue-600">Changelog</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><a href="#" className="hover:text-blue-600">Documentation</a></li>
            <li><a href="#" className="hover:text-blue-600">API Reference</a></li>
            <li><a href="#" className="hover:text-blue-600">Examples</a></li>
            <li><a href="#" className="hover:text-blue-600">Community</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-slate-600">
            <li><a href="#" className="hover:text-blue-600">About Us</a></li>
            <li><a href="#" className="hover:text-blue-600">Blog</a></li>
            <li><a href="#" className="hover:text-blue-600">Legal</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500">
          © 2024 Guide Me. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-slate-500">
          <a href="#" className="hover:text-slate-900">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main Application ---

const App = () => {
  const [page, setPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsMenuOpen(false);
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 'home': return <Home onNavigate={setPage} />;
      case 'pricing': return <Pricing onNavigate={setPage} />;
      case 'contact': return <Contact />;
      default: return <Home onNavigate={setPage} />;
    }
  };

  const NavLink = ({ target, label }: { target: string, label: string }) => (
    <button
      onClick={() => setPage(target)}
      className={`font-medium text-sm transition-colors ${page === target ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Navbar */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo onClick={() => setPage('home')} />

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink target="home" label="Features" />
              <NavLink target="pricing" label="Pricing" />
              <button onClick={() => window.open('https://github.com', '_blank')} className="font-medium text-sm text-slate-600 hover:text-slate-900">Docs</button>
              <NavLink target="contact" label="Contact" />
              <Button
                onClick={() => setPage('pricing')}
                className="px-4 py-2 text-sm"
              >
                Buy Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-slate-900 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-200 shadow-lg p-4 flex flex-col gap-4">
            <button onClick={() => setPage('home')} className="text-left font-medium p-2 hover:bg-slate-50 rounded">Features</button>
            <button onClick={() => setPage('pricing')} className="text-left font-medium p-2 hover:bg-slate-50 rounded">Pricing</button>
            <button onClick={() => window.open('https://github.com', '_blank')} className="text-left font-medium p-2 hover:bg-slate-50 rounded">Docs</button>
            <button onClick={() => setPage('contact')} className="text-left font-medium p-2 hover:bg-slate-50 rounded">Contact</button>
            <Button onClick={() => setPage('pricing')} className="w-full justify-center">Buy Now</Button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
