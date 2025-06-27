"use client";
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, from } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || "http://localhost:3000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // Only attempt to get token if window is available
  if (typeof window === "undefined") return { headers };
  
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      if (extensions?.code === "UNAUTHENTICATED") {
        // Handle logout or redirect
        if (typeof window !== "undefined") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    });
  }
  
  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});

export function ApolloWrapper({ children }: { children: ReactNode }) {
  const [client, setClient] = useState<ApolloClient<any> | null>(null);
  const router = useRouter();

  useEffect(() => {
    const newClient = new ApolloClient({
      link: from([errorLink, authLink.concat(httpLink)]),
      cache: new InMemoryCache(),
    });
    
    setClient(newClient);
  }, []);

  if (!client) {
    return <div>Loading...</div>;
  }

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}