import { Activity } from "../types"

// Definimos el tipo de acciones que puede recibir el reducer
export type ActivityActions = {
    // type: indica el tipo de acción, payload: son los datos que le pasas junto a la accion
    type: 'save-activity', payload: { newActivity: Activity }
}

type ActivityState = {
    activities: Activity[] // El estado es un arreglo de actividades
}

// Estado inicial del reducer, comienza vacío
export const initialState: ActivityState = {
    activities: []
}

// El reducer recibe el estado actual y una acción, y devuelve el nuevo estado
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    // Si la acción es 'save-activity', aquí se podría agregar la nueva actividad al estado
    if (action.type === 'save-activity') {
        // Aquí podrías actualizar el estado agregando la nueva actividad
        return {

            ...state, 
            activities: [...state.activities, action.payload.newActivity]
        }
    }
    // Si no se reconoce la acción, devolvemos el estado sin cambios
    return state
}