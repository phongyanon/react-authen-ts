import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import '@mantine/core/styles.css';
// import theme from "./theme"
import { RouterProvider } from "react-router-dom";
import { router } from './router.tsx'
import { QueryClientProvider, QueryClient } from "react-query"

const client = new QueryClient()

const App = () => {
  return (
    <MantineProvider
      // theme={theme}
    >
      <QueryClientProvider client={client}>
        <Notifications position="top-right" zIndex={999} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default App