import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { SOCIALS } from '../data';
import { Terminal, ArrowUp, Send, CheckCircle, X } from 'lucide-react';
import FooterOrb from './FooterOrb';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [terminalLogs, setTerminalLogs] = useState([
    { text: 'SYSTEM INTERFACE INITIALIZED. CHANNELS STATUS: ONLINE.', type: 'system' },
    { text: 'Execute social payload query or tap an access node on the left.', type: 'system' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [isOrbMounted, setIsOrbMounted] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: 'top 120%', // Triggers early, replicating rootMargin: '200px'
        onToggle: (self) => setIsOrbMounted(self.isActive),
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [terminalLogs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsContactOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const triggerTypewriterResponse = (fullText: string) => {
    let currentText = '';
    let index = 0;

    setTerminalLogs((prev) => [...prev, { text: ' ', type: 'success' }]);

    const interval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText.charAt(index);
        setTerminalLogs((prev) => {
          const updated = [...prev];
          if (updated.length > 0) {
            updated[updated.length - 1] = { text: currentText, type: 'success' };
          }
          return updated;
        });
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20);
  };

  const executeCommand = (command: string, linkUrl?: string) => {
    const cleanCmd = command.trim();
    if (!cleanCmd) return;

    setTerminalLogs((prev) => [...prev, { text: `> ${cleanCmd}`, type: 'input' }]);

    const lowerCmd = cleanCmd.toLowerCase();

    if (lowerCmd === 'clear' || lowerCmd === 'cls') {
      setTerminalLogs([]);
      setInputValue('');
      return;
    }

    // Helper to look up the URL from SOCIALS if linkUrl wasn't passed via input
    const getSocialUrl = (key: string) => {
      if (linkUrl) return linkUrl;
      const found = SOCIALS.find(
        (s) => s.id.toLowerCase().includes(key) || s.terminalCommand.toLowerCase().includes(key)
      );
      return found ? found.url : null;
    };

    let targetResponse = `shell: payload route unrecognized: ${cleanCmd}. Try typing 'help'.`;
    let isMatch = false;
    let targetUrl: string | null = null;

    if (lowerCmd.includes('linkedin')) {
      targetResponse = 'LINKEDIN ACCESS PROTOCOL INITIATED. BRIDGING PORT...';
      isMatch = true;
      targetUrl = getSocialUrl('linkedin');
    } else if (lowerCmd.includes('github')) {
      targetResponse = 'GITHUB SHELL PIPELINE VERIFIED. SPOOLING ENVIRONMENT...';
      isMatch = true;
      targetUrl = getSocialUrl('github');
    } else if (lowerCmd.includes('leetcode')) {
      targetResponse = 'LEETCODE RUNTIME ALLOCATION SUCCESSFUL. SYNCHRONIZING...';
      isMatch = true;
      targetUrl = getSocialUrl('leetcode');
    } else if (lowerCmd === 'help') {
      targetResponse = 'VALID MATRIX COMMANDS: [cat /dev/social/linkedin, cat /dev/social/github, cat /dev/social/leetcode, clear, cls, hello, ping]';
    } else if (lowerCmd === 'hello' || lowerCmd === 'hi') {
      targetResponse = "GREETINGS VISITOR. Welcome to the terminal interface.";
      isMatch = true;
    }

    if (isMatch) {
      triggerTypewriterResponse(targetResponse);

      if (targetUrl) {
        const destination = targetUrl;
        setTimeout(() => {
          window.open(destination, '_blank', 'noopener,noreferrer');
        }, 600);
      }
    } else {
      setTerminalLogs((prev) => [...prev, { text: targetResponse, type: 'system' }]);
    }

    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputValue);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitted(true);

    try {
      // Sends the payload to your email via Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "db080172-5c11-4395-8554-6cb684819977", // <-- Put your access key here
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setTerminalLogs((prev) => [...prev, { text: `> dispatch_packet --source="${formData.name}"`, type: 'input' }]);
        triggerTypewriterResponse(`STATUS 200: TRANSMISSION RECORDED. Message converges securely.`);
      } else {
        setTerminalLogs((prev) => [...prev, { text: `> dispatch_packet --source="${formData.name}"`, type: 'input' }]);
        triggerTypewriterResponse(`ERROR 500: TRANSMISSION REJECTED. Please try again.`);
      }
    } catch (error) {
      setTerminalLogs((prev) => [...prev, { text: `> dispatch_packet --source="${formData.name}"`, type: 'input' }]);
      triggerTypewriterResponse(`ERROR 500: NETWORK FAILURE. Could not establish connection.`);
    } finally {
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '' });
        setFormSubmitted(false);
        setIsContactOpen(false);
      }, 1500);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      className="relative min-h-screen w-full bg-[#050505] py-24 px-6 md:px-12 xl:px-24 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Volcanic Ambient Under-glow */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-orange-950/10 rounded-full blur-[160px] pointer-events-none mix-blend-screen" />

      {/* Orb Background Layer */}
      {isOrbMounted && (
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-auto">
          <FooterOrb />
        </div>
      )}

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center flex-1 justify-center mb-16 relative z-10 pointer-events-none">

        {/* Grid: Removed blanket pointer-events-auto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center justify-items-center w-full mb-16">

          {/* Left Column: pointer-events-none so empty space passes through to orb */}
          <div className="lg:col-span-6 space-y-8 w-full max-w-md justify-self-start lg:justify-self-center pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="h-[1px] w-8 bg-gradient-to-r from-orange-500 to-amber-500" />
              <span className="font-mono text-xs tracking-widest text-orange-400 font-bold">
                04 // LET'S CONNECT
              </span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white tracking-tight uppercase leading-none">
                ESTABLISH <br />
                <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-stone-400 bg-clip-text text-transparent">
                  CONNECTION
                </span>
              </h2>
              <p className="font-sans text-sm text-neutral-400 font-light leading-relaxed">
                Open to interesting projects, meaningful conversations, and new opportunities. Please find the feasible routes below.
                {/* <br/>
                Thank You for Visiting! */}
              </p>
            </div>

            {/* Social Links: pointer-events-auto re-enabled only on buttons */}
            <div className="space-y-3 font-mono text-xs">
              <div className="text-[9px] text-neutral-600 uppercase tracking-widest font-semibold">// ROUTING_ACCESS_NODES</div>
              {SOCIALS.map((soc) => (
                <button
                  key={soc.id}
                  onClick={() => executeCommand(soc.terminalCommand, soc.url)}
                  className="flex items-center gap-2 text-orange-400/90 hover:text-amber-400 transition-colors duration-200 group text-left cursor-pointer pointer-events-auto"
                >
                  <span className="text-neutral-700 font-bold group-hover:text-orange-500 transition-colors duration-200">{`>>>`}</span>
                  <span className="underline decoration-orange-500/20 underline-offset-4 font-semibold">{soc.terminalCommand}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Terminal wrapper gets pointer-events-auto */}
          <div className="lg:col-span-6 w-full max-w-xl lg:justify-self-center pointer-events-auto">
            <div className="border border-orange-500/30 rounded-xl bg-zinc-950 overflow-hidden shadow-[0_0_30px_rgba(249,115,22,0.1)] relative">

              {/* Terminal Frame Top Bar */}
              <div className="bg-neutral-900 px-4 py-3 flex items-center justify-between border-b border-orange-500/10 font-mono text-[10px] text-neutral-400 select-none">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 font-semibold text-neutral-300">operator@comms-node-04</span>
                </div>
                <span className="font-mono text-orange-400/60 font-medium">bash - v4.4_active</span>
              </div>

              {/* Console Output Screen Area */}
              <div className="p-5 h-64 overflow-y-auto font-mono text-xs space-y-3 scrollbar-none text-neutral-300">
                {terminalLogs.map((log, index) => (
                  <div key={index} className="leading-relaxed min-h-[1.25rem] block overflow-hidden clear-both">
                    {log.type === 'input' ? (
                      <span className="text-orange-400 font-bold">{log.text}</span>
                    ) : log.type === 'success' ? (
                      <span className="text-emerald-400 font-bold font-mono tracking-wide drop-shadow-[0_0_4px_rgba(52,211,153,0.35)]">
                        {log.text}
                      </span>
                    ) : (
                      <span>{log.text}</span>
                    )}
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>

              {/* Input Command Line Row */}
              <div className="border-t border-neutral-900 bg-neutral-950/60 p-4 flex items-center gap-2 font-mono text-xs text-orange-400">
                <span className="text-neutral-600 font-bold select-none">{`$`}</span>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="type operational instructions..."
                  className="bg-transparent border-none outline-none flex-1 text-white placeholder-neutral-700 font-mono font-medium focus:ring-0 focus:outline-none"
                />
                <button
                  onClick={() => executeCommand(inputValue)}
                  className="p-1.5 bg-orange-950/40 hover:bg-orange-900/40 text-orange-400 border border-orange-500/20 rounded transition-colors cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Centered CTA: pointer-events-auto so it stays clickable */}
        <div className="w-full flex justify-center mt-4">
          <button
            onClick={() => setIsContactOpen(true)}
            className="px-12 py-4 bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-black font-mono text-xs font-bold tracking-widest rounded shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:shadow-[0_0_40px_rgba(249,115,22,0.3)] transition-all duration-300 transform-gpu hover:-translate-y-0.5 cursor-pointer uppercase pointer-events-auto"
          >
            LAUNCH_DIRECT_CONTACT
          </button>
        </div>
      </div>

      {/* Contact Overlay Modal */}
      {isContactOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 cursor-auto">
          <div className="w-full max-w-md bg-neutral-950 border border-orange-500/20 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]">

            <div className="bg-neutral-900 px-4 py-3 flex items-center justify-between border-b border-orange-500/10 font-mono text-xs text-neutral-400">
              <span className="flex items-center gap-2 font-bold text-orange-400">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Cheers!
              </span>
              <button
                onClick={() => setIsContactOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-bold font-mono"
              >
                <span className="text-[10px] text-neutral-600 font-normal mr-1">[ESC]</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div className="space-y-1 font-mono text-xs">
                <label className="text-neutral-500 block">ALIAS:</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Identity token profile..."
                  className="w-full bg-black border border-neutral-800 p-2.5 rounded font-sans text-sm text-white focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1 font-mono text-xs">
                <label className="text-neutral-500 block">EMAIL:</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="operator@company.com"
                  className="w-full bg-black border border-neutral-800 p-2.5 rounded font-sans text-sm text-white focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1 font-mono text-xs">
                <label className="text-neutral-500 block">MESSAGE:</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Draft payload core data metrics here..."
                  className="w-full bg-black border border-neutral-800 p-2.5 rounded font-sans text-sm text-white focus:border-orange-500 focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formSubmitted}
                className="w-full py-3 bg-gradient-to-r from-orange-950/40 to-neutral-900 border border-orange-900/40 hover:border-orange-500 text-orange-400 font-mono text-xs font-bold tracking-widest rounded transition-all duration-300 transform-gpu flex items-center justify-center gap-2 cursor-pointer uppercase"
              >
                {formSubmitted ? (
                  <>
                    {/* <CheckCircle className="w-4 h-4 text-emerald-400" /> */}
                    <span>Transmitting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-orange-400" />
                    <span>Transmit</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer Meta: pointer-events-none on container, auto only on the scroll button */}
      <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-neutral-600 font-mono text-[9px] relative z-10 pointer-events-none">
        <div>
          © 2026  // ALL RIGHTS UNRESERVED.
        </div>
        <div className="flex items-center gap-6">
          <span className="text-orange-500/30 tracking-wider">Thank you for visiting</span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-neutral-500 hover:text-white transition-colors group cursor-pointer transform-gpu pointer-events-auto"
          >
            <span>RETURN_TOP</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}