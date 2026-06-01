/* =========================================================================
   COUNTRY PAGE  ·  one component renders all 7 stops
   ---------------------------------------------------------------------------
   The stop number comes from the route (/stop/:n). All content for the stop
   lives in data/trip.ts — edit it there, not here.

   Any fact whose value is "N/A" (or left blank) is automatically skipped, so
   the row simply doesn't appear on the page.
   ========================================================================= */

import { useParams, Navigate } from 'react-router-dom';
import { trip } from '../data/trip';
import {
  PageHeader,
  Section,
  Fields,
  Field,
  Items,
  Item,
  Journal,
  ImageSlot,
  CostTable,
} from '../components/primitives';

/** True for values that should not render a row (empty or "N/A"). */
function isBlank(value: string) {
  const v = value.trim();
  return v === '' || v.toUpperCase() === 'N/A';
}

/** Renders a group of fact rows, dropping any that are blank / N/A. */
function FactList({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <Fields>
      {rows
        .filter((r) => !isBlank(r.value))
        .map((r) => (
          <Field key={r.label} label={r.label} value={r.value} />
        ))}
    </Fields>
  );
}

export function Country() {
  const { n } = useParams<{ n: string }>();
  const stopNumber = Number(n);
  const stop = trip.stops.find((s) => s.stopNumber === stopNumber);

  if (!stop) return <Navigate to="/" replace />;

  const { aphug, travel, lodging, food, costSummary, photos } = stop;

  return (
    <article className="page">
      <PageHeader eyebrow={`Stop ${stop.stopNumber}`} title={stop.country} />

      {/* ---- Quick facts ---------------------------------------------- */}
      <FactList
        rows={[
          { label: 'Region', value: stop.region },
          { label: 'Dates of visit', value: stop.datesOfVisit },
          { label: 'Capital city', value: stop.capital },
          { label: 'Other city / town / village', value: stop.otherPlace },
        ]}
      />

      {/* ---- APHuG Unit Connections ----------------------------------- */}
      <Section num="01" title="APHuG Unit Connections">
        <FactList
          rows={[
            { label: 'Primary language', value: aphug.language },
            { label: 'Religion', value: aphug.religion },
            { label: 'DTM stage', value: aphug.dtmStage },
            { label: 'Net migration', value: aphug.netMigration },
            { label: 'Type of city', value: aphug.cityType },
            { label: 'Culturally significant site', value: aphug.culturalSite },
            { label: 'Agriculture', value: aphug.agriculture },
            { label: 'Factory / export visited', value: aphug.factory },
            { label: 'Typical home', value: aphug.typicalHome },
            { label: 'Areas visited', value: aphug.areasVisited },
          ]}
        />
      </Section>

      {/* ---- Travel ---------------------------------------------------- */}
      <Section num="02" title="Travel">
        <FactList
          rows={[
            { label: 'Arriving from', value: travel.arrivingFrom },
            { label: 'Mode of transport', value: travel.mode },
            { label: 'Transport cost', value: travel.modeCost },
            { label: 'Local transport', value: travel.local },
            { label: 'Local transport cost', value: travel.localCost },
          ]}
        />
      </Section>

      {/* ---- Accommodations ------------------------------------------- */}
      <Section num="03" title="Accommodations">
        <FactList
          rows={[
            { label: 'Where we stayed', value: lodging.place },
            { label: 'Nights', value: lodging.nights },
            { label: 'Cost per night', value: lodging.perNight },
            { label: 'Total lodging', value: lodging.total },
          ]}
        />
      </Section>

      {/* ---- Activities & Sites --------------------------------------- */}
      <Section num="04" title="Activities & Sites">
        <Items>
          {stop.activities
            .filter((a) => !isBlank(a.text))
            .map((a, i) => (
              <Item key={i} text={a.text} cost={a.cost} />
            ))}
        </Items>
      </Section>

      {/* ---- Food ------------------------------------------------------ */}
      <Section num="05" title="Food">
        <Items>
          {food.items
            .filter((f) => !isBlank(f.text))
            .map((f, i) => (
              <Item key={i} text={f.text} cost={f.cost} />
            ))}
        </Items>
        {!isBlank(food.budget) ? (
          <div style={{ marginTop: '16px' }}>
            <FactList rows={[{ label: 'Food budget for the stay (3 day estimate)', value: food.budget }]} />
          </div>
        ) : null}
      </Section>

      {/* ---- Journal --------------------------------------------------- */}
      <Section num="06" title="Journal">
        <Journal>{stop.journal}</Journal>
      </Section>

      {/* ---- Photos (at least 2) -------------------------------------- */}
      <Section num="07" title="Photos">
        <div className="photos">
          {photos.map((photo, i) => (
            <div key={i}>
              <ImageSlot tag={`image${i + 1}`} image={photo} />
              {photo.caption ? (
                <div className="caption">
                  <span className="caption__label">Caption</span>
                  <span>{photo.caption}</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </Section>

      {/* ---- Map of this stop ----------------------------------------- */}
      {stop.stopMap?.src ? (
        <Section num="08" title="Map of This Stop">
          <ImageSlot tag="stop map" image={stop.stopMap} contain />
        </Section>
      ) : null}

      {/* ---- Cost Summary --------------------------------------------- */}
      <Section num="09" title="Cost Summary for This Stop">
        <CostTable rows={costSummary.rows} total={costSummary.total} />
      </Section>
    </article>
  );
}
