import "./AboutYouPage.css";

import PageIntro from "../components/common/PageIntro";

import FactSection from "../components/about/FactSection";
import HomeNeedsSection from "../components/about/HomeNeedsSection";
import MilestoneSection from "../components/about/MilestoneSection";

import { icons } from "../data/icons";
import { factSectionCatalog } from "../data/factSectionCatalog";

/**
 * ============================================================
 * Germany Move Quest
 * About You Page
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders the facts and milestones used to personalise the
 * selected user's journey.
 *
 * Ordinary single-value facts render through FactSection.
 * Structured milestone facts render through MilestoneSection.
 * Home Needs render through HomeNeedsSection.
 *
 * This page assembles catalogs and user values for presentation.
 * It does not define facts, own user state, or derive journey
 * meaning.
 *
 * Architectural principle:
 * Store facts. Derive everything else.
 */

function AboutYouPage({
  facts,
  userFacts,
  onUpdateFact,
  homeNeeds,
  onUpdateHomeNeeds,
  milestoneSection,
  milestones,
  milestoneValues,
  onUpdateMilestone,
}) {
  return (
    <section className="about-you-page">
      <PageIntro
        icon={icons.profile}
        title="Über mich"
        subtitle="Tell us about your situation so we can personalise your journey to and life in Germany."
      />

      <div className="about-you-sections">
        {factSectionCatalog.map((section) => {
          const sectionFacts = facts.filter(
            (fact) => fact.sectionId === section.id
          );

          if (sectionFacts.length === 0) {
            return null;
          }

          return (
            <FactSection
              key={section.id}
              section={section}
              facts={sectionFacts}
              userFacts={userFacts}
              onUpdateFact={onUpdateFact}
            />
          );
        })}

        <HomeNeedsSection
          selectedItemIds={
            homeNeeds?.neededHomeItemIds ?? []
          }
          onUpdateHomeNeeds={onUpdateHomeNeeds}
        />

        <MilestoneSection
          section={milestoneSection}
          milestones={milestones}
          milestoneValues={milestoneValues}
          onUpdateMilestone={onUpdateMilestone}
        />
      </div>
    </section>
  );
}

export default AboutYouPage;