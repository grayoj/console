import { HorizontalNavigationBar } from "./components/HorizontalNavigationBar";
import { PageWrapper } from "./components/PageWrapper";
import { VerticalNavigation } from "./components/VerticalNavigationBar";
import { DashboardCardRow } from "./components/cards/DashboardCardRow";
import { DashboardPanel } from "./components/cards/DashboardPanel";

export const Home = () => {
  return (
    <>
      <div>
        <HorizontalNavigationBar name="Dashboard" />
        <div className="flex">
          <VerticalNavigation />
          <div className="flex-grow">
            <PageWrapper>
              <DashboardCardRow />

              <DashboardPanel />
            </PageWrapper>
          </div>
        </div>
      </div>{" "}
    </>
  );
};
