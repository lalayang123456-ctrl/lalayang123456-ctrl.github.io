const visitorMapEmbed = "";

export default function VisitorMap() {
  const hasEmbed = visitorMapEmbed.trim().length > 0;

  return (
    <aside className="visitor-map" aria-label="Global visitor statistics">
      <div className="visitor-map-heading">
        <span>Global visitors</span>
        <span className="visitor-map-status">
          <i aria-hidden="true" /> {hasEmbed ? "Live" : "Ready for launch"}
        </span>
      </div>
      <div className="visitor-map-canvas">
        {hasEmbed ? (
          <iframe
            title="Live global visitor map"
            srcDoc={`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>html,body{width:100%;height:100%;margin:0;overflow:hidden;background:transparent}body{display:grid;place-items:center}img,svg,canvas{max-width:100%;max-height:100%}</style></head><body>${visitorMapEmbed}</body></html>`}
            sandbox="allow-scripts allow-popups"
          />
        ) : (
          <img
            src="/assets/images/visitor-world-map.svg"
            alt="Robinson projection world map awaiting visitor data"
          />
        )}
      </div>
      <div className="visitor-map-stats" aria-hidden={!hasEmbed}>
        <span>Page views <b>{hasEmbed ? "Live" : "—"}</b></span>
        <span>Countries <b>{hasEmbed ? "Live" : "—"}</b></span>
      </div>
    </aside>
  );
}
