/* =========================================================================
   HOME PAGE  ·  Around the World — trip overview
   ---------------------------------------------------------------------------
   Travelers, trip facts, links to all 7 country pages, final journey map,
   and the grand-total budget. All content comes from data/trip.ts.
   ========================================================================= */

import { trip } from '../data/trip';
import { Globe } from '../components/Globe';
import { RouteLine } from '../components/RouteLine';
import { Section, ImageSlot } from '../components/primitives';

export function Home() {
  return (
    <article className="page">
      {/* ---- HERO ----------------------------------------------------- */}
      <header className="hero">
        <div className="hero__text">
          <div className="hero__eyebrow">
            <span className="hero__rule" />
            <span className="eyebrow" style={{ margin: 0 }}>
              APHuG Travel Itinerary Project
            </span>
          </div>
          <h1 className="display hero__title">
            Around
            <br />
            the World
          </h1>
          <p className="hero__lede">5th Period AP Human Geography</p>

          {/* Travelers — this is a group project */}
          <div className="travelers">
            {trip.travelers.map((name) => (
              <div className="traveler" key={name}>
                <div className="traveler__badge">{name.charAt(0)}</div>
                <div>
                  <div className="traveler__role">Traveler</div>
                  <div className="traveler__name">{name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Globe />
      </header>

      {/* ---- TRIP META ------------------------------------------------ */}
      <div className="meta reveal">
        <div className="meta__cell">
          <p className="meta__k">Start date</p>
          <p className="meta__v">{trip.startDate}</p>
        </div>
        <div className="meta__cell">
          <p className="meta__k">End date</p>
          <p className="meta__v">{trip.endDate}</p>
        </div>
        <div className="meta__cell">
          <p className="meta__k">Starting point</p>
          <p className="meta__v">{trip.startingPoint}</p>
        </div>
        <div className="meta__cell">
          <p className="meta__k">Final destination</p>
          <p className="meta__v">{trip.finalDestination}</p>
        </div>
        <div className="meta__cell">
          <p className="meta__k">Total budget · max $35,000 / pair</p>
          <p className="meta__v">{trip.totalBudget}</p>
        </div>
      </div>

      {/* ---- THE ROUTE (stop links) ----------------------------------- */}
      <Section num="01" title="The Route">
        <p className="lede-sm">Hover a number to preview that stop — click it to open the page.</p>
        <RouteLine stops={trip.stops} />
      </Section>

      {/* ---- FINAL JOURNEY MAP ---------------------------------------- */}
      <Section num="02" title="Final Map · Full Journey">
        <ImageSlot tag="image1" image={trip.finalMap} />
        <div className="embedlink">
          <span className="embedlink__k">Map link / embed:</span>
          <span>{trip.mapEmbedLink}</span>
        </div>
      </Section>

      {/* ---- GRAND TOTAL BUDGET --------------------------------------- */}
      <Section num="03" title="Grand Total Budget">
        <table className="costtable">
          <thead>
            <tr>
              <th>Stop</th>
              <th>Total (USD)</th>
            </tr>
          </thead>
          <tbody>
            {trip.grandTotal.perStop.map((value, i) => (
              <tr key={i}>
                <td>Stop {i + 1}</td>
                <td>{value}</td>
              </tr>
            ))}
            <tr className="total-row">
              <td>Grand total · target ≤ $35,000</td>
              <td>{trip.grandTotal.total}</td>
            </tr>
          </tbody>
        </table>
      </Section>
    </article>
  );
}
