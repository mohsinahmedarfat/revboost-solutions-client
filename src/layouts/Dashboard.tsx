import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import type { Navigation, Router, Session } from "@toolpad/core";
import { Outlet } from "react-router-dom";
import router from "../routes/Router";
import { useMemo, useState } from "react";

// Define the navigation menu items
const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Company Details",
  },
  {
    segment: "dashboard",
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "dashboard/company-incomes",
    title: "Income",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "dashboard/company-expenses",
    title: "Expenses",
    icon: <ShoppingCartIcon />,
  },
  {
    segment: "dashboard/payroll",
    title: "Payroll Management",
    icon: <ShoppingCartIcon />,
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "dashboard/revenue-growth",
    title: "Revenue Growth",
    icon: <ShoppingCartIcon />,
  },
];

// Define a custom theme using Material UI's `createTheme` function
const revTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Define the `FeaturePages` component to display the content based on the current path
function FeaturePages({
  pathname,
}: {
  pathname: string;
  navigate: (path: string | URL) => void;
}) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <main className="py-10 px-5 min-h-screen">
        {pathname}
        <Outlet />
      </main>
    </Box>
  );
}

// Define the props interface for the Dashboard layout component
interface DemoProps {
  window?: () => Window; // Optional window prop for iframe handling
}

// Define the main `DashboardLayoutBasic` component
export default function DashboardLayoutBasic(props: DemoProps) {
  const { window } = props;

  // Initialize session state with default values
  const [session, setSession] = useState<Session | null>({
    user: {
      name: "RevBoost Solutions",
      email: "revboost@solutions.com",
      image: "https://avatars.githubusercontent.com/u/19550456",
    },
  });

  // Define the authentication logic using `useMemo` to manage user sign in and sign out
  const authentication = useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: "RevBoost Solutions",
            email: "revboost@solutions.com",
            image: "https://avatars.githubusercontent.com/u/19550456",
          },
        });
      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  // Manage the current path and navigation state
  const [pathname, setPathname] = useState("/dashboard");

  const routes: Router = useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  console.log(routes);

  // For handling the window object when in an iframe
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // Wrap the components in the `AppProvider` to provide the session, authentication, navigation, etc.
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={revTheme}
      window={demoWindow}
    >
      <DashboardLayout>
        <FeaturePages pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
  );
}
