import { MapPin } from 'lucide-react';
import { Section, SectionHeader, CTABand } from '@/components/Section';
import { useReveal } from '@/lib/hooks';
import { navigate, routeHref, handleRouteLinkClick } from '@/lib/router';
import { team } from '@/data/content';
import type { TeamMember } from '@/data/content';

function TeamCard({ member, index }: { member: TeamMember; index: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`card card-glow relative overflow-hidden reveal ${visible ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="p-8">
        <h3 className="text-xl">{member.name}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-gold">
          <MapPin size={13} /> {member.role}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-secondary">{member.bio}</p>
      </div>
    </div>
  );
}

export function LeadershipSection() {
  const introReveal = useReveal();
  const teamReveal = useReveal();

  return (
    <Section id="leadership" bg="plain">
      <div className="container-wrap">
        <div ref={introReveal.ref} className={`reveal ${introReveal.visible ? 'is-visible' : ''}`}>
          <SectionHeader
            eyebrow="About Us"
            title="The people behind AvantSpecs"
            description="A newly launched, boutique trade house based in Rohtak, India, run by a small team with named contacts you can reach directly."
            headingLevel="h1"
          />
        </div>

        <div ref={teamReveal.ref} className="mt-12">
          <p className="eyebrow">Leadership</p>
          <div className="mt-6 grid max-w-4xl gap-6 sm:grid-cols-2">
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>

        <p className="mt-8 text-sm text-ink-secondary">
          Evaluating us against other suppliers?{' '}
          <a
            href={routeHref('guide')}
            onClick={(e) => handleRouteLinkClick(e, () => navigate('guide'))}
            className="font-semibold text-green underline underline-offset-2 hover:text-green-mid"
          >
            Read our guide to vetting a botanical export partner
          </a>
          .
        </p>
      </div>

      <div className="mt-20">
        <CTABand
          title="Ready to place your first enquiry?"
          description="Submit a request for quote and receive a reference number to track your enquiry. We respond within 48 hours."
          primaryLabel="Open the Order Portal"
          primaryRoute="register"
          secondaryLabel="Contact the Trade Desk"
          secondaryRoute="contact"
        />
      </div>
    </Section>
  );
}
