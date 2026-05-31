/* =========================================================================
   COUNTRY PAGE  ·  one component renders all 7 stops
   ---------------------------------------------------------------------------
   The stop number comes from the route (/stop/:n). All content for the stop
   lives in data/trip.ts — edit it there, not here.
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
      <Fields>
        <Field label="Region" value={stop.region} />
        <Field label="Dates of visit" value={stop.datesOfVisit} />
        <Field label="Capital city" value={stop.capital} />
        <Field label="Other city / town / village" value={stop.otherPlace} />
      </Fields>

      {/* ---- APHuG Unit Connections ----------------------------------- */}
      <Section num="01" title="APHuG Unit Connections">
        <Fields>
          <Field label="Primary language" value={aphug.language} />
          <Field label="Religion" value={aphug.religion} />
          <Field label="DTM stage" value={aphug.dtmStage} />
          <Field label="Net migration" value={aphug.netMigration} />
          <Field label="Type of city" value={aphug.cityType} />
          <Field label="Culturally significant site" value={aphug.culturalSite} />
          <Field label="Agriculture" value={aphug.agriculture} />
          <Field label="Factory / export visited" value={aphug.factory} />
          <Field label="Typical home" value={aphug.typicalHome} />
          <Field label="Areas visited" value={aphug.areasVisited} />
        </Fields>
      </Section>

      {/* ---- Travel ---------------------------------------------------- */}
      <Section num="02" title="Travel">
        <Fields>
          <Field label="Arriving from" value={travel.arrivingFrom} />
          <Field label="Mode of transport" value={travel.mode} />
          <Field label="Transport cost" value={travel.modeCost} />
          <Field label="Local transport" value={travel.local} />
          <Field label="Local transport cost" value={travel.localCost} />
        </Fields>
      </Section>

      {/* ---- Accommodations ------------------------------------------- */}
      <Section num="03" title="Accommodations">
        <Fields>
          <Field label="Where we stayed" value={lodging.place} />
          <Field label="Nights" value={lodging.nights} />
          <Field label="Cost per night" value={lodging.perNight} />
          <Field label="Total lodging" value={lodging.total} />
        </Fields>
      </Section>

      {/* ---- Activities & Sites --------------------------------------- */}
      <Section num="04" title="Activities & Sites">
        <Items>
          {stop.activities.map((a, i) => (
            <Item key={i} text={a.text} cost={a.cost} />
          ))}
        </Items>
      </Section>

      {/* ---- Food ------------------------------------------------------ */}
      <Section num="05" title="Food">
        <Items>
          {food.items.map((f, i) => (
            <Item key={i} text={f.text} cost={f.cost} />
          ))}
        </Items>
        <div style={{ marginTop: '16px' }}>
          <Fields>
            <Field label="Food budget for the stay" value={food.budget} />
          </Fields>
        </div>
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

      {/* ---- Cost Summary --------------------------------------------- */}
      <Section num="08" title="Cost Summary for This Stop">
        <CostTable rows={costSummary.rows} total={costSummary.total} />
      </Section>
    </article>
  );
}
