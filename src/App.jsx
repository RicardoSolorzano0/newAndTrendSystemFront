import { AppTheme } from "./theme/AppTheme";
import { AppRouter } from "./router/AppRouter";

export const App = () => {
  return (
    <AppTheme>
      <AppRouter />
    </AppTheme>
  );
};
