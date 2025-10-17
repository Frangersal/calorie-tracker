import { useReducer } from "react"
import Form from "./components/Form"
import './index.css'


// Importamos el reducer y el estado inicial
import { activityReducer, initialState } from "./reducers/activity-reducer"
import ActivityList from "./components/ActivityList"

function App() {
  // useReducer nos permite manejar el estado global de las actividades.
  // state: el estado actual, dispatch: función para enviar acciones al reducer.
  const [state, dispatch] = useReducer(activityReducer, initialState)


  return (
    <>
      <header className="header-cc">
        <div className="max-w4xl mx-auto frex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>
        </div>
      </header>
      <section className="section-cc py-20 px-5">
        <div className="max-w-4xl mx-auto">
          {/* Pasamos dispatch como prop para que el formulario pueda enviar acciones al reducer */}
          <Form
            dispatch={dispatch}
          />
        </div>
      </section>
      <section>
        <ActivityList
          activities={state.activities}
        />
      </section>
    </>
  )
}

export default App
