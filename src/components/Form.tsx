import { useState, ChangeEvent, FormEvent, Dispatch } from "react"
import {v4 as uuidv4} from 'uuid'
import { Activity } from "../types"
import { categories } from "../data/cagegories"
import { ActivityActions } from "../reducers/activity-reducer"


type FormProps = {
  // Recibimos dispatch como prop para poder enviar acciones al reducer desde el formulario
  dispatch: Dispatch<ActivityActions>
}

const initialState : Activity ={
  id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({dispatch}: FormProps) {
  // useState para manejar el estado local del formulario
  const [activity, setActivity] = useState<Activity>(initialState)

  // Maneja los cambios en los campos del formulario
  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  // Valida que los datos del formulario sean correctos
  const isValidActivity = () => {
    const { name, calories } = activity
    return name.trim() !== '' && calories > 0
  }

  // Cuando se envía el formulario, usamos dispatch para enviar la acción al reducer
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Enviamos la acción 'save-activity' con la nueva actividad como payload
    dispatch({type: 'save-activity', payload: {newActivity: activity}})
    setActivity({
      ...initialState,
      id: uuidv4(),
    })

  }

  return (
    <form
      className="space-y-5 form-cc shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="" id="category" className="font-bold">Categoria:</label>
        <select name="category"
          id="category"
          value={activity.category}
          onChange={handleChange}
          className="border border-slate-300 p-2 rounded-lg w-full bg-white" >
          {categories.map(category => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input type="text"
          id="name"
          className="border border-slate-300 p-2 rounded-lg bg-white"
          placeholder="Ej Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="" id="calofies" className="font-bold">Calorias:</label>
        <input type="number"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg bg-white" 
          placeholder="Ej Calorias, 300 o 500"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer
        disabled:opacity-10"
        value={activity.category == 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />

    </form>
  )
}
