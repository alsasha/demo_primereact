import React, { useState, useEffect } from 'react'
import { TreeTable } from 'primereact/treetable'
import { Column } from 'primereact/column'

const TreeComponent = () => {
  const [nodes, setNodes] = useState([])
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(10)
  const [totalRecords, setTotalRecords] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      setNodes(loadNodes(first, first + rows))
      setTotalRecords(1000)
    }, 1000)
  }, [])

  const loadNodes = (start, end) => {
    let nodes = []

    for (let i = start; i < end; i++) {
      let node = {
        key: i,
        data: {
          name: 'Item ' + (start + i),
          size: Math.floor(Math.random() * 1000) + 1 + 'kb',
          type: 'Type ' + (start + i)
        },
        leaf: false
      }

      nodes.push(node)
    }

    return nodes
  }

  const onExpand = event => {
    if (!event.node.children) {
      setLoading(true)

      setTimeout(() => {
        setLoading(false)
        let lazyNode = { ...event.node }

        lazyNode.children = [
          {
            data: {
              name: lazyNode.data.name + ' - 0',
              size: Math.floor(Math.random() * 1000) + 1 + 'kb',
              type: 'File'
            }
          },
          {
            data: {
              name: lazyNode.data.name + ' - 1',
              size: Math.floor(Math.random() * 1000) + 1 + 'kb',
              type: 'File'
            }
          }
        ]

        let nodesNew = [...nodes]
        nodesNew[event.node.key] = lazyNode

        setLoading(false)
        setNodes(nodesNew)
      }, 250)
    }
  }

  return (
    <TreeTable
      paginator={false}
      value={nodes}
      lazy
      totalRecords={totalRecords}
      first={first}
      rows={rows}
      onExpand={onExpand}
      loading={loading}
    >
      <Column field="name" header="Name" expander></Column>
      <Column field="size" header="Size"></Column>
      <Column field="type" header="Type"></Column>
    </TreeTable>
  )
}

export default TreeComponent
