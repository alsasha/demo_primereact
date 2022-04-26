import React, { useState, useMemo, useCallback } from 'react'
import { TreeTable } from 'primereact/treetable'
import { Column } from 'primereact/column'
import { InputText } from 'primereact/inputtext'
import { fakeTreeData } from '../../utils/treeTableData'
import { Button } from 'primereact/button'
import { SelectButton } from 'primereact/selectbutton'
import { Checkbox } from 'primereact/checkbox'
import './BTable.scss'

const BTable = () => {
  const [loading, setLoading] = useState(false)
  const [sortColumn, setSortColumn] = useState()
  const [sortType, setSortType] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [checkedKeys, setCheckedKeys] = useState([])

  let checked = false
  let indeterminate = false

  if (checkedKeys.length === fakeTreeData.length) {
    checked = true
  } else if (checkedKeys.length === 0) {
    checked = false
  } else if (checkedKeys.length > 0 && checkedKeys.length < fakeTreeData.length) {
    indeterminate = true
  }

  const handleCheckAll = ({ checked }) => {
    const keys = checked ? fakeTreeData.map(item => item.key) : []
    setCheckedKeys(keys)
  }

  const handleCheck = ({ value, checked }) => {
    const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value)
    setCheckedKeys(keys)
  }

  const tableData = useMemo(() => {
    let data = [...fakeTreeData]
    if (searchValue) {
      data = data.filter(({ data: val }) => val['name'].includes(searchValue))
      setTimeout(() => {
        setLoading(false)
      }, 400)
    }
    if (sortColumn && sortType) {
      data = data.sort((a, b) => {
        let x = a.data[sortColumn]
        let y = b.data[sortColumn]
        if (sortType === -1) {
          return ('' + x).localeCompare(y)
        }
        return ('' + y).localeCompare(x)
      })
    }
    return data
  }, [searchValue, sortType, sortColumn])

  const onSearchInput = useCallback(e => {
    if (e.target.value) {
      setLoading(true)
    }
    setSearchValue(e.target.value)
  }, [])

  const justifyOptions = [
    { icon: 'pi pi-sliders-v', value: 'Sliders' },
    { icon: 'pi pi-list', value: 'Bars' },
    { icon: 'pi pi-sort-alt', value: 'SortAlt' }
  ]

  const justifyTemplate = option => {
    return <i className={option.icon} />
  }

  const header = useMemo(() => {
    return (
      <>
        <div className="table-header-top">
          <Button icon="pi pi-filter" className="p-button-text" aria-label="Submit" />
          <div className="p-inputgroup">
            <InputText type="search" onInput={onSearchInput} placeholder="Search by Name" size="50" />
            <span className="p-inputgroup-addon">
              <i className="pi pi-search" />
            </span>
          </div>
          <SelectButton options={justifyOptions} itemTemplate={justifyTemplate} />
        </div>
      </>
    )
  }, [onSearchInput])

  const handleSortColumn = e => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSortColumn(e.sortField)
      setSortType(e.sortOrder)
    }, 500)
  }

  const onExpand = event => {
    if (event.node.children) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      }, 250)
    }
  }

  const actionTemplate = props => {
    return (
      <div>
        <Checkbox value={props.key} onChange={handleCheck} checked={checkedKeys.some(item => item === props.key)} />
      </div>
    )
  }

  const expandableTemplate = rowData => {
    return (
      <div className="name-cell-inner">
        {rowData.children ? <i className="pi pi-folder mr-2" /> : null}
        <span className="name-cell-text">{rowData.data.name}</span>
      </div>
    )
  }

  return (
    <TreeTable
      scrollHeight="600px"
      onExpand={onExpand}
      scrollable
      resizableColumns
      columnResizeMode="fit"
      showGridlines
      loading={loading}
      sortOrder={sortType}
      sortField={sortColumn}
      lazy
      value={tableData}
      header={header}
      onSort={handleSortColumn}
    >
      <Column
        className="name-cell"
        body={expandableTemplate}
        field="name"
        header="Name"
        expander
        sortable
      />
      <Column field="description" header="Description" sortable />
      <Column field="jobType" header="Job Type" sortable />
      <Column field="dueDate" header="Due Date" sortable />
      <Column field="jobState" header="Job State" sortable />
      <Column
        field="key"
        body={actionTemplate}
        header={<Checkbox onChange={handleCheckAll} indeterminate={indeterminate} checked={checked} />}
        style={{ textAlign: 'center', width: '100px' }}
      />
    </TreeTable>
  )
}

export default BTable
