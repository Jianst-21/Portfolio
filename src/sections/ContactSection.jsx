import SectionHeader from '@/components/common/SectionHeader';
import RevealOnScroll from '@/components/common/RevealOnScroll';
import Terminal from '@/components/contact/Terminal';
import SocialLinks from '@/components/contact/SocialLinks';

export default function ContactSection() {
  return (
    <section id="kontak" className="py-20 w-full">
      <SectionHeader title="Kontak Saya" highlight="Saya" />
      
      <div className="w-full max-w-[1120px] mx-auto px-4">
        <RevealOnScroll>
          <Terminal />
        </RevealOnScroll>
        
        <RevealOnScroll delay={200}>
          <SocialLinks />
        </RevealOnScroll>
      </div>
    </section>
  );
}
