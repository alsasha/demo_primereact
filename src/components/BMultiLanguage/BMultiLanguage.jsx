import React, { useCallback, useState } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { SelectButton } from 'primereact/selectbutton'
import { InputText } from 'primereact/inputtext'
import { Tooltip } from 'primereact/tooltip'
import './BMultiLanguage.scss'

const mlValue = {
  en: 'Sample text',
  de: 'Beispeltext'
}

const mlValueText = {
  en: 'English',
  de: 'German'
}

const BMultiLanguage = () => {
  const [open, setOpen] = useState(false)
  const [langsObj, setLangsObj] = useState(mlValue)
  const [currentLang, setCurrentLang] = useState('en')

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => setOpen(false)

  const handleLangValueChange = useCallback(
    key => e => {
      setLangsObj(prevState => ({ ...prevState, [key]: e.target.value }))
    },
    []
  )

  const handleInputChange = e => setLangsObj(prevState => ({ ...prevState, [currentLang]: e.target.value }))

  const options = Object.keys(mlValue)

  const renderFooter = () => {
    return (
      <div>
        <Button label="Ok" onClick={handleClose} />
        <Button label="Cancel" className="p-button-secondary" onClick={handleClose} />
      </div>
    )
  }

  return (
    <>
      <div className="toolbar">
        <div className="languages">
          <Button icon="pi pi-globe" className="p-button-text" aria-label="Glob" onClick={handleOpen} />
          <SelectButton
            value={currentLang}
            options={options}
            onChange={e => {
              setCurrentLang(e.value)
            }}
          />
        </div>
        <Tooltip target=".pi-info-circle" content="Help information" />
        <span className="lang-input p-input-icon-right">
          <i className="pi pi-info-circle" />
          <InputText placeholder="Enter text" value={langsObj[currentLang]} onChange={handleInputChange} />
        </span>
      </div>
      <Dialog
        className="multilang-modal"
        header="Header"
        visible={open}
        footer={renderFooter()}
        onHide={handleClose}
      >
        {Object.keys(langsObj).map((key, i) => {
          const uniqVal = `${key}-${i}`
          return (
            <div className="field">
              <label htmlFor={uniqVal} className="block">
                {mlValueText[key]}
              </label>
              <InputText
                id={uniqVal}
                aria-describedby={uniqVal}
                placeholder="Enter text"
                onChange={handleLangValueChange(key)}
                name={uniqVal}
                key={uniqVal}
                value={langsObj[key]}
              />
            </div>
          )
        })}
      </Dialog>
    </>
  )
}

export default BMultiLanguage
