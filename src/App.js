import { useState, useEffect } from 'react'
import { Button } from 'primereact/button'
import { TreeSelect } from 'primereact/treeselect'
import { NodeService } from './service/NodeService'
import './App.scss'
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import TreeComponent from './components/TreeComponent'

function App() {
  const [nodes, setNodes] = useState(null)
  const [selectedNodeKeys2, setSelectedNodeKeys2] = useState(null)
  const [currentRowIdLoading, setCurrentRowIdLoading] = useState(null)
  const nodeService = new NodeService()

  useEffect(() => {
    nodeService.getTreeNodes().then(data => setNodes(data))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="main-area">
      <h4>Multiple async tree select</h4>
      <TreeSelect
        className="custom-tree-select"
        value={selectedNodeKeys2}
        options={nodes}
        onChange={e => setSelectedNodeKeys2(e.value)}
        onNodeExpand={({ node }) => {
          node.className = 'subtree-loading'
          node.icon = 'pi pi-fw pi-file'
          setCurrentRowIdLoading(node.key)
          console.log('node:', node)
        }}
        selectionMode="multiple"
        metaKeySelection={false}
        placeholder="Select Items"
        display="chip"
      ></TreeSelect>

      <h4>Multiple async tree table</h4>
      <TreeComponent />
    </div>
  )
}

export default App
