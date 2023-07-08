import * as d3 from "d3";

const Chart = ({
  scores,
}: {
  scores: { label: string; flashcards: number; emoji: string; short: string }[];
}) => {
  let xScale = d3
    .scaleBand()
    .rangeRound([0, 100])
    .padding(0.2)
    .domain(scores.map((score) => score.label));
  let yScale = d3
    .scaleLinear()
    .domain([0, d3.max(scores.map((s) => s.flashcards)) ?? 0])
    .range([100, 0]);

  return (
    <div
      className="@container relative h-full w-full"
      style={
        {
          "--marginTop": "6px",
          "--marginRight": "8px",
          "--marginBottom": "25px",
          "--marginLeft": "25px",
        } as React.CSSProperties
      }
    >
      {/* x-axis */}
      <svg className="absolute inset-0 h-[calc(100%-var(--marginTop))] w-[calc(100%-var(--marginLeft)-var(--marginRight))] translate-x-[var(--marginLeft)] translate-y-[var(--marginTop)] overflow-visible">
        {scores.map((score, key) => (
          <g
            key={key}
            className="overflow-visible font-medium text-muted-foreground"
          >
            <text
              x={`${xScale(score.label)}%`}
              y="100%"
              textAnchor={"middle"}
              dx={`${xScale.bandwidth() / 2}%`}
              fill="currentColor"
              className="hidden sm:block text-sm"
            >
              {score.emoji} {score.short}
            </text>
            <text
              x={`${xScale(score.label)}%`}
              y="100%"
              textAnchor={"middle"}
              dx={`${xScale.bandwidth() / 2}%`}
              fill="currentColor"
              className="sm:hidden text-xs text-center"
            >
              {score.emoji}
            </text>
          </g>
        ))}
      </svg>

      {/* y-axis */}
      <svg className="absolute inset-0 h-[calc(100%-var(--marginTop)-var(--marginBottom))] translate-y-[var(--marginTop)] overflow-visible">
        <g className="translate-x-4">
          {yScale
            .ticks(15)
            .map(yScale.tickFormat(15, "d"))
            .map((value, key) => (
              <text
                key={key}
                y={`${yScale(+value)}%`}
                alignmentBaseline="middle"
                textAnchor="end"
                className="text-xs tabular-nums text-muted-foreground"
                fill="currentColor"
              >
                {value}
              </text>
            ))}
        </g>
      </svg>

      {/* chart area */}
      <svg
        className="absolute inset-0
          h-[calc(100%-var(--marginTop)-var(--marginBottom))]
          w-[calc(100%-var(--marginLeft)-var(--marginRight))]
          translate-x-[var(--marginLeft)]
          translate-y-[var(--marginTop)]
          overflow-visible
        "
      >
        <svg
          viewBox="0 0 100 100"
          className="overflow-visible"
          preserveAspectRatio="none"
        >
          {/* gridlines */}
          {yScale
            .ticks(15)
            .map(yScale.tickFormat(15, "d"))
            .map((active, key) => (
              <g
                transform={`translate(0,${yScale(+active)})`}
                className="text-border"
                key={key}
              >
                <line
                  x1={0}
                  x2={100}
                  stroke="currentColor"
                  strokeDasharray="6,5"
                  strokeWidth={0.5}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}

          {/* bars */}
          {scores.map((score, key) => (
            <rect
              key={key}
              x={xScale(score.label)}
              y={yScale(score.flashcards)}
              width={xScale.bandwidth()}
              height={100 - yScale(score.flashcards)}
              className="fill-primary"
              opacity={(key + 4) / 10}
            />
          ))}
        </svg>
      </svg>
    </div>
  );
};

export default Chart;
