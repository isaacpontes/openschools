import React, { useEffect, useState } from 'react'
import { ApiClient, useCurrentAdmin } from 'adminjs'
import { H1, H2, Table, TableHead, TableBody, TableRow, TableCell } from '@adminjs/design-system'

function Dashboard() {
  const [resources, setResources] = useState({})
  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin()

  const api = new ApiClient()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  async function fetchDashboardData() {
    const res = await api.getDashboard()
    console.log(res.data)

    setResources(res.data)
  }

  return (
    <section style={{ padding: '1.5rem' }}>
      <H1>Seja bem-vindo, {currentAdmin?.name}!</H1>

      <section style={{ backgroundColor: '#FFF', padding: '1.5rem' }}>
        <H2>Resumo</H2>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: '#0086D0' }}>
              <TableCell style={{ color: "#FFF" }}>Recurso</TableCell>
              <TableCell style={{ color: "#FFF" }}>Registros</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              resources ?
                Object.entries(resources).map(([resource, count]) => (
                  <TableRow key={resource}>
                    <TableCell>{resource}</TableCell>
                    <TableCell>{count}</TableCell>
                  </TableRow>
                ))
                :
                <></>
            }
          </TableBody>
        </Table>
      </section>
    </section>
  )
}

export default Dashboard
