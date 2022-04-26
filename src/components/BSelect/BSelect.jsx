import { TreeSelect } from 'primereact/treeselect'
import { useCallback, useState } from 'react'
import { Chip } from 'primereact/chip'
import { Button } from 'primereact/button'
import { treeNodes } from '../../utils/treeNodes'
import './BSelect.scss'

const BSelect = () => {
  const [selectedNodeKeys2, setSelectedNodeKeys2] = useState(null)
  const [currentRowIdLoading, setCurrentRowIdLoading] = useState(null)

  const onRemove = useCallback(item => {
    const { key } = item
    setSelectedNodeKeys2(oldKeys => {
      const newKeys = Object.entries(oldKeys).filter(([first]) => {
        return first !== key
      })
      return Object.fromEntries(newKeys)
    })
  }, [])

  return (
    <TreeSelect
      value={selectedNodeKeys2}
      options={treeNodes}
      valueTemplate={items => {
        if (!items.length) {
          return <span>Select items</span>
        }
        const chips = items.map(item => {
          const { label, key } = item
          return <Chip key={key} label={label} removable onRemove={() => onRemove(item)} />
        })
        return (
          <>
            {chips}{' '}
            <Button
              onClick={() => setSelectedNodeKeys2({})}
              icon="pi pi-times"
              className="p-button-rounded p-button-plain p-button-text"
              aria-label="Cancel"
            />{' '}
          </>
        )
      }}
      onChange={e => setSelectedNodeKeys2(e.value)}
      onNodeExpand={({ node }) => {
        node.className = 'subtree-loading'
        node.icon = 'pi pi-fw pi-file'
        setCurrentRowIdLoading(node.key)
      }}
      filter
      placeholder="Select Items"
      selectionMode="checkbox"
      metaKeySelection={false}
      display="chip"
    />
  )
}

export default BSelect
