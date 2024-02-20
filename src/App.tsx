import { MantineProvider } from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './i18n/config';
// import theme from "./theme"
// import { RouterProvider } from "react-router-dom";
import { Router } from "./router";
import { QueryClientProvider, QueryClient } from "react-query"

const client = new QueryClient()

const App = () => {
  return (
    <MantineProvider
      // theme={theme}
    >
      <QueryClientProvider client={client}>
        <Notifications position="top-right" zIndex={999} />
        <Router/>
      </QueryClientProvider>
    </MantineProvider>
  )
}

export default App