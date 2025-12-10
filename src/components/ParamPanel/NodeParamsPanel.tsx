import { useEffect, useState } from 'react'
import { useNodeDetails } from '../../hooks/useNodeDetails'
import { useUIStore } from '../../stores/uiStore'
import { useWorkflowStore } from '../../stores/workflowStore'

export default function NodeParamsPanel() {
  const { activeNodeId, openParamsPanel, setOpenParamsPanel } = useUIStore()
  const { nodes, updateNodeData } = useWorkflowStore()
  const node = nodes.find((n) => n.id === activeNodeId)
  const nodeName = node?.data?.label || node?.data?.nodeName
  const { data: details } = useNodeDetails(node?.data?.nodeName)

  const [local, setLocal] = useState<any>(node?.data?.params ?? {})

  useEffect(() => {
    setLocal(node?.data?.params ?? {})
  }, [activeNodeId])

  if (!openParamsPanel || !node) return null

  const save = () => {
    updateNodeData(node.id, { params: local })
    setOpenParamsPanel(false)
  }

  return (
    <aside className="w-96 p-4 bg-white border-l border-gray-200">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{nodeName}</h3>
        <button
          onClick={() => setOpenParamsPanel(false)}
          className="text-sm text-gray-500"
        >
          Close
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {details?.params ? (
          Object.entries(details.params).map(([key, schema]: any) => {
            // handle common types
            const val = local[key] ?? ''
            if (schema.type === 'text' || schema.type === 'url') {
              return (
                <div key={key}>
                  <label className="block text-sm font-medium">{key}</label>
                  <input
                    value={val}
                    onChange={(e) =>
                      setLocal({ ...local, [key]: e.target.value })
                    }
                    className="mt-1 block w-full border p-2 rounded"
                  />
                  {schema.hint && (
                    <div className="text-xs text-gray-400 mt-1">
                      {schema.hint}
                    </div>
                  )}
                </div>
              )
            }
            if (schema.type === 'dropdown') {
              return (
                <div key={key}>
                  <label className="block text-sm font-medium">{key}</label>
                  <select
                    value={val}
                    onChange={(e) =>
                      setLocal({ ...local, [key]: e.target.value })
                    }
                    className="mt-1 block w-full border p-2 rounded"
                  >
                    <option value="">Select</option>
                    {schema.allowedValues?.map((opt: string) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              )
            }
            if (schema.type === 'list') {
              const list = local[key] ?? []
              return (
                <div key={key}>
                  <label className="block text-sm font-medium">{key}</label>
                  <div className="space-y-2 mt-2">
                    {list.map((it: any, i: number) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={it}
                          onChange={(e) => {
                            const copy = [...list]
                            copy[i] = e.target.value
                            setLocal({ ...local, [key]: copy })
                          }}
                          className="flex-1 border p-2 rounded"
                        />
                        <button
                          onClick={() => {
                            const copy = [...list]
                            copy.splice(i, 1)
                            setLocal({ ...local, [key]: copy })
                          }}
                          className="px-2"
                        >
                          -
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() =>
                        setLocal({ ...local, [key]: [...list, ''] })
                      }
                      className="mt-2 px-3 py-1 bg-gray-100 rounded"
                    >
                      Add
                    </button>
                  </div>
                </div>
              )
            }
            // fallback: show JSON editor
            return (
              <div key={key}>
                <label className="block text-sm font-medium">
                  {key} (complex)
                </label>
                <textarea
                  value={JSON.stringify(local[key] ?? {}, null, 2)}
                  onChange={(e) => {
                    try {
                      setLocal({ ...local, [key]: JSON.parse(e.target.value) })
                    } catch {
                      /* ignore parse errors */
                    }
                  }}
                  className="mt-1 block w-full border p-2 rounded h-28"
                />
              </div>
            )
          })
        ) : (
          <div className="text-sm text-gray-500">
            No parameter schema available. You can still edit custom JSON below.
          </div>
        )}

        <div>
          <label className="block text-sm font-medium">Raw params (JSON)</label>
          <textarea
            value={JSON.stringify(local, null, 2)}
            onChange={(e) => {
              try {
                setLocal(JSON.parse(e.target.value))
              } catch {
                /* ignore */
              }
            }}
            className="mt-1 block w-full border p-2 rounded h-32"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={save}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Save
        </button>
        <button
          onClick={() => setOpenParamsPanel(false)}
          className="px-4 py-2 border rounded"
        >
          Cancel
        </button>
      </div>
    </aside>
  )
}
