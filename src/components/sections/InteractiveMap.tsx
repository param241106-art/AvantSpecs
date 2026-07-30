import { useEffect, useRef, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps';
import { geoCentroid } from 'd3-geo';
import { regions } from '@/data/content';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';

// Names as they appear in our content vs. the names used by the map's
// country dataset, wherever the two disagree.
const nameAliases: Record<string, string> = {
  'United States': 'United States of America',
  UAE: 'United Arab Emirates',
};

const ORIGIN_NAME = 'AvantSpecs, Rohtak';
const ORIGIN_COORDS: [number, number] = [76.61, 28.89];

const CYCLE_MS = 2600;
const RESUME_AFTER_MS = 7000;

type ConnectedCountry = { name: string; mapName: string; region: string };

const connectedCountries: ConnectedCountry[] = regions.flatMap((region) =>
  region.countries.map((country) => ({
    name: country,
    mapName: nameAliases[country] ?? country,
    region: region.name,
  })),
);

const connectedNames = new Set(connectedCountries.map((c) => c.mapName));

export function InteractiveMap() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % connectedCountries.length);
    }, CYCLE_MS);
    return () => clearInterval(id);
  }, [paused]);

  useEffect(() => () => clearTimeout(resumeTimer.current), []);

  const selectCountry = (mapName: string) => {
    const idx = connectedCountries.findIndex((c) => c.mapName === mapName);
    if (idx === -1) return;
    setActiveIndex(idx);
    setPaused(true);
    clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => setPaused(false), RESUME_AFTER_MS);
  };

  const active = connectedCountries[activeIndex];

  return (
    <div className="overflow-hidden rounded-md border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-6 py-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Currently shipping to
          </p>
          <p key={active.mapName} className="mt-1 text-lg font-semibold text-ink animate-flash-in">
            {active.name} <span className="text-sm font-normal text-gold">&middot; {active.region}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          {connectedCountries.map((c, i) => (
            <button
              key={c.mapName}
              type="button"
              aria-label={`Show ${c.name}`}
              aria-pressed={i === activeIndex}
              onClick={() => selectCountry(c.mapName)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? 'w-5 bg-gold' : 'w-1.5 bg-line-strong hover:bg-gold/50'
              }`}
            />
          ))}
        </div>
      </div>

      <ComposableMap
        projection="geoEqualEarth"
        projectionConfig={{ scale: 148 }}
        className="w-full"
        style={{ maxHeight: 420 }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) => {
            const activeGeo = geographies.find((geo) => geo.properties.name === active.mapName);
            const activeCoords = activeGeo ? (geoCentroid(activeGeo) as [number, number]) : null;

            return (
              <>
                {geographies.map((geo) => {
                  const name = geo.properties.name as string;
                  const isActive = name === active.mapName;
                  const isConnected = connectedNames.has(name);
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      onClick={() => isConnected && selectCountry(name)}
                      style={{
                        default: {
                          fill: isActive ? '#c9943e' : isConnected ? '#3d7a58' : '#e6e1d6',
                          stroke: '#fafaf8',
                          strokeWidth: 0.5,
                          outline: 'none',
                          cursor: isConnected ? 'pointer' : 'default',
                          transition: 'fill 300ms ease',
                        },
                        hover: {
                          fill: isActive ? '#c9943e' : isConnected ? '#2a5540' : '#dcd6c9',
                          outline: 'none',
                        },
                        pressed: { fill: '#c9943e', outline: 'none' },
                      }}
                    />
                  );
                })}

                {activeCoords && (
                  <Line
                    from={ORIGIN_COORDS}
                    to={activeCoords}
                    stroke="#c9943e"
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                    strokeLinecap="round"
                  />
                )}

                <Marker coordinates={ORIGIN_COORDS}>
                  <circle r={4} fill="#1c3d2d" stroke="#c9943e" strokeWidth={1.5} />
                </Marker>

                {activeCoords && (
                  <Marker coordinates={activeCoords}>
                    <circle r={5} fill="#c9943e" stroke="#ffffff" strokeWidth={1.5} className="animate-pulse" />
                  </Marker>
                )}
              </>
            );
          }}
        </Geographies>
      </ComposableMap>

      <p className="border-t border-line px-6 py-3 text-xs text-ink-muted">
        <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-green align-middle" />
        {ORIGIN_NAME} (origin) &middot;
        <span className="mx-1.5 inline-block h-2 w-2 rounded-full bg-gold align-middle" />
        currently shipping to &middot; click any highlighted country to jump to it
      </p>
    </div>
  );
}
