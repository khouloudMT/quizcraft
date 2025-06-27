'use client'
import { gql, useQuery } from '@apollo/client'

const GET_THEMES = gql`
  query GetThemes {
    getThemes {
      id
      name
    }
  }
`

export default function ThemeList() {
  const { data, loading, error } = useQuery(GET_THEMES)

  if (loading) return <p>Chargement...</p>
  if (error) return <p>Erreur : {error.message}</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Liste des thèmes</h1>
      <ul>
        {data.getThemes.map((theme: any) => (
          <li key={theme.id} className="border-b py-2">
            {theme.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
