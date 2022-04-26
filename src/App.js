import 'primereact/resources/themes/md-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './styles/theme.scss'
import './App.scss'
import BTable from './components/BTable/BTable'
import BAutoSuggest from './components/BAutoSuggest/BAutoSuggest'
import BSelect from './components/BSelect/BSelect'
import BMultiLanguage from './components/BMultiLanguage/BMultiLanguage'

function App() {
  return (
    <div className="main-area">
      <h4>AutoSuggest (242 items)</h4>
      <BAutoSuggest />

      <h4>Multiple tree select</h4>
      <BSelect />

      <h4>MultiLanguage</h4>
      <BMultiLanguage />

      <h4>Multiple async tree table (1000 rows)</h4>
      <BTable />
    </div>
  )
}

export default App
