import { useState } from 'react'
import { AutoComplete } from 'primereact/autocomplete'
import { countries } from '../../utils/countriesList'
import './BAutoSuggest.scss'

const BAutoSuggest = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState(countries)

  const searchCountry = event => {
    setTimeout(() => {
      let _filteredCountries
      if (!event.query.trim().length) {
        _filteredCountries = [...countries]
      } else {
        _filteredCountries = countries.filter(country => {
          return country.label.toLowerCase().startsWith(event.query.toLowerCase())
        })
      }

      setFilteredCountries(_filteredCountries)
    }, 250)
  }

  return (
    <AutoComplete
      virtualScrollerOptions={{ itemSize: 20 }}
      placeholder="Search country"
      value={selectedCountry}
      suggestions={filteredCountries}
      field="label"
      dropdown
      className="auto-suggest"
      onChange={e => setSelectedCountry(e.value)}
      completeMethod={searchCountry}
      dropdownIcon="pi pi-search"
    />
  )
}

export default BAutoSuggest
