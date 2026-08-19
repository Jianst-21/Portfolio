'use client';

import { useState, useRef, useEffect } from 'react';

const commandsInfo = {
  help: 'Lists all available commands.',
  whoami: 'Displays author information.',
  skills: 'Lists skills by layer.',
  experience: 'Lists work experience summary.',
  projects: 'Lists project names.',
  contact: 'Shows email and social links.',
  clear: 'Clears terminal output.'
};

const outputResponses = {
  whoami: 'Aji Noto Sutrisno — Informatics Student & Web Developer, Telkom University Purwokerto (Semester 6)',
  skills: `Languages & Frameworks: JavaScript, HTML/CSS, ReactJS, Next.js, ExpressJS, TailwindCSS, Python\nDatabases & Cloud: MySQL, Supabase, Mikrotik\nAI & Models: YOLO, IndoBERT, SVM`,
  experience: `Web Developer Intern at DPRD Kabupaten Purbalingga (2026)\nProject Manager at PT Abyakta Ageng Propertindo (2026)\nFullstack Developer at PT Putri Jagad Raya Jaya Abadi (2026)\nWeb Developer Intern at Bikin Kreatif ID (2026)\nFrontend Developer at PT Bangun Persada Property (2025)`,
  projects: `Stellarum, Abyakta, Ibravia, HeyHRS, Website DPRD Purbalingga`,
  contact: `Email: ajinotosutrisno212@gmail.com\nGitHub: https://github.com/Jianst-21\nLinkedIn: https://www.linkedin.com/in/aji-noto-sutrisno-180946421/\nInstagram: https://www.instagram.com/jiinst_/\nPhone/WhatsApp: +62 856-0445-8507`
};

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome! Type "help" to see available commands.' }
  ]);
  const [input, setInput] = useState('');
  const outputContainerRef = useRef(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Prevent scrolling inner terminal or window on initial render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Scroll only the internal terminal container, NOT the window
    if (outputContainerRef.current) {
      outputContainerRef.current.scrollTop = outputContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      
      if (!cmd) return;

      const newHistory = [...history, { type: 'command', text: cmd }];
      
      if (cmd === 'clear') {
        setHistory([]);
      } else if (cmd === 'help') {
        const helpText = Object.entries(commandsInfo).map(([k, v]) => `${k.padEnd(12)} - ${v}`).join('\n');
        setHistory([...newHistory, { type: 'output', text: helpText }]);
      } else if (outputResponses[cmd]) {
        setHistory([...newHistory, { type: 'output', text: outputResponses[cmd] }]);
      } else {
        setHistory([...newHistory, { type: 'output', text: 'Command not found. Type "help" for available commands.' }]);
      }
      
      setInput('');
    }
  };

  return (
    <div className="bg-[#050403] border border-[var(--line)] rounded-2xl overflow-hidden font-mono text-sm shadow-xl flex flex-col h-[400px]">
      {/* Header bar */}
      <div className="bg-[var(--card)] border-b border-[var(--line)] px-4 py-3 flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
        </div>
        <span className="text-[var(--muted)] text-xs mx-auto">terminal</span>
      </div>

      {/* Output area */}
      <div ref={outputContainerRef} className="p-4 flex-grow overflow-y-auto whitespace-pre-wrap">
        {history.map((item, i) => (
          <div key={i} className="mb-2">
            {item.type === 'command' ? (
              <div><span className="text-[var(--ai)]">$ </span><span className="text-[var(--ink)]">{item.text}</span></div>
            ) : (
              <div className="text-[var(--muted)]">{item.text}</div>
            )}
          </div>
        ))}
        
        {/* Input line */}
        <div className="flex items-center">
          <span className="text-[var(--ai)] mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-grow bg-transparent border-none outline-none text-[var(--ink)] placeholder-[var(--muted)]"
            placeholder="Type a command..."
            autoComplete="off"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
}
