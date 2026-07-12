/**
 * -----------------------------------------------------------------------------
 * PageIntro
 * -----------------------------------------------------------------------------
 *
 * Shared page heading used by the application's primary destinations.
 *
 * Responsibilities
 * - Display the page icon.
 * - Display the German page title.
 * - Display the English subtitle.
 * - Provide consistent spacing before the page content.
 *
 * This component contains no application logic. It is purely presentational and
 * helps create a consistent visual identity across Journey, Quests, Zuhause and
 * About You.
 *
 * Example:
 *
 * <PageIntro
 *   icon={Route}
 *   title="Reise"
 *   subtitle="See where you are in your relocation journey and what comes next."
 * />
 *
 * -----------------------------------------------------------------------------
 */

import "./PageIntro.css";

function PageIntro({ icon: Icon, title, subtitle }) {
  return (
    <header className="page-intro">
      <div className="page-intro__identity">
        {Icon && (
          <Icon
            className="page-intro__icon"
            aria-hidden="true"
            strokeWidth={2}
          />
        )}

        <h1 className="page-intro__title">{title}</h1>
      </div>

      {subtitle && <p className="page-intro__subtitle">{subtitle}</p>}
    </header>
  );
}

export default PageIntro;