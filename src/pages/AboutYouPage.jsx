import "./AboutYouPage.css";

import FactSection from "../components/about/FactSection";
import MilestoneSection from "../components/about/MilestoneSection";

import { factSectionCatalog } from "../data/factSectionCatalog";

import HomeNeedsSection from "../components/about/HomeNeedsSection";

/**
 * ============================================================
 * Germany Move Quest
 * About You Page
 * ============================================================
 *
 * Responsibility
 * --------------
 * Renders the facts and milestones used to personalize the
 * selected user's journey.
 *
 * Ordinary single-value facts render through FactSection.
 * Structured milestone facts render through MilestoneSection.
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
  milestoneSection,
  milestones,
  milestoneValues,
  onUpdateMilestone,
}) {
  return (
    <section className="about-you-page">
      <header className="about-you-header">
        <p className="about-you-eyebrow">
          Über mich · About You
        </p>

        <h1>Help us personalize your journey</h1>

        <p>
          Your answers help us show only the quests and guidance that
          apply to your situation. You can update them at any time as
          your circumstances change.
        </p>
      </header>

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
    selectedItemIds={userFacts?.neededHomeItemIds ?? []}
    onUpdateFact={onUpdateFact}
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