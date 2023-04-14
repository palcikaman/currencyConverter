import {QueryClient, QueryClientProvider, QueryClientProviderProps} from "react-query";

const ReactQueryProvider = (props: Omit<QueryClientProviderProps, 'client'>) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  })

  return <QueryClientProvider client={queryClient} {...props} />
}

export default ReactQueryProvider