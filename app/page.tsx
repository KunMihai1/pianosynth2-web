'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from './components/layout/Navbar';

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
      </svg>
    ),
    title: 'Advanced Synthesis',
    description: 'Professional-grade piano synthesis with realistic sound modeling and extensive customization.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
    title: 'MIDI Integration',
    description: 'Seamless MIDI device support with real-time input mapping and multi-device management.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    title: 'Chord Helper',
    description: 'Browse every chord and its inversions in an interactive library. Click any chord to hear it played instantly.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
      </svg>
    ),
    title: 'Playback & Recording',
    description: 'Import MIDI files, auto-separate them into tracks, and play them back with a built-in engine. Record your own sessions too.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f0520] via-purple-950 to-indigo-950 text-white overflow-hidden">
      {/* Background orbs */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[150px]"
        animate={{ x: [0, 60, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        style={{ top: '-15%', left: '-10%' }}
      />
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-pink-600/8 blur-[130px]"
        animate={{ x: [0, -50, 40, 0], y: [0, 40, -20, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
        style={{ bottom: '10%', right: '-5%' }}
      />

      {/* Navbar */}
      <Navbar />

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/20 text-purple-300 text-xs font-medium mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Now in Beta — Try it free
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight"
          >
            Your Piano,{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Reimagined
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-6 text-lg sm:text-xl text-purple-200/60 max-w-2xl mx-auto leading-relaxed"
          >
            Turn any budget MIDI keyboard into a powerhouse. PianoSynth2 brings premium features —
            like multi-track playback, chord helpers, and professional sound design — to keyboards at any price point.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="relative px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow overflow-hidden"
              >
                Get Started Free
                {/* Shimmer */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                  initial={{ x: '-200%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 4, ease: 'easeInOut' }}
                />
              </motion.button>
            </Link>

            <a href="#features">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 text-sm font-medium text-purple-200 border border-white/15 rounded-xl hover:bg-white/5 hover:border-white/25 transition-all"
              >
                Learn More ↓
              </motion.button>
            </a>
          </motion.div>
        </div>

        {/* Decorative piano keys hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="flex justify-center mt-20"
        >
          <div className="relative flex">
            {/* White keys */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={`white-${i}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.06, duration: 0.4 }}
                whileHover={{ y: -4, backgroundColor: '#e9d5ff' }}
                className="w-10 h-28 bg-white/10 border border-white/10 rounded-b-md cursor-pointer transition-colors"
                style={{ marginRight: i < 6 ? '2px' : '0' }}
              />
            ))}
            {/* Black keys — positioned absolutely between white keys */}
            {[
              { left: 29 },
              { left: 71 },
              { left: 155 },
              { left: 197 },
              { left: 239 },
            ].map((pos, i) => (
              <motion.div
                key={`black-${i}`}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 + i * 0.06, duration: 0.4 }}
                whileHover={{ y: -4, backgroundColor: '#7c3aed' }}
                className="absolute top-0 w-6 h-16 bg-purple-900/90 border border-purple-700/50 rounded-b-md cursor-pointer transition-colors z-10"
                style={{ left: pos.left }}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── FEATURES SECTION ─── */}
      <section id="features" className="relative py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Create
              </span>
            </h2>
            <p className="mt-4 text-purple-200/50 max-w-xl mx-auto">
              Powerful features designed to make your musical journey intuitive, inspiring, and effortless.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/15 to-pink-500/15 border border-purple-400/15 flex items-center justify-center text-purple-300 group-hover:text-purple-200 transition-colors mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-purple-200/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT SECTION ─── */}
      <section id="about" className="relative py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Designed for {' '}
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Begginer Musicians
              </span>
            </h2>
            <p className="text-purple-200/50 leading-relaxed text-lg">
              PianoSynth2 was born from a passion for music and technology. Whether you&apos;re a beginner
              learning your first chords or a professional crafting studio-quality compositions, we&apos;ve
              built every feature with you in mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── HELP / FAQ SECTION ─── */}
          <section id="help" className="relative py-24 px-6">
              <div className="max-w-3xl mx-auto">
                  <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6 }}
                      className="text-center mb-12"
                  >
                      <h2 className="text-3xl sm:text-4xl font-bold">
                          Need{' '}
                          <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                              Help?
                          </span>
                      </h2>
                      <p className="mt-4 text-purple-200/50">Common questions answered.</p>
                  </motion.div>

                  {/* FAQ Items */}
                  <div className="space-y-4 mb-8">
                      {[
                          { q: 'What MIDI devices are supported?', a: 'PianoSynth2 supports all standard MIDI controllers. Simply connect your device and it will be automatically detected.' },
                          { q: 'Is there a free plan?', a: 'Yes! PianoSynth2 is entirely free to use.' },
                          { q: 'Can I use it offline?', a: 'Absolutely. The desktop app works fully offline. But your progress, including playtime and in-game currency won\'t save for now.' },
                      ].map((faq, i) => (
                          <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 15 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: i * 0.1, duration: 0.5 }}
                              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 hover:bg-white/[0.05] transition-colors"
                          >
                              <h3 className="font-semibold text-white text-sm mb-2">{faq.q}</h3>
                              <p className="text-sm text-purple-200/50 leading-relaxed">{faq.a}</p>
                          </motion.div>
                      ))}
                  </div>

                  {}
                  <div className="text-center">
                      <motion.a
                          href="#contact" 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.97 }}
                          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
                      >
                          Have a Question? Contact Us
                          <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                          >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-4.586 4.586M14.752 11.168L9.502 6.918M14.752 11.168H3" />
                          </svg>
                      </motion.a>
                  </div>
              </div>
          </section>

      {/* ─── CTA SECTION ─── */}
      <section className="relative py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-400/15 rounded-3xl p-12"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Start Playing?</h2>
          <p className="text-purple-200/50 mb-8">
            Join thousands of musicians already creating with PianoSynth2.
          </p>
          <Link href="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 text-sm font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow"
            >
              Create Free Account
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ─── CONTACT SECTION ─── */}
      <section id="contact" className="relative py-24 px-6">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Get in{' '}
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>
            <p className="text-purple-200/50 mb-8">
              Have a question, suggestion, or found a bug? We&apos;d love to hear from you.
            </p>
            <a
              href="mailto:your@email.com"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              pianosynthapp@gmail.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative border-t border-white/5 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold text-[10px]">P2</span>
            </div>
            <span className="text-sm text-purple-200/50">
              © 2026 PianoSynth2. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-purple-200/40">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}