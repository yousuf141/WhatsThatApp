import React from "react";

export const useRefresh = (): {
  shouldRefresh: boolean;
  refresh: () => void;
} => {
  const [shouldRefresh, setShouldRefresh] = React.useState(false);

  React.useEffect(() => {
    setShouldRefresh(false);
  }, [shouldRefresh]);

  function refresh(): void {
    setShouldRefresh(true);
  }

  return { shouldRefresh, refresh };
};
