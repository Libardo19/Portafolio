import type { CSSProperties } from 'react'

type Node = {
  id: string
  x: number
  y: number
  title: string
  detail: string
  tone?: 'external' | 'data'
  step: number
}

type Edge = { d: string; len: number; step: number; label?: { x: number; y: number; text: string } }

const W = 180
const H = 76

/** Ida en la fila de arriba, vuelta en la de abajo (coordenadas del viewBox 1160×540). */
const nodes: Node[] = [
  { id: 'web', x: 20, y: 60, title: 'Navegador', detail: 'Next.js', step: 0 },
  { id: 'api', x: 255, y: 60, title: 'API Express', detail: 'valida y cobra tokens', step: 1 },
  {
    id: 'queue',
    x: 490,
    y: 60,
    title: 'Cola BullMQ',
    detail: 'sobre Redis',
    tone: 'data',
    step: 2
  },
  { id: 'worker', x: 725, y: 60, title: 'Worker', detail: 'límite + circuit breaker', step: 3 },
  {
    id: 'heygen',
    x: 960,
    y: 60,
    title: 'API de HeyGen',
    detail: 'genera el video',
    tone: 'external',
    step: 4
  },
  { id: 'webhook', x: 960, y: 270, title: 'Webhook', detail: 'firma HMAC-SHA256', step: 5 },
  {
    id: 'db',
    x: 490,
    y: 270,
    title: 'PostgreSQL',
    detail: 'estado del video',
    tone: 'data',
    step: 6
  },
  {
    id: 'storage',
    x: 490,
    y: 440,
    title: 'Cloud Storage',
    detail: 'el MP4 queda guardado',
    tone: 'external',
    step: 7
  },
  {
    id: 'pubsub',
    x: 255,
    y: 270,
    title: 'Redis Pub/Sub',
    detail: 'video:events:*',
    tone: 'data',
    step: 7
  },
  { id: 'sse', x: 20, y: 270, title: 'Stream SSE', detail: 'progreso en vivo', step: 8 }
]

const top = 60 + H / 2
const bottom = 270 + H / 2

const edges: Edge[] = [
  { d: `M200 ${top} H251`, len: 51, step: 1 },
  { d: `M435 ${top} H486`, len: 51, step: 2 },
  { d: `M670 ${top} H721`, len: 51, step: 3 },
  { d: `M905 ${top} H956`, len: 51, step: 4 },
  {
    d: `M1050 ${60 + H} V266`,
    len: 130,
    step: 5,
    label: { x: 1062, y: 210, text: 'video listo' }
  },
  {
    d: `M960 ${bottom} H674`,
    len: 286,
    step: 6,
    label: { x: 817, y: bottom - 12, text: 'estado COMPLETED' }
  },
  { d: `M580 ${270 + H} V436`, len: 90, step: 7 },
  { d: `M490 ${bottom} H439`, len: 51, step: 7 },
  { d: `M255 ${bottom} H204`, len: 51, step: 8 },
  { d: `M110 270 V${60 + H + 4}`, len: 130, step: 9 }
]

const route = `path('M110 ${top} H1050 V${bottom} H110 Z')`

const tones = {
  default: 'fill-card stroke-line',
  data: 'fill-surface-alt stroke-line',
  external: 'fill-card stroke-brand'
}

/**
 * Arquitectura del módulo de video. Las flechas se dibujan en orden al entrar en pantalla
 * y un punto recorre la ida y la vuelta. Sin `motion`, el diagrama aparece completo y quieto.
 */
export function ArchitectureDiagram({ caption }: { caption: string }) {
  return (
    <figure className="rounded-card border border-line bg-card p-4 sm:p-6">
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 1160 540"
          className="min-w-[44rem]"
          role="img"
          aria-labelledby="diagram-title diagram-desc"
          data-diagram
        >
          <title id="diagram-title">Arquitectura del módulo de video con IA</title>
          <desc id="diagram-desc">
            Ida: el navegador pide el video a la API Express, que lo encola en BullMQ; un worker lo
            envía a HeyGen. Vuelta: HeyGen avisa por un webhook firmado, el estado se guarda en
            PostgreSQL, el MP4 se copia a Cloud Storage y Redis Pub/Sub lo publica al navegador por
            SSE.
          </desc>
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10 Z" className="fill-brand" />
            </marker>
          </defs>

          <text x="20" y="34" className="fill-muted font-mono text-[13px]">
            IDA · el usuario pide un video
          </text>
          <text x="255" y="244" className="fill-brand font-mono text-[13px]">
            VUELTA · HeyGen avisa y el usuario lo ve en vivo
          </text>

          {edges.map((edge) => (
            <g key={edge.d} className="flow-node" style={{ '--step': edge.step } as CSSProperties}>
              <path
                d={edge.d}
                className="flow-path stroke-brand"
                strokeWidth={2.5}
                fill="none"
                markerEnd="url(#arrow)"
                style={{ '--len': edge.len, '--step': edge.step } as CSSProperties}
              />
              {edge.label ? (
                <text
                  x={edge.label.x}
                  y={edge.label.y}
                  className="fill-brand text-[13px]"
                  textAnchor={edge.label.x > 1000 ? 'start' : 'middle'}
                >
                  {edge.label.text}
                </text>
              ) : null}
            </g>
          ))}

          {nodes.map((node) => (
            <g key={node.id} className="flow-node" style={{ '--step': node.step } as CSSProperties}>
              <rect
                x={node.x}
                y={node.y}
                width={W}
                height={H}
                rx={12}
                strokeWidth={1.5}
                className={tones[node.tone ?? 'default']}
              />
              <text
                x={node.x + W / 2}
                y={node.y + 32}
                textAnchor="middle"
                className="fill-ink text-[15px] font-semibold"
              >
                {node.title}
              </text>
              <text
                x={node.x + W / 2}
                y={node.y + 54}
                textAnchor="middle"
                className="fill-muted text-[12.5px]"
              >
                {node.detail}
              </text>
            </g>
          ))}

          <circle
            r={7}
            className="flow-dot fill-brand"
            style={{ offsetPath: route } as CSSProperties}
          />
        </svg>
      </div>
      <figcaption className="mt-4 text-sm text-muted">{caption}</figcaption>
    </figure>
  )
}
